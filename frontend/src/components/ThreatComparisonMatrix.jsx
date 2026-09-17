import React from 'react';
import { Check, X, Shield, Cpu, HelpCircle, Layers } from 'lucide-react';

export default function ThreatComparisonMatrix() {
  const COMPARISONS = [
    { feature: "Threat Judgment Method", standard: "Binary Classifier (Phishing / Safe)", venkathanu: "Multi-Agent Investigation Stream", icon: Cpu },
    { feature: "Self-Verification Loop", standard: "❌ None (Blind trust in 1st output)", venkathanu: "✅ Agent 5 Security Reviewer ('Could our conclusion be wrong?')", icon: Shield },
    { feature: "Forensic Proof Cards", standard: "❌ Generic single text string", venkathanu: "✅ Structured Evidence Vault Cards with Confidence Metrics", icon: Layers },
    { feature: "MITRE ATT&CK Mapping", standard: "❌ Not provided", venkathanu: "✅ Mapped TTP Tactics & Techniques", icon: HelpCircle },
    { feature: "Explainability & Action Plan", standard: "❌ Only says 'Phishing'", venkathanu: "✅ Detailed WHY Breakdown + Step-by-Step Security Playbook", icon: Check }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span>Why Venkathanu.Ai Is Superior to Generic Detectors</span>
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
          ARCHITECTURAL ADVANTAGE
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-3">Capability / Feature</th>
              <th className="py-2.5 px-3 text-slate-500">Standard AI Phishing Detector</th>
              <th className="py-2.5 px-3 text-cyan-400">Venkathanu.Ai Autonomous Investigator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {COMPARISONS.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                  <row.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{row.feature}</span>
                </td>
                <td className="py-3 px-3 text-slate-400">{row.standard}</td>
                <td className="py-3 px-3 text-cyan-300 font-semibold bg-cyan-950/20">{row.venkathanu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
