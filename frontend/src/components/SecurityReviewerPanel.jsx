import React from 'react';
import { Brain, CheckCircle2, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

export default function SecurityReviewerPanel({ reviewerResult }) {
  if (!reviewerResult) return null;

  return (
    <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 bg-purple-950/10 shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🧠 Agent 5 — Security Reviewer</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] uppercase font-mono tracking-wider border border-purple-500/30">
                Self-Verification Engine
              </span>
            </h3>
            <p className="text-xs text-purple-300/80">
              Challenging initial investigator findings ("Could our conclusion be wrong?")
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-900/40 px-3 py-1.5 rounded-lg border border-purple-500/30">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Review Status: {reviewerResult.review_status ? 'Complete' : 'Pending'}</span>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          <span className="text-slate-400 font-semibold uppercase tracking-wide block mb-1">
            Reasoning & Verification Audit:
          </span>
          <p className="text-slate-200 leading-relaxed font-mono">
            {reviewerResult.reasoning}
          </p>
        </div>

        {reviewerResult.counter_arguments_evaluated?.length > 0 && (
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <span className="text-purple-300 font-semibold uppercase tracking-wide block mb-2">
              Tested Counter-Hypotheses (False Positive Audits):
            </span>
            <ul className="space-y-1.5">
              {reviewerResult.counter_arguments_evaluated.map((arg, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 font-mono">
                  <span className="text-purple-400 font-bold">✓</span>
                  <span>{arg}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span>Verified Confidence:</span>
            <span className="text-purple-400 font-bold text-sm">{reviewerResult.confidence}%</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Independent Review Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
