import re
from urllib.parse import urlparse
from models.evidence import RiskLevel
from models.investigation import UrlAgentResult

KNOWN_LEGITIMATE_DOMAINS = [
    "microsoft.com", "office.com", "azure.com", "google.com", "gmail.com",
    "paypal.com", "github.com", "apple.com", "amazon.com", "netflix.com",
    "sbi.co.in", "hdfcbank.com", "icicibank.com", "gov.in"
]

SUSPICIOUS_TLDS = [".top", ".xyz", ".club", ".vip", ".work", ".cfd", ".monster", ".click", ".run", ".kim"]

SUSPICIOUS_KEYWORDS = ["login", "verify", "secure", "update", "account", "banking", "billing", "signin", "support", "alert"]

def analyze_url(url: str) -> UrlAgentResult:
    if not url:
        return UrlAgentResult(
            risk=RiskLevel.SAFE,
            domain="N/A",
            is_lookalike=False,
            https_present=True,
            suspicious_tld=False,
            signals=["No URL provided for analysis"],
            score=0
        )
    
    # Normalize URL
    raw_url = url.strip()
    if not raw_url.startswith(("http://", "https://")):
        raw_url = "https://" + raw_url
        
    parsed = urlparse(raw_url)
    domain = parsed.netloc.lower().split(":")[0]
    path = parsed.path.lower()
    
    signals = []
    score = 0
    is_lookalike = False
    https_present = raw_url.startswith("https://")
    suspicious_tld = any(domain.endswith(tld) for tld in SUSPICIOUS_TLDS)

    # 1. HTTPS check
    if not https_present:
        signals.append("Insecure HTTP protocol (no SSL/TLS encryption)")
        score += 20

    # 2. Suspicious TLD
    if suspicious_tld:
        signals.append(f"High-risk TLD detected on domain '{domain}'")
        score += 25

    # 3. Lookalike domain check (homograph / hyphens / typosquatting)
    for legit in KNOWN_LEGITIMATE_DOMAINS:
        legit_base = legit.split('.')[0]
        # Check if legit brand is inside a different domain e.g., microsoft-login-alert.example
        if legit_base in domain and domain != legit and not domain.endswith("." + legit):
            is_lookalike = True
            signals.append(f"Lookalike / Typosquatting domain spoofing '{legit}' in domain '{domain}'")
            score += 45
            break

    # 4. Multi-subdomain / Excessive hyphens
    if domain.count(".") > 2:
        signals.append(f"Excessive subdomain nesting detected ({domain.count('.')} levels)")
        score += 15
        
    if domain.count("-") >= 2:
        signals.append(f"Suspicious hyphenated domain structure ('{domain}')")
        score += 15

    # 5. Phishing keywords in domain/path
    found_keywords = [kw for kw in SUSPICIOUS_KEYWORDS if kw in domain or kw in path]
    if found_keywords:
        signals.append(f"Credential targeting keywords detected: {', '.join(found_keywords)}")
        score += 20

    # 6. IP address as domain
    if re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", domain):
        signals.append("Raw IPv4 address used instead of domain name")
        score += 35

    # Determine Risk Level
    if score >= 60:
        risk = RiskLevel.HIGH
    elif score >= 25:
        risk = RiskLevel.SUSPICIOUS
    else:
        risk = RiskLevel.SAFE
        if not signals:
            signals.append("Domain structure verified against reputation rules")

    return UrlAgentResult(
        risk=risk,
        domain=domain or url,
        is_lookalike=is_lookalike,
        https_present=https_present,
        suspicious_tld=suspicious_tld,
        signals=signals,
        score=min(score, 100)
    )
