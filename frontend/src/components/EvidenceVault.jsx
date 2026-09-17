import React, { useState } from 'react';
import { ShieldCheck, AlertOctagon, Info, Database, Filter } from 'lucide-react';

export default function EvidenceVault({ cards = [] }) {
  const [filterType, setFilterType] = useState('ALL');

  const filteredCards = cards.filter(c => {
    if (filterType === 'ALL') return true;
    if (filterType === 'HIGH_RISK') return c.severity === 'HIGH' || c.severity === 'MALICIOUS';
    if (filterType === 'VERIFIED') return c.severity === 'SAFE';
    return true;
  });

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <span>🔐 Evidence Vault</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Structured forensic proof cards gathered by autonomous agents
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs font-medium">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded-lg transition-all ${filterType === 'ALL' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
          >
            All Evidence ({cards.length})
          </button>
          <button
            onClick={() => setFilterType('HIGH_RISK')}
            className={`px-3 py-1 rounded-lg transition-all ${filterType === 'HIGH_RISK' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'text-slate-400 hover:text-white'}`}
          >
            High Risk
          </button>
          <button
            onClick={() => setFilterType('VERIFIED')}
            className={`px-3 py-1 rounded-lg transition-all ${filterType === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400 hover:text-white'}`}
          >
            Verified Safe
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card) => {
          const isHigh = card.severity === 'HIGH' || card.severity === 'MALICIOUS';
          const isWarn = card.severity === 'SUSPICIOUS';

          let borderStyle = 'border-slate-800 hover:border-cyan-500/40';
          let badgeStyle = 'bg-slate-800 text-slate-300';

          if (isHigh) {
            borderStyle = 'border-red-900/40 bg-red-950/10 hover:border-red-500/50';
            badgeStyle = 'bg-red-500/20 text-red-400 border border-red-500/30';
          } else if (isWarn) {
            borderStyle = 'border-amber-900/40 bg-amber-950/10 hover:border-amber-500/50';
            badgeStyle = 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
          } else {
            borderStyle = 'border-emerald-900/40 bg-emerald-950/10 hover:border-emerald-500/50';
            badgeStyle = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
          }

          return (
            <div
              key={card.id}
              className={`glass-panel p-5 rounded-xl border ${borderStyle} transition-all duration-300 relative flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                    {card.id}
                  </span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeStyle}`}>
                    {card.severity}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{card.title}</h4>
                <div className="text-xs font-mono text-cyan-300 bg-cyan-950/40 p-2 rounded-lg border border-cyan-900/50 mb-3">
                  {card.signal}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {card.description}
                </p>

                {card.observed_data && (
                  <div className="text-[11px] font-mono bg-slate-950 p-2.5 rounded-lg text-slate-400 border border-slate-800/80 mb-3 overflow-x-auto">
                    <span className="text-slate-500 block mb-0.5">OBSERVED DATA:</span>
                    <span className="text-slate-200">{card.observed_data}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px]">
                <span className="text-slate-400 font-mono">{card.source_agent}</span>
                <span className="text-cyan-400 font-semibold font-mono">
                  Confidence: {card.confidence}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
