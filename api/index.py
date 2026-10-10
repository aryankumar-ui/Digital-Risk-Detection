import os
import sys
import json
import re
from pathlib import Path
from typing import Optional

# Add the backend directory to Python path so Vercel can find the modules
sys.path.append(str(Path(__file__).parent.parent / "backend"))

from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

from backend.brand_profile import discover_brand_profile, normalize_domain_input
from backend.Appmonitoring import run_app_monitoring_audit
from backend.detector import run_social_monitoring_audit

app = FastAPI(title="Digital Risk Protection - Brand Profile API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BrandProfileInput(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    aliases: list[str] = Field(default_factory=list)
    website: Optional[str] = None

    @field_validator("name")
    @classmethod
    def clean_name(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Company/brand name cannot be empty")
        return value

    @field_validator("aliases")
    @classmethod
    def clean_aliases(cls, values: list[str]) -> list[str]:
        return list(dict.fromkeys(v.strip() for v in values if v and v.strip()))

    @field_validator("website")
    @classmethod
    def clean_website(cls, value: Optional[str]) -> Optional[str]:
        if value is None or not value.strip():
            return None
        return value.strip()


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "brand-profile-api"}


@app.post("/api/brand-profile")
def receive_brand_profile(profile: BrandProfileInput):
    payload = profile.model_dump()
    domain = normalize_domain_input(payload["website"] or "")

    try:
        analysis = discover_brand_profile(
            payload["name"],
            payload["aliases"],
            payload["website"] or "",
        )
    except Exception as error:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": {
                    "code": "BRAND_DISCOVERY_FAILED",
                    "message": f"Brand discovery failed: {str(error)}"
                }
            }
        )

    return {
        "received": True,
        "message": "Brand profile processed by Python backend",
        "profile": analysis,
        "name": payload["name"],
        "aliases": payload["aliases"],
        "website": f"https://{domain}" if domain else "",
        "trust_assessment": analysis.get("trust_assessment"),
        "output_folder": analysis.get("output_folder"),
        "counts": {
            "logos": len(analysis.get("official_logo", {}).get("logo_candidates", [])),
            "social_accounts": len(analysis.get("social_accounts", [])),
            "mobile_apps": len(analysis.get("mobile_apps", [])),
        },
    }


@app.get("/api/app-monitoring")
def get_app_monitoring_data(brand: Optional[str] = Query(None)):
    target = brand.strip() if (brand and brand.strip().lower() not in ["all brands", "all"]) else "Microsoft"
    root = Path(__file__).parent.parent / "backend"

    candidates = [
        Path("/tmp") / f"{target}_brand_profile" / "brand_profile_discovery.json",
        root / f"{target}_brand_profile" / "brand_profile_discovery.json",
        root / f"{target}_discovery.json",
        root / "microsoft_discovery.json",
        root / "NovaPay_discovery.json"
    ]

    selected_file = None
    for p in candidates:
        if p.exists():
            selected_file = str(p)
            break

    if not selected_file:
        return {"brand_name": target, "summary": {}, "applications": []}

    try:
        return run_app_monitoring_audit(selected_file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"App store audit failed: {e}")


@app.get("/api/social-monitoring")
def get_social_monitoring_data(brand: Optional[str] = Query(None)):
    target = brand.strip() if (brand and brand.strip().lower() not in ["all brands", "all"]) else "Microsoft"
    root = Path(__file__).parent.parent / "backend"
    
    slug = re.sub(r"[^A-Za-z0-9._-]+", "_", target).strip("._-")
    expected_folder_name = f"{slug}_brand_profile".lower()

    selected_file = None
    # Check /tmp first for newly generated profiles
    tmp_disc_file = Path("/tmp") / expected_folder_name / "brand_profile_discovery.json"
    if tmp_disc_file.exists():
        selected_file = str(tmp_disc_file)
        
    if not selected_file:
        for folder in root.iterdir():
            if folder.is_dir() and folder.name.lower() == expected_folder_name:
                disc_file = folder / "brand_profile_discovery.json"
                if disc_file.exists():
                    selected_file = str(disc_file)
                    break

    if not selected_file:
        for f in root.glob("*.json"):
            if f.name.lower() in [f"{slug}_discovery.json".lower(), f"{slug}_brand_profile.json".lower()]:
                selected_file = str(f)
                break

    if not selected_file:
        for fallback in ["microsoft_discovery.json", "NovaPay_discovery.json"]:
            if (root / fallback).exists():
                selected_file = str(root / fallback)
                break

    if not selected_file:
        return {"brand_name": target, "social_findings": []}

    try:
        return run_social_monitoring_audit(selected_file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Social media audit failed: {e}")