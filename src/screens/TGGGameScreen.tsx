import React from 'react';
import { HardHat, Hammer, BatteryFull, Map as MapIcon } from 'lucide-react';

export const TGGGameScreen = () => (
  <div className="max-w-7xl mx-auto w-full pb-24">
    <div className="bg-charcoal-light/10 border border-charcoal-light p-12 text-center">
      <div className="flex justify-center gap-4 mb-6">
        <HardHat className="text-yellow" size={40} />
        <Hammer className="text-offwhite/20" size={40} />
      </div>
      <h2 className="font-display text-3xl font-bold uppercase text-white mb-4">Tech Guy On The Go: <span className="text-yellow">The Simulation</span></h2>
      <p className="font-mono text-xs text-offwhite/50 uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
        Survival/Crafting Mechanics: Manage tool durability, battery levels, and route efficiency in a simulated field-tech environment.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
        <div className="p-4 border border-charcoal-light bg-charcoal/50">
          <BatteryFull size={20} className="text-yellow mb-2 mx-auto" />
          <p className="font-mono text-[9px] text-offwhite uppercase">Resource Mgmt</p>
        </div>
        <div className="p-4 border border-charcoal-light bg-charcoal/50">
          <Hammer size={20} className="text-yellow mb-2 mx-auto" />
          <p className="font-mono text-[9px] text-offwhite uppercase">Crafting/Repair</p>
        </div>
        <div className="p-4 border border-charcoal-light bg-charcoal/50">
          <MapIcon size={20} className="text-yellow mb-2 mx-auto" />
          <p className="font-mono text-[9px] text-offwhite uppercase">Open World</p>
        </div>
      </div>
    </div>
  </div>
);