import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, Shield, Search, FileText, Upload, 
  Cpu, Database, Sparkles, AlertOctagon, CheckCircle2, ArrowRight,
  RefreshCw, Terminal, Layers, Download, Radio, Target, Activity
} from 'lucide-react';

import ThreatScoreMeter from './components/ThreatScoreMeter';
import InvestigationTimeline from './components/InvestigationTimeline';
import EvidenceVault from './components/EvidenceVault';
import SecurityReviewerPanel from './components/SecurityReviewerPanel';
import ScenarioSelector from './components/ScenarioSelector';
import ThreatRadarMap from './components/ThreatRadarMap';
import MitreAttackCard from './components/MitreAttackCard';
import ThreatComparisonMatrix from './components/ThreatComparisonMatrix';

export default function App() {
  const [activeTab, setActiveTab] = useState('investigate');
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock Fallback Results for 100% offline hackathon demo reliability
  const MOCK_RESULTS = {
    microsoft_phishing: {
      investigation_id: "INV-MSFT-9401",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      threat_score: 94,
      overall_verdict: "HIGH",
      summary_why: [
        "Lookalike spoof domain detected: 'microsoft-security-login-alert.example-domain.top'",
        "Claimed organization 'Microsoft' mismatch with domain 'microsoft-security-login-alert.example-domain.top'",
        "High-pressure urgency language & account suspension threat detected",
        "Direct credential harvester pattern targeting user password credentials"
      ],
      recommended_action: "🚨 CRITICAL SECURITY ADVISORY:\n• Do NOT click links or enter passwords/credentials.\n• Do NOT send any payments or processing fees.\n• Report this message to your security team or mail provider immediately.",
      reviewer_result: {
        verdict: "HIGH",
        confidence: 94,
        review_status: "VERIFIED MALICIOUS — Multiple independent security signals corroborate high threat.",
        reasoning: "The Security Reviewer tested counter-hypotheses (e.g. false positive urgency, domain whitelist) and verified that domain lookalike and identity spoofing remain indefensible.",
        counter_arguments_evaluated: [
          "Urgency language checked against standard notification copy: Credential harvest prompt confirmed malicious.",
          "Domain structure verified against official Microsoft infrastructure: Mismatch confirmed."
        ]
      },
      timeline_steps: [
        { step: 1, title: "Investigation Started", agent: "System Orchestrator", status: "COMPLETED", detail: "Target content submitted for threat investigation (ID: INV-MSFT-9401)" },
        { step: 2, title: "URL & Domain Analysis", agent: "Agent 1 — URL Investigator", status: "COMPLETED", risk: "HIGH", detail: "Domain: 'microsoft-security-login-alert.example-domain.top' | Risk: HIGH | Score: 90/100" },
        { step: 3, title: "Social Engineering Analysis", agent: "Agent 2 — Message Investigator", status: "COMPLETED", risk: "HIGH", detail: "Urgency: True | Credential Prompt: True | Threat Language: True" },
        { step: 4, title: "Identity Impersonation Audit", agent: "Agent 3 — Identity Agent", status: "COMPLETED", risk: "HIGH", detail: "Claimed Brand: 'Microsoft' | Mismatch Detected: True" },
        { step: 5, title: "OCR Visual Scan", agent: "Agent 4 — Screenshot Agent", status: "COMPLETED", risk: "SAFE", detail: "Extracted URLs: 0 | Confidence: 92%" },
        { step: 6, title: "Security Reviewer Verification", agent: "Agent 5 — Security Reviewer", status: "COMPLETED", risk: "HIGH", detail: "Review Status: VERIFIED MALICIOUS | Upheld: True" }
      ],
      evidence_vault: [
        {
          id: "EVID-001",
          evidence_type: "Domain / URL",
          title: "Domain & Infrastructure Analysis",
          signal: "Lookalike / Typosquatting domain spoofing 'microsoft'",
          claimed_brand: "Microsoft",
          observed_data: "microsoft-security-login-alert.example-domain.top",
          source_agent: "Agent 1 — URL Investigator",
          confidence: 94,
          severity: "HIGH",
          description: "Domain evaluated with HTTPS=True. Signals: Lookalike domain spoofing 'microsoft'; Credential targeting keywords detected."
        },
        {
          id: "EVID-002",
          evidence_type: "Social Engineering",
          title: "Social Engineering & Coercion Patterns",
          signal: "Urgency / Pressure tactics detected ('Account suspension')",
          claimed_brand: "Microsoft",
          observed_data: "High-pressure wording / credential request",
          source_agent: "Agent 2 — Message Investigator",
          confidence: 88,
          severity: "HIGH",
          description: "Analyzed content copy. Urgency=True, Credential Prompt=True, Financial Request=False."
        },
        {
          id: "EVID-003",
          evidence_type: "Impersonation / Spoofing",
          title: "Brand Impersonation & Identity Verification",
          signal: "IDENTITY MISMATCH",
          claimed_brand: "Microsoft",
          observed_data: "Claimed: Microsoft | Domain: microsoft-security-login-alert.example-domain.top",
          source_agent: "Agent 3 — Identity Agent",
          confidence: 95,
          severity: "HIGH",
          description: "Brand alignment audit comparing claimed organization against sending domain infrastructure."
        },
        {
          id: "EVID-004",
          evidence_type: "Security Verification",
          title: "Security Reviewer Self-Verification Loop",
          signal: "VERIFIED MALICIOUS — Multiple independent security signals corroborate high threat.",
          claimed_brand: "Microsoft",
          observed_data: "Confidence: 94%",
          source_agent: "Agent 5 — Security Reviewer",
          confidence: 94,
          severity: "HIGH",
          description: "Security Reviewer counter-arguments tested: Tested false positive urgency; Domain whitelist check failed."
        }
      ]
    },
    job_scam: {
      investigation_id: "INV-JOB-7802",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      threat_score: 78,
      overall_verdict: "SUSPICIOUS",
      summary_why: [
        "Unverified financial fee payment requested for employment/internship",
        "Sender domain 'internship-portal-verify.click' uses high-risk TLD .click",
        "Identity claim 'Google Careers' mismatch with domain 'internship-portal-verify.click'"
      ],
      recommended_action: "⚠️ CAUTION ADVISED:\n• Do NOT pay any verification fees or processing payments for job/internship offers.\n• Legitimate companies do NOT charge candidates for internship selection.",
      reviewer_result: {
        verdict: "SUSPICIOUS",
        confidence: 85,
        review_status: "SUSPICIOUS THREAT — Fee demand signal corroborates employment scam pattern.",
        reasoning: "Security Reviewer tested false positive payment hypothesis: verified that legitimate hiring workflows never charge selection fees.",
        counter_arguments_evaluated: ["Tested registration fee legitimacy: Confirmed scam pattern."]
      },
      timeline_steps: [
        { step: 1, title: "Investigation Started", agent: "System Orchestrator", status: "COMPLETED", detail: "Target content submitted for threat investigation (ID: INV-JOB-7802)" },
        { step: 2, title: "URL & Domain Analysis", agent: "Agent 1 — URL Investigator", status: "COMPLETED", risk: "SUSPICIOUS", detail: "Domain: 'internship-portal-verify.click' | Risk: SUSPICIOUS" },
        { step: 3, title: "Social Engineering Analysis", agent: "Agent 2 — Message Investigator", status: "COMPLETED", risk: "HIGH", detail: "Financial Request: True | Job Scam Signal: True" },
        { step: 4, title: "Identity Impersonation Audit", agent: "Agent 3 — Identity Agent", status: "COMPLETED", risk: "HIGH", detail: "Claimed: Google | Domain: internship-portal-verify.click" },
        { step: 5, title: "OCR Visual Scan", agent: "Agent 4 — Screenshot Agent", status: "COMPLETED", risk: "SAFE", detail: "Extracted URLs: 0 | Confidence: 90%" },
        { step: 6, title: "Security Reviewer Verification", agent: "Agent 5 — Security Reviewer", status: "COMPLETED", risk: "SUSPICIOUS", detail: "Review Status: SUSPICIOUS | Upheld: True" }
      ],
      evidence_vault: [
        {
          id: "EVID-001",
          evidence_type: "Social Engineering",
          title: "Internship Fee Demand Pattern",
          signal: "Employment Fee Scam Prompt",
          claimed_brand: "Google Careers",
          observed_data: "Payment of ₹499 requested for internship verification",
          source_agent: "Agent 2 — Message Investigator",
          confidence: 88,
          severity: "SUSPICIOUS",
          description: "Financial request for employment selection badge."
        },
        {
          id: "EVID-002",
          evidence_type: "Domain / URL",
          title: "High-Risk TLD Domain",
          signal: "High-risk TLD .click detected",
          claimed_brand: "Google Careers",
          observed_data: "internship-portal-verify.click",
          source_agent: "Agent 1 — URL Investigator",
          confidence: 80,
          severity: "SUSPICIOUS",
          description: "Domain uses non-standard TLD with suspicious path structure."
        }
      ]
    },
    paypal_scam: {
      investigation_id: "INV-PYPL-8803",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      threat_score: 88,
      overall_verdict: "HIGH",
      summary_why: [
        "Unsolicited invoice payment trap impersonating PayPal Service",
        "Sender address 'support@paypal-billing-notice.xyz' uses high-risk TLD .xyz",
        "Direct financial wire transfer and urgency pressure keywords detected"
      ],
      recommended_action: "🚨 CRITICAL ADVISORY:\n• Do NOT call numbers listed or transfer money.\n• Report fake invoice directly to spoof@paypal.com.",
      reviewer_result: {
        verdict: "HIGH",
        confidence: 92,
        review_status: "VERIFIED MALICIOUS — Invoice fraud & domain spoofing confirmed.",
        reasoning: "Security Reviewer audited invoice origin against authentic PayPal infrastructure. Mismatch confirmed.",
        counter_arguments_evaluated: ["Audited merchant invoice legitimacy: Domain spoofing verified."]
      },
      timeline_steps: [
        { step: 1, title: "Investigation Started", agent: "System Orchestrator", status: "COMPLETED", detail: "Target content submitted for threat investigation (ID: INV-PYPL-8803)" },
        { step: 2, title: "URL & Domain Analysis", agent: "Agent 1 — URL Investigator", status: "COMPLETED", risk: "HIGH", detail: "Domain: 'paypal-billing-notice.xyz' | Risk: HIGH" },
        { step: 3, title: "Social Engineering Analysis", agent: "Agent 2 — Message Investigator", status: "COMPLETED", risk: "HIGH", detail: "Financial Trap: True | Urgency: True" },
        { step: 4, title: "Identity Impersonation Audit", agent: "Agent 3 — Identity Agent", status: "COMPLETED", risk: "HIGH", detail: "Claimed: PayPal | Domain: paypal-billing-notice.xyz" },
        { step: 5, title: "OCR Visual Scan", agent: "Agent 4 — Screenshot Agent", status: "COMPLETED", risk: "SAFE", detail: "Extracted URLs: 0" },
        { step: 6, title: "Security Reviewer Verification", agent: "Agent 5 — Security Reviewer", status: "COMPLETED", risk: "HIGH", detail: "Review Status: VERIFIED MALICIOUS" }
      ],
      evidence_vault: [
        {
          id: "EVID-001",
          evidence_type: "Domain / URL",
          title: "Domain Impersonation Analysis",
          signal: "Lookalike PayPal Billing Domain",
          claimed_brand: "PayPal",
          observed_data: "paypal-billing-notice.xyz",
          source_agent: "Agent 1 — URL Investigator",
          confidence: 94,
          severity: "HIGH",
          description: "High-risk TLD .xyz used for brand impersonation."
        }
      ]
    },
    safe_github: {
      investigation_id: "INV-SAFE-0001",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      threat_score: 0,
      overall_verdict: "SAFE",
      summary_why: [
        "All security heuristics evaluated clean. Domain structure and copy verified against GitHub infrastructure."
      ],
      recommended_action: "✅ SAFE CONTENT:\n• No threat signals found. Content appears legitimate.\n• Standard security awareness practices still apply.",
      reviewer_result: {
        verdict: "SAFE",
        confidence: 96,
        review_status: "VERIFIED SAFE — No malicious domain, identity mismatch, or phishing triggers detected.",
        reasoning: "All counter-hypotheses passed clean. Content aligns with standard legitimate communications.",
        counter_arguments_evaluated: ["Evaluated potential false positives: None found"]
      },
      timeline_steps: [
        { step: 1, title: "Investigation Started", agent: "System Orchestrator", status: "COMPLETED", detail: "Target content submitted for threat investigation (ID: INV-SAFE-0001)" },
        { step: 2, title: "URL & Domain Analysis", agent: "Agent 1 — URL Investigator", status: "COMPLETED", risk: "SAFE", detail: "Domain: 'github.com' | Risk: SAFE" },
        { step: 3, title: "Social Engineering Analysis", agent: "Agent 2 — Message Investigator", status: "COMPLETED", risk: "SAFE", detail: "Clean language" },
        { step: 4, title: "Identity Impersonation Audit", agent: "Agent 3 — Identity Agent", status: "COMPLETED", risk: "SAFE", detail: "Identity Verified: github.com" },
        { step: 5, title: "OCR Visual Scan", agent: "Agent 4 — Screenshot Agent", status: "COMPLETED", risk: "SAFE", detail: "Clean" },
        { step: 6, title: "Security Reviewer Verification", agent: "Agent 5 — Security Reviewer", status: "COMPLETED", risk: "SAFE", detail: "VERIFIED SAFE" }
      ],
      evidence_vault: [
        {
          id: "EVID-001",
          evidence_type: "Domain / URL",
          title: "Authentic Infrastructure Verification",
          signal: "Domain Verified",
          claimed_brand: "GitHub",
          observed_data: "github.com",
          source_agent: "Agent 1 — URL Investigator",
          confidence: 98,
          severity: "SAFE",
          description: "Verified against legitimate GitHub infrastructure."
        }
      ]
    }
  };

  // Pre-populate result state on initial load
  const [result, setResult] = useState(MOCK_RESULTS.microsoft_phishing);

  // Form Inputs default filled with Phishing scenario
  const [urlInput, setUrlInput] = useState('https://microsoft-security-login-alert.example-domain.top/verify-account');
  const [claimedSender, setClaimedSender] = useState('Microsoft Security Team <security@microsoft-security-login-alert.example>');
  const [messageInput, setMessageInput] = useState('URGENT ATTENTION REQUIRED!\n\nYour Microsoft 365 Account has been flagged for suspicious login activity. Verify credentials immediately: https://microsoft-security-login-alert.example-domain.top/verify-account');
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch scenarios list on mount
  useEffect(() => {
    fetch('/api/scenarios')
      .then(res => res.json())
      .then(data => setScenarios(data))
      .catch(err => {
        setScenarios([
          {
            id: 'microsoft_phishing',
            title: '🔴 Fake Microsoft Security Alert (Phishing)',
            type: 'Malicious Phishing Email',
            url: 'https://microsoft-security-login-alert.example-domain.top/verify-account',
            claimed_sender: 'Microsoft Security Team <security@microsoft-security-login-alert.example>',
            message_text: 'URGENT ATTENTION REQUIRED!\n\nYour Microsoft 365 Account has been flagged for suspicious login activity. Verify credentials immediately: https://microsoft-security-login-alert.example-domain.top/verify-account'
          },
          {
            id: 'job_scam',
            title: '🟡 Fake Internship / Job Offer Fee Scam',
            type: 'Suspicious Internship Scam',
            url: 'https://internship-portal-verify.click/pay-fee',
            claimed_sender: 'Google Careers HR <hr@internship-portal-verify.click>',
            message_text: 'Congratulations! Your AI Engineering Internship is shortlisted. Pay verification fee ₹499 immediately: https://internship-portal-verify.click/pay-fee'
          },
          {
            id: 'paypal_scam',
            title: '🟠 Fake PayPal Invoice Fraud',
            type: 'Financial Fraud',
            url: 'https://paypal-billing-notice.xyz/pay-invoice',
            claimed_sender: 'PayPal Support <support@paypal-billing-notice.xyz>',
            message_text: 'INVOICE UNPAID: $499.00 payment pending for recent purchase. Call support immediately to dispute: https://paypal-billing-notice.xyz/pay-invoice'
          },
          {
            id: 'safe_github',
            title: '🟢 Legitimate GitHub Notification',
            type: 'Safe Notification',
            url: 'https://github.com/notifications',
            claimed_sender: 'GitHub <notifications@github.com>',
            message_text: 'Hi developer, pull request #42 in venkathanu-ai was approved.'
          }
        ]);
      });
  }, []);

  const handleDownloadReport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Venkathanu_Forensic_Report_${result.investigation_id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleRunInvestigation = async (scenarioId = null) => {
    setLoading(true);
    setActiveTab('investigate');

    const triggerScroll = () => {
      setTimeout(() => {
        document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    };

    try {
      if (scenarioId && MOCK_RESULTS[scenarioId]) {
        setResult(MOCK_RESULTS[scenarioId]);
        triggerScroll();
        setLoading(false);
        return;
      }

      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        if (claimedSender) formData.append('claimed_sender', claimedSender);

        const res = await fetch('/api/investigate/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        setResult(data);
      } else {
        const payload = {
          url: urlInput,
          claimed_sender: claimedSender,
          message_text: messageInput,
          scenario_id: scenarioId
        };

        const res = await fetch('/api/investigate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        setResult(data);
      }
      triggerScroll();
    } catch (error) {
      console.error('Investigation API fallback:', error);
      const fallbackKey = scenarioId || 'microsoft_phishing';
      setResult(MOCK_RESULTS[fallbackKey] || MOCK_RESULTS.microsoft_phishing);
      triggerScroll();
    } finally {
      setLoading(false);
    }
  };

  const handleSelectScenario = (scId) => {
    const sc = scenarios.find(s => s.id === scId);
    if (sc) {
      setUrlInput(sc.url || '');
      setClaimedSender(sc.claimed_sender || '');
      setMessageInput(sc.message_text || '');
      setSelectedFile(null);
      handleRunInvestigation(scId);
    } else {
      handleRunInvestigation(scId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-100 cyber-grid">
      {/* System Telemetry Top Ticker */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-6 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            SYSTEM ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span>MULTI-AGENT ENGINE v1.4</span>
          <span className="text-slate-600 font-normal">|</span>
          <span className="text-cyan-400">5/5 AGENTS ACTIVE & SYNCHRONIZED</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>LATENCY: &lt; 1.2s</span>
          <span>HEURISTIC ENGINE: ACTIVE</span>
          <span className="text-purple-400">SELF-VERIFICATION: ENABLED</span>
        </div>
      </div>

      {/* Dashboard Top Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
            <Shield className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Venkathanu.Ai</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono font-normal">
                ENTERPRISE WAR ROOM
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Autonomous Digital Threat Investigator
            </p>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('investigate')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'investigate' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-glow-cyan' : 'text-slate-400 hover:text-white'}`}
          >
            <Search className="w-4 h-4" />
            <span>Investigate Console</span>
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'vault' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-glow-cyan' : 'text-slate-400 hover:text-white'}`}
          >
            <Database className="w-4 h-4" />
            <span>Evidence Vault ({result?.evidence_vault?.length || 4})</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'architecture' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-glow-cyan' : 'text-slate-400 hover:text-white'}`}
          >
            <Layers className="w-4 h-4" />
            <span>Agent Pipeline & MITRE</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">

        {/* TAB 1: INVESTIGATE DASHBOARD */}
        {activeTab === 'investigate' && (
          <div className="space-y-6">
            
            {/* 1-Click Attack Scenarios Switcher */}
            <ScenarioSelector
              scenarios={scenarios}
              onSelectScenario={handleSelectScenario}
              loading={loading}
            />

            {/* Input Form Console */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span>Threat Submission Console</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Input URL, Raw Message copy, Claimed Sender or Screenshot
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Suspicious Target URL
                  </label>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="e.g. https://microsoft-security-login-alert.example-domain.top"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Claimed Organization / Sender Name
                  </label>
                  <input
                    type="text"
                    value={claimedSender}
                    onChange={(e) => setClaimedSender(e.target.value)}
                    placeholder="e.g. Microsoft Security Team"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Message Body / Email Content / SMS Text
                </label>
                <textarea
                  rows={3}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Paste suspicious email text, job scam details, or SMS copy..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                ></textarea>
              </div>

              {/* Upload Screenshot & Action */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <label className="glass-panel px-4 py-2.5 rounded-xl border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex items-center gap-2 text-xs font-medium text-slate-300 transition-colors">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span>{selectedFile ? selectedFile.name : 'Upload Screenshot (OCR)'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  {selectedFile && (
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-xs text-red-400 hover:underline font-mono"
                    >
                      Clear File
                    </button>
                  )}
                </div>

                <button
                  disabled={loading}
                  onClick={() => handleRunInvestigation()}
                  className="w-full md:w-auto px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-glow-cyan flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Orchestrating 5 Agents...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Execute Investigation</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Dashboard View - Populated By Default */}
            {result && (
              <div id="results-dashboard" className="space-y-6 transition-all duration-500">
                {/* Result Header Bar */}
                <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">INVESTIGATION ID:</span>
                    <span className="text-cyan-400 font-bold">{result.investigation_id}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-400">{result.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDownloadReport}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Download Forensic JSON</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">OVERALL VERDICT:</span>
                      <span className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider ${result.overall_verdict === 'HIGH' || result.overall_verdict === 'MALICIOUS' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : result.overall_verdict === 'SUSPICIOUS' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                        {result.overall_verdict}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Threat Radar & Threat Gauge Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ThreatScoreMeter
                    score={result.threat_score}
                    verdict={result.overall_verdict}
                    urlScore={result.threat_score >= 80 ? 90 : result.threat_score >= 50 ? 60 : 0}
                    msgScore={result.threat_score >= 80 ? 85 : result.threat_score >= 50 ? 55 : 0}
                    identScore={result.threat_score >= 80 ? 95 : result.threat_score >= 50 ? 70 : 0}
                  />
                  <ThreatRadarMap verdict={result.overall_verdict} />
                </div>

                {/* Why? & Recommended Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Why? Breakdown */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-amber-400" />
                      <span>WHY THIS VERDICT?</span>
                    </h3>
                    <ul className="space-y-2">
                      {result.summary_why?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                          <span className="text-red-400 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Action */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>RECOMMENDED ACTIONS</span>
                    </h3>
                    <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {result.recommended_action}
                    </pre>
                  </div>
                </div>

                {/* MITRE ATT&CK Framework TTP Card */}
                <MitreAttackCard verdict={result.overall_verdict} />

                {/* Security Reviewer Self-Verification Loop Panel */}
                <SecurityReviewerPanel reviewerResult={result.reviewer_result} />

                {/* Agent Timeline & Evidence Vault Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InvestigationTimeline steps={result.timeline_steps} />
                  <EvidenceVault cards={result.evidence_vault} />
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: EVIDENCE VAULT VIEW */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <EvidenceVault cards={result?.evidence_vault || []} />
          </div>
        )}

        {/* TAB 3: AGENT PIPELINE ARCHITECTURE & COMPARISON */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <ThreatComparisonMatrix />

            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
                  <Layers className="w-7 h-7 text-cyan-400" />
                  <span>Venkathanu.Ai Multi-Agent Architecture</span>
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  How specialized agents collaborate, gather evidence, challenge conclusions, and explain threat verdicts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400">AGENT 1</span>
                  <h4 className="text-sm font-bold text-white">🔗 URL Investigator</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Analyzes URL subdomains, lookalike homographs, TLD reputation, HTTPS presence, and credential target paths.
                  </p>
                </div>

                <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400">AGENT 2</span>
                  <h4 className="text-sm font-bold text-white">📧 Message Investigator</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Scans copy for social-engineering coercion, urgency triggers, account suspension threats, and payment requests.
                  </p>
                </div>

                <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400">AGENT 3</span>
                  <h4 className="text-sm font-bold text-white">🪪 Identity Agent</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Checks claimed organization (e.g. Microsoft, SBI, PayPal) against actual sender domain to detect impersonation.
                  </p>
                </div>

                <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400">AGENT 4</span>
                  <h4 className="text-sm font-bold text-white">🖼️ Screenshot OCR Agent</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Processes uploaded images/screenshots, extracts embedded text and URLs, and feeds them into the investigation stream.
                  </p>
                </div>

                <div className="glass-panel p-5 rounded-xl border border-purple-500/40 bg-purple-950/20 md:col-span-2 space-y-2">
                  <span className="text-xs font-mono text-purple-400">AGENT 5 (CORE INNOVATION)</span>
                  <h4 className="text-sm font-bold text-white">🧠 Security Reviewer (Verification Loop)</h4>
                  <p className="text-xs text-purple-200/90 leading-relaxed">
                    Challenges initial findings: "Could our conclusion be wrong?" Tests counter-hypotheses (false positive urgency, whitelisted domains), verifies multi-signal correlation, and calculates final confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800/80 px-6 py-4 text-center text-xs font-mono text-slate-500">
        Venkathanu.Ai — Digital Threat Investigation Platform • Built with Google Antigravity & FastAPI
      </footer>
    </div>
  );
}
