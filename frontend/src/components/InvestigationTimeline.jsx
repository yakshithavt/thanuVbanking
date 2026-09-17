import React from 'react';
import { CheckCircle2, ShieldAlert, Cpu, Search, AlertCircle, FileSearch, Lock } from 'lucide-react';

export default function InvestigationTimeline({ steps = [] }) {
  const getStepIcon = (stepNum) => {
    switch(stepNum) {
      case 1: return Search;
      case 2: return FileSearch;
      case 3: return AlertCircle;
      case 4: return Cpu;
      case 5: return CheckCircle2;
      case 6: return Lock;
      default: return CheckCircle2;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/80">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Autonomous Agent Timeline</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time multi-agent investigation execution stream
          </p>
        </div>
        <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-mono">
          5 Agents Active
        </span>
      </div>

      <div className="space-y-4">
        {steps.map((st, idx) => {
          const Icon = getStepIcon(st.step);
          const isHigh = st.risk === 'HIGH' || st.risk === 'MALICIOUS';
          const isWarn = st.risk === 'SUSPICIOUS';

          let statusColor = 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10';
          if (isHigh) statusColor = 'border-red-500/30 text-red-400 bg-red-500/10';
          if (isWarn) statusColor = 'border-amber-500/30 text-amber-400 bg-amber-500/10';

          return (
            <div key={idx} className="relative flex items-start gap-4 group">
              {idx < steps.length - 1 && (
                <span className="absolute top-8 left-4 bottom-0 w-0.5 bg-slate-800 group-hover:bg-cyan-500/40 transition-colors"></span>
              )}

              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 z-10 ${statusColor}`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 glass-panel p-3.5 rounded-xl border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">{st.title}</span>
                  <span className="font-mono text-cyan-400 text-[11px]">{st.agent}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  {st.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
