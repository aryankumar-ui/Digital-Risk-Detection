
import json
import re
from pathlib import Path
from urllib.parse import urlparse, parse_qs
import time
import requests
from bs4 import BeautifulSoup
from ddgs import DDGS


HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 Chrome/130.0 Safari/537.36"
}

SOCIAL_DOMAINS = {
    "Instagram": ["instagram.com"],
    "Facebook": ["facebook.com", "fb.com"],
    "X": ["x.com", "twitter.com"],
    "LinkedIn": ["linkedin.com"],
    "YouTube": ["youtube.com"],
    "TikTok": ["tiktok.com"],
}

APP_STORES = {
    "Google Play": ["play.google.com"],
    "Apple App Store": ["apps.apple.com", "itunes.apple.com"],
}


def get_domain(url: str) -> str:
    """Return a normalized hostname from a URL."""
    try:
        return urlparse(url).netloc.lower().removeprefix("www.")
    except Exception:
        return ""


def is_valid_url(url: str) -> bool:
    """Accept only HTTP and HTTPS URLs."""
    return url.startswith(("http://", "https://"))





def search_web(query: str, max_results: int = 5) -> list:
    """Search with retries and graceful error handling."""
    for attempt in range(3):
        try:
            with DDGS() as ddgs:
                return list(
                    ddgs.text(query, max_results=max_results)
                )
        except Exception as error:
            message = str(error).lower()

            if "no results found" in message:
                return []

            print(
                f"Search attempt {attempt + 1}/3 failed "
                f"for '{query}': {error}"
            )

            if attempt < 2:
                time.sleep(2 * (attempt + 1))

    return []

def search_category(query: str, category: str) -> list:
    """Collect candidate assets for a specific category."""
    results = []
    seen = set()

    for item in search_web(query):
        url = item.get("href", "").strip()

        if not is_valid_url(url) or url in seen:
            continue

        seen.add(url)

        results.append({
            "category": category,
            "name": item.get("title", ""),
            "url": url,
            "description": item.get("body", ""),
            "verification_status": "unverified_candidate"
        })

    return results


def find_official_website(brand_name: str) -> dict:
    """Find a website candidate and prioritize trusted domain matches."""

    results = search_web(f'"{brand_name}" official website', 10)

    candidates = []

    for item in results:
        url = item.get("href", "").strip()

        if not is_valid_url(url):
            continue

        domain = get_domain(url)

        # Ignore common third-party platforms.
        blocked = [
            "wikipedia.org", "facebook.com", "instagram.com",
            "linkedin.com", "youtube.com", "x.com", "twitter.com",
            "reddit.com", "play.google.com", "apps.apple.com"
        ]

        if any(
            domain == d or domain.endswith("." + d)
            for d in blocked
        ):
            continue

        candidates.append({
            "url": url,
            "domain": domain,
            "title": item.get("title", ""),
            "description": item.get("body", ""),
            "verification_status": "unverified_candidate"
        })

    if not candidates:
        return {
            "url": None,
            "domain": None,
            "title": None,
            "description": None,
            "verification_status": "not_found"
        }

    # If a result uses the brand's known primary domain,
    # prioritize it over unrelated domains.
    known_domains = {
        "apple": "apple.com",
        "nike": "nike.com",
        "samsung": "samsung.com",
        "adidas": "adidas.com",
        "zomato": "zomato.com",
        "tata motors": "tatamotors.com"
    }

    expected_domain = known_domains.get(brand_name.strip().lower())

    if expected_domain:
        for candidate in candidates:
            domain = candidate["domain"]

            if domain == expected_domain or domain.endswith(
                "." + expected_domain
            ):
                return candidate

    return candidates[0]

def extract_website_assets(website_url: str) -> dict:
    """Extract logo candidates, metadata, and contact-domain hints."""
    assets = {
        "logo_candidates": [],
        "website_title": None,
        "website_description": None,
        "email_domains": [],
        "website_fetch_status": "not_attempted"
    }

    if not website_url:
        assets["website_fetch_status"] = "no_website_found"
        return assets

    try:
        response = requests.get(
            website_url,
            headers=HEADERS,
            timeout=12,
            allow_redirects=True
        )
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        assets["website_fetch_status"] = "success"
        assets["website_title"] = (
            soup.title.get_text(" ", strip=True) if soup.title else None
        )

        description = soup.find("meta", attrs={"name": "description"})
        if description:
            assets["website_description"] = description.get("content")

        # Extract logo and site-icon candidates from HTML metadata.
        logo_urls = set()

        for tag in soup.find_all("link"):
            rel = " ".join(tag.get("rel", [])).lower()
            href = tag.get("href")

            if href and any(word in rel for word in
                            ["icon", "apple-touch-icon"]):
                logo_urls.add(requests.compat.urljoin(response.url, href))

        for tag in soup.find_all("meta"):
            prop = (
                tag.get("property", "") + " " +
                tag.get("name", "")
            ).lower()

            content = tag.get("content", "")
            if content and any(word in prop for word in
                               ["og:image", "twitter:image"]):
                logo_urls.add(
                    requests.compat.urljoin(response.url, content)
                )

        for image in soup.find_all("img"):
            src = image.get("src", "")
            alt = image.get("alt", "")
            hint = (src + " " + alt).lower()

            if src and any(word in hint for word in
                           ["logo", "brand", "site-logo"]):
                logo_urls.add(
                    requests.compat.urljoin(response.url, src)
                )

        for logo_url in logo_urls:
            if is_valid_url(logo_url):
                assets["logo_candidates"].append({
                    "image_url": logo_url,
                    "verification_status": "unverified_candidate"
                })

        # Extract email domains as identifier candidates.
        emails = re.findall(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            response.text
        )

        assets["email_domains"] = sorted({
            email.rsplit("@", 1)[-1].lower()
            for email in emails
        })

    except requests.RequestException as error:
        assets["website_fetch_status"] = "failed"
        assets["website_fetch_error"] = str(error)

    return assets


def discover_social_accounts(brand_name: str) -> list:
    """Discover candidate social-media profiles."""
    accounts = []
    seen_urls = set()

    for platform, domains in SOCIAL_DOMAINS.items():
        site_query = " OR ".join(f"site:{domain}" for domain in domains)
        query = f'"{brand_name}" ({site_query})'

        for item in search_web(query, 5):
            url = item.get("href", "").strip()
            domain = get_domain(url)

            if not is_valid_url(url) or url in seen_urls:
                continue

            if not any(
                domain == d or domain.endswith("." + d)
                for d in domains
            ):
                continue

            path_parts = [
                part for part in urlparse(url).path.split("/") if part
            ]

            # Exclude obvious login, help, and generic pages.
            if path_parts and path_parts[0].lower() in {
                "login", "signin", "signup", "help", "about",
                "policies", "privacy", "share", "intent"
            }:
                continue

            seen_urls.add(url)

            accounts.append({
                "platform": platform,
                "platform_url": url,
                "name": item.get("title", ""),
                "handle": path_parts[0] if path_parts else None,
                "bio": item.get("body", ""),
                "is_verified": None,
                "verification_status": "unverified_candidate"
            })

    return accounts


def extract_app_id(url: str, store: str):
    """Extract an app/package identifier from a store URL."""
    parsed = urlparse(url)

    if store == "Google Play":
        return parse_qs(parsed.query).get("id", [None])[0]

    match = re.search(r"/id(\d+)", parsed.path)
    return match.group(1) if match else None


def discover_mobile_apps(brand_name: str) -> list:
    """Search multiple app marketplaces for candidate applications.

    Search results are candidates only. Availability depends on the search engine
    and region; this function does not certify that a listing is official.
    """
    apps = []
    seen_urls = set()

    # Use separate queries for Apple domains because search engines can return
    # different results for apps.apple.com and the older itunes.apple.com domain.
    queries = [
        ("Google Play", f'"{brand_name}" site:play.google.com/store/apps'),
        ("Apple App Store", f'"{brand_name}" site:apps.apple.com'),
        ("Apple App Store", f'"{brand_name}" site:itunes.apple.com'),
        
    ]

    for store, query in queries:
        allowed_domains = APP_STORES.get(store, [])
        for item in search_web(query, 10):
            url = (item.get("href") or item.get("url") or "").strip()
            if not is_valid_url(url):
                continue

            domain = get_domain(url)
            if store == "Other marketplace (needs review)":
                # Keep only likely store/listing URLs; never mark these verified.
                if not any(word in domain for word in (
                    "store", "appgallery", "amazon", "galaxy", "apps.apple.com",
                    "play.google.com", "microsoft.com", "samsung.com"
                )):
                    continue
            elif not any(
                domain == allowed or domain.endswith("." + allowed)
                for allowed in allowed_domains
            ):
                continue

            normalized_url = url.split("#", 1)[0].rstrip("/")
            if normalized_url in seen_urls:
                continue
            seen_urls.add(normalized_url)

            # Infer a stable store label for results returned by broad search.
            detected_store = store
            if store == "Other marketplace (needs review)":
                if domain == "play.google.com" or domain.endswith(".play.google.com"):
                    detected_store = "Google Play"
                elif domain in ("apps.apple.com", "itunes.apple.com"):
                    detected_store = "Apple App Store"
                elif "appgallery.huawei.com" in domain:
                    detected_store = "Huawei AppGallery"
                elif "galaxystore.samsung.com" in domain or domain == "galaxy.store":
                    detected_store = "Samsung Galaxy Store"
                elif domain == "apps.microsoft.com":
                    detected_store = "Microsoft Store"
                else:
                    detected_store = "Other marketplace (needs review)"

            apps.append({
                "store": detected_store,
                "app_name": item.get("title", ""),
                "store_url": url,
                "app_id": extract_app_id(url, detected_store),
                "developer": None,
                "description": item.get("body", ""),
                "verification_status": "unverified_candidate",
                "discovery_query": query,
            })

    return apps


def normalize_domain_input(value: str) -> str:
    """Normalize a user-supplied reference domain or URL."""
    value = (value or "").strip()
    if not value:
        return ""
    if not value.startswith(("http://", "https://")):
        value = "https://" + value
    return get_domain(value)


def domain_matches_reference(candidate_domain: str, reference_domain: str) -> bool:
    """Match a domain safely, avoiding suffix tricks such as brand.com.evil.test."""
    candidate_domain = (candidate_domain or "").lower().removeprefix("www.").strip(".")
    reference_domain = (reference_domain or "").lower().removeprefix("www.").strip(".")
    return bool(candidate_domain and reference_domain and (
        candidate_domain == reference_domain or
        candidate_domain.endswith("." + reference_domain)
    ))


def extract_outbound_links(website_url: str) -> list:
    """Get social/app-store links directly published on the supplied website."""
    if not website_url:
        return []
    try:
        response = requests.get(website_url, headers=HEADERS, timeout=12, allow_redirects=True)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        links = set()
        for anchor in soup.find_all("a", href=True):
            url = requests.compat.urljoin(response.url, anchor["href"].strip())
            if is_valid_url(url):
                domain = get_domain(url)
                if any(domain_matches_reference(domain, d) for d in
                       [d for values in SOCIAL_DOMAINS.values() for d in values] +
                       [d for values in APP_STORES.values() for d in values]):
                    links.add(url.split("#", 1)[0])
        return sorted(links)
    except requests.RequestException:
        return []


def link_is_cross_referenced(candidate_url: str, official_links: list) -> bool:
    """Return true when the official reference site links to this same profile/app URL."""
    candidate = urlparse(candidate_url or "")
    candidate_domain = get_domain(candidate_url or "")
    candidate_path = candidate.path.rstrip("/").lower()
    if not candidate_domain or not candidate_path:
        return False
    for official_url in official_links or []:
        other = urlparse(official_url)
        if get_domain(official_url) == candidate_domain and other.path.rstrip("/").lower() == candidate_path:
            return True
    return False


def discover_brand_profile(brand_name: str,
                           aliases: list = None,
                           reference_website: str = "") -> dict:
    """Build a brand profile from online discovery results."""
    print(f"\nDiscovering brand assets for: {brand_name}")

    print("1. Searching for official website...")
    website = find_official_website(brand_name)
    reference_domain = normalize_domain_input(reference_website)
    if reference_domain:
        # This is a user-supplied reference, not something independently proven by the script.
        matching_result = None
        for result in search_web(f'site:{reference_domain}', 10):
            result_url = result.get("href", "").strip()
            if is_valid_url(result_url) and domain_matches_reference(get_domain(result_url), reference_domain):
                matching_result = {
                    "url": result_url,
                    "domain": get_domain(result_url),
                    "title": result.get("title", ""),
                    "description": result.get("body", ""),
                    "verification_status": "user_supplied_reference_domain"
                }
                break
        website = matching_result or {
            "url": reference_website.strip() if reference_website.strip().startswith(("http://", "https://")) else "https://" + reference_domain,
            "domain": reference_domain,
            "title": None,
            "description": None,
            "verification_status": "user_supplied_reference_domain"
        }

    print("2. Extracting logo and website metadata...")
    website_assets = extract_website_assets(website["url"])

    print("3. Discovering social-media accounts...")
    social_accounts = discover_social_accounts(brand_name)

    print("4. Discovering mobile applications...")
    mobile_apps = discover_mobile_apps(brand_name)

    print("5. Checking cross-links published on the reference website...")
    official_links = extract_outbound_links(website.get("url"))
    for account in social_accounts:
        linked = link_is_cross_referenced(account.get("platform_url", ""), official_links)
        account["linked_from_reference_website"] = linked
        account["verification_status"] = "cross_linked_from_reference_website" if linked else "unverified_candidate"
    for app in mobile_apps:
        linked = link_is_cross_referenced(app.get("store_url", ""), official_links)
        app["linked_from_reference_website"] = linked
        app["verification_status"] = "cross_linked_from_reference_website" if linked else "unverified_candidate"

    discovered_domain = website.get("domain") or get_domain(website.get("url", ""))
    domain_reference_match = bool(reference_domain and domain_matches_reference(discovered_domain, reference_domain))

    identifiers = {
        "primary_domain": website.get("domain"),
        "known_aliases": aliases or [],
        "email_domains_found_on_website": website_assets["email_domains"],
        "known_publishers": ["Verified Publisher Name"],
        "known_social_handles": {
            "Instagram": ["official_handle"],
            "X": ["official_handle"]
        },
        "known_apps": [
            {
        "store": "Google Play",
        "app_id": "verified.package.id",
        "developer": "Verified Publisher Name"
            },
            {
        "store": "Apple App Store",
        "app_id": "123456789",
        "developer": "Verified Publisher Name"
    }
],


        "other_identifiers": []
    }

    profile = {
        "brand_name": brand_name,
        "official_website": website,
        "official_logo": {
            "logo_candidates": website_assets["logo_candidates"],
            "verification_status": "unverified_candidate"
            if website_assets["logo_candidates"] else "not_found"
        },
        "website_metadata": {
            "title": website_assets["website_title"],
            "description": website_assets["website_description"],
            "fetch_status": website_assets["website_fetch_status"]
        },
        "social_accounts": social_accounts,
        "mobile_apps": mobile_apps,
        "brand_identifiers": identifiers,
        "verification_evidence": {
            "user_supplied_reference_domain": reference_domain or None,
            "discovered_domain_matches_reference": domain_reference_match if reference_domain else None,
            "official_website_outbound_links_found": len(official_links),
            "note": "A user-supplied domain is a reference point, not independent proof. Cross-links are supporting evidence, not a guarantee."
        },
        "verification_note": (
            "Search results and extracted assets are candidates, "
            "not confirmed official assets. Review and verify ownership "
            "before using them for threat detection."
        )
    }

    # Create a separate output folder for this company/brand.
    company_folder = make_company_folder(brand_name)
    logo_folder = company_folder / "logos"
    logo_folder.mkdir(parents=True, exist_ok=True)

    print("6. Downloading discovered logo candidates...")
    logo_downloads = download_logo_candidates(
        website_assets["logo_candidates"], logo_folder
    )
    profile["logo_downloads"] = logo_downloads
    profile["trust_assessment"] = assess_profile_trust(profile)
    profile["output_folder"] = str(company_folder)

    filename = company_folder / "brand_profile_discovery.json"
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(profile, file, indent=4, ensure_ascii=False)

    trust_file = company_folder / "trust_report.json"
    with open(trust_file, "w", encoding="utf-8") as file:
        json.dump(profile["trust_assessment"], file, indent=4, ensure_ascii=False)

    print("\nBrand profile discovery completed.")
    print(f"Website candidate: {website.get('url')}")
    print(f"Logo candidates found: {len(website_assets['logo_candidates'])}")
    print(f"Logo files downloaded: {sum(1 for item in logo_downloads if item.get('download_status') == 'downloaded')}")
    print(f"Social accounts found: {len(social_accounts)}")
    print(f"Mobile apps found: {len(mobile_apps)}")
    print(f"Trust status: {profile['trust_assessment']['overall_status']}")
    print(f"Saved results to: {filename}")
    print(f"Saved trust report to: {trust_file}")

    return profile


# -----------------------------------------------------------------------------
# BRAND COMPARISON FUNCTIONS
# Added without removing the existing Brand Profile discovery functionality.
# These functions can be called by the App Store Monitoring module.
# Install extra libraries with: py -3.14 -m pip install pillow imagehash
# -----------------------------------------------------------------------------


def normalize_text(text: str) -> str:
    """Normalize text so small differences in punctuation/capitalization compare."""
    return re.sub(r"[^a-z0-9]", "", (text or "").lower())


def name_similarity(candidate_name: str, official_name: str) -> float:
    """Return a 0-to-1 similarity score for app/brand names."""
    from difflib import SequenceMatcher

    candidate = normalize_text(candidate_name)
    official = normalize_text(official_name)
    if not candidate or not official:
        return 0.0
    return round(SequenceMatcher(None, candidate, official).ratio(), 3)


def compare_logo(official_logo_url: str, candidate_icon_url: str) -> dict:
    """Compare logo/icon appearance using perceptual hashes (screening only)."""
    if not official_logo_url or not candidate_icon_url:
        return {"similarity": None, "status": "logo_url_missing"}

    try:
        import imagehash
        from PIL import Image
        from io import BytesIO

        def load_image(url):
            if not is_valid_url(url):
                raise ValueError("Only HTTP/HTTPS image URLs are supported")
            response = requests.get(url, headers=HEADERS, timeout=10)
            response.raise_for_status()
            return Image.open(BytesIO(response.content)).convert("RGB")

        official_hash = imagehash.phash(load_image(official_logo_url))
        candidate_hash = imagehash.phash(load_image(candidate_icon_url))
        distance = official_hash - candidate_hash
        similarity = round(max(0.0, 1.0 - distance / 64.0), 3)

        return {
            "similarity": similarity,
            "status": "high_similarity_candidate" if similarity >= 0.85 else "review"
        }
    except ImportError:
        return {
            "similarity": None,
            "status": "missing_dependency",
            "message": "Install pillow and imagehash to compare logos."
        }
    except Exception as error:
        return {
            "similarity": None,
            "status": "comparison_unavailable",
            "error": str(error)
        }


def compare_developer(candidate_developer: str, known_publishers: list) -> dict:
    """Compare a candidate app publisher with manually verified publishers."""
    from difflib import SequenceMatcher

    if not candidate_developer:
        return {"developer": None, "status": "developer_unknown"}

    candidate = normalize_text(candidate_developer)
    known = [normalize_text(name) for name in (known_publishers or []) if name]

    if not known:
        return {
            "developer": candidate_developer,
            "status": "publisher_reference_missing"
        }

    if candidate in known:
        status = "known_publisher_match"
    elif any(SequenceMatcher(None, candidate, name).ratio() >= 0.90 for name in known):
        status = "publisher_name_needs_review"
    else:
        status = "publisher_mismatch"

    return {"developer": candidate_developer, "status": status}


def analyze_description(description: str, brand_name: str,
                        official_description: str = "") -> dict:
    """Compare descriptions and flag selected impersonation-related phrases."""
    from difflib import SequenceMatcher

    candidate = (description or "").lower()
    official = (official_description or "").lower()
    similarity = (
        round(SequenceMatcher(None, candidate, official).ratio(), 3)
        if candidate and official else None
    )

    brand_pattern = re.escape((brand_name or "").lower())
    mentions_brand = bool(brand_pattern and re.search(brand_pattern, candidate))

    phrases = [
        "official support", "official app", "authorized partner",
        "claim your reward", "verify your account", "enter your password",
        "unofficial version"
    ]
    matched_phrases = [phrase for phrase in phrases if phrase in candidate]

    return {
        "description_similarity": similarity,
        "mentions_brand": mentions_brand,
        "suspicious_phrases": matched_phrases,
        "status": "review" if matched_phrases or (
            similarity is not None and similarity >= 0.75
        ) else "no_rule_triggered"
    }


def analyze_candidate(candidate: dict, profile: dict) -> dict:
    """Compare a candidate supplied by a monitoring module with a brand profile.

    Expected candidate keys: app_name, icon_url, developer, description.
    No monitoring/search is performed here; the teammate's module supplies data.
    """
    brand_name = profile.get("brand_name", "")
    identifiers = profile.get("brand_identifiers", {})
    known_publishers = identifiers.get("known_publishers", [])
    official_description = profile.get("website_metadata", {}).get("description") or ""

    logo_candidates = profile.get("official_logo", {}).get("logo_candidates", [])
    official_logo_url = next(
        (item.get("image_url") for item in logo_candidates if item.get("image_url")),
        None
    )

    candidate_name = candidate.get("app_name", "")
    score = name_similarity(candidate_name, brand_name)
    logo_result = compare_logo(official_logo_url, candidate.get("icon_url"))
    developer_result = compare_developer(candidate.get("developer"), known_publishers)
    description_result = analyze_description(
        candidate.get("description", ""), brand_name, official_description
    )

    flags = []
    normalized_candidate = normalize_text(candidate_name)
    normalized_brand = normalize_text(brand_name)

    if normalized_candidate and normalized_brand:
          if normalized_candidate == normalized_brand:
             flags.append("exact_brand_name_match")
    elif score >= 0.70:
        flags.append("similar_app_name")
        
    # if score >= 0.70 and normalize_text(candidate_name) != normalize_text(brand_name):
    #     flags.append("similar_app_name")
    if logo_result.get("similarity") is not None and logo_result["similarity"] >= 0.85:
        flags.append("logo_similarity")
    if developer_result["status"] in (
        "publisher_mismatch", "publisher_name_needs_review"
    ):
        flags.append("publisher_review")
    if description_result["status"] == "review":
        flags.append("description_review")

    return {
        "brand_name": brand_name,
        "candidate_app": candidate_name,
        "name_similarity": score,
        "logo_analysis": logo_result,
        "developer_analysis": developer_result,
        "description_analysis": description_result,
        "review_flags": flags,
        "assessment": "needs_review" if flags else "no_rule_triggered",
        "disclaimer": "Screening signals only; flags do not prove impersonation."
    }


def make_company_folder(brand_name: str) -> Path:
    """Create a safe, company-specific output folder in the current directory."""
    slug = re.sub(r"[^A-Za-z0-9._-]+", "_", (brand_name or "brand").strip()).strip("._-")
    if not slug:
        slug = "brand"
    folder = Path.cwd() / f"{slug}_brand_profile"
    folder.mkdir(parents=True, exist_ok=True)
    return folder


def download_logo_candidates(logo_candidates: list, logo_folder: Path) -> list:
    """Download logo candidates to the brand folder; downloaded files remain unverified."""
    results = []
    logo_folder.mkdir(parents=True, exist_ok=True)
    for index, item in enumerate(logo_candidates or [], start=1):
        url = (item or {}).get("image_url", "")
        result = {"source_url": url, "download_status": "failed", "verification_status": "unverified_candidate", "saved_path": None}
        try:
            if not is_valid_url(url):
                raise ValueError("Logo URL is not HTTP/HTTPS")
            response = requests.get(url, headers=HEADERS, timeout=15, stream=True)
            response.raise_for_status()
            content_type = response.headers.get("Content-Type", "").split(";", 1)[0].lower()
            allowed_types = {"image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp", "image/gif": ".gif", "image/svg+xml": ".svg", "image/x-icon": ".ico", "image/vnd.microsoft.icon": ".ico"}
            if content_type not in allowed_types:
                raise ValueError(f"URL did not return a recognized image content type ({content_type or 'unknown'})")
            content_length = response.headers.get("Content-Length")
            if content_length and int(content_length) > 10 * 1024 * 1024:
                raise ValueError("Image exceeds the 10 MB download limit")
            chunks = []
            total = 0
            for chunk in response.iter_content(chunk_size=8192):
                if not chunk:
                    continue
                total += len(chunk)
                if total > 10 * 1024 * 1024:
                    raise ValueError("Image exceeds the 10 MB download limit")
                chunks.append(chunk)
            destination = logo_folder / f"logo_{index:02d}{allowed_types[content_type]}"
            destination.write_bytes(b"".join(chunks))
            result.update({"download_status": "downloaded", "saved_path": str(destination), "content_type": content_type, "bytes": total})
        except Exception as error:
            result["error"] = str(error)
        results.append(result)
    return results


def assess_profile_trust(profile: dict) -> dict:
    """Summarize verification evidence without falsely certifying scraped data."""
    website = profile.get("official_website", {})
    metadata = profile.get("website_metadata", {})
    evidence = profile.get("verification_evidence", {})
    reference_domain = evidence.get("user_supplied_reference_domain")
    domain_match = evidence.get("discovered_domain_matches_reference")
    logo_candidates = profile.get("official_logo", {}).get("logo_candidates", [])
    social_accounts = profile.get("social_accounts", [])
    mobile_apps = profile.get("mobile_apps", [])
    signals = []

    if reference_domain:
        signals.append({
            "signal": "Website matches user-supplied reference domain",
            "result": "MATCH" if domain_match else "MISMATCH",
            "reference_domain": reference_domain,
            "note": "The reference domain must have been checked independently by the user."
        })
    else:
        signals.append({
            "signal": "Official domain",
            "result": "NOT_VERIFIED",
            "note": "Provide a domain you independently confirmed from company-owned materials."
        })

    signals.append({
        "signal": "Website reachable and metadata extracted",
        "result": "PASS" if metadata.get("fetch_status") == "success" else "NOT_CONFIRMED"
    })
    signals.append({
        "signal": "Logo source hosted on reference domain",
        "result": "CHECK_PER_LOGO",
        "details": [
            {
                "image_url": item.get("image_url"),
                "source_domain": get_domain(item.get("image_url", "")),
                "source_domain_matches_reference": bool(reference_domain and domain_matches_reference(get_domain(item.get("image_url", "")), reference_domain)),
                "content_authenticity": "NOT_PROVEN"
            } for item in logo_candidates
        ]
    })
    signals.append({
        "signal": "Social accounts cross-linked from reference website",
        "result": "PARTIAL_SUPPORT",
        "matched_count": sum(1 for item in social_accounts if item.get("linked_from_reference_website")),
        "total_candidates": len(social_accounts)
    })
    signals.append({
        "signal": "App store listings cross-linked from reference website",
        "result": "PARTIAL_SUPPORT",
        "matched_count": sum(1 for item in mobile_apps if item.get("linked_from_reference_website")),
        "total_candidates": len(mobile_apps)
    })
    signals.append({
        "signal": "Legal ownership / publisher identity independently verified",
        "result": "NOT_CHECKED"
    })

    if reference_domain and domain_match and metadata.get("fetch_status") == "success":
        overall_status = "PARTIALLY_VERIFIED - ASSETS STILL NEED REVIEW"
    elif reference_domain and not domain_match:
        overall_status = "DOMAIN MISMATCH - REVIEW REQUIRED"
    else:
        overall_status = "UNVERIFIED - REFERENCE DOMAIN REQUIRED"

    return {
        "overall_status": overall_status,
        "trusted_yes_or_no": "NO - NOT FULLY VERIFIED",
        "trust_score": None,
        "reason": "The script can check domain matches and official-site cross-links, but cannot independently prove legal ownership or that every downloaded logo/listing is authentic.",
        "reference_domain": reference_domain,
        "website_domain_found": website.get("domain") or get_domain(website.get("url", "")) or None,
        "website_fetch_status": metadata.get("fetch_status", "unknown"),
        "logo_candidates_found": len(logo_candidates),
        "social_candidates_found": len(social_accounts),
        "social_accounts_linked_from_reference_website": sum(1 for item in social_accounts if item.get("linked_from_reference_website")),
        "app_candidates_found": len(mobile_apps),
        "apps_linked_from_reference_website": sum(1 for item in mobile_apps if item.get("linked_from_reference_website")),
        "signals": signals,
        "recommended_checks": [
            "Enter only a domain independently confirmed from company-owned documentation, official packaging, or trusted corporate records.",
            "Review every logo file and confirm it matches the logo on the confirmed website.",
            "Treat social/app links published on the reference website as supporting evidence and verify the exact profile or listing.",
            "Check app publisher identity and developer links in the official app store listing.",
            "Do not label an asset fully trusted until a human reviewer records the evidence and approves it."
        ]
    }


# Example integration for a teammate (call this from their App Store Monitoring code):
#
# with open("brand_profile_discovery.json", encoding="utf-8") as file:
#     profile = json.load(file)
# candidate = {
#     "app_name": app.get("name"),
#     "icon_url": app.get("icon_url"),
#     "developer": app.get("developer"),
#     "description": app.get("description")
# }
# result = analyze_candidate(candidate, profile)
# print(json.dumps(result, indent=4))


if __name__ == "__main__":
    brand = input("Enter company/brand name: ").strip()
    if not brand:
        print("Brand name cannot be empty.")
    else:
        aliases_input = input("Enter known brand aliases (comma-separated, optional): ").strip()
        aliases = [alias.strip() for alias in aliases_input.split(",") if alias.strip()]
        reference_website = input(
            "Enter official website/domain you independently confirmed (optional, e.g. nike.com): "
        ).strip()
        discover_brand_profile(brand, aliases, reference_website)
