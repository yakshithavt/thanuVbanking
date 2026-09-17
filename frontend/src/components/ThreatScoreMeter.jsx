import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function ThreatScoreMeter({ score, verdict }) {
  // SVG Circle Gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = 'text-emerald-500';
  let bgGlow = 'shadow-glow-emerald border-emerald-500/30';
  let badgeText = 'SAFE / VERIFIED';
  let badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let Icon = ShieldCheck;

  if (score >= 65 || verdict === 'HIGH' || verdict === 'MALICIOUS') {
    colorClass = 'text-red-500';
    bgGlow = 'shadow-glow-red border-red-500/30';
    badgeText = 'HIGH RISK / MALICIOUS';
    badgeBg = 'bg-red-500/10 text-red-400 border-red-500/30';
    Icon = ShieldAlert;
  } else if (score >= 30 || verdict === 'SUSPICIOUS') {
    colorClass = 'text-amber-500';
    bgGlow = 'shadow-glow-amber border-amber-500/30';
    badgeText = 'SUSPICIOUS / WARN';
    badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    Icon = AlertTriangle;
  }

  return (
    <div className={`glass-panel p-6 rounded-2xl border ${bgGlow} transition-all duration-500 flex flex-col items-center justify-center text-center relative overflow-hidden`}>
      <div className="absolute top-3 left-4 flex items-center gap-2 text-xs font-mono text-slate-400">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>THREAT CORRELATION ENGINE</span>
      </div>

      <div className="relative mt-4 mb-2 flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            className={`transition-all duration-1000 ease-out stroke-current ${colorClass}`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
            {score}
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400 mt-0.5">
            / 100 Score
          </span>
        </div>
      </div>

      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase ${badgeBg}`}>
        <Icon className="w-4 h-4" />
        <span>{badgeText}</span>
      </div>
    </div>
  );
}
