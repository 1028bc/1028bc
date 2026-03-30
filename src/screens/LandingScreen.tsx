import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Briefcase, ShoppingCart, Terminal, Shield, Activity, Zap, ChevronDown } from 'lucide-react';
import { IntelDashboard } from '../components/IntelDashboard';
import '../styles/StonePlaque.css';

export type AppView = 'landing' | 'profile' | 'portfolio' | 'marketplace' | 'auth' | 'admin';

interface LandingScreenProps {
  setCurrentView: (v: AppView) => void;
}

const IMG_PROFILE = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=85&w=2400&auto=format&fit=crop';
const IMG_PORTFOLIO = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=85&w=2400&auto=format&fit=crop';
const IMG_MARKETPLACE = 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=85&w=2400&auto=format&fit=crop';

const HERO_DATA = [
  {
    id: 'profile',
    view: 'profile' as AppView,
    title: 'the architect',
    subtitle: 'interactive resume, operational history, and active credentials.',
    image: IMG_PROFILE,
    icon: User
  },
  {
    id: 'portfolio',
    view: 'portfolio' as AppView,
    title: 'active portfolio',
    subtitle: 'case studies of solurbana interfaces and engineering deployments.',
    image: IMG_PORTFOLIO,
    icon: Briefcase
  },
  {
    id: 'marketplace',
    view: 'marketplace' as AppView,
    title: 'the 1028bc shop',
    subtitle: 'direct-to-consumer infrastructure for neural-etched hard goods.',
    image: IMG_MARKETPLACE,
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
      className="group relative h-screen w-full overflow-hidden cursor-pointer border-b border-white/5"
    >
      <div className="absolute inset-0 bg-black">
        <img
          src={data.image}
          alt=""
          className={`h-full w-full object-cover object-[center_20%] opacity-40 transition-opacity duration-1000 group-hover:opacity-60 ${inView ? 'animate-pan' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full md:w-3/4 lg:w-1/2 backdrop-blur-xl bg-black/30 p-12 md:p-16 lg:p-20 rounded-tr-[3rem] border-t border-r border-white/10 transition-transform duration-700 group-hover:translate-x-4">
        <div className="flex items-center gap-3 mb-6">
          <data.icon className="h-5 w-5 text-sky-400" />
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-sky-400/80 uppercase">sector_gateway</span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] italic lowercase">{data.title}</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 font-medium">{data.subtitle}</p>
        <div className="mt-10 flex items-center gap-4 text-[11px] font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors uppercase">
          initialize sector uplink <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-4" />
        </div>
      </div>
    </motion.section>
  );
};

export const LandingScreen = ({ setCurrentView }: LandingScreenProps) => {
  return (
    <div className="w-full bg-[#050505]">
      <style>{`
        @keyframes pan { 0% { transform: scale(1); } 100% { transform: scale(1.1) translate(-2%, -1%); } }
        .animate-pan { animation: pan 20s linear infinite alternate; will-change: transform; }
      `}</style>

      {/* SECTION 1: THE #17 STONE HERO */}
      <section className="stone-hero-wrapper min-h-screen">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="stone-plaque"
        >
          <span className="stone-plaque-sub">Protocol // 1028bc_Master</span>
          <h1 className="stone-plaque-title">1028bc</h1>
          <p className="stone-plaque-desc">
            Integrated architectural framework for <span className="text-white">infrastructure development</span>, 
            <span className="text-white">urban intelligence</span>, and <span className="text-white">field operations</span>. 
            master control by architect brian kurtis campbell.
          </p>

          <div className="flex justify-center gap-8 mb-12">
            {[
              { icon: Shield, label: 'Vault' },
              { icon: Activity, label: 'Telemetry' },
              { icon: Zap, label: 'Directives' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon size={18} className="text-sky-500/50" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">{item.label}</span>
              </div>
            ))}
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white/20 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-black tracking-[0.4em] uppercase">initialize_sectors</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: THE AUTOMATION HUB (INTELLIGENCE DASHBOARD) */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Terminal size={18} className="text-sky-400" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400">Intelligence_Ingestor</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none mb-6">
              Automated_Ops
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-8 font-light">
              24/7 automated data harvesting via Oxylabs and Firecrawl API. 
              Transforming YouTube transcripts and documentation into actionable internal logic.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-white/5 bg-white/[0.01] rounded-xl">
                <span className="block text-[10px] font-black text-white/30 uppercase mb-1">Status</span>
                <span className="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest">Uplink Stable</span>
              </div>
              <div className="p-4 border border-white/5 bg-white/[0.01] rounded-xl">
                <span className="block text-[10px] font-black text-white/30 uppercase mb-1">Queue</span>
                <span className="text-sky-400 font-mono text-xs font-bold uppercase tracking-widest">0 Tasks Pending</span>
              </div>
            </div>
          </div>
          
          <IntelDashboard />
        </div>
      </section>

      {/* SECTION 3: SECTOR GATEWAYS */}
      <div className="flex flex-col">
        {HERO_DATA.map((hero, index) => (
          <CinematicHero
            key={hero.id}
            data={hero}
            delay={index * 0.1}
            onClick={() => setCurrentView(hero.view)}
          />
        ))}
      </div>
    </div>
  );
};