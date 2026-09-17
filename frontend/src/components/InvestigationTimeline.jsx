import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, Cpu, Search, AlertCircle, FileSearch, Lock, Clock, Code } from 'lucide-react';

export default function InvestigationTimeline({ steps = [] }) {
  const [expandedStep, setExpandedStep] = useState(null);

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

  const getLatency = (stepNum) => {
    const latencies = ["12ms", "42ms", "85ms", "110ms", "165ms", "210ms"];
    return latencies[stepNum - 1] || "35ms";
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span>Autonomous Agent Timeline</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Sequential execution telemetry stream across 5 specialized AI security agents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 rounded-full text-xs font-mono font-bold">
            5 Agents Synchronized
          </span>
        </div>
      </div>

      <div className="space-y-4 relative">
        {steps.map((st, idx) => {
          const Icon = getStepIcon(st.step);
          const isHigh = st.risk === 'HIGH' || st.risk === 'MALICIOUS';
          const isWarn = st.risk === 'SUSPICIOUS';
          const isExpanded = expandedStep === idx;

          let statusColor = 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10 shadow-glow-cyan';
          if (isHigh) statusColor = 'border-red-500/40 text-red-400 bg-red-500/10 shadow-glow-red';
          if (isWarn) statusColor = 'border-amber-500/40 text-amber-400 bg-amber-500/10 shadow-glow-amber';

          return (
            <div key={idx} className="relative flex items-start gap-4 group">
              {idx < steps.length - 1 && (
                <span className="absolute top-10 left-4 bottom-0 w-0.5 bg-slate-800 group-hover:bg-cyan-500/50 transition-colors"></span>
              )}

              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 z-10 ${statusColor} transition-transform group-hover:scale-110`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 glass-panel p-4 rounded-xl border border-slate-800/90 hover:border-cyan-500/40 transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span>{st.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800 font-mono">
                      Step 0{st.step}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" /> {getLatency(st.step)}
                    </span>
                    <span className="text-cyan-400 font-semibold">{st.agent}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  {st.detail}
                </p>

                <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                  <span className={`font-bold ${isHigh ? 'text-red-400' : isWarn ? 'text-amber-400' : 'text-emerald-400'}`}>
                    STATUS: {st.status} {st.risk ? `[${st.risk}]` : ''}
                  </span>
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : idx)}
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Code className="w-3 h-3" />
                    <span>{isExpanded ? 'Hide Payload' : 'Inspect JSON Payload'}</span>
                  </button>
                </div>

                {isExpanded && (
                  <pre className="text-[10px] font-mono bg-slate-950 p-3 rounded-lg text-cyan-300 border border-cyan-900/40 overflow-x-auto">
                    {JSON.stringify({ step: st.step, agent: st.agent, status: st.status, risk: st.risk, timestamp: new Date().toISOString() }, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
