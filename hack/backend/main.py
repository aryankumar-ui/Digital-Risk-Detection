import os
import json
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

from brand_profile import discover_brand_profile, normalize_domain_input
from Appmonitoring import run_app_monitoring_audit

app = FastAPI(title="Digital Risk Protection - Brand Profile API", version="1.0.0")

# Vite runs on port 3000 in this project ("vite --port=3000").
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
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


# Plain `def` (not async): FastAPI runs it in a worker thread, so the slow
# web searches inside discover_brand_profile don't block other requests.
@app.post("/api/brand-profile")
def receive_brand_profile(profile: BrandProfileInput):
    payload = profile.model_dump()
    domain = normalize_domain_input(payload["website"] or "")

    try:
        analysis = discover_brand_profile(
            payload["name"],
            payload["aliases"],
            payload["website"] or "",      # same 3 inputs as the CLI prompts
        )
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Brand discovery failed: {error}")

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


# ==============================================================================
# APP STORE MONITORING ROUTE (Connects React frontend to Appmonitoring.py)
# ==============================================================================
@app.get("/api/app-monitoring")
def get_app_monitoring_data(brand: Optional[str] = Query(None)):
    """
    Called by AppContext.jsx when scanning or selecting a brand from the dropdown.
    Locates the generated discovery file and executes the 5-taxonomy audit engine.
    """
    target = brand.strip() if (brand and brand.strip().lower() not in ["all brands", "all"]) else "Microsoft"

    # Search for discovery file in brand folder or local root
    candidates = [
        Path.cwd() / f"{target}_brand_profile" / "brand_profile_discovery.json",
        Path.cwd() / f"{target}_discovery.json",
        Path.cwd() / "microsoft_discovery.json",
        Path.cwd() / "NovaPay_discovery.json"
    ]

    selected_file = None
    for p in candidates:
        if p.exists():
            selected_file = str(p)
            break

    if not selected_file:
        return {"brand_name": target, "summary": {}, "applications": []}

    try:
        # Runs Appmonitoring.py and returns categorized findings with risk scores
        return run_app_monitoring_audit(selected_file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"App store audit failed: {e}")