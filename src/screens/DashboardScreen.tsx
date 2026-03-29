import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wrench, Code2, ShieldCheck, GitPullRequest, DollarSign, Activity, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/PageHeader';
import { InfoOverlay } from '../components/InfoOverlay';

// SERVICE IMPORTS
import { BountyService } from '../services/BountyService';
import type { BountyEntry } from '../services/BountyService';

// Notice we added accessLevel and setActiveTab as props here
export const DashboardScreen = ({ accessLevel, setActiveTab }: { accessLevel: string, setActiveTab: (t: string) => void }) => {
  const { infoOverlaysEnabled, currentBrand } = useApp();
  const [bounties, setBounties] = useState<BountyEntry[]>([]);

  useEffect(() => {
    BountyService.getLatestBounties().then(setBounties);
  }, []);

  const totalValue = BountyService.calculateTotal(bounties);

  // RBAC LOGIC: Who sees what
  const isGodOrAdmin = ['GOD', 'ADMIN', 'DEV'].includes(accessLevel);
  const showFieldOps = isGodOrAdmin || accessLevel === 'USER';
  const showCommerce = isGodOrAdmin || accessLevel === 'COMMERCE';

  const ProgressiveBentoPanel = ({ title, subtitle, icon: Icon, delay, targetTab, infoText }: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
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

  return (
    <div className="max-w-7xl mx-auto w-full pb-24 px-4">
      <PageHeader titleTop="COMMAND" titleBottom="CONTROL" activePage="OVERVIEW">
        <div className="absolute top-0 right-12 opacity-5 pointer-events-none">
          <Cpu size={400} strokeWidth={0.5} className={currentBrand.accentColor} />
        </div>

        {/* TOP TIER: LIVE TELEMETRY (Only Admins/Devs/Gods see global revenue) */}
        {isGodOrAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 relative z-10 mb-6">
            <section className="bg-charcoal-light/10 border border-charcoal-light p-5">
              <h3 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest mb-4 flex items-center gap-2"><DollarSign size={12} className={currentBrand.accentColor} /> REVENUE STREAM</h3>
              <div className={`text-5xl font-display font-black ${currentBrand.accentColor} mb-2`}>${totalValue}</div>
              <div className="font-mono text-xs text-offwhite/50 uppercase">Active Pipeline</div>
            </section>
            <section className="lg:col-span-2 bg-charcoal-light/10 border border-charcoal-light p-5">
              <h3 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest mb-4 flex items-center gap-2"><GitPullRequest size={12} className={currentBrand.accentColor} /> PENDING REVIEWS</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border border-charcoal-light bg-charcoal/30">
                  <div className="flex flex-col"><span className="font-mono text-xs text-white">tscircuit/core #690</span></div>
                  <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-widest bg-yellow/10 text-yellow border border-yellow/20">Awaiting</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* BOTTOM TIER: MODULAR DASHBOARD PANELS (RBAC GATED) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 relative z-10">
          
          {showFieldOps && (
            <ProgressiveBentoPanel delay={0.1} title={['FIELD', 'SERVICE']} subtitle="Hardware & Dispatch" icon={Wrench} targetTab="fieldops" infoText="Field technician routing and SOPs." />
          )}
          
          {showCommerce && (
            <ProgressiveBentoPanel delay={0.2} title={['COMMERCE', 'ENGINE']} subtitle="Etsy & Printify" icon={ShoppingCart} targetTab="commerce" infoText="Autonomous margins and fulfillment." />
          )}

          {isGodOrAdmin && (
            <ProgressiveBentoPanel delay={0.3} title={['DEV', 'WORKSPACE']} subtitle="API & Logic" icon={Code2} targetTab="logiclab" infoText="Active development APIs." />
          )}
          
          {isGodOrAdmin && (
            <ProgressiveBentoPanel delay={0.4} title={['PLATFORM', 'ADMIN']} subtitle="SaaS Controls" icon={ShieldCheck} targetTab="engine" infoText="Global tenant routing." />
          )}
        </div>
      </PageHeader>
    </div>
  );
};