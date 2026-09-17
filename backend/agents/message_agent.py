import re
from models.evidence import RiskLevel
from models.investigation import MessageAgentResult

URGENCY_PATTERNS = [
    r"\burgent\b", r"\bimmediat(ely|e)\b", r"\bwithin \d+ (hours|minutes|days)\b",
    r"\baccount suspended\b", r"\baction required\b", r"\bfinal notice\b",
    r"\bverify now\b", r"\bterminate\b", r"\bblocked\b", r"\blimited access\b"
]

CREDENTIAL_PATTERNS = [
    r"\bverify (your )?(account|password|identity|credentials)\b",
    r"\bclick (here|below) to (login|sign in|verify)\b",
    r"\benter (your )?(pin|password|otp|ssn)\b",
    r"\blogin required\b"
]

FINANCIAL_PATTERNS = [
    r"\bpay ₹?\d+\b", r"\bfee\b", r"\bpayment required\b", r"\bwire transfer\b",
    r"\bgift card\b", r"\bprocessing fee\b", r"\brefund pending\b", r"\bwin\b", r"\bprize\b"
]

THREAT_PATTERNS = [
    r"\bwill be (suspended|deleted|charged|prosecuted)\b",
    r"\blegal action\b", r"\bpolice\b", r"\barrest\b", r"\bpenalty\b"
]

def analyze_message(message_text: str) -> MessageAgentResult:
    if not message_text:
        return MessageAgentResult(
            risk=RiskLevel.SAFE,
            urgency_detected=False,
            credential_request=False,
            financial_request=False,
            threat_detected=False,
            signals=["No message content provided"],
            score=0
        )
    
    text = message_text.lower()
    signals = []
    score = 0
    
    urgency = any(re.search(p, text) for p in URGENCY_PATTERNS)
    credentials = any(re.search(p, text) for p in CREDENTIAL_PATTERNS)
    financial = any(re.search(p, text) for p in FINANCIAL_PATTERNS)
    threat = any(re.search(p, text) for p in THREAT_PATTERNS)

    if urgency:
        signals.append("Urgency / Pressure tactics detected ('Account suspension' or 'Immediate action')")
        score += 25

    if credentials:
        signals.append("Credential harvester pattern: Direct prompt for login / verification")
        score += 35

    if financial:
        signals.append("Financial request / Fee demand detected")
        score += 30

    if threat:
        signals.append("Coercive threat language detected ('legal action', 'account block')")
        score += 25

    # Job / Internship scam heuristics
    if "internship" in text or "job offer" in text:
        if financial:
            signals.append("Job / Internship scam signal: Unofficial fee payment requested for employment")
            score += 30

    # Risk level determination
    if score >= 55:
        risk = RiskLevel.HIGH
    elif score >= 25:
        risk = RiskLevel.SUSPICIOUS
    else:
        risk = RiskLevel.SAFE
        if not signals:
            signals.append("Message language analyzed clean with standard non-coercive tone")

    return MessageAgentResult(
        risk=risk,
        urgency_detected=urgency,
        credential_request=credentials,
        financial_request=financial,
        threat_detected=threat,
        signals=signals,
        score=min(score, 100)
    )
