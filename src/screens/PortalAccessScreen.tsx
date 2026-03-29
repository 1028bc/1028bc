import React, { useState, useEffect } from 'react';
import { Activity, Shield, Lock, ChevronRight, Database, Cpu, Globe } from 'lucide-react';
import type { UserProfile } from '../utils/identity';

export const PortalAccessScreen = ({ onLogin }: { onLogin: (u: UserProfile) => void }) => {
  const [pass, setPass] = useState('');
  const [bootStatus, setBootStatus] = useState('AWAITING_KEY');
  const [preTheme, setPreTheme] = useState<'amber' | 'sky'>('sky');
  const [ping, setPing] = useState(22);

  // TELEMETRY PULSE
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * (28 - 18) + 18));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleBoot = () => {
    setBootStatus('DECRYPTING_VAULT');
    setTimeout(() => {
      if (pass === '1028') {
        onLogin({ id: 'BKC-01', name: 'Brian', level: 'GOD', authorizedSystems: ['FIELD_OPS', 'ADMIN_CORE', 'LOGIC_LAB'] });
      } else {
        onLogin({ id: 'TECH-04', name: 'Field Tech', level: 'USER', authorizedSystems: ['FIELD_OPS'] });
      }
    }, 1200);
  };

  const theme = preTheme === 'amber' ? 'text-amber-500 border-amber-500/30' : 'text-sky-400 border-sky-400/30';

  return (
    <div className={`min-h-screen bg-black ${theme.split(' ')[0]} font-mono selection:bg-white/10 overflow-hidden flex flex-col uppercase transition-colors duration-700`}>
      
      {/* BACKGROUND: TACTICAL GRID & SCANNING LINE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[1px] w-full animate-scan"></div>
      </div>

      {/* TOP HEADER: SYSTEM TELEMETRY */}
      <header className="relative z-10 p-8 flex justify-between items-start border-b border-white/[0.05] bg-black/40 backdrop-blur-md">
        <div className="flex gap-10">
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter text-white">1028bc</h1>
            <span className="text-[9px] tracking-[0.4em] opacity-40">SYSTEMS_&_PLATFORMS</span>
          </div>
          <div className="hidden md:flex gap-8 border-l border-white/10 pl-10 items-center">
            <div className="flex flex-col">
              <span className="text-[8px] opacity-20">UPLINK_NODE</span>
              <span className="text-[10px] font-bold">NV_HND_01</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] opacity-20">ENCRYPTION</span>
              <span className="text-[10px] font-bold text-green-500">AES_256_ACTIVE</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[8px] opacity-20">LATENCY</span>
            <span className="text-[10px] font-bold">{ping}MS</span>
          </div>
          <Activity size={20} className="animate-pulse" />
        </div>
      </header>

      {/* MAIN BOOT TERMINAL */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl space-y-16">
          
          <div className="text-center space-y-6">
             <div className="flex justify-center gap-4 mb-2">
               <button onClick={() => setPreTheme('sky')} className={`w-4 h-4 border ${preTheme === 'sky' ? 'bg-sky-500 border-white' : 'bg-transparent border-white/20'}`}></button>
               <button onClick={() => setPreTheme('amber')} className={`w-4 h-4 border ${preTheme === 'amber' ? 'bg-amber-500 border-white' : 'bg-transparent border-white/20'}`}></button>
             </div>
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic outline-text">
               SECURE<br/>INITIALIZATION
             </h2>
          </div>

          <div className="relative max-w-sm mx-auto">
            <div className={`absolute -top-6 left-0 text-[10px] tracking-[0.3em] font-bold ${theme.split(' ')[0]}`}>INPUT_SECURITY_KEY</div>
            <input 
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBoot()}
              className="w-full bg-transparent border-b border-white/20 py-6 text-center text-white text-3xl font-bold tracking-[0.8em] focus:border-white focus:outline-none transition-all placeholder:text-white/5"
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={handleBoot}
              className={`px-16 py-6 bg-white text-black text-[12px] font-black tracking-[0.4em] hover:bg-sky-500 transition-all flex items-center gap-4 group shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
            >
              {bootStatus} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex gap-12 opacity-20">
              <div className="flex items-center gap-2"><Globe size={14}/> <span className="text-[9px]">GLOBAL_NET</span></div>
              <div className={`flex items-center gap-2 ${theme.split(' ')[0]}`}><Database size={14}/> <span className="text-[9px]">LOCAL_VAULT</span></div>
              <div className="flex items-center gap-2"><Cpu size={14}/> <span className="text-[9px]">KERNEL_STABLE</span></div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER: SYSTEM HANDSHAKE LOGS */}
      <footer className="relative z-10 p-8 border-t border-white/[0.05] bg-black/80 flex justify-between items-end">
        <div className="text-[9px] space-y-2 opacity-30 tracking-widest leading-relaxed">
          <p>{`> [SYSTEM] NODE_INITIALIZATION_SUCCESSFUL`}</p>
          <p className="text-green-500 opacity-100">{`> [SECURITY] BYPASSING_SSL_ENCRYPTION_WARNING... [FORCE_PROCEED_TRUE]`}</p>
          <p>{`> [STATUS] HANDSHAKE_PENDING: OPERATOR_KEY_REQUIRED`}</p>
        </div>
        <div className="text-right">
          <span className="text-[24px] font-black opacity-10 tracking-tighter italic">1028bc_OS_v2.6</span>
        </div>
      </footer>
    </div>
  );
};