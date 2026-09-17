from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import json

from models.investigation import InvestigationRequest, InvestigationResponse
from services.orchestrator import run_investigation

app = FastAPI(
    title="Venkathanu.Ai — Autonomous Digital Threat Investigator API",
    description="Multi-Agent Threat Intelligence Engine & Self-Verifying Security Reviewer",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEMO_SCENARIOS = {
    "microsoft_phishing": {
        "id": "microsoft_phishing",
        "title": "🔴 Fake Microsoft Security Alert (Phishing)",
        "type": "Malicious Phishing Email",
        "url": "https://microsoft-security-login-alert.example-domain.top/verify-account",
        "claimed_sender": "Microsoft Security Team <security@microsoft-security-login-alert.example>",
        "message_text": (
            "URGENT ATTENTION REQUIRED!\n\n"
            "Your Microsoft 365 Business Account has been flagged for suspicious login activity. "
            "Your account access will be PERMANENTLY SUSPENDED within 24 hours unless you verify your password credentials immediately.\n\n"
            "Click here to resolve and verify: https://microsoft-security-login-alert.example-domain.top/verify-account"
        )
    },
    "job_scam": {
        "id": "job_scam",
        "title": "🟡 Fake Internship / Job Offer Fee Scam",
        "type": "Suspicious Internship Scam",
        "url": "https://internship-portal-verify.click/pay-fee",
        "claimed_sender": "Google Careers HR <hr@internship-portal-verify.click>",
        "message_text": (
            "Congratulations! Your application for the Summer AI Engineering Internship has been shortlisted.\n\n"
            "To confirm your seat and receive your offer letter, please pay a mandatory verification badge fee of ₹499 within 6 hours.\n\n"
            "Pay fee immediately at: https://internship-portal-verify.click/pay-fee"
        )
    },
    "safe_github": {
        "id": "safe_github",
        "title": "🟢 Legitimate GitHub Notification",
        "type": "Safe Notification",
        "url": "https://github.com/notifications",
        "claimed_sender": "GitHub <notifications@github.com>",
        "message_text": (
            "Hi developer,\n\n"
            "A pull request #42 in your repository 'venkathanu-ai' has been successfully approved by reviewer.\n"
            "You can review the diff and merge when ready.\n\n"
            "View pull request: https://github.com/notifications"
        )
    }
}

@app.get("/")
def read_root():
    return {
        "app": "Venkathanu.Ai",
        "role": "Autonomous Digital Threat Investigator",
        "status": "ONLINE",
        "agents": [
            "Agent 1 — URL Investigator",
            "Agent 2 — Message Investigator",
            "Agent 3 — Identity Agent",
            "Agent 4 — Screenshot Investigator",
            "Agent 5 — Security Reviewer"
        ]
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "engine": "multi-agent-v1"}

@app.get("/api/scenarios")
def get_scenarios():
    return list(DEMO_SCENARIOS.values())

@app.post("/api/investigate", response_model=InvestigationResponse)
def investigate_threat(req: InvestigationRequest):
    # Check if a scenario ID was passed
    if req.scenario_id and req.scenario_id in DEMO_SCENARIOS:
        sc = DEMO_SCENARIOS[req.scenario_id]
        req.url = req.url or sc["url"]
        req.message_text = req.message_text or sc["message_text"]
        req.claimed_sender = req.claimed_sender or sc["claimed_sender"]

    return run_investigation(req)

@app.post("/api/investigate/upload", response_model=InvestigationResponse)
async def investigate_screenshot(
    file: UploadFile = File(...),
    claimed_sender: Optional[str] = Form(None)
):
    contents = await file.read()
    req = InvestigationRequest(
        url="",
        message_text="Uploaded screenshot for visual threat investigation",
        claimed_sender=claimed_sender
    )
    return run_investigation(req, screenshot_bytes=contents)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
