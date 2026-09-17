from agents.url_agent import analyze_url
from agents.message_agent import analyze_message
from agents.identity_agent import analyze_identity
from agents.reviewer_agent import SecurityReviewer
from models.evidence import RiskLevel
from services.threat_engine import calculate_overall_threat

def test_url_agent_lookalike():
    res = analyze_url("https://microsoft-security-login-alert.example-domain.top/verify")
    assert res.is_lookalike == True
    assert res.risk == RiskLevel.HIGH

def test_message_agent_urgency():
    res = analyze_message("URGENT! Your bank account will be suspended within 24 hours unless you verify password.")
    assert res.urgency_detected == True
    assert res.credential_request == True
    assert res.risk == RiskLevel.HIGH

def test_identity_agent_mismatch():
    res = analyze_identity("Microsoft Security", "example-security-login.top", "URGENT password alert")
    assert res.mismatch_detected == True
    assert res.risk == RiskLevel.HIGH

def test_security_reviewer_loop():
    url_res = analyze_url("https://microsoft-security-login-alert.example-domain.top/verify")
    msg_res = analyze_message("URGENT! Account suspended.")
    ident_res = analyze_identity("Microsoft", "example-security-login.top")
    from agents.screenshot_agent import analyze_screenshot
    screen_res = analyze_screenshot("", [])
    
    score, overall_verdict, _, _ = calculate_overall_threat(url_res, msg_res, ident_res, screen_res)
    rev_res = SecurityReviewer(url_res, msg_res, ident_res, screen_res, score)
    
    assert rev_res.verdict == RiskLevel.HIGH
    assert rev_res.confidence >= 90
