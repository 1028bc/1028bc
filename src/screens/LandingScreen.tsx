import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Briefcase, ShoppingCart, Terminal, Shield, Activity, Zap, ChevronDown, Monitor, X } from 'lucide-react';
import { IntelDashboard } from '../components/IntelDashboard';
import { MemorySearch } from '../components/MemorySearch';
import '../styles/StonePlaque.css';

export type AppView = 'landing' | 'profile' | 'portfolio' | 'marketplace' | 'auth' | 'admin';

interface LandingScreenProps {
  setCurrentView: (v: AppView) => void;
}

const HERO_DATA = [
  {
    id: 'profile',
    view: 'profile' as AppView,
    title: 'the architect',
    subtitle: 'interactive resume, operational history, and active credentials.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=85&w=2400',
    icon: User
  },
  {
    id: 'portfolio',
    view: 'portfolio' as AppView,
    title: 'active portfolio',
    subtitle: 'case studies of solurbana interfaces and engineering deployments.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=85&w=2400',
    icon: Briefcase
  },
  {
    id: 'marketplace',
    view: 'marketplace' as AppView,
    title: 'the 1028bc shop',
    subtitle: 'direct-to-consumer infrastructure for neural-etched hard goods.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=85&w=2400',
    icon: ShoppingCart
  }
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

      {/* SECTION 1: THE #17 STONE HERO */}
      <section className="stone-hero-container min-h-screen">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="stone-plaque"
        >
          <span className="plaque-subtitle">Protocol // 1028bc_Master</span>
          <h1 className="plaque-title">1028bc</h1>
          <p className="plaque-desc">
            Integrated architectural framework for <span className="text-white">infrastructure development</span>, 
            <span className="text-white">urban intelligence</span>, and <span className="text-white">field operations</span>.
            master control by lead architect brian kurtis campbell.
          </p>

          <div className="mt-12 flex justify-center gap-10 opacity-30 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center gap-2">
              <Shield size={18} className="text-sky-400" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40 font-mono">[Vault]</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Activity size={18} className="text-sky-400" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40 font-mono">[Live]</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap size={18} className="text-sky-400" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40 font-mono">[Direct]</span>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 text-white/20 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => document.getElementById('telemetry')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-[9px] font-black tracking-[0.4em] uppercase">initialize_sectors</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: ACTIVE_DEPLOYMENTS (Grid-Snapped) */}
      <section id="telemetry" className="py-0 border-t border-white/5 bg-black/60 relative z-10">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <DeploymentNode 
              title="SolUrbana Grid" 
              desc="Comprehensive urban intelligence and utility comparison framework." 
              status="Live" 
              onClick={() => setCurrentView('portfolio')}
            />
            <DeploymentNode 
              title="Field Engine" 
              desc="Modular break-fix warranty repair HUD for technicians." 
              status="Alpha" 
              onClick={() => setCurrentView('portfolio')}
            />
            <DeploymentNode 
              title="1028bc Protocol" 
              desc="Neural-etched hardware assets and node marketplace." 
              status="Operational" 
              onClick={() => setCurrentView('marketplace')}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: SECTOR GATEWAYS */}
      <div className="flex flex-col relative z-10">
        {HERO_DATA.map((hero, index) => (
          <CinematicHero
            key={hero.id}
            data={hero}
            delay={index * 0.1}
            onClick={() => setCurrentView(hero.view)}
          />
        ))}
      </div>

      {/* SECTION 4: DOCKED TERMINAL UTILITY (INGESTOR) */}
      <div className="fixed bottom-8 right-8 z-[1000]">
        <button 
          onClick={() => setTerminalOpen(!terminalOpen)}
          className={`p-4 brutalist-module flex items-center gap-3 font-black uppercase text-[10px] tracking-widest transition-all ${terminalOpen ? 'bg-white text-black' : 'bg-sky-500 text-black hover:bg-white'}`}
        >
          {terminalOpen ? <X size={16} /> : <Terminal size={16} />}
          {terminalOpen ? 'Close_Terminal' : 'Terminal_Ingestor'}
        </button>

        <AnimatePresence>
          {terminalOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-[400px] md:w-[500px] bg-[#0d0d0d] border-2 border-sky-400/30 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <Terminal size={14} className="text-sky-400" />
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.3em]">Master_Ingestor_v2.7</span>
              </div>
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

const DeploymentNode = ({ title, desc, status, onClick }: { title: string, desc: string, status: string, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="p-12 border-r border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-sky-500/30 transition-all cursor-pointer group relative"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className={`w-1.5 h-1.5 rounded-none ${status === 'Live' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
      <span className="text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40">{status}</span>
    </div>
    <h3 className="text-3xl font-black italic text-white tracking-tighter mb-4 lowercase leading-none">{title}</h3>
    <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">{desc}</p>
    <div className="flex items-center gap-2 text-[10px] font-black text-white/10 group-hover:text-sky-400 transition-colors uppercase tracking-[0.2em]">
      Initialize_Node_Access <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </div>
  </div>
);