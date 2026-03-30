import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Briefcase, ShoppingCart, Terminal, Shield, Activity, Zap, ChevronDown, Monitor, X, Crosshair } from 'lucide-react';
import { IntelDashboard } from '../components/IntelDashboard';
import { MemorySearch } from '../components/MemorySearch';
import '../styles/StonePlaque.css';

export type AppView = 'landing' | 'profile' | 'portfolio' | 'marketplace' | 'auth' | 'admin';

interface LandingScreenProps {
  setCurrentView: (v: AppView) => void;
}

const HERO_DATA = [
  { id: 'profile', view: 'profile' as AppView, title: 'the architect', subtitle: 'interactive resume, operational history, and active credentials.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=85&w=2400', icon: User },
  { id: 'portfolio', view: 'portfolio' as AppView, title: 'active portfolio', subtitle: 'case studies of solurbana interfaces and engineering deployments.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=85&w=2400', icon: Briefcase },
  { id: 'marketplace', view: 'marketplace' as AppView, title: 'the 1028bc shop', subtitle: 'direct-to-consumer infrastructure for neural-etched hard goods.', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=85&w=2400', icon: ShoppingCart }
];

const CinematicHero = ({ data, onClick, delay }: { data: typeof HERO_DATA[0], onClick: () => void, delay: number }) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      onClick={onClick}
      className="group relative h-screen w-full overflow-hidden cursor-pointer border-b border-white/5 bg-black"
    >
      <div className="absolute inset-0">
        <img
          src={data.image}
          alt=""
          className={`h-full w-full object-cover object-[center_20%] grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105 ${inView ? 'animate-pan opacity-40' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 z-10 p-12 md:p-20 transition-transform duration-700 group-hover:translate-x-6">
        <div className="flex items-center gap-3 mb-6">
          <data.icon className="h-5 w-5 text-sky-400" />
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-sky-400 uppercase">sector_gateway</span>
        </div>
        <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] italic lowercase">{data.title}</h2>
        <p className="mt-6 max-w-md text-lg text-white/50 font-medium leading-relaxed">{data.subtitle}</p>
        <div className="mt-10 flex items-center gap-4 text-[11px] font-bold tracking-[0.2em] text-white/30 group-hover:text-white transition-colors uppercase">
          initialize sector uplink <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-4" />
        </div>
      </div>
    </motion.section>
  );
};

export const LandingScreen = ({ setCurrentView }: LandingScreenProps) => {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="w-full blueprint-grid bg-[#050505] selection:bg-sky-500/30">
      <style>{`
        @keyframes pan { 0% { transform: scale(1); } 100% { transform: scale(1.1) translate(-2%, -1%); } }
        .animate-pan { animation: pan 20s linear infinite alternate; will-change: transform; }
      `}</style>

      {/* SECTION 1: THE HIGH-IMPACT HUD HERO */}
      <section className="stone-hero-container">
        
        {/* HUD OVERLAYS: Filling the Dead Space */}
        <div className="absolute top-10 right-10 flex flex-col items-end font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase z-0">
          <span>Uplink: Synchronized // Master_Core</span>
          <span>Node_Coord: 36.0395° N, 114.9817° W</span>
          <div className="w-48 h-[1px] bg-sky-500/10 mt-2" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="stone-plaque"
        >
          <span className="plaque-subtitle">Protocol // 1028bc_Master</span>
          <h1 className="plaque-title">1028bc</h1>
          <p className="plaque-desc">
            Technical framework for <span className="text-white">infrastructure development</span>, 
            <span className="text-white">urban intelligence</span>, and <span className="text-white">field operations</span>.
          </p>

          <div className="mt-16 flex gap-16">
             {['Vault', 'Live', 'Direct'].map((label) => (
               <div key={label} className="flex flex-col gap-2 group cursor-crosshair">
                 <div className="flex items-center gap-3">
                   <div className="h-[1px] w-6 bg-sky-500/30 group-hover:w-12 transition-all" />
                   <span className="text-[10px] font-black text-sky-400 font-mono uppercase tracking-[0.3em]">{label}</span>
                 </div>
                 <span className="text-[8px] text-white/5 pl-9 uppercase tracking-widest font-mono">Status: Optimal</span>
               </div>
             ))}
          </div>
        </motion.div>

        {/* HUD: SCALE DECOR */}
        <div className="absolute bottom-10 right-10 flex items-center gap-4 z-0 opacity-10">
          <Crosshair size={60} className="text-white rotate-45" />
          <div className="flex flex-col items-end font-mono text-[8px] text-white uppercase tracking-widest">
            <span>Scan_Rate: 2.4ghz</span>
            <span>Logic: Active</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: TELEMETRY (IMMEDIATE PORTFOLIO) */}
      <section id="telemetry" className="py-0 border-t border-white/5 bg-black/60 relative z-10">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-white/5">
            <DeploymentNode title="SolUrbana Grid" status="Live" onClick={() => setCurrentView('portfolio')} />
            <DeploymentNode title="Field Engine" status="Alpha" onClick={() => setCurrentView('portfolio')} />
            <DeploymentNode title="1028bc Protocol" status="Operational" onClick={() => setCurrentView('marketplace')} />
          </div>
        </div>
      </section>

      {/* SECTION 3: SECTOR GATEWAYS */}
      <div className="flex flex-col relative z-10">
        {HERO_DATA.map((hero, index) => (
          <CinematicHero key={hero.id} data={hero} delay={index * 0.1} onClick={() => setCurrentView(hero.view)} />
        ))}
      </div>

      {/* SECTION 4: DOCKED TERMINAL UTILITY */}
      <div className="fixed bottom-8 right-8 z-[1000]">
        <button 
          onClick={() => setTerminalOpen(!terminalOpen)}
          className={`px-8 py-5 border-2 font-black uppercase text-[10px] tracking-[0.4em] transition-all shadow-[10px_10px_0px_rgba(0,0,0,1)] ${terminalOpen ? 'bg-white text-black border-white' : 'bg-[#030303] text-sky-400 border-sky-400/50 hover:bg-sky-400 hover:text-black'}`}
        >
          {terminalOpen ? '[ Terminate_Uplink ]' : '[ Initialize_Ingestor ]'}
        </button>

        <AnimatePresence>
          {terminalOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-24 right-0 w-[500px] md:w-[600px] bg-[#0d0d0d] border-2 border-sky-400/30 p-8 shadow-[30px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="space-y-12 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                <IntelDashboard />
                <MemorySearch />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DeploymentNode = ({ title, status, onClick }: { title: string, status: string, onClick: () => void }) => (
  <div onClick={onClick} className="p-20 border-r border-white/5 bg-white/[0.01] hover:bg-sky-400/[0.03] hover:border-sky-500/40 transition-all cursor-pointer group relative">
    <div className="flex items-center gap-2 mb-6">
      <div className={`w-2 h-2 rounded-none ${status === 'Live' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
      <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/60">{status}</span>
    </div>
    <h3 className="text-6xl font-black italic text-white tracking-tighter mb-8 lowercase leading-none group-hover:text-sky-400 transition-colors">{title}</h3>
    <div className="flex items-center gap-2 text-[10px] font-black text-white/5 group-hover:text-white transition-all uppercase tracking-[0.4em]">
      Access_Node <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </div>
  </div>
);