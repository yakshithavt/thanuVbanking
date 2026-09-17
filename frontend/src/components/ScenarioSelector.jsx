import React from 'react';
import { Play, ShieldAlert, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function ScenarioSelector({ scenarios = [], onSelectScenario, loading }) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono">
            ⚡ 1-Click Attack Scenarios (Hackathon Demo Suite)
          </h4>
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">Select preset to test multi-agent engine</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((sc) => {
          let badgeColor = 'bg-red-500/20 text-red-400 border-red-500/40 shadow-glow-red';
          let borderGlow = 'border-slate-800 hover:border-red-500/60 hover:bg-red-950/10';
          let scoreText = '94/100';
          let Icon = ShieldAlert;

          if (sc.id === 'job_scam') {
            badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-glow-amber';
            borderGlow = 'border-slate-800 hover:border-amber-500/60 hover:bg-amber-950/10';
            scoreText = '78/100';
            Icon = AlertTriangle;
          } else if (sc.id === 'safe_github') {
            badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-glow-emerald';
            borderGlow = 'border-slate-800 hover:border-emerald-500/60 hover:bg-emerald-950/10';
            scoreText = '0/100';
            Icon = ShieldCheck;
          }

          return (
            <button
              key={sc.id}
              disabled={loading}
              onClick={() => onSelectScenario(sc.id)}
              className={`glass-panel p-4 rounded-xl border ${borderGlow} transition-all text-left group flex flex-col justify-between space-y-3 relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase ${badgeColor}`}>
                    {sc.type}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-300">
                    <span>{scoreText}</span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>

                <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {sc.title}
                </h5>

                <p className="text-[11px] font-mono text-slate-400 line-clamp-2 mt-1">
                  {sc.claimed_sender || sc.url}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-cyan-400 font-mono font-bold border-t border-slate-800/80">
                <span>Execute Investigation</span>
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:translate-x-1 transition-transform">
                  <Play className="w-3 h-3 fill-current" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
