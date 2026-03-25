import React, { useState } from 'react';
import { ShieldAlert, Sun, ChevronRight, HardHat } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useApp } from '../context/AppContext';

// Screen Imports
import { SolUrbanaScreen } from './SolUrbanaScreen';
import { SolShiftScreen } from './SolShiftScreen'; 
import { TGGGameScreen } from './TGGGameScreen';

export const PortfolioScreen = () => {
  const { currentBrand } = useApp(); // [PATCH]: Engine Hook Injected
  const [activeProject, setActiveProject] = useState<'overview' | 'solurbana' | 'solshift' | 'tgg_sim'>('overview');

  const renderProject = () => {
    switch (activeProject) {
      case 'solurbana': return <SolUrbanaScreen />;
      case 'solshift': return <SolShiftScreen />;
      case 'tgg_sim': return <TGGGameScreen />;
      default: return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 relative z-10">
          <ProjectCard 
            title="SolUrbana" 
            desc="Environmental Logistics Vault" 
            icon={ShieldAlert} 
            onClick={() => setActiveProject('solurbana')} 
            brand={currentBrand}
          />
          <ProjectCard 
            title="SolShift" 
            desc="Heat Logic Action Game" 
            icon={Sun} 
            onClick={() => setActiveProject('solshift')} 
            brand={currentBrand}
          />
          <ProjectCard 
            title="TGG: Simulation" 
            desc="Survival/Crafting Tech Sim" 
            icon={HardHat} 
            onClick={() => setActiveProject('tgg_sim')} 
            brand={currentBrand}
          />
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full pb-24">
      <PageHeader 
        titleTop="PROJECT" 
        titleBottom="PORTFOLIO" 
        activePage={activeProject === 'overview' ? 'PORTFOLIO' : `PORTFOLIO / ${activeProject.toUpperCase()}`}