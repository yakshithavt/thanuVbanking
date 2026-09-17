import uuid
import datetime
from models.investigation import InvestigationRequest, InvestigationResponse
from agents.url_agent import analyze_url
from agents.message_agent import analyze_message
from agents.identity_agent import analyze_identity
from agents.screenshot_agent import analyze_screenshot
from agents.reviewer_agent import SecurityReviewer
from services.threat_engine import calculate_overall_threat
from services.evidence_service import build_evidence_vault

def run_investigation(req: InvestigationRequest, screenshot_bytes: bytes = None) -> InvestigationResponse:
    investigation_id = f"INV-{uuid.uuid4().hex[:8].upper()}"
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    timeline_steps = []

    # Timeline step 1: Investigation Started
    timeline_steps.append({
        "step": 1,
        "title": "Investigation Started",
        "agent": "System Orchestrator",
        "status": "COMPLETED",
        "detail": f"Target content submitted for threat investigation (ID: {investigation_id})"
    })

    # Step 2: URL Agent
    url_res = analyze_url(req.url or "")
    timeline_steps.append({
        "step": 2,
        "title": "URL & Domain Analysis",
        "agent": "Agent 1 — URL Investigator",
        "status": "COMPLETED",
        "risk": url_res.risk,
        "detail": f"Domain: '{url_res.domain}' | Risk: {url_res.risk} | Score: {url_res.score}/100"
    })

    # Step 3: Message Agent
    msg_res = analyze_message(req.message_text or "")
    timeline_steps.append({
        "step": 3,
        "title": "Social Engineering & Copy Analysis",
        "agent": "Agent 2 — Message Investigator",
        "status": "COMPLETED",
        "risk": msg_res.risk,
        "detail": f"Urgency: {msg_res.urgency_detected} | Credential Prompt: {msg_res.credential_request}"
    })

    # Step 4: Identity Agent
    ident_res = analyze_identity(req.claimed_sender, url_res.domain, req.message_text or "")
    timeline_steps.append({
        "step": 4,
        "title": "Identity & Impersonation Audit",
        "agent": "Agent 3 — Identity Agent",
        "status": "COMPLETED",
        "risk": ident_res.risk,
        "detail": f"Claimed Brand: '{ident_res.claimed_brand}' | Mismatch: {ident_res.mismatch_detected}"
    })

    # Step 5: Screenshot Agent (if screenshot provided)
    if screenshot_bytes:
        extracted_text, extracted_urls = extract_text_and_urls_from_image(screenshot_bytes)
        screen_res = analyze_screenshot(extracted_text, extracted_urls)
    else:
        screen_res = analyze_screenshot("", [])
        
    timeline_steps.append({
        "step": 5,
        "title": "OCR & Visual Artifact Scan",
        "agent": "Agent 4 — Screenshot Investigator",
        "status": "COMPLETED",
        "risk": screen_res.risk,
        "detail": f"Extracted URLs: {len(screen_res.extracted_urls)} | Confidence: {screen_res.ocr_confidence}%"
    })

    # Calculate initial threat correlation
    initial_threat_score, initial_verdict, summary_why, recommended_action = calculate_overall_threat(
        url_res, msg_res, ident_res, screen_res
    )

    # Step 6: Security Reviewer (Verification Loop)
    reviewer_res = SecurityReviewer(
        url_res, msg_res, ident_res, screen_res, initial_threat_score
    )

    timeline_steps.append({
        "step": 6,
        "title": "Security Reviewer Verification Loop",
        "agent": "Agent 5 — Security Reviewer",
        "status": "COMPLETED",
        "risk": reviewer_res.verdict,
        "detail": f"Review Status: '{reviewer_res.review_status}' | Verdict Upheld: {reviewer_res.is_initial_verdict_upheld}"
    })

    # Build Evidence Cards
    evidence_vault = build_evidence_vault(url_res, msg_res, ident_res, screen_res, reviewer_res)

    return InvestigationResponse(
        investigation_id=investigation_id,
        timestamp=timestamp,
        threat_score=initial_threat_score,
        overall_verdict=reviewer_res.verdict,
        url_result=url_res,
        message_result=msg_res,
        identity_result=ident_res,
        screenshot_result=screen_res,
        reviewer_result=reviewer_res,
        evidence_vault=evidence_vault,
        summary_why=summary_why,
        recommended_action=recommended_action,
        timeline_steps=timeline_steps
    )
