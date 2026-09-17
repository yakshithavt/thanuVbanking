from typing import List, Tuple
from models.evidence import RiskLevel
from models.investigation import (
    UrlAgentResult, MessageAgentResult, IdentityAgentResult, ScreenshotAgentResult
)

def calculate_overall_threat(
    url_res: UrlAgentResult,
    msg_res: MessageAgentResult,
    ident_res: IdentityAgentResult,
    screen_res: ScreenshotAgentResult
) -> Tuple[int, RiskLevel, List[str], str]:
    """
    Weighted threat score calculation (0-100) and rationale compiler.
    """
    # Weights: URL 35%, Identity 30%, Message 25%, Screenshot 10%
    score = int(
        (url_res.score * 0.35) +
        (ident_res.score * 0.30) +
        (msg_res.score * 0.25) +
        (screen_res.score * 0.10)
    )

    # Amplification if multiple high risk signals overlap
    high_count = sum(1 for r in [url_res.risk, msg_res.risk, ident_res.risk, screen_res.risk] if r == RiskLevel.HIGH)
    if high_count >= 2:
        score = max(score, 88)

    summary_why = []
    if url_res.is_lookalike:
        summary_why.append(f"Lookalike spoof domain detected: '{url_res.domain}'")
    elif url_res.signals and url_res.score > 15:
        summary_why.append(url_res.signals[0])

    if ident_res.mismatch_detected:
        summary_why.append(f"Claimed organization '{ident_res.claimed_brand}' mismatch with domain '{ident_res.detected_domain}'")

    if msg_res.urgency_detected:
        summary_why.append("High-pressure urgency language & account threat detected")
    if msg_res.credential_request:
        summary_why.append("Direct credential harvester pattern detected")
    if msg_res.financial_request:
        summary_why.append("Unverified financial fee / payment request")

    if not summary_why:
        summary_why = ["All security heuristics evaluated clean. Domain structure and copy verified."]

    # Risk level determination
    if score >= 65:
        overall_verdict = RiskLevel.HIGH
        recommended_action = (
            "🚨 CRITICAL SECURITY ADVISORY:\n"
            "• Do NOT click links or enter passwords/credentials.\n"
            "• Do NOT send any payments or processing fees.\n"
            "• Report this message to your security team or mail provider immediately."
        )
    elif score >= 30:
        overall_verdict = RiskLevel.SUSPICIOUS
        recommended_action = (
            "⚠️ CAUTION ADVISED:\n"
            "• Verify sender identity through an official external channel.\n"
            "• Avoid entering credentials or personal data without verifying URL SSL certificate."
        )
    else:
        overall_verdict = RiskLevel.SAFE
        recommended_action = (
            "✅ SAFE CONTENT:\n"
            "• No threat signals found. Content appears legitimate.\n"
            "• Standard security awareness practices still apply."
        )

    return min(score, 100), overall_verdict, summary_why, recommended_action
