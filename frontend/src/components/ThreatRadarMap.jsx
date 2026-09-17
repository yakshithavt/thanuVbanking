import React, { useState } from 'react';
import { Radio, ShieldAlert, Globe, Crosshair, MapPin, Zap } from 'lucide-react';

export default function ThreatRadarMap({ verdict }) {
  const [activeNode, setActiveNode] = useState(0);

  const ATTACK_NODES = [
    { id: 1, origin: "Lookalike Server", location: "Frankfurt, DE", ip: "185.220.101.42", risk: "HIGH", lat: "50%", lng: "45%", signal: "Hostile Homograph TLD" },
    { id: 2, origin: "Credential Harvester", location: "Bucharest, RO", ip: "193.228.12.89", risk: "HIGH", lat: "35%", lng: "60%", signal: "Active Password Trap" },
    { id: 3, origin: "SMS Gateway Relay", location: "Singapore, SG", ip: "103.253.14.12", risk: "SUSPICIOUS", lat: "65%", lng: "80%", signal: "Smishing Relay" },
    { id: 4, origin: "Fake Payment Portal", location: "Sao Paulo, BR", ip: "177.12.89.201", risk: "SUSPICIOUS", lat: "75%", lng: "30%", signal: "UPI Payment Trap" }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-red-400 animate-pulse" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white font-mono">
            🌐 Global Threat Radar & Attack Vector Origin
          </h3>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/30">
          LIVE RADAR ACTIVE
        </span>
      </div>

      {/* Radar Map Graphic Canvas */}
      <div className="relative w-full h-48 bg-slate-950 rounded-xl border border-slate-800/90 overflow-hidden flex items-center justify-center">
        {/* Grid Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-40"></div>
        
        {/* Animated Radar Pulse Rings */}
        <div className="absolute w-40 h-40 rounded-full border border-cyan-500/20 animate-ping pointer-events-none"></div>
        <div className="absolute w-24 h-24 rounded-full border border-red-500/30 animate-pulse pointer-events-none"></div>
        <div className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-glow-cyan"></div>

        {/* Attack Origin Nodes */}
        {ATTACK_NODES.map((node, i) => (
          <button
            key={node.id}
            onClick={() => setActiveNode(i)}
            style={{ top: node.lat, left: node.lng }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${activeNode === i ? 'bg-red-500/40 border-red-400 scale-125 shadow-glow-red z-20' : 'bg-slate-900 border-slate-700 hover:border-cyan-400'}`}
          >
            <span className={`w-2 h-2 rounded-full ${node.risk === 'HIGH' ? 'bg-red-400 animate-ping' : 'bg-amber-400'}`}></span>
          </button>
        ))}

        {/* Active Node Info Tooltip */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg font-mono text-[11px] space-y-0.5 z-10 max-w-xs">
          <div className="flex items-center justify-between gap-3 text-white font-bold">
            <span className="text-cyan-400">{ATTACK_NODES[activeNode].origin}</span>
            <span className="text-red-400">{ATTACK_NODES[activeNode].risk}</span>
          </div>
          <div className="text-slate-400 text-[10px]">
            Location: {ATTACK_NODES[activeNode].location} | IP: {ATTACK_NODES[activeNode].ip}
          </div>
          <div className="text-slate-300 text-[10px] italic">
            Signal: {ATTACK_NODES[activeNode].signal}
          </div>
        </div>
      </div>
    </div>
  );
}
