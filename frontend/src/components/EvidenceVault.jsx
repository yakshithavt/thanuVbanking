import React, { useState } from 'react';
import { ShieldCheck, AlertOctagon, Info, Database, Filter, Search, Copy, Check } from 'lucide-react';

export default function EvidenceVault({ cards = [] }) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyJson = (card) => {
    navigator.clipboard.writeText(JSON.stringify(card, null, 2));
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCards = cards.filter(c => {
    const matchesFilter = 
      filterType === 'ALL' ? true :
      filterType === 'HIGH_RISK' ? (c.severity === 'HIGH' || c.severity === 'MALICIOUS') :
      filterType === 'VERIFIED' ? c.severity === 'SAFE' : true;

    const matchesSearch = 
      searchQuery === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.signal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.observed_data.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.source_agent.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-cyan-400" />
            <span>🔐 Forensic Evidence Vault</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Structured forensic proof cards gathered by autonomous security agents
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search evidence..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-medium w-full sm:w-auto justify-center">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-lg transition-all font-mono ${filterType === 'ALL' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
            >
              All ({cards.length})
            </button>
            <button
              onClick={() => setFilterType('HIGH_RISK')}
              className={`px-3 py-1 rounded-lg transition-all font-mono ${filterType === 'HIGH_RISK' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'text-slate-400 hover:text-white'}`}
            >
              High Risk
            </button>
            <button
              onClick={() => setFilterType('VERIFIED')}
              className={`px-3 py-1 rounded-lg transition-all font-mono ${filterType === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400 hover:text-white'}`}
            >
              Safe
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card) => {
          const isHigh = card.severity === 'HIGH' || card.severity === 'MALICIOUS';
          const isWarn = card.severity === 'SUSPICIOUS';

          let borderStyle = 'border-slate-800 hover:border-cyan-500/50';
          let badgeStyle = 'bg-slate-800 text-slate-300';

          if (isHigh) {
            borderStyle = 'border-glow-red bg-red-950/10 hover:border-red-500';
            badgeStyle = 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-glow-red';
          } else if (isWarn) {
            borderStyle = 'border-glow-amber bg-amber-950/10 hover:border-amber-500';
            badgeStyle = 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-glow-amber';
          } else {
            borderStyle = 'border-glow-emerald bg-emerald-950/10 hover:border-emerald-500';
            badgeStyle = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-glow-emerald';
          }

          return (
            <div
              key={card.id}
              className={`glass-panel p-5 rounded-2xl border ${borderStyle} transition-all duration-300 relative flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-400 border border-slate-800 font-bold">
                      {card.id}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{card.evidence_type}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeStyle}`}>
                    {card.severity}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1.5">{card.title}</h4>
                
                <div className="text-xs font-mono text-cyan-300 bg-cyan-950/50 p-2.5 rounded-xl border border-cyan-900/60 mb-3 leading-relaxed">
                  <span className="text-slate-400 block text-[10px] mb-0.5 font-sans">DETECTED SIGNAL:</span>
                  <span>{card.signal}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3 font-mono">
                  {card.description}
                </p>

                {card.observed_data && (
                  <div className="text-[11px] font-mono bg-slate-950 p-3 rounded-xl text-slate-300 border border-slate-800/90 mb-3 overflow-x-auto relative">
                    <span className="text-slate-500 block mb-0.5 text-[10px]">OBSERVED EVIDENCE DATA:</span>
                    <span className="text-slate-100 font-semibold">{card.observed_data}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">{card.source_agent}</span>
                  <span className="text-cyan-400 font-bold">Confidence: {card.confidence}%</span>
                </div>

                {/* Confidence Bar */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${isHigh ? 'bg-red-500' : isWarn ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${card.confidence}%` }}></div>
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    onClick={() => handleCopyJson(card)}
                    className="text-[10px] font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                  >
                    {copiedId === card.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">JSON Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Evidence JSON</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
