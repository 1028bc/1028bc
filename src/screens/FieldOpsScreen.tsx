import React from 'react';
import { MapPin, AlertTriangle, CheckSquare, Mic, Calendar, MessageSquare, Clock, ShieldAlert } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useApp } from '../context/AppContext';

export const FieldOpsScreen = () => {
  const { currentBrand } = useApp();

  return (
    <div className="max-w-7xl mx-auto w-full pb-24">
      <PageHeader titleTop="FIELD" titleBottom="OPS" activePage="STATION_01">
        
        <div className="flex justify-between items-center mb-6 border-b border-charcoal-light pb-4">
          <h2 className="font-mono text-xs text-white uppercase tracking-widest">
            TECH CONSOLE v5.0 <span className="text-offwhite/30">// MULTI NODE</span>
          </h2>
          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border ${currentBrand.borderColor} ${currentBrand.accentColor} ${currentBrand.bgAlpha}`}>
            Release Candidate
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          
          {/* LEFT COLUMN: ROUTING & DIRECTIVE */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Nav Data */}
            <section className="bg-charcoal-light/10 border border-charcoal-light p-5">
              <h3 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin size={12} className={currentBrand.accentColor} /> NAV DATA / ROUTING
              </h3>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between"><span className="text-offwhite/40">DESTINATION:</span> <span className="text-white">Node 04</span></div>
                <div className="flex justify-between"><span className="text-offwhite/40">ETA:</span> <span className={currentBrand.accentColor}>14 mins</span></div>
                <div className="flex justify-between"><span className="text-offwhite/40">STATUS:</span> <span className="text-green-400">En Route</span></div>
              </div>
            </section>

            {/* Active SOP */}
            <section className="bg-charcoal-light/10 border border-charcoal-light p-5 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${currentBrand.bgColor}`}></div>
              <h3 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest mb-4">ACTIVE SOP</h3>
              <p className="font-display text-sm text-white leading-relaxed mb-4">
                Run hardware check and replace faulty logic board on Node 04.
              </p>
              <div className="p-3 bg-red-500/10 border border-red-500/30 flex gap-3 items-start">
                <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <p className="font-mono text-[10px] text-red-200/80 uppercase leading-relaxed">
                  <strong className="text-red-400">WARNING:</strong> High voltage area. Ensure residual power drainage before chassis breach.
                </p>
              </div>
            </section>

            {/* Site Prep */}
            <section className="bg-charcoal-light/10 border border-charcoal-light p-5">
              <h3 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                <CheckSquare size={12} className={currentBrand.accentColor} /> SITE PREP
              </h3>
              <ul className="space-y-3 font-mono text-xs text-offwhite/70">
                {['Job Site Secured', '4-Point Inspection', 'Message Hub Established', 'Power Isolated', 'System Data Sync'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 border border-charcoal-light rounded-sm"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* RIGHT COLUMN: WORKSPACE & COMMS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Workspace */}
            <section className="bg-charcoal-light/10 border border-charcoal-light p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest">MAIN WORKSPACE</h3>
                <button className={`flex items-center gap-2 font-mono text-[10px] ${currentBrand.accentColor} hover:text-white transition-colors`}>
                  <Mic size={12} /> TAP TO DICTATE
                </button>
              </div>
              <textarea 
                className="w-full h-32 bg-charcoal/50 border border-charcoal-light p-4 font-mono text-xs text-white placeholder-offwhite/20 focus:outline-none focus:border-yellow/50 transition-colors resize-none mb-4"
                placeholder="Closing Notes..."
              ></textarea>
              <div className="flex gap-4">
                <button className="flex-1 py-3 border border-charcoal-light bg-charcoal-light/30 font-mono text-xs text-offwhite/50 uppercase hover:bg-charcoal-light/50 transition-colors">
                  Attach Asset
                </button>
                <button className={`flex-1 py-3 border ${currentBrand.borderColor} ${currentBrand.bgAlpha} font-mono text-xs ${currentBrand.accentColor} uppercase font-bold hover:bg-opacity-20 transition-all`}>
                  Submit to Log
                </button>
              </div>
            </section>

            {/* Grid for Calendar & Messages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Calendar */}
              <section className="bg-charcoal-light/10 border border-charcoal-light p-5">
                <h3 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar size={12} className={currentBrand.accentColor} /> WORK CALENDAR
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between p-2 bg-charcoal-light/30 border-l-2 border-charcoal-light font-mono text-xs">
                    <span className="text-white">Starbucks NV-04</span><span className="text-offwhite/50">0900hrs</span>
                  </div>
                  <div className="flex justify-between p-2 bg-charcoal-light/30 border-l-2 border-yellow font-mono text-xs">
                    <span className={currentBrand.accentColor}>Substation Alpha</span><span className="text-offwhite/50">1130hrs</span>
                  </div>
                  <div className="flex justify-between p-2 bg-charcoal-light/30 border-l-2 border-charcoal-light font-mono text-xs">
                    <span className="text-white">Sector 7G Relay</span><span className="text-offwhite/50">1415hrs</span>
                  </div>
                </div>
              </section>

              {/* Message Hub */}
              <section className="bg-charcoal-light/10 border border-charcoal-light p-5">
                <h3 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <MessageSquare size={12} className={currentBrand.accentColor} /> MESSAGE HUB
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border border-red-500/20 bg-red-500/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[9px] text-red-400 font-bold uppercase">PHONE // NOC</span>
                      <span className="font-mono text-[9px] text-offwhite/30">14:45 PST</span>
                    </div>
                    <p className="font-mono text-[10px] text-white leading-relaxed">
                      <span className="text-red-400">CRITICAL:</span> Node 04 temperature exceeding safe limits. IMMEDIATE action required.
                    </p>
                  </div>
                  <div className="p-3 border border-charcoal-light bg-charcoal/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-mono text-[9px] ${currentBrand.accentColor} font-bold uppercase`}>TEAMS // PARTS</span>
                      <span className="font-mono text-[9px] text-offwhite/30">14:35 PST</span>
                    </div>
                    <p className="font-mono text-[10px] text-offwhite/70 leading-relaxed">
                      <span className="text-white">Sarah T:</span> Logic board delivered to site lockbox.
                    </p>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </div>
      </PageHeader>
    </div>
  );
};