import React, { useState } from 'react';
import { Search, BookOpen, Clock, Zap, AlertTriangle } from 'lucide-react';

export const MemorySearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      // Direct uplink to the Vercel KV Search API
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) throw new Error('SEARCH_UPLINK_OFFLINE');
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Memory search failed:", err);
      setError("Failed to query project memory.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-12 p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md font-mono">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 border border-sky-500/20">
          <BookOpen size={20} />
        </div>
        <div>
          <h3 className="text-white text-lg font-black uppercase tracking-tighter italic">Project_Memory_Query</h3>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Searching Vercel KV Ledger // v2.6.0</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <input 
          type="text" 
          placeholder="SEARCH INGESTED LOGIC (e.g. 'TurboQuant', 'Grid Protocols')..."
          className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-12 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-all shadow-inner"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
        
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-4 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border border-sky-500/20"
        >
          {loading ? <Zap size={14} className="animate-pulse" /> : 'Execute'}
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-[10px] uppercase font-black">
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      {/* Results Grid */}
      <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {results.length > 0 ? (
          results.map((res, i) => (
            <div 
              key={i} 
              className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 transition-all group cursor-default"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest bg-sky-400/5 px-2 py-1 rounded border border-sky-400/10">
                  {res.type === 'harvest' ? 'Oxylabs_Node' : 'Firecrawl_Node'}
                </span>
                <div className="flex items-center gap-2 text-[9px] text-white/20 font-mono">
                  <Clock size={10} /> {new Date(res.timestamp).toLocaleDateString()}
                </div>
              </div>
              <div className="text-[9px] text-white/30 uppercase tracking-tighter mb-2 truncate">Source: {res.source}</div>
              <p className="text-sm text-white/70 leading-relaxed font-light italic border-l-2 border-white/5 pl-4 py-1">
                "{res.content}"
              </p>
            </div>
          ))
        ) : !loading && query && (
          <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
            <p className="text-[10px] text-white/20 uppercase tracking-widest">No matching memory fragments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};