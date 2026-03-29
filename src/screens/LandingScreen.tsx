import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Briefcase, ShoppingCart, Terminal, Shield, Activity, Zap, ChevronDown } from 'lucide-react';

export type AppView = 'landing' | 'profile' | 'portfolio' | 'marketplace' | 'auth' | 'admin';

interface LandingScreenProps {
  setCurrentView: (v: AppView) => void;
  onOpenThemeInfo?: () => void;
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
    subtitle: 'direct-to-consumer infrastructure for neural-etched hard goods and legacy hardware nodes.',
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
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.1 }
    );
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
          className={`h-full w-full object-cover object-[center_20%] opacity-50 transition-opacity duration-1000 group-hover:opacity-70 ${
            inView ? 'animate-pan' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full md:w-3/4 lg:w-1/2 backdrop-blur-xl bg-black/30 p-12 md:p-16 lg:p-20 rounded-tr-[3rem] border-t border-r border-white/10 transition-transform duration-700 group-hover:translate-x-4">
        <div className="flex items-center gap-3 mb-6">
          <data.icon className="h-5 w-5 text-sky-400" />
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-sky-400/80">sector gateway</span>
        </div>
        
        <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] italic">
          {data.title}
        </h2>
        
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 font-medium">
          {data.subtitle}
        </p>

        <div className="mt-10 flex items-center gap-4 text-[11px] font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
          initialize sector uplink <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-4" />
        </div>
      </div>
    </motion.section>
  );
};

export const LandingScreen = ({ setCurrentView }: LandingScreenProps) => {
  return (
    <div className="w-full bg-black">
      <style>{`
        @keyframes pan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -1%); }
        }
        .animate-pan {
          animation: pan 20s linear infinite alternate;
          will-change: transform;
        }
      `}</style>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 mb-8">
            <Terminal size={14} className="text-sky-400" />
            <span className="text-[10px] font-black tracking-[0.3em] text-sky-400">node 1028bc // master protocol</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-none mb-8 italic">
            1028bc
          </h1>

          <p className="max-w-2xl text-lg md:text-2xl text-white/50 font-medium leading-relaxed mb-12">
            the integrated architectural framework for <span className="text-white">infrastructure development</span>, 
            <span className="text-white">urban intelligence</span>, and <span className="text-white">field operations</span>. 
            controlled by lead architect brian kurtis campbell.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            {[
              { icon: Shield, label: 'secure vault', desc: 'iam & credential management' },
              { icon: Activity, label: 'telemetry', desc: 'real-time system status' },
              { icon: Zap, label: 'directives', desc: 'solurbana & active projects' }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/5 bg-white/[0.02] text-left">
                <item.icon size={20} className="text-sky-400 mb-4" />
                <h3 className="text-[10px] font-black tracking-widest text-white mb-1">{item.label}</h3>
                <p className="text-[9px] font-mono text-white/30 tracking-tighter">{item.desc}</p>
              </div>
            ))}
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-20 text-white/20 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-black tracking-[0.4em]">initialize sectors</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

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