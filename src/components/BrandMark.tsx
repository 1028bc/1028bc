import React from 'react';
import { useApp } from '../context/AppContext';

export const BrandMark = () => {
  const { user } = useApp();
  const role = user?.role || 'public';

  switch (role) {
    case 'god': // Option #4 (Core Circuit)
      return (
        <div className="flex items-center gap-2 font-mono text-sky-400">
          <span className="text-xl font-black">{'>'}//core</span>
          <span className="text-white italic lowercase font-bold">1028bc</span>
        </div>
      );
    case 'dev': // Option #11 (Wireframe Prism)
      return (
        <div className="flex items-center gap-2 font-mono text-amber-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" />
            <path d="M12 22V12M20 7L12 12L4 7" strokeOpacity="0.4" />
          </svg>
          <span className="text-white italic lowercase font-bold">1028bc</span>
          <span className="text-[9px] bg-amber-500/20 px-1 rounded text-amber-500 font-black uppercase">node_dev</span>
        </div>
      );
    case 'admin': // Option #19 (Mgmt Interface)
      return (
        <div className="flex items-center gap-2 font-mono text-emerald-400">
          <span className="text-xl font-black">{'>'}mgmt</span>
          <span className="text-white italic lowercase font-bold">1028bc</span>
        </div>
      );
    case 'user': // Option #1 (The Core Node)
      return (
        <div className="flex items-center gap-2 font-mono">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
          <span className="text-white italic lowercase font-bold">1028bc</span>
        </div>
      );
    default: // public (Option #17 logic)
      return (
        <div className="flex items-center gap-2 group cursor-pointer font-mono">
          <div className="flex items-center text-sky-400 font-black text-xl">
            <span>{'>'}</span>
            <span className="animate-pulse ml-0.5">_</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white group-hover:text-sky-400 transition-colors italic lowercase">
            1028bc
          </span>
        </div>
      );
  }
};