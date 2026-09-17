import React from 'react';
import { Play, ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ScenarioSelector({ scenarios = [], onSelectScenario, loading }) {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          ⚡ 1-Click Attack Scenarios (Hackathon Demo Suite)
        </h4>
        <span className="text-[11px] text-slate-500 font-mono">Select preset to test pipeline</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {scenarios.map((sc) => {
          let badgeColor = 'bg-red-500/20 text-red-400 border-red-500/30';
          let Icon = ShieldAlert;

          if (sc.id === 'job_scam') {
            badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
            Icon = AlertTriangle;
          } else if (sc.id === 'safe_github') {
            badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            Icon = ShieldCheck;
          }

          return (
            <button
              key={sc.id}
              disabled={loading}
              onClick={() => onSelectScenario(sc.id)}
              className="glass-panel p-3.5 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${badgeColor}`}>
                    {sc.type}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {sc.title}
                </h5>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-cyan-400 font-mono">
                <span>Run Investigation</span>
                <Play className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
