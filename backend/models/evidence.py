from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class RiskLevel(str, Enum):
    MALICIOUS = "MALICIOUS"
    HIGH = "HIGH"
    SUSPICIOUS = "SUSPICIOUS"
    SAFE = "SAFE"
    UNKNOWN = "UNKNOWN"

class EvidenceType(str, Enum):
    DOMAIN = "Domain / URL"
    MESSAGE = "Social Engineering"
    IDENTITY = "Impersonation / Spoofing"
    SCREENSHOT = "Visual Artifact / OCR"
    SECURITY_REVIEW = "Security Verification"

class EvidenceCard(BaseModel):
    id: str
    evidence_type: EvidenceType
    title: str
    signal: str
    claimed_brand: Optional[str] = None
    observed_data: str
    source_agent: str
    confidence: int = Field(ge=0, le=100)
    severity: RiskLevel
    description: str
