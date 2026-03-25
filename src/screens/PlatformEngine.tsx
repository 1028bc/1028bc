import React from 'react';
import { Layers, Settings, Palette, Database, Power } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/PageHeader';

export const PlatformEngineScreen = () => {
  const { currentBrand, setBrand } = useApp();

  return (
    <div className="max-w-7xl mx-auto w-full pb-24">
      <PageHeader titleTop="1028BC" titleBottom="FIELD OPS ENGINE" activePage="ENGINE_MASTER">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 relative z-10">
          
          {/* LEFT COLUMN: CAPABILITIES */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-charcoal-light/10 border border-charcoal-light p-8 h-full">
              <h3 className="text-xl font-display font-bold uppercase text-white mb-6 flex items-center gap-3">
                <Database className={currentBrand.accentColor} size={24} />
                Master Module Capabilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CapabilityItem 
                  icon={Database} 
                  brand={currentBrand}
                  title="API CORE" 
                  desc="Unified endpoints for GET /active_directive and POST /closing_notes." 
                />
                <CapabilityItem 
                  icon={Layers} 
                  brand={currentBrand}
                  title="SOP ENGINE" 
                  desc="Dynamic ingestion of repair protocols (Dell, HP, Lenovo)." 
                />
                <CapabilityItem 
                  icon={Palette} 
                  brand={currentBrand}
                  title="WHITE-LABEL" 
                  desc="Dynamic multi-tenant UI injection for rapid client deployment." 
                />
                <CapabilityItem 
                  icon={Settings} 
                  brand={currentBrand}
                  title="GPS & LOGS" 
                  desc="Automated time-tracking and geotagged deployment verification." 
                />
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: BRAND SWITCHER */}
          <aside className="space-y-6">
            <div className={`border ${currentBrand.borderColor} ${currentBrand.bgAlpha} p-6 transition-colors duration-300`}>
              <div className="flex items-center gap-2 mb-6">
                <Power className={`${currentBrand.accentColor} animate-pulse`} size={16} />
                <h4 className={`font-mono text-xs ${currentBrand.accentColor} uppercase tracking-widest font-bold`}>
                  Live Tenant Injection
                </h4>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setBrand('1028BC')}
                  className={`w-full py-3 px-4 border font-mono text-xs tracking-widest transition-all ${
                    currentBrand.id === '1028BC' 
                      ? 'bg-yellow text-charcoal border-yellow font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)]' 
                      : 'bg-charcoal/50 text-offwhite/50 border-charcoal-light hover:border-yellow/50'
                  }`}
                >
                  [INIT] 1028BC MASTER
                </button>
                
                <button 
                  onClick={() => setBrand('TECH_GUY')}
                  className={`w-full py-3 px-4 border font-mono text-xs tracking-widest transition-all ${
                    currentBrand.id === 'TECH_GUY' 
                      ? 'bg-cyan-400 text-charcoal border-cyan-400 font-bold shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                      : 'bg-charcoal/50 text-offwhite/50 border-charcoal-light hover:border-cyan-400/50'
                  }`}
                >
                  [INIT] TECH GUY ON THE GO
                </button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-charcoal-light/50">
                <p className="font-mono text-[10px] text-offwhite/50 uppercase leading-relaxed tracking-widest">
                  Active Instance: <span className="text-white font-bold">{currentBrand.label}</span><br/>
                  Theme Accent: <span className="text-white font-bold">{currentBrand.accentColor}</span>
                </p>
              </div>
            </div>
          </aside>

        </div>
      </PageHeader>
    </div>
  );
};

const CapabilityItem = ({ icon: Icon, title, desc, brand }: any) => (
  <div className={`p-4 bg-charcoal/40 border border-charcoal-light hover:${brand.borderColor} transition-colors group`}>
    <Icon className={`${brand.accentColor} mb-3 group-hover:scale-110 transition-transform`} size={24} />
    <h4 className="font-mono text-xs text-white uppercase tracking-tight mb-2">{title}</h4>
    <p className="font-mono text-[10px] text-offwhite/50 leading-relaxed uppercase">{desc}</p>
  </div>
);