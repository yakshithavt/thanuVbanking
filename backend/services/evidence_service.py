from typing import List
from models.evidence import EvidenceCard, EvidenceType, RiskLevel
from models.investigation import (
    UrlAgentResult, MessageAgentResult, IdentityAgentResult, ScreenshotAgentResult, ReviewerAgentResult
)

def build_evidence_vault(
    url_res: UrlAgentResult,
    msg_res: MessageAgentResult,
    ident_res: IdentityAgentResult,
    screen_res: ScreenshotAgentResult,
    rev_res: ReviewerAgentResult
) -> List[EvidenceCard]:
    cards = []
    card_idx = 1

    # 1. URL Evidence
    if url_res.signals and url_res.score > 0:
        cards.append(EvidenceCard(
            id=f"EVID-00{card_idx}",
            evidence_type=EvidenceType.DOMAIN,
            title="Domain & Infrastructure Analysis",
            signal=url_res.signals[0] if url_res.signals else "Lookalike Domain Signal",
            claimed_brand=ident_res.claimed_brand,
            observed_data=url_res.domain,
            source_agent="Agent 1 — URL Investigator",
            confidence=94 if url_res.is_lookalike else 80,
            severity=url_res.risk,
            description=f"Domain '{url_res.domain}' evaluated with HTTPS={url_res.https_present}. Signals: {'; '.join(url_res.signals)}"
        ))
        card_idx += 1

    # 2. Message Evidence
    if msg_res.signals and msg_res.score > 0:
        cards.append(EvidenceCard(
            id=f"EVID-00{card_idx}",
            evidence_type=EvidenceType.MESSAGE,
            title="Social Engineering & Coercion Patterns",
            signal=msg_res.signals[0] if msg_res.signals else "Urgency & Credential Prompt",
            claimed_brand=ident_res.claimed_brand,
            observed_data="High-pressure wording / credential request",
            source_agent="Agent 2 — Message Investigator",
            confidence=88,
            severity=msg_res.risk,
            description=f"Analyzed content copy. Urgency={msg_res.urgency_detected}, Credential Prompt={msg_res.credential_request}, Financial Request={msg_res.financial_request}."
        ))
        card_idx += 1

    # 3. Identity Evidence
    if ident_res.signals and ident_res.score > 0:
        cards.append(EvidenceCard(
            id=f"EVID-00{card_idx}",
            evidence_type=EvidenceType.IDENTITY,
            title="Brand Impersonation & Identity Verification",
            signal="Identity / Domain Mismatch" if ident_res.mismatch_detected else "Identity Signal",
            claimed_brand=ident_res.claimed_brand,
            observed_data=f"Claimed: {ident_res.claimed_brand} | Domain: {ident_res.detected_domain}",
            source_agent="Agent 3 — Identity Agent",
            confidence=95 if ident_res.mismatch_detected else 85,
            severity=ident_res.risk,
            description=f"Brand alignment audit comparing claimed organization against sending domain infrastructure."
        ))
        card_idx += 1

    # 4. Screenshot Evidence
    if screen_res.signals and screen_res.score > 0:
        cards.append(EvidenceCard(
            id=f"EVID-00{card_idx}",
            evidence_type=EvidenceType.SCREENSHOT,
            title="OCR Visual Artifact Extraction",
            signal=screen_res.signals[0] if screen_res.signals else "Visual Artifact",
            claimed_brand=ident_res.claimed_brand,
            observed_data=f"Extracted {len(screen_res.extracted_urls)} URL(s) from image",
            source_agent="Agent 4 — Screenshot Investigator",
            confidence=screen_res.ocr_confidence,
            severity=screen_res.risk,
            description=f"Extracted text: '{screen_res.extracted_text[:120]}...'"
        ))
        card_idx += 1

    # 5. Security Review Evidence
    cards.append(EvidenceCard(
        id=f"EVID-00{card_idx}",
        evidence_type=EvidenceType.SECURITY_REVIEW,
        title="Security Reviewer Self-Verification Loop",
        signal=rev_res.review_status,
        claimed_brand=ident_res.claimed_brand,
        observed_data=f"Confidence: {rev_res.confidence}%",
        source_agent="Agent 5 — Security Reviewer",
        confidence=rev_res.confidence,
        severity=rev_res.verdict,
        description=f"Security Reviewer counter-arguments tested: {'; '.join(rev_res.counter_arguments_evaluated)}"
    ))

    return cards
