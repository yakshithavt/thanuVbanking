# Venkathanu.Ai — Autonomous Digital Threat Investigator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Google Antigravity](https://img.shields.io/badge/Development-Google_Antigravity-4285F4?logo=google)](https://antigravity.google)

> **"Don't just detect the threat. Investigate it."**

**Venkathanu.Ai** investigates suspicious emails, URLs, messages, and screenshots using multiple specialized AI security agents, gathers forensic evidence, challenges its own conclusion through a self-verification loop, and produces an explainable threat verdict.

---

## 🎯 The Problem

Users daily face:
-  phishing emails & fake security alerts
- fake bank SMS & UPI payment traps
- malicious lookalike URLs
- fake job/internship offer scams with fee demands
- QR-code scams & AI-generated social-engineering attacks

Existing chatbots and binary spam detectors simply return *"This looks like phishing"*. Ordinary users cannot understand **WHY** something is dangerous or what evidence supports that claim.

**Venkathanu.Ai** solves this by running an investigation, collecting forensic evidence cards, challenging its own conclusion, and providing actionable safety steps.

---

## 💡 Core Innovation — The Verification Loop

AI doesn't get to trust its first answer. Instead:

```
             USER SUBMISSION
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
      URL / Link          Message / Email / Screenshot
         │                   │
         └─────────┬─────────┘
                   ▼
       🔎 INVESTIGATION STREAM
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
     URL        Message     Identity
    Agent        Agent       Agent
       │           │           │
       └───────────┼───────────┘
                   ▼
         Evidence Collection
                   │
                   ▼
         Threat Correlation
                   │
                   ▼
       🧠 SECURITY REVIEWER (AGENT 5)
                   │
     "Could our conclusion be wrong?"
     (Evaluate False Positives & Counter-Evidence)
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
     CONFIRMED           ADJUSTED
         │                   │
         └─────────┬─────────┘
                   ▼
            FINAL VERDICT
      (SAFE / SUSPICIOUS / MALICIOUS)
                   │
                   ▼
          🔐 EVIDENCE VAULT
       WHY + EVIDENCE CARDS + ACTION
```

---

## 🧠 The 5 Specialized AI Security Agents

| Agent | Name | Role & Function |
|---|---|---|
| **Agent 1** | 🔗 **URL Investigator** | Analyzes URL subdomains, lookalike homograph attacks, TLD safety, HTTPS, and login paths. |
| **Agent 2** | 📧 **Message Investigator** | Scans copy for urgency triggers, account suspension threats, fee demands, and credential harvesters. |
| **Agent 3** | 🪪 **Identity Agent** | Compares claimed organization (e.g., Microsoft, SBI, Google) against sender domain infrastructure. |
| **Agent 4** | 🖼️ **Screenshot OCR Agent** | Extracts embedded text and URLs from uploaded image screenshots via PyTesseract OCR. |
| **Agent 5** | 🧠 **Security Reviewer** | **The Core Innovation**: Challenges initial agent findings (*"Is urgency alone sufficient?"*, *"Could domain be whitelisted?"*). |

---

## 🔐 Evidence Vault & Result Screen

Every threat signal generates a structured Evidence Card inside the **Evidence Vault**:

```
┌────────────────────────────────────────────────────────┐
│ 🔴 EVIDENCE #EVID-001                                  │
│ Type: Domain & Infrastructure Analysis                 │
│ Signal: Lookalike / Typosquatting domain spoofing      │
│ Claimed Brand: Microsoft                               │
│ Observed Domain: microsoft-security-login-alert.top   │
│ Source: Agent 1 — URL Investigator                     │
│ Confidence: 94%                                        │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Quickstart & Installation Guide

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Clone & Set Up Backend

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
FastAPI server will launch on `http://localhost:8000`.

### 2. Set Up Frontend

```bash
cd frontend
npm install
npm run dev
```
React Vite application will launch on `http://localhost:3000`.

### 3. Or Run with Docker Compose

```bash
docker-compose up --build
```

---

## ⚡ 1-Click Hackathon Demo Suite

Venkathanu.Ai includes 3 pre-configured scenarios to demonstrate system capabilities:

1. 🔴 **Fake Microsoft Security Alert (Phishing)**: Lookalike domain + account suspension threat + credential harvester -> **HIGH RISK (Score 94/100)**.
2. 🟡 **Fake Internship Fee Scam**: Employment impersonation + mandatory fee payment -> **SUSPICIOUS (Score 78/100)**.
3. 🟢 **Legitimate GitHub Notification**: Authentic domain + standard notification copy -> **SAFE (Score 0/100)**.

---

## 🤖 Antigravity Custom Development Agents

This repository includes custom agent definitions in `.agents/agents/` to enable developer workflow orchestration inside Google Antigravity:

- `.agents/agents/frontend-builder.md`: React & Tailwind UI enhancement
- `.agents/agents/backend-builder.md`: FastAPI & agent pipeline tuning
- `.agents/agents/security-reviewer.md`: Defensive security audit
- `.agents/agents/test-engineer.md`: Pytest & build validation
- `.agents/agents/demo-validator.md`: Demo scenario verification

---

## 📁 Repository Structure

```
venkathanu-ai/
│
├── frontend/                 # React + Vite + Tailwind CSS + Lucide Icons + Recharts
│   ├── src/
│   │   ├── components/       # ThreatScoreMeter, InvestigationTimeline, EvidenceVault, SecurityReviewerPanel
│   │   ├── App.jsx           # Dashboard & Navigation hub
│   │   └── index.css         # Cyber glassmorphic dark theme CSS
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # FastAPI Multi-Agent Engine
│   ├── main.py               # API endpoints (/api/investigate, /api/scenarios)
│   ├── agents/               # 5 AI Security Agents
│   ├── services/             # Orchestrator, Threat Engine, Evidence Vault
│   ├── models/               # Pydantic schemas
│   └── tests/                # Pytest unit test suite
│
├── demo_data/                # Attack scenario JSON test suites
├── .agents/agents/           # Custom Antigravity development agents
├── docker-compose.yml
├── push_to_github.bat        # 1-click GitHub deployment script
└── README.md
```

---

## 📤 Push to GitHub Repository

To push this codebase to your target GitHub repository (`https://github.com/yakshithavt/thanuVbanking`):

Double-click `push_to_github.bat` or run:

```bash
git init
git branch -M main
git add .
git commit -m "feat: initial commit for Venkathanu.Ai Autonomous Digital Threat Investigator"
git remote add origin https://github.com/yakshithavt/thanuVbanking.git
git push -u origin main --force
```

---

## 📜 License
Licensed under the [MIT License](LICENSE).
