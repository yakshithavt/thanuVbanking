import React from 'react';
import { Target, ShieldAlert, Crosshair, BookOpen, Layers } from 'lucide-react';

export default function MitreAttackCard({ verdict }) {
  const TTPS = [
    { id: "T1566.002", tactic: "Initial Access", technique: "Spearphishing Link", severity: "HIGH", description: "Malicious hyperlink embedding lookalike domain infrastructure." },
    { id: "T1589.002", tactic: "Reconnaissance", technique: "Identity Impersonation", severity: "HIGH", description: "Brand name spoofing of Microsoft 365 Security Team." },
    { id: "T1656", tactic: "Defense Evasion", technique: "Impersonation & Social Engineering", severity: "HIGH", description: "Account suspension threat coercing password disclosure." },
    { id: "T1556", tactic: "Credential Access", technique: "Modify Authentication Process", severity: "HIGH", description: "Targeting user credentials via deceptive login prompt." }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono">
            🎯 MITRE ATT&CK® Framework TTP Mapping
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
          SECURITY FRAMEWORK MATCHED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TTPS.map((ttp) => (
          <div key={ttp.id} className="glass-panel p-3.5 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-purple-400 font-bold px-2 py-0.5 rounded bg-purple-950/80 border border-purple-900/60">
                {ttp.id}
              </span>
              <span className="text-slate-400">{ttp.tactic}</span>
            </div>
            <h5 className="font-bold text-white pt-1 text-xs">{ttp.technique}</h5>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{ttp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
