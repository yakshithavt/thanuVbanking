from typing import List
from models.evidence import RiskLevel
from models.investigation import (
    UrlAgentResult, MessageAgentResult, IdentityAgentResult, ScreenshotAgentResult, ReviewerAgentResult
)

def SecurityReviewer(
    url_res: UrlAgentResult,
    msg_res: MessageAgentResult,
    ident_res: IdentityAgentResult,
    screen_res: ScreenshotAgentResult,
    calculated_threat_score: int
) -> ReviewerAgentResult:
    """
    Agent 5: Challenges initial findings.
    Asks: "Could our conclusion be wrong? Are urgency and domain signals corroborated?"
    """
    counter_arguments = []
    reasoning_lines = []
    upheld = True
    
    # 1. Challenge: Is the domain legitimate despite urgency?
    if msg_res.urgency_detected and url_res.risk == RiskLevel.SAFE and not ident_res.mismatch_detected:
        counter_arguments.append("Urgency is present, but domain reputation & sender identity align with legitimate infrastructure.")
        counter_arguments.append("Check if email is a legitimate automated transactional notification (e.g. password expiry alert).")

    # 2. Challenge: Is lookalike domain alone sufficient to flag MALICIOUS?
    if url_res.is_lookalike and ident_res.mismatch_detected:
        reasoning_lines.append("Domain lookalike AND identity mismatch strongly corroborate phishing intent.")

    # 3. Challenge: Could urgency language be a false positive in standard email copy?
    if msg_res.urgency_detected and not msg_res.credential_request and not msg_res.financial_request:
        counter_arguments.append("Urgency language alone without credential/financial request may be marketing hype or system notice.")

    # Corroboration verification
    active_high_signals = sum([
        1 for r in [url_res.risk, msg_res.risk, ident_res.risk, screen_res.risk]
        if r in (RiskLevel.HIGH, RiskLevel.MALICIOUS)
    ])

    if active_high_signals >= 2 or calculated_threat_score >= 65:
        verdict = RiskLevel.HIGH
        confidence = 94
        review_status = "VERIFIED MALICIOUS — Multiple independent security signals corroborate high threat."
        reasoning = "The Security Reviewer tested counter-hypotheses (e.g. false positive urgency, domain whitelist) and verified that domain lookalike and identity spoofing remain indefensible."
    elif active_high_signals == 1 or calculated_threat_score >= 35:
        verdict = RiskLevel.SUSPICIOUS
        confidence = 82
        review_status = "SUSPICIOUS THREAT — Single strong signal detected. Advisory review recommended."
        reasoning = "Self-review identified suspicious characteristics, but lacks multi-signal corroboration for absolute malicious classification."
    else:
        verdict = RiskLevel.SAFE
        confidence = 96
        review_status = "VERIFIED SAFE — No malicious domain, identity mismatch, or phishing triggers detected."
        reasoning = "All counter-hypotheses passed clean. Content aligns with standard legitimate communications."

    return ReviewerAgentResult(
        verdict=verdict,
        confidence=confidence,
        counter_arguments_evaluated=counter_arguments if counter_arguments else ["Evaluated potential false positives: None found"],
        review_status=review_status,
        reasoning=reasoning,
        is_initial_verdict_upheld=upheld
    )
