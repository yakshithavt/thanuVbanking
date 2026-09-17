import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Activity, Lock, Cpu, Globe, UserCheck, MessageSquare } from 'lucide-react';

export default function ThreatScoreMeter({ score, verdict, urlScore = 90, msgScore = 85, identScore = 95, screenScore = 0 }) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = 'text-emerald-400 stroke-emerald-500';
  let bgGlow = 'border-glow-emerald bg-emerald-950/10';
  let badgeText = 'VERIFIED SAFE';
  let badgeBg = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-glow-emerald';
  let Icon = ShieldCheck;

  if (score >= 65 || verdict === 'HIGH' || verdict === 'MALICIOUS') {
    colorClass = 'text-red-400 stroke-red-500';
    bgGlow = 'border-glow-red bg-red-950/10';
    badgeText = 'MALICIOUS / HIGH RISK';
    badgeBg = 'bg-red-500/20 text-red-400 border-red-500/40 shadow-glow-red animate-pulse';
    Icon = ShieldAlert;
  } else if (score >= 30 || verdict === 'SUSPICIOUS') {
    colorClass = 'text-amber-400 stroke-amber-500';
    bgGlow = 'border-glow-amber bg-amber-950/10';
    badgeText = 'SUSPICIOUS THREAT';
    badgeBg = 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-glow-amber';
    Icon = AlertTriangle;
  }

  return (
    <div className={`glass-panel p-6 rounded-2xl border ${bgGlow} transition-all duration-500 flex flex-col items-center justify-between text-center relative overflow-hidden group`}>
      {/* Background HUD Grid lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-50 pointer-events-none"></div>

      {/* Header telemetry pill */}
      <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>THREAT CORRELATION ENGINE</span>
        </div>
        <span className="text-cyan-400 font-bold">LIVE TELEMETRY</span>
      </div>

      {/* Radial Score Gauge */}
      <div className="relative my-4 flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90 filter drop-shadow-lg">
          <circle
            cx="96"
            cy="96"
            r={radius}
            className="stroke-slate-800/90"
            strokeWidth="14"
            fill="transparent"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            className={`transition-all duration-1000 ease-out ${colorClass}`}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-extrabold tracking-tight text-white font-mono drop-shadow-md">
            {score}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-slate-400 font-mono mt-0.5">
            / 100 SCORE
          </span>
        </div>
      </div>

      {/* Verdict Status Badge */}
      <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-extrabold tracking-wider uppercase mb-4 ${badgeBg}`}>
        <Icon className="w-4 h-4" />
        <span>{badgeText}</span>
      </div>

      {/* Detailed Sub-Signal Breakdown Bars */}
      <div className="w-full space-y-2 text-[11px] font-mono pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-cyan-400" /> URL Domain Risk:</span>
          <span className="text-red-400 font-bold">{urlScore}%</span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full rounded-full transition-all duration-700" style={{ width: `${urlScore}%` }}></div>
        </div>

        <div className="flex items-center justify-between text-slate-300 pt-1">
          <span className="flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-cyan-400" /> Identity Spoofing:</span>
          <span className="text-red-400 font-bold">{identScore}%</span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div className="bg-purple-500 h-full rounded-full transition-all duration-700" style={{ width: `${identScore}%` }}></div>
        </div>

        <div className="flex items-center justify-between text-slate-300 pt-1">
          <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Social Engineering:</span>
          <span className="text-amber-400 font-bold">{msgScore}%</span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: `${msgScore}%` }}></div>
        </div>
      </div>
    </div>
  );
}
