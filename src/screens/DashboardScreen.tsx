import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wrench, Code2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/PageHeader';
import { InfoOverlay } from '../components/InfoOverlay';

const ProgressiveBentoPanel = ({ title, subtitle, icon: Icon, delay, targetTab, infoText }: any) => {
  const { setActiveTab, infoOverlaysEnabled, currentBrand } = useApp(); // [PATCH] Injected currentBrand
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={() => setActiveTab(targetTab)}
      className={`group relative ${currentBrand.bgAlpha} border border-charcoal-light p-8 rounded-sm hover:${currentBrand.borderColor} transition-all cursor-pointer overflow-hidden`}
    >
      <InfoOverlay text={infoText} enabled={infoOverlaysEnabled} />
      <div className="relative z-10">
        <Icon className={`${currentBrand.accentColor} mb-6 group-hover:scale-110 transition-transform`} size={32} />
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white leading-none mb-2">
          {title[0]} <span className={currentBrand.accentColor}>{title[1]}</span>
        </h3>
        <p className="font-mono text-xs text-offwhite/50 leading-relaxed uppercase tracking-widest">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export const DashboardScreen = () => {
  const { currentBrand } = useApp();

  return (
    <div className="max-w-7xl mx-auto w-full pb-24">
      <PageHeader titleTop="DASHBOARD" titleBottom="COMM CTR" activePage="OVERVIEW">
        <div className="absolute top-0 right-12 opacity-5 pointer-events-none">
          <Cpu size={400} strokeWidth={0.5} className={currentBrand.accentColor} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <ProgressiveBentoPanel 
            delay={0.1}
            title={['ENGINE', 'MASTER']}
            subtitle="Platform Admin & SaaS"
            icon={Cpu}
            targetTab="engine"
            infoText="Global tenant controls and white-label capabilities."
          />
          <ProgressiveBentoPanel 
            delay={0.2}
            title={['FIELD', 'OPS']}
            subtitle="Hardware Diagnostics"
            icon={Wrench}
            targetTab="fieldops"
            infoText="SOPs for Dell, HP, Lenovo repairs and deployments."
          />
          <ProgressiveBentoPanel 
            delay={0.3}
            title={['LOGIC', 'LAB']}
            subtitle="Bounty Sandbox"
            icon={Code2}
            targetTab="logiclab"
            infoText="Active GitLab/GitHub bounty tracking."
          />
          <ProgressiveBentoPanel 
            delay={0.4}
            title={['PROJECT', 'PORTFOLIO']}
            subtitle="Private & Gaming Vault"
            icon={ShieldCheck}
            targetTab="portfolio"
            infoText="Isolated environments (SolUrbana, SolShift, TGG Sim)."
          />
        </div>
      </PageHeader>
    </div>
  );
};