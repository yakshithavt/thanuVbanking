import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, Shield, Search, FileText, Upload, 
  Cpu, Database, Sparkles, AlertOctagon, CheckCircle2, ArrowRight,
  RefreshCw, Terminal, Layers
} from 'lucide-react';

import ThreatScoreMeter from './components/ThreatScoreMeter';
import InvestigationTimeline from './components/InvestigationTimeline';
import EvidenceVault from './components/EvidenceVault';
import SecurityReviewerPanel from './components/SecurityReviewerPanel';
import ScenarioSelector from './components/ScenarioSelector';

export default function App() {
  const [activeTab, setActiveTab] = useState('investigate');
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
        // Fallback default scenarios if backend starting up
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
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
            <Shield className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Venkathanu.Ai</span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono font-normal">
                v1.0 Hackathon
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Autonomous Digital Threat Investigator
            </p>
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('investigate')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'investigate' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-glow-cyan' : 'text-slate-400 hover:text-white'}`}
          >
            <Search className="w-4 h-4" />
            <span>Investigate</span>
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'vault' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-glow-cyan' : 'text-slate-400 hover:text-white'}`}
          >
            <Database className="w-4 h-4" />
            <span>Evidence Vault</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'architecture' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-glow-cyan' : 'text-slate-400 hover:text-white'}`}
          >
            <Layers className="w-4 h-4" />
            <span>Agent Pipeline</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">

        {/* Tab 1: Investigate */}
        {activeTab === 'investigate' && (
          <div className="space-y-6">
            
            {/* Scenario Switcher */}
            <ScenarioSelector
              scenarios={scenarios}
              onSelectScenario={handleSelectScenario}
              loading={loading}
            />

            {/* Input Form */}
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

            {/* Results Section */}
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

          </div>
        )}

        {/* Tab 2: Evidence Vault View */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            {result ? (
              <EvidenceVault cards={result.evidence_vault} />
            ) : (
              <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-4">
                <Database className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">Evidence Vault is Empty</h3>
                <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
                  Run an investigation in the Investigate tab or choose a 1-click preset scenario to populate forensic evidence cards.
                </p>
                <button
                  onClick={() => handleSelectScenario('microsoft_phishing')}
                  className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-glow-cyan"
                >
                  Load Sample Evidence (Microsoft Phishing Scenario)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Agent Pipeline Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
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
