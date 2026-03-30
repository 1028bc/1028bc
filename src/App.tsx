import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Settings, MoreVertical, LogOut, ShoppingCart, Activity, ShieldAlert, User } from 'lucide-react';
import { useApp } from './context/AppContext';
import { LandingScreen, type AppView } from './screens/LandingScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { AuthScreen } from './screens/AuthScreen';
import { MarketplaceScreen } from './screens/MarketplaceScreen';
import { CommerceGridScreen } from './screens/CommerceGridScreen';
import { FieldOpsScreen } from './screens/FieldOpsScreen';
import { HelpScreen } from './screens/HelpScreen'; // NEW IMPORT

export type ExtendedAppView = AppView | 'selection' | 'field-ops' | 'help';

const PROMPT_LINKS: { label: string; view: ExtendedAppView }[] = [
  { label: 'THE ARCHITECT', view: 'profile' },
  { label: 'ACTIVE PORTFOLIO', view: 'portfolio' },
  { label: 'THE 1028bc SHOP', view: 'marketplace' },
  { label: 'PORTAL UPLINK', view: 'auth' },
];

export default function App() {
  const { currentBrand } = useApp();
  const [currentView, setCurrentView] = useState<ExtendedAppView>('landing');
  const [isPromptMenuOpen, setIsPromptMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // HUD Physics State
  const [headerState, setHeaderState] = useState<'closed' | 'peek' | 'locked'>('closed');
  const touchStartY = useRef(0);
  const lastTap = useRef(0);

  const promptWrapRef = useRef<HTMLDivElement>(null);
  const settingsWrapRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!promptWrapRef.current?.contains(e.target as Node)) setIsPromptMenuOpen(false);
      if (!settingsWrapRef.current?.contains(e.target as Node)) setIsSettingsOpen(false);
    };
    if (isPromptMenuOpen || isSettingsOpen) {
      document.addEventListener('mousedown', close);
      return () => document.removeEventListener('mousedown', close);
    }
  }, [isPromptMenuOpen, isSettingsOpen]);

  // Touch & Swipe Physics for HUD
  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchMove = (e: React.TouchEvent) => {
    const y = e.touches[0].clientY;
    if (y > touchStartY.current + 20 && touchStartY.current < 50) {
      if (headerState !== 'locked') setHeaderState('peek');
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setHeaderState(prev => prev === 'locked' ? 'closed' : 'locked');
    }
    lastTap.current = now;
  };

  const handleAuthSuccess = (adminStatus: boolean) => {
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
    setCurrentView(adminStatus ? 'selection' : 'field-ops');
  };

  const renderView = () => {
    switch (currentView) {
      case 'profile': return <ProfileScreen />;
      case 'portfolio': return <PortfolioScreen />;
      case 'marketplace': return <MarketplaceScreen onNavigateToAdmin={() => { setIsAuthenticated(true); setIsAdmin(true); setCurrentView('selection'); }} />;
      case 'help': return <HelpScreen />; // NEW ROUTE
      
      case 'selection': 
        return (
          <div className="w-full min-h-screen flex items-center justify-center p-6 bg-charcoal-dark font-display">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
              <button onClick={() => setCurrentView('admin')} className="group p-10 bg-charcoal border border-white/10 rounded-3xl hover:border-amber-400/50 transition-all text-left relative overflow-hidden">
                <div className="p-4 bg-amber-400/10 rounded-2xl w-fit mb-6 text-amber-400"><ShoppingCart size={32} /></div>
                <h3 className="text-2xl font-black text-white uppercase italic">Commerce Grid</h3>
                <p className="text-xs text-white/40 mt-2 font-mono uppercase tracking-widest leading-relaxed">Financial Oversight & Neural Asset Pipeline</p>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Terminal size={80} /></div>
              </button>
              <button onClick={() => setCurrentView('field-ops')} className="group p-10 bg-charcoal border border-white/10 rounded-3xl hover:border-sky-400/50 transition-all text-left relative overflow-hidden">
                <div className="p-4 bg-sky-400/10 rounded-2xl w-fit mb-6 text-sky-400"><Activity size={32} /></div>
                <h3 className="text-2xl font-black text-white uppercase italic">Field Engine</h3>
                <p className="text-xs text-white/40 mt-2 font-mono uppercase tracking-widest leading-relaxed">Tactical Service Dispatch & Technical HUD</p>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><ShieldAlert size={80} /></div>
              </button>
            </div>
          </div>
      );
      case 'admin': return <CommerceGridScreen isAdmin={isAdmin} />;
      case 'field-ops': return <FieldOpsScreen accessLevel={isAdmin ? 'ADMIN' : 'USER'} />;
      case 'auth': 
        return isAuthenticated 
          ? <div className="p-20 text-center"><button onClick={() => setCurrentView('selection')} className="text-sky-400 font-bold uppercase tracking-widest border border-sky-500/30 p-4 rounded-xl hover:bg-sky-500/10 transition-colors">Return to Selection</button></div> 
          : <AuthScreen onAuthenticate={handleAuthSuccess} />;
      case 'landing': 
      default: return <LandingScreen setCurrentView={setCurrentView} />;
    }
  };

  const homeLabel = currentBrand.id === '1028bc' ? '1028bc' : currentBrand.logoText;
  const isFieldOps = currentView === 'field-ops';

  return (
    <div 
      className={isFieldOps ? "app-container font-display transition-colors duration-500" : "min-h-screen flex flex-col bg-charcoal text-offwhite font-display transition-colors duration-500"}
      onTouchStart={isFieldOps ? handleTouchStart : undefined}
      onTouchMove={isFieldOps ? handleTouchMove : undefined}
    >
      
      {/* DRAWER TRIGGER ZONE (Only active in Field Ops mode) */}
      {isFieldOps && (
        <div 
          className="header-trigger-zone"
          onMouseEnter={() => { if (headerState !== 'locked') setHeaderState('peek') }}
        ></div>
      )}
      
      {/* CONTEXT-AWARE GLOBAL HEADER */}
      <header 
        onClick={isFieldOps ? handleDoubleTap : undefined}
        onMouseLeave={() => { if (isFieldOps && headerState !== 'locked') setHeaderState('closed') }}
        className={`app-header ${isFieldOps ? `field-ops-mode ${headerState}` : 'standard'}`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 pointer-events-auto">
          <div ref={promptWrapRef} className="relative flex shrink-0 items-center">
            <button type="button" onClick={() => { setIsPromptMenuOpen(!isPromptMenuOpen); setIsSettingsOpen(false); }} className="rounded-lg p-1.5 text-offwhite/85 transition-colors hover:bg-white/10 hover:text-white">
              <Terminal size={20} strokeWidth={1.75} />
            </button>
            {isPromptMenuOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-charcoal-dark/95 shadow-2xl backdrop-blur-2xl">
                {PROMPT_LINKS.map(({ label, view }) => (
                  <button key={view + label} type="button" onClick={() => { setCurrentView(view); setIsPromptMenuOpen(false); }} className="block w-full border-b border-white/5 px-4 py-3.5 text-left text-[10px] font-black tracking-[0.2em] text-offwhite/90 transition-colors last:border-b-0 hover:bg-white/10 hover:text-white uppercase">
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" onClick={() => { setCurrentView('landing'); setIsPromptMenuOpen(false); setIsSettingsOpen(false); }} className="truncate font-display text-sm font-semibold tracking-tight text-white hover:text-sky-400 transition-colors">
            {homeLabel}
          </button>
          <span className="shrink-0 text-offwhite/35">·</span>
          <div className="flex min-w-0 items-center gap-1">
            <span className="truncate font-display text-sm font-normal tracking-tight text-offwhite/45 uppercase">SolUrbana</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 pointer-events-auto">
          <button onClick={() => setCurrentView('auth')} className="hidden sm:block border border-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:border-white/30 transition-all rounded-lg">
            {isAuthenticated ? (isAdmin ? 'Admin: Active' : 'Tech: Active') : 'Portal Uplink'}
          </button>
          <div ref={settingsWrapRef} className="relative">
            <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="p-2 text-white/50 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
            {isSettingsOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-charcoal-dark/95 p-2 shadow-2xl backdrop-blur-xl">
                 {isAuthenticated && (
                   <button onClick={() => { setCurrentView('profile'); setIsSettingsOpen(false); }} className="w-full text-left p-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/5 border-b border-white/5 flex items-center gap-2 transition-colors">
                     <User size={14} /> Identity / Config
                   </button>
                 )}
                 <button onClick={() => { setIsAuthenticated(false); setIsAdmin(false); setIsSettingsOpen(false); setCurrentView('landing'); }} className="w-full text-left p-3 text-[10px] font-black uppercase tracking-widest text-red-400/80 hover:text-red-400 hover:bg-white/5 rounded-b-lg transition-all flex items-center gap-2">
                  <LogOut size={14} /> Reset System
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main className={isFieldOps ? "map-wrapper" : "flex-grow w-full relative z-10"}>
        {renderView()}
      </main>

      {/* DISCREET GLOBAL FOOTER (Hidden in Field Ops Mode) */}
      {!isFieldOps && (
        <footer className="w-full border-t border-white/5 bg-black/40 py-6 mt-12 relative z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
              © 2026 1028bc_OS // SolUrbana Protocol
            </span>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              <button onClick={() => setCurrentView('landing')} className="hover:text-white transition-colors">Sitemap</button>
              <button onClick={() => setCurrentView('help')} className="hover:text-sky-400 transition-colors">Help & F.A.Q.</button>
              <button className="hover:text-white transition-colors">Sys Status</button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}