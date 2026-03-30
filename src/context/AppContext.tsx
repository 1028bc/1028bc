import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useContextKeep } from '../hooks/useContextKeep';

// 1. define the tenants (lowercase protocol enforced)
export type BrandID = '1028bc' | 'tech_guy';
export type app_view = 'landing' | 'profile' | 'portfolio' | 'marketplace' | 'auth' | 'admin';

interface BrandConfig {
  id: BrandID;
  label: string;
  shortName: string;
  accentColor: string;  // tailwind text color
  borderColor: string;  // tailwind border color
  bgAlpha: string;      // tailwind transparent bg
  bgColor: string;      // tailwind solid bg
  logoText: string;
}

// 2. the brand map (strictly lowercase)
const BRAND_MAP: Record<BrandID, BrandConfig> = {
  '1028bc': {
    id: '1028bc',
    label: '1028bc master platform',
    shortName: '1028bc',
    accentColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    bgAlpha: 'bg-blue-500/10',
    bgColor: 'bg-blue-500',
    logoText: '1028bc',
  },
  'tech_guy': {
    id: 'tech_guy',
    label: 'tech guy on the go',
    shortName: 'tgotg',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-400',
    bgAlpha: 'bg-cyan-400/10',
    bgColor: 'bg-cyan-400',
    logoText: 'tech_guy'
  }
};

interface AppContextType {
  // session & view state
  user: any | null;
  setUser: (user: any | null) => void;
  currentView: app_view;
  setCurrentView: (view: app_view) => void;
  theme: 'cyber' | 'minimal';
  setTheme: (theme: 'cyber' | 'minimal') => void;
  
  // field ops & brand state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  infoOverlaysEnabled: boolean;
  setInfoOverlaysEnabled: (enabled: boolean) => void;
  currentBrand: BrandConfig;
  setBrand: (id: BrandID) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // the hook now points to the vercel edge api instead of localhost
  const { saveState } = useContextKeep();
  
  // existing operational state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [infoOverlaysEnabled, setInfoOverlaysEnabled] = useState(false);
  const [brandID, setBrandID] = useState<BrandID>('1028bc');

  // new global protocol state
  const [user, setUser] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState<app_view>('landing');
  const [theme, setTheme] = useState<'cyber' | 'minimal'>('cyber');

  // --- uplink logic: push brand state to vercel edge (global uplink) ---
  useEffect(() => {
    saveState('1028bc_active_brand', { 
      id: brandID, 
      timestamp: new Date().toISOString(),
      node: 'global_edge_01' // updated from local node
    });
  }, [brandID, saveState]);

  const value = {
    user,
    setUser,
    currentView,
    setCurrentView,
    theme,
    setTheme,
    activeTab,
    setActiveTab,
    infoOverlaysEnabled,
    setInfoOverlaysEnabled,
    currentBrand: BRAND_MAP[brandID],
    setBrand: (id: BrandID) => setBrandID(id),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};