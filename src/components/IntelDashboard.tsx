import React, { useState } from 'react';
import { Database, Search, Cpu, CheckCircle2 } from 'lucide-react';

export const IntelDashboard = () => {
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState<'crawl' | 'harvest'>('crawl');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleIngest = async () => {
    setStatus('processing');
    // Actual fetch to /api/ingest
    setTimeout(() => setStatus('success'), 3000); // UI Simulation
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#0a0a0a] border border-white/5 rounded-3xl shadow-2xl backdrop-blur-xl font-mono">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-white text-lg font-black uppercase tracking-tighter italic">Intelligence_Ingestor</h2>
          <p className="text-[10px] text-sky-400/60 uppercase tracking-widest">Protocol: Oxylabs // Firecrawl API</p>
        </div>
        <Database className={status === 'processing' ? 'animate-pulse text-amber-500' : 'text-white/20'} size={24} />
      </div>

      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex gap-4">
          {(['crawl', 'harvest'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-3 px-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                mode === m ? 'border-sky-500 bg-sky-500/10 text-sky-400' : 'border-white/5 text-white/20 hover:border-white/10'
              }`}
            >
              {m === 'crawl' ? 'Firecrawl (Docs/Web)' : 'Oxylabs (Secure/Industrial)'}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="ENTER UPLINK URL (YOUTUBE / PORTAL / DOCS)..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-xs text-white placeholder:text-white/10 focus:outline-none focus:border-sky-500/50 transition-all"
          />
          <button 
            onClick={handleIngest}
            className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-sky-400 transition-all"
          >
            {status === 'processing' ? 'Processing...' : 'Ingest'}
          </button>
        </div>

        {/* System Output Console */}
        <div className="mt-8 bg-black/60 rounded-xl p-4 border border-white/5 h-32 overflow-y-auto">
          <div className="text-[10px] text-emerald-500/80 mb-1 leading-relaxed">
            {status === 'idle' && '> SYSTEM_READY: Waiting for instruction...'}
            {status === 'processing' && `> INITIATING_${mode.toUpperCase()}... \n> REQUESTING_API_HANDSHAKE... \n> BYPASSING_ANTI_BOT...`}
            {status === 'success' && (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={12} /> MEMORY_NODE_COMMITTED: {url.substring(0, 30)}...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};