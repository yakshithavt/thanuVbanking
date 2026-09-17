import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, Shield, Search, FileText, Upload, 
  Cpu, Database, Sparkles, AlertOctagon, CheckCircle2, ArrowRight,
  RefreshCw, Terminal, Layers, Activity, Lock, ArrowUpRight, ChevronRight,
  FileCheck, Globe, UserCheck, Image, HelpCircle
} from 'lucide-react';

import ThreatScoreMeter from './components/ThreatScoreMeter';
import InvestigationTimeline from './components/InvestigationTimeline';
import EvidenceVault from './components/EvidenceVault';
import SecurityReviewerPanel from './components/SecurityReviewerPanel';
import ScenarioSelector from './components/ScenarioSelector';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [activeCapability, setActiveCapability] = useState('reviewer');
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Form Inputs
  const [urlInput, setUrlInput] = useState('');
  const [claimedSender, setClaimedSender] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch scenarios on mount
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

  const handleRunInvestigation = async (scenarioId = null) => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error('Investigation error:', error);
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-100 cyber-grid">
      
      {/* Vonar.ai Style Sticky Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
            <Shield className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Venkathanu.Ai</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono">
                ENTERPRISE SECURITY
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Autonomous Digital Threat Investigator
            </p>
          </div>
        </div>

        {/* Header Links & Action */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <nav className="hidden lg:flex items-center gap-6 text-slate-300">
            <a href="#capabilities" className="hover:text-cyan-400 transition-colors">Capabilities</a>
            <a href="#workflow" className="hover:text-cyan-400 transition-colors">Process Workflow</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">Multi-Agent Engine</a>
            <a href="#evidence" className="hover:text-cyan-400 transition-colors">Evidence Vault</a>
          </nav>

          <button
            onClick={() => handleSelectScenario('microsoft_phishing')}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl uppercase tracking-wider transition-all shadow-glow-cyan flex items-center gap-1.5"
          >
            <span>Live Attack Demo</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-12">

        {/* Vonar.ai Style Hero Section */}
        <section className="relative pt-6 pb-4 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>AUTONOMOUS THREAT INTELLIGENCE & VERIFICATION PIPELINE</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Don't just detect the threat. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
              Investigate, challenge, and prove it.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Venkathanu.Ai deploys specialized AI security agents to analyze URLs, messages, sender identities, and screenshots. It challenges its own conclusions through a self-verification loop and outputs forensic evidence cards.
          </p>

          {/* Metrics Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-2">
            <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="block text-xl font-bold text-white font-mono">5 Agents</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Multi-Agent Pipeline</span>
            </div>
            <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="block text-xl font-bold text-cyan-400 font-mono">&lt; 1.2s</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Investigation Time</span>
            </div>
            <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="block text-xl font-bold text-purple-400 font-mono">100%</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Explainable Evidence</span>
            </div>
            <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="block text-xl font-bold text-emerald-400 font-mono">0 Trust</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Self-Verification Loop</span>
            </div>
          </div>
        </section>

        {/* vonar.ai Interactive Threat Scanner Console */}
        <section id="scanner" className="space-y-6">
          
          {/* Scenario Selector Preset Bar */}
          <ScenarioSelector
            scenarios={scenarios}
            onSelectScenario={handleSelectScenario}
            loading={loading}
          />

          {/* Scanner Input Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>Threat Submission Console</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Input URL, Email Body, Claimed Sender or Screenshot
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
                placeholder="Paste suspicious email copy, job scam details, or SMS text..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              ></textarea>
            </div>

            {/* Upload Screenshot */}
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

          {/* Results Output Section */}
          {result && (
            <div className="space-y-6 transition-all duration-500">
              {/* Result Header Bar */}
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">ID:</span>
                  <span className="text-cyan-400 font-bold">{result.investigation_id}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">{result.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">OVERALL VERDICT:</span>
                  <span className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider ${result.overall_verdict === 'HIGH' || result.overall_verdict === 'MALICIOUS' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : result.overall_verdict === 'SUSPICIOUS' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                    {result.overall_verdict}
                  </span>
                </div>
              </div>

              {/* Score Gauge & Action Recommendation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ThreatScoreMeter
                  score={result.threat_score}
                  verdict={result.overall_verdict}
                />

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

              {/* Security Reviewer Self-Verification Loop */}
              <SecurityReviewerPanel reviewerResult={result.reviewer_result} />

              {/* Agent Timeline & Evidence Vault Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InvestigationTimeline steps={result.timeline_steps} />
                <EvidenceVault cards={result.evidence_vault} />
              </div>
            </div>
          )}

        </section>

        {/* Vonar.ai Style Capability Explorer Section */}
        <section id="capabilities" className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-8">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">SYSTEM CAPABILITIES</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              The answer is only part of the job.
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
              An investigator must check sources, challenge counter-hypotheses, and present an explainable audit record before reaching a conclusion.
            </p>
          </div>

          {/* Capability Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <button
              onClick={() => setActiveCapability('url')}
              className={`p-4 rounded-xl border text-left transition-all ${activeCapability === 'url' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-glow-cyan' : 'glass-panel border-slate-800 text-slate-400 hover:text-white'}`}
            >
              <Globe className="w-5 h-5 mb-2 text-cyan-400" />
              <div className="text-xs font-bold font-mono">Agent 1: URL</div>
              <div className="text-[11px] opacity-80 mt-0.5">Domain Lookalikes</div>
            </button>

            <button
              onClick={() => setActiveCapability('message')}
              className={`p-4 rounded-xl border text-left transition-all ${activeCapability === 'message' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-glow-cyan' : 'glass-panel border-slate-800 text-slate-400 hover:text-white'}`}
            >
              <FileCheck className="w-5 h-5 mb-2 text-cyan-400" />
              <div className="text-xs font-bold font-mono">Agent 2: Message</div>
              <div className="text-[11px] opacity-80 mt-0.5">Social Engineering</div>
            </button>

            <button
              onClick={() => setActiveCapability('identity')}
              className={`p-4 rounded-xl border text-left transition-all ${activeCapability === 'identity' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-glow-cyan' : 'glass-panel border-slate-800 text-slate-400 hover:text-white'}`}
            >
              <UserCheck className="w-5 h-5 mb-2 text-cyan-400" />
              <div className="text-xs font-bold font-mono">Agent 3: Identity</div>
              <div className="text-[11px] opacity-80 mt-0.5">Impersonation Audit</div>
            </button>

            <button
              onClick={() => setActiveCapability('screenshot')}
              className={`p-4 rounded-xl border text-left transition-all ${activeCapability === 'screenshot' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-glow-cyan' : 'glass-panel border-slate-800 text-slate-400 hover:text-white'}`}
            >
              <Image className="w-5 h-5 mb-2 text-cyan-400" />
              <div className="text-xs font-bold font-mono">Agent 4: OCR</div>
              <div className="text-[11px] opacity-80 mt-0.5">Visual Scan</div>
            </button>

            <button
              onClick={() => setActiveCapability('reviewer')}
              className={`p-4 rounded-xl border text-left transition-all ${activeCapability === 'reviewer' ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-lg' : 'glass-panel border-slate-800 text-slate-400 hover:text-white'}`}
            >
              <ShieldCheck className="w-5 h-5 mb-2 text-purple-400" />
              <div className="text-xs font-bold font-mono">Agent 5: Reviewer</div>
              <div className="text-[11px] opacity-80 mt-0.5">Verification Loop</div>
            </button>
          </div>

          {/* Capability Detail Card */}
          <div className="glass-panel p-6 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
            {activeCapability === 'reviewer' && (
              <>
                <h4 className="text-sm font-bold text-purple-300">🧠 Agent 5 — Security Reviewer Verification Loop</h4>
                <p className="text-slate-300 leading-relaxed">
                  First-pass AI detectors often suffer from false positives (e.g. tagging genuine password notifications as phishing due to urgency language). The Security Reviewer explicitly challenges initial agent findings by asking: <i>"Could our conclusion be wrong?"</i>
                </p>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-purple-300">
                  ✓ Tests false-positive urgency language <br />
                  ✓ Audits sender infrastructure against whitelisted domain lists <br />
                  ✓ Evaluates signal consistency before confirming final threat verdict
                </div>
              </>
            )}

            {activeCapability === 'url' && (
              <>
                <h4 className="text-sm font-bold text-cyan-300">🔗 Agent 1 — URL & Domain Investigator</h4>
                <p className="text-slate-300 leading-relaxed">
                  Performs safe, non-invasive structural analysis on web links. Scans for lookalike homographs, typosquatting (e.g. <code>microsoft-security-alert.top</code>), excessive subdomains, TLD reputation, and HTTPS presence.
                </p>
              </>
            )}

            {activeCapability === 'message' && (
              <>
                <h4 className="text-sm font-bold text-cyan-300">📧 Agent 2 — Message & Social Engineering Agent</h4>
                <p className="text-slate-300 leading-relaxed">
                  Analyzes email, SMS, or chat copy for coercion tactics: artificial urgency, account suspension threats, payment demands, and credential harvesters.
                </p>
              </>
            )}

            {activeCapability === 'identity' && (
              <>
                <h4 className="text-sm font-bold text-cyan-300">🪪 Agent 3 — Identity & Impersonation Agent</h4>
                <p className="text-slate-300 leading-relaxed">
                  Cross-checks claimed brand names (Microsoft, PayPal, SBI Bank) against observed sender domain infrastructure to flag spoofing and brand impersonation.
                </p>
              </>
            )}

            {activeCapability === 'screenshot' && (
              <>
                <h4 className="text-sm font-bold text-cyan-300">🖼️ Agent 4 — Screenshot OCR Investigator</h4>
                <p className="text-slate-300 leading-relaxed">
                  Processes uploaded screenshot images via PyTesseract OCR, extracts embedded text and URLs, and routes extracted artifacts through the investigation pipeline.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Vonar.ai Style Process Workflow Section */}
        <section id="workflow" className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">PROCESS WORKFLOW</span>
            <h2 className="text-2xl font-extrabold text-white">How the Investigation Operates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
            <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-mono font-bold">STEP 01</span>
              <h5 className="font-bold text-white">Submit Content</h5>
              <p className="text-slate-400 leading-relaxed">User inputs URL, raw email copy, or screenshot image.</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-mono font-bold">STEP 02</span>
              <h5 className="font-bold text-white">Agent Dispatch</h5>
              <p className="text-slate-400 leading-relaxed">URL, Message, Identity, and OCR agents analyze signals in parallel.</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-mono font-bold">STEP 03</span>
              <h5 className="font-bold text-white">Evidence Vault</h5>
              <p className="text-slate-400 leading-relaxed">Forensic cards are collected with source tags and confidence ratings.</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-purple-500/40 bg-purple-950/20 space-y-2">
              <span className="text-purple-400 font-mono font-bold">STEP 04</span>
              <h5 className="font-bold text-white">Security Review</h5>
              <p className="text-purple-200/90 leading-relaxed">Agent 5 challenges initial findings and tests counter-hypotheses.</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-2">
              <span className="text-emerald-400 font-mono font-bold">STEP 05</span>
              <h5 className="font-bold text-white">Explainable Verdict</h5>
              <p className="text-emerald-200/90 leading-relaxed">Final threat verdict (SAFE / SUSPICIOUS / MALICIOUS) with actions.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Vonar.ai Style Enterprise Footer */}
      <footer className="glass-panel border-t border-slate-800/80 px-8 py-8 mt-12 text-xs font-mono text-slate-500 space-y-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-200 font-bold font-sans text-sm">Venkathanu.Ai</span>
            <span>— Autonomous Digital Threat Investigator</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#scanner" className="hover:text-cyan-400">Scanner Console</a>
            <a href="#capabilities" className="hover:text-cyan-400">Capabilities</a>
            <a href="#workflow" className="hover:text-cyan-400">Process Workflow</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-4 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-600">
          <span>Built with Google Antigravity & FastAPI • Enterprise Multi-Agent Threat Engine</span>
          <span>© 2026 Venkathanu.Ai. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
