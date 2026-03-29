import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useContextKeep } from '../hooks/useContextKeep';

// 1. DEFINE THE TENANTS
export type BrandID = '1028BC' | 'TECH_GUY';

interface BrandConfig {
  id: BrandID;
  label: string;
  shortName: string;
  accentColor: string;  // Tailwind text color
  borderColor: string;  // Tailwind border color
  bgAlpha: string;      // Tailwind transparent bg
  bgColor: string;      // Tailwind solid bg
  logoText: string;
}

// 2. THE BRAND MAP
const BRAND_MAP: Record<BrandID, BrandConfig> = {
  '1028BC': {
    id: '1028BC',
    label: '1028BC MASTER PLATFORM',
    shortName: '1028BC',
    accentColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    bgAlpha: 'bg-blue-500/10',
    bgColor: 'bg-blue-500',
    logoText: '1028BC',
  },
  'TECH_GUY': {
    id: 'TECH_GUY',
    label: 'TECH GUY ON THE GO',
    shortName: 'TGOTG',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-400',
    bgAlpha: 'bg-cyan-400/10',
    bgColor: 'bg-cyan-400',
    logoText: 'TECH_GUY'
  }
};

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  infoOverlaysEnabled: boolean;
  setInfoOverlaysEnabled: (enabled: boolean) => void;
  currentBrand: BrandConfig;
  setBrand: (id: BrandID) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { saveState } = useContextKeep();
  
  // State Initialization
  const [activeTab, setActiveTab] = useState('dashboard');
  const [infoOverlaysEnabled, setInfoOverlaysEnabled] = useState(false);
  const [brandID, setBrandID] = useState<BrandID>('1028BC');

  // --- UPLINK LOGIC: Push Brand State to ContextKeep (Port 5100) ---
  useEffect(() => {
    saveState('1028bc_active_brand', { 
      id: brandID, 
      timestamp: new Date().toISOString(),
      node: 'NV_HND_01'
    });
  }, [brandID]);

  const value = {
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