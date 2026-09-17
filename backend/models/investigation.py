from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from models.evidence import EvidenceCard, RiskLevel

class InvestigationRequest(BaseModel):
    url: Optional[str] = None
    message_text: Optional[str] = None
    claimed_sender: Optional[str] = None
    scenario_id: Optional[str] = None

class UrlAgentResult(BaseModel):
    risk: RiskLevel
    domain: str
    is_lookalike: bool
    https_present: bool
    suspicious_tld: bool
    signals: List[str]
    score: int

class MessageAgentResult(BaseModel):
    risk: RiskLevel
    urgency_detected: bool
    credential_request: bool
    financial_request: bool
    threat_detected: bool
    signals: List[str]
    score: int

class IdentityAgentResult(BaseModel):
    risk: RiskLevel
    claimed_brand: Optional[str]
    detected_domain: Optional[str]
    mismatch_detected: bool
    signals: List[str]
    score: int

class ScreenshotAgentResult(BaseModel):
    risk: RiskLevel
    extracted_text: str
    extracted_urls: List[str]
    ocr_confidence: int
    signals: List[str]
    score: int

class ReviewerAgentResult(BaseModel):
    verdict: RiskLevel
    confidence: int
    counter_arguments_evaluated: List[str]
    review_status: str
    reasoning: str
    is_initial_verdict_upheld: bool

class InvestigationResponse(BaseModel):
    investigation_id: str
    timestamp: str
    threat_score: int
    overall_verdict: RiskLevel
    url_result: Optional[UrlAgentResult] = None
    message_result: Optional[MessageAgentResult] = None
    identity_result: Optional[IdentityAgentResult] = None
    screenshot_result: Optional[ScreenshotAgentResult] = None
    reviewer_result: ReviewerAgentResult
    evidence_vault: List[EvidenceCard]
    summary_why: List[str]
    recommended_action: str
    timeline_steps: List[Dict[str, Any]]
