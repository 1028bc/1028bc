import React from 'react';
import { Code2, Github, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/PageHeader';

export const LogicLabScreen = () => {
  const { infoOverlaysEnabled } = useApp();

  return (
    <div className="max-w-7xl mx-auto w-full pb-24">
      <PageHeader titleTop="LOGIC" titleBottom="LAB" activePage="LOGIC_LAB">
        <div className="absolute top-0 right-12 opacity-10 pointer-events-none">
          <Code2 size={400} strokeWidth={0.5} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-charcoal-light/30 border border-charcoal-light p-8 rounded-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow/10 border border-yellow/20 flex items-center justify-center">
                  <Github className="text-yellow" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white">Active Bounties</h3>
                  <p className="font-mono text-xs text-offwhite/50 uppercase tracking-widest text-yellow/70">Source: gitlab.com/1028bc-bounty-ops</p>
                </div>
              </div>
              {/* Bounty List Logic Goes Here */}
              <div className="p-4 border border-charcoal-light bg-charcoal/50 font-mono text-sm text-offwhite/70 italic">
                Awaiting API handshake...
              </div>
            </section>
          </div>
        </div>
      </PageHeader>
    </div>
  );
};