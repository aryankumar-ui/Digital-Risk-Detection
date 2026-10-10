import os
import json
import re
import difflib
from io import BytesIO
from pathlib import Path
import requests

try:
    from google_play_scraper import search as gplay_search
except ImportError:
    gplay_search = None

try:
    from PIL import Image
except ImportError:
    Image = None


# ==============================================================================
# 1. BASELINE INGESTION FROM DISCOVERY JSON
# ==============================================================================

def load_brand_baseline(discovery_json_path: str) -> dict:
    """Parses your teammate's discovery JSON to establish the legitimate baseline."""
    path = Path(discovery_json_path)
    if not path.exists():
        raise FileNotFoundError(f"Reference JSON not found at: {discovery_json_path}")

    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    brand_name = data.get("brand_name", "").strip()
    official_play_ids = set()
    official_apple_ids = set()
    trusted_developers = set()

    for app in data.get("mobile_apps", []):
        app_id = str(app.get("app_id") or "").strip()
        store = str(app.get("store") or "").lower()

        if not app_id or app_id == "None":
            continue

        if "google" in store or "play" in store:
            if not app_id.isdigit() and " " not in app_id:
                official_play_ids.add(app_id)
        elif "apple" in store or "app store" in store:
            official_apple_ids.add(app_id)

    # Authorized publisher entities
    trusted_developers.add(f"{brand_name.lower()} corporation")
    trusted_developers.add(f"{brand_name.lower()} llc")
    trusted_developers.add(f"{brand_name.lower()} inc")
    trusted_developers.add(f"{brand_name.lower()} mobile")
    trusted_developers.add(brand_name.lower())

    # Find logo from local path or URL
    logo_path = None
    for item in data.get("logo_downloads", []):
        p = item.get("saved_path")
        if p and os.path.exists(p):
            logo_path = p
            break

    return {
        "brand_name": brand_name,
        "primary_domain": data.get("brand_identifiers", {}).get("primary_domain", ""),
        "official_play_ids": official_play_ids,
        "official_apple_ids": official_apple_ids,
        "trusted_developers": trusted_developers,
        "logo_path": logo_path
    }


# ==============================================================================
# 2. LOOK-ALIKE DETECTION & PERMUTATIONS (BONUS FEATURE)
# ==============================================================================

def generate_targeted_search_queries(brand: str) -> list[str]:
    """Generates search seeds for character swaps, spacing, and added keywords."""
    b = brand.strip()
    queries = {b}

    high_risk_words = ["Support", "Login", "Authenticator", "Rewards", "Security", "Care", "Pay", "Wallet"]
    for word in high_risk_words:
        queries.add(f"{b} {word}")

    if len(b) > 4:
        mid = len(b) // 2
        queries.add(f"{b[:mid]} {b[mid:]}")  # Spacing
        queries.add(b[:3] + b[4:])           # Omission / Swap
        queries.add(b + b[-1])               # Double character

    return list(queries)


def evaluate_name_lookalike(title: str, brand: str) -> tuple[bool, str, int]:
    t_clean = title.lower()
    b_clean = brand.lower()

    if b_clean in t_clean:
        return True, f"Contains protected trademark '{brand}'", 30

    spaced_pattern = r"\b" + r"\s+".join(list(b_clean)) + r"\b"
    if re.search(spaced_pattern, t_clean):
        return True, "Delimiter/spacing alteration detected", 35

    words = re.findall(r"[a-z0-9]+", t_clean)
    for word in words:
        if abs(len(word) - len(b_clean)) <= 2:
            ratio = difflib.SequenceMatcher(None, word, b_clean).ratio()
            if 0.78 <= ratio < 1.0:
                return True, f"Character swap: '{word}' resembles '{brand}' ({round(ratio*100)}% match)", 35

    return False, "", 0


# ==============================================================================
# 3. VISUAL / LOGO HASH COMPARISON
# ==============================================================================

def compute_dhash_bits(image: Image.Image) -> list[int]:
    img = image.convert("L").resize((9, 8), Image.Resampling.LANCZOS)
    pixels = list(img.getdata())
    bits = []
    for y in range(8):
        for x in range(8):
            bits.append(1 if pixels[y * 9 + x] > pixels[y * 9 + x + 1] else 0)
    return bits


def evaluate_logo_theft(master_logo_path: str, candidate_icon_url: str) -> tuple[float, bool]:
    if not Image or not master_logo_path or not candidate_icon_url:
        return 0.0, False
    try:
        master_img = Image.open(master_logo_path)
        master_bits = compute_dhash_bits(master_img)

        resp = requests.get(candidate_icon_url, timeout=3, headers={"User-Agent": "Mozilla/5.0"})
        resp.raise_for_status()
        cand_img = Image.open(BytesIO(resp.content))
        cand_bits = compute_dhash_bits(cand_img)

        matches = sum(a == b for a, b in zip(master_bits, cand_bits))
        similarity = (matches / len(master_bits)) * 100.0
        return round(similarity, 1), similarity >= 84.0
    except Exception:
        return 0.0, False


# ==============================================================================
# 4. STORE INGESTION
# ==============================================================================

def ingest_google_play_apps(queries: list[str]) -> list[dict]:
    apps = []
    seen = set()
    if not gplay_search:
        return apps

    for q in queries:
        try:
            results = gplay_search(q, n_hits=10)
            for item in results:
                aid = item.get("appId")
                if not aid or aid in seen:
                    continue
                seen.add(aid)
                apps.append({
                    "platform": "Google Play",
                    "app_title": item.get("title", "Unknown"),
                    "app_id": aid,
                    "developer": item.get("developer", "Unknown"),
                    "icon_url": item.get("icon", ""),
                    "description": item.get("description", ""),
                    "store_url": f"https://play.google.com/store/apps/details?id={aid}"
                })
        except Exception:
            continue
    return apps


def ingest_apple_apps(queries: list[str]) -> list[dict]:
    apps = []
    seen = set()
    endpoint = "https://itunes.apple.com/search"

    for q in queries:
        try:
            resp = requests.get(endpoint, params={"term": q, "entity": "software", "limit": 10}, timeout=8)
            for item in resp.json().get("results", []):
                aid = str(item.get("trackId") or "")
                if not aid or aid in seen:
                    continue
                seen.add(aid)
                apps.append({
                    "platform": "Apple App Store",
                    "app_title": item.get("trackName", "Unknown"),
                    "app_id": aid,
                    "bundle_id": item.get("bundleId", ""),
                    "developer": item.get("artistName", "Unknown"),
                    "icon_url": item.get("artworkUrl100", ""),
                    "description": item.get("description", ""),
                    "store_url": item.get("trackViewUrl", "")
                })
        except Exception:
            continue
    return apps


# ==============================================================================
# 5. MULTI-TAXONOMY AUDIT ENGINE (THREAT, MALICIOUS, SCAM, FRAUD, SUSPICIOUS)
# ==============================================================================

# Differentiated keyword dictionaries
SCAM_SIGNALS = [
    "urgent update", "verify account", "kyc update", "login issue",
    "password reset", "claim reward", "airdrop", "customer support whatsapp",
    "official helpline", "recovery key", "otp"
]

FRAUD_SIGNALS = [
    "instant loan", "wire transfer", "fast cash", "crypto investment",
    "deposit bonus", "guaranteed profit", "free gift card", "billing claim",
    "refund processing", "payment gateway helper"
]

MALICIOUS_SIGNALS = [
    "download apk", "sideload", "root required", "accessibility service",
    "bypass verification", "hack tool", "modded version", "sms permission",
    "track phone", "stealth mode", "telegram bot download"
]

def analyze_app_candidate(app: dict, baseline: dict) -> dict:
    app_id = app["app_id"]
    platform = app["platform"]
    title = app["app_title"]
    dev = app["developer"].strip()
    desc = app.get("description", "").lower()

    # --- 1. WHITELIST FILTER (Zero False Positives) ---
    is_whitelisted_id = (
        (platform == "Google Play" and app_id in baseline["official_play_ids"]) or
        (platform == "Apple App Store" and app_id in baseline["official_apple_ids"])
    )
    is_whitelisted_dev = dev.lower() in baseline["trusted_developers"]

    if is_whitelisted_id or is_whitelisted_dev:
        return {
            **app,
            "classification": "GENUINE / OFFICIAL",
            "taxonomy_tags": ["AUTHENTIC"],
            "risk_score": 0,
            "severity": "SAFE",
            "violations": ["Matched official Brand Profile whitelist."],
            "investigation_replay": [
                {"step": "Cross-referenced with Brand Profile SSOT", "delta": "0", "current_risk": 0},
                {"step": "Verified authentic corporate asset", "delta": "0", "current_risk": 0}
            ]
        }

    # --- 2. MULTI-SIGNAL ANALYSIS ---
    current_risk = 20  # Baseline
    replay = [{"step": "Baseline threat scan initiated", "delta": "+20", "current_risk": current_risk}]
    violations = []
    taxonomy_tags = []

    # Check Name & Lookalike
    is_lookalike, name_detail, name_points = evaluate_name_lookalike(title, baseline["brand_name"])
    if is_lookalike:
        current_risk += name_points
        violations.append(f"Name Match: {name_detail}")
        replay.append({"step": f"Look-alike name detected ({name_detail})", "delta": f"+{name_points}", "current_risk": current_risk})
        taxonomy_tags.append("LOOKALIKE_NAME")

    # Check Developer Mismatch
    if not is_whitelisted_dev and is_lookalike:
        current_risk += 30
        violations.append(f"Publisher Mismatch: '{dev}' is not an authorized publisher")
        replay.append({"step": f"Unauthorized developer identity: '{dev}'", "delta": "+30", "current_risk": current_risk})
        taxonomy_tags.append("UNAUTHORIZED_PUBLISHER")

    # Check Logo Impersonation
    logo_sim, is_logo_theft = evaluate_logo_theft(baseline["logo_path"], app.get("icon_url"))
    if is_logo_theft:
        current_risk += 30
        violations.append(f"Visual Theft: Icon has {logo_sim}% visual hash similarity to master logo")
        replay.append({"step": f"Visual logo imitation detected ({logo_sim}%)", "delta": "+30", "current_risk": current_risk})
        taxonomy_tags.append("VISUAL_IMPERSONATION")

    # --- Taxonomy Behavioral Pattern Matching ---
    # Malicious Signals Check
    matched_malicious = [kw for kw in MALICIOUS_SIGNALS if kw in desc]
    if matched_malicious:
        current_risk += 25
        violations.append(f"Malicious Indicators: Detected suspicious payload/access patterns {matched_malicious}")
        replay.append({"step": f"Malicious permission/sideload indicators: {matched_malicious}", "delta": "+25", "current_risk": current_risk})
        taxonomy_tags.append("MALICIOUS")

    # Scam / Phishing Check
    matched_scam = [kw for kw in SCAM_SIGNALS if kw in desc]
    if matched_scam:
        current_risk += 20
        violations.append(f"Scam Engineering: Phishing & fake verification hooks {matched_scam}")
        replay.append({"step": f"Social engineering & scam hooks: {matched_scam}", "delta": "+20", "current_risk": current_risk})
        taxonomy_tags.append("SCAM")

    # Fraud / Financial Check
    matched_fraud = [kw for kw in FRAUD_SIGNALS if kw in desc]
    if matched_fraud:
        current_risk += 20
        violations.append(f"Fraud Indicators: Unregulated financial/transaction claims {matched_fraud}")
        replay.append({"step": f"Financial fraud/transaction flags: {matched_fraud}", "delta": "+20", "current_risk": current_risk})
        taxonomy_tags.append("FRAUD")

    final_score = min(current_risk, 100)

    # --- 3. PRECISE TAXONOMY CLASSIFICATION ---
    # Priority classification based on explicit indicators
    if "MALICIOUS" in taxonomy_tags:
        classification = "MALICIOUS APP"
        severity = "CRITICAL"
    elif "FRAUD" in taxonomy_tags and ("LOOKALIKE_NAME" in taxonomy_tags or "VISUAL_IMPERSONATION" in taxonomy_tags):
        classification = "FRAUD"
        severity = "CRITICAL"
    elif "SCAM" in taxonomy_tags and ("LOOKALIKE_NAME" in taxonomy_tags or "VISUAL_IMPERSONATION" in taxonomy_tags):
        classification = "SCAM"
        severity = "CRITICAL"
    elif final_score >= 65:
        classification = "BRAND THREAT"
        severity = "HIGH"
    elif final_score >= 35:
        classification = "SUSPICIOUS"
        severity = "MEDIUM"
    else:
        classification = "UNRELATED / LOW RISK"
        severity = "LOW"

    return {
        **app,
        "classification": classification,
        "taxonomy_tags": taxonomy_tags,
        "risk_score": final_score,
        "severity": severity,
        "violations": violations if violations else ["No actionable risk indicators."],
        "investigation_replay": replay
    }


# ==============================================================================
# 6. ORCHESTRATION PIPELINE
# ==============================================================================

def run_app_monitoring_audit(discovery_json_path: str) -> dict:
    baseline = load_brand_baseline(discovery_json_path)
    brand = baseline["brand_name"]

    queries = generate_targeted_search_queries(brand)
    play_apps = ingest_google_play_apps(queries)
    apple_apps = ingest_apple_apps(queries)
    all_candidates = play_apps + apple_apps

    results = [analyze_app_candidate(app, baseline) for app in all_candidates]

    # Explicit taxonomy summary metrics
    summary = {
        "total_analyzed": len(results),
        "genuine_official_count": sum(1 for r in results if r["classification"] == "GENUINE / OFFICIAL"),
        "malicious_count": sum(1 for r in results if r["classification"] == "MALICIOUS APP"),
        "fraud_count": sum(1 for r in results if r["classification"] == "FRAUD"),
        "scam_count": sum(1 for r in results if r["classification"] == "SCAM"),
        "brand_threat_count": sum(1 for r in results if r["classification"] == "BRAND THREAT"),
        "suspicious_review_count": sum(1 for r in results if r["classification"] == "SUSPICIOUS"),
        "unrelated_low_risk_count": sum(1 for r in results if r["classification"] == "UNRELATED / LOW RISK")
    }

    return {
        "brand_name": brand,
        "official_domain": baseline["primary_domain"],
        "summary": summary,
        "applications": results
    }


if __name__ == "__main__":
    # Test execution pointing to your discovery JSON
    JSON_FILE = "NovaPay_discovery.json"
    audit_report = run_app_monitoring_audit(JSON_FILE)

    print("\n--- APP STORE AUDIT TAXONOMY SUMMARY ---")
    print(json.dumps(audit_report["summary"], indent=2))

    with open("app_monitoring_final_audit.json", "w", encoding="utf-8") as out:
        json.dump(audit_report, out, indent=4)
    print("\n[+] Full report saved to 'app_monitoring_final_audit.json'")