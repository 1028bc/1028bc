import React from 'react';
import { useApp } from './context/AppContext';

// SCREENS
import { DashboardScreen } from './screens/DashboardScreen';
import { LogicLabScreen } from './screens/LogicLab';
import { FieldOpsScreen } from './screens/FieldOpsScreen';
import { PlatformEngineScreen } from './screens/PlatformEngine';
import { PortfolioScreen } from './screens/PortfolioScreen';

// SHARED
import { StatusIndicator } from './components/PageHeader';

function App() {
  // [PATCH]: Injected currentBrand to hook into the UI Engine
  const { activeTab, setActiveTab, currentBrand } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardScreen />;
      case 'engine': return <PlatformEngineScreen />;
      case 'fieldops': return <FieldOpsScreen />;
      case 'logiclab': return <LogicLabScreen />;
      case 'portfolio': return <PortfolioScreen />;
      default: return <DashboardScreen />;
    }
  };

  const navItems = ['dashboard', 'engine', 'fieldops', 'logiclab', 'portfolio'];

  return (
    <div className="min-h-screen bg-charcoal text-offwhite font-sans overflow-x-hidden">
      
      {/* TOP DESKTOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-charcoal-light px-6 py-4 flex justify-between items-center">
        {/* Dynamic Logo */}
        <div className="font-display font-black text-xl tracking-tighter cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          {currentBrand.logoText === '1028BC' ? (
            <>1028<span className={currentBrand.accentColor}>BC</span></>
          ) : (
            <span className={currentBrand.accentColor}>{currentBrand.logoText}</span>
          )}
        </div>
        
        {/* Dynamic Nav Buttons */}
        <div className="hidden lg:flex gap-6 items-center">
          {navItems.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
                activeTab === tab ? currentBrand.accentColor : 'text-offwhite/40 hover:text-white'
              }`}
            >
              {tab.replace('fieldops', 'FIELD_OPS').replace('logiclab', 'LOGIC_LAB')}
            </button>
          ))}
        </div>
        <StatusIndicator />
      </nav>

      <main className="pt-24 pb-24 px-6 relative z-10">
        {renderContent()}
      </main>

      {/* TACTICAL FOOTER NAV FOR MOBILE */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-charcoal-light/90 backdrop-blur-xl border border-white/5 px-6 py-3 rounded-full flex gap-6 z-50 lg:hidden shadow-2xl w-[90%] max-w-sm justify-between overflow-x-auto no-scrollbar">
         {navItems.map(tab => (
           <button 
            key={`mobile-${tab}`} 
            onClick={() => setActiveTab(tab)}
            className={`font-mono text-[9px] uppercase tracking-widest whitespace-nowrap ${
              activeTab === tab ? currentBrand.accentColor : 'text-offwhite/40'
            }`}
           >
             {tab === 'dashboard' ? 'DASH' : tab.replace('fieldops', 'OPS').replace('logiclab', 'LAB').replace('portfolio', 'PORT')}
           </button>
         ))}
      </div>
    </div>
  );
}

export default App;