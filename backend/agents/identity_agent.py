import re
from typing import Optional
from models.evidence import RiskLevel
from models.investigation import IdentityAgentResult

BRAND_DOMAIN_MAPPING = {
    "microsoft": ["microsoft.com", "office.com", "azure.com", "live.com", "outlook.com"],
    "google": ["google.com", "gmail.com"],
    "paypal": ["paypal.com", "paypal-service.com"],
    "apple": ["apple.com", "icloud.com"],
    "amazon": ["amazon.com", "aws.amazon.com"],
    "netflix": ["netflix.com"],
    "sbi": ["sbi.co.in", "onlinesbi.sbi"],
    "hdfc": ["hdfcbank.com"],
    "icici": ["icicibank.com"],
    "github": ["github.com"]
}

def analyze_identity(claimed_sender: Optional[str], detected_domain: str, message_text: str = "") -> IdentityAgentResult:
    signals = []
    score = 0
    mismatch_detected = False
    detected_brand = None

    # Try to infer claimed brand from claimed_sender or message_text
    search_space = f"{claimed_sender or ''} {message_text}".lower()
    
    for brand in BRAND_DOMAIN_MAPPING.keys():
        if brand in search_space:
            detected_brand = brand.capitalize()
            break

    if detected_brand and detected_domain and detected_domain != "N/A":
        valid_domains = BRAND_DOMAIN_MAPPING[detected_brand.lower()]
        
        # Check if detected_domain matches any valid domains for brand
        matches = any(detected_domain == vd or detected_domain.endswith("." + vd) for vd in valid_domains)
        
        if not matches:
            mismatch_detected = True
            signals.append(
                f"IDENTITY MISMATCH: Claimed Brand '{detected_brand}' does NOT align with sender domain '{detected_domain}'"
            )
            score += 55
        else:
            signals.append(f"Identity Verified: Sender domain '{detected_domain}' matches authentic '{detected_brand}' infrastructure")

    elif claimed_sender:
        signals.append(f"Sender identified as '{claimed_sender}'")
    else:
        signals.append("No explicit organization claim provided")

    if mismatch_detected:
        risk = RiskLevel.HIGH
    elif score >= 25:
        risk = RiskLevel.SUSPICIOUS
    else:
        risk = RiskLevel.SAFE

    return IdentityAgentResult(
        risk=risk,
        claimed_brand=detected_brand or (claimed_sender if claimed_sender else "Unknown"),
        detected_domain=detected_domain,
        mismatch_detected=mismatch_detected,
        signals=signals,
        score=min(score, 100)
    )
