import React from 'react';
import { Globe, Database, Cpu, Layout, LogOut } from 'lucide-react';
import type { UserProfile, SystemID } from '../utils/identity';

export const SystemSelectionScreen = ({ user, onSelect }: { user: UserProfile, onSelect: (s: SystemID) => void }) => {
  
  const systems = [
    { id: 'FIELD_OPS', name: 'FIELD_OPS', desc: 'Hardware Deployment & HUD', icon: <Cpu size={24} /> },
    { id: 'COMMERCIAL_SALES', name: 'COMM_SALES', desc: 'Enterprise Logistics', icon: <Globe size={24} /> },
    { id: 'ADMIN_CORE', name: 'ADMIN_CORE', desc: 'Regulatory Control', icon: <Database size={24} /> },
    { id: 'LOGIC_LAB', name: 'LOGIC_LAB', desc: 'Kernel Development', icon: <Layout size={24} /> },
  ];

  const authorized = systems.filter(s => user.authorizedSystems.includes(s.id as SystemID));

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 font-sans">
      <div className="w-full max-w-4xl space-y-12">
        
        {/* LOBBY HEADER */}
        <div className="flex justify-between items-end border-b border-white/5 pb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">SYSTEM_SELECTION</h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mt-1">Authorized Node Access / {user.name}</p>
          </div>
          <button className="p-3 rounded-full border border-white/5 hover:bg-white/5 text-white/20 hover:text-red-500 transition-all">
            <LogOut size={18} />
          </button>
        </div>

        {/* SYSTEM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {authorized.map((sys) => (
            <button
              key={sys.id}
              onClick={() => onSelect(sys.id as SystemID)}
              className="group relative bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl text-left hover:border-sky-500/50 transition-all overflow-hidden"
            >
              {/* ACCENT HOVER GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/5 transition-all pointer-events-none"></div>
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="p-3 rounded-xl bg-white/5 text-white/40 group-hover:text-sky-400 group-hover:bg-sky-500/10 transition-all">
                  {sys.icon}
                </div>
                <div className="text-[8px] font-black uppercase tracking-widest text-white/10 group-hover:text-sky-500/30">
                  NODE_{sys.id}
                </div>
              </div>

              <div className="relative z-10 mt-6">
                <h3 className="text-sm font-bold text-white tracking-widest">{sys.name}</h3>
                <p className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">{sys.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[8px] uppercase tracking-[0.5em] text-white/10">1028bc Infrastructure v2.6.3</p>
        </div>
      </div>
    </div>
  );
};