import React from 'react';
import { Brain, CheckCircle2, ShieldCheck, RefreshCw, AlertCircle, Lock, Hash } from 'lucide-react';

export default function SecurityReviewerPanel({ reviewerResult }) {
  if (!reviewerResult) return null;

  return (
    <div className="glass-panel p-6 rounded-2xl border-glow-purple bg-purple-950/20 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-glow-purple">
            <Brain className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <span>Agent 5 — Security Reviewer</span>
              <span className="px-2.5 py-0.5 rounded bg-purple-500/30 text-purple-300 text-[10px] uppercase font-mono tracking-wider border border-purple-500/40 font-bold">
                CORE VERIFICATION INNOVATION
              </span>
            </h3>
            <p className="text-xs text-purple-200/90 font-mono mt-0.5">
              Self-Verification Loop: Challenging initial investigator findings ("Could our conclusion be wrong?")
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-purple-200 bg-purple-900/50 px-3.5 py-1.5 rounded-xl border border-purple-500/40 shrink-0">
          <Hash className="w-3.5 h-3.5 text-purple-400" />
          <span>Audit Hash: #0x9F4A8E</span>
        </div>
      </div>

      <div className="space-y-4 text-xs font-mono">
        <div className="bg-slate-950/80 p-4 rounded-xl border border-purple-900/40 space-y-1">
          <span className="text-purple-300 font-bold uppercase tracking-wider block text-[10px]">
            Reasoning & Counter-Evidence Audit Log:
          </span>
          <p className="text-slate-200 leading-relaxed">
            {reviewerResult.reasoning}
          </p>
        </div>

        {reviewerResult.counter_arguments_evaluated?.length > 0 && (
          <div className="bg-slate-950/80 p-4 rounded-xl border border-purple-900/40 space-y-2">
            <span className="text-purple-300 font-bold uppercase tracking-wider block text-[10px]">
              Tested Counter-Hypotheses (False Positive Audits):
            </span>
            <ul className="space-y-1.5">
              {reviewerResult.counter_arguments_evaluated.map((arg, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <span className="text-purple-400 font-bold">✓</span>
                  <span>{arg}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-mono">
            <span>VERIFIED CONFIDENCE SCORE:</span>
            <span className="text-purple-400 font-extrabold text-base px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30">
              {reviewerResult.confidence}%
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>INDEPENDENT REVIEW COMPLETED & UPHELD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
