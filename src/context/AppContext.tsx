import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. DEFINE THE TENANTS
export type BrandID = '1028BC' | 'TECH_GUY';

interface BrandConfig {
  id: BrandID;
  label: string;
  shortName: string;
  accentColor: string;  // Tailwind text color
  borderColor: string;  // Tailwind border color
  bgAlpha: string;      // Tailwind transparent bg
  bgColor: string;      // [PATCH]: Tailwind solid bg for JIT Compiler
  logoText: string;
}

// 2. THE BRAND MAP (The "SaaS" Dictionary)
const BRAND_MAP: Record<BrandID, BrandConfig> = {
  '1028BC': {
    id: '1028BC',
    label: '1028BC MASTER PLATFORM',
    shortName: '1028BC',
    accentColor: 'text-yellow',
    borderColor: 'border-yellow',
    bgAlpha: 'bg-yellow/10',
    bgColor: 'bg-yellow', // [PATCH]
    logoText: '1028BC'
  },
  'TECH_GUY': {
    id: 'TECH_GUY',
    label: 'TECH GUY ON THE GO',
    shortName: 'TGOTG',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-400',
    bgAlpha: 'bg-cyan-400/10',
    bgColor: 'bg-cyan-400', // [PATCH]
    logoText: 'TECH_GUY'
  }
};

interface AppContextType {
  // Navigation State
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // UI Toggles
  infoOverlaysEnabled: boolean;
  setInfoOverlaysEnabled: (enabled: boolean) => void;
  // REBRANDING ENGINE
  currentBrand: BrandConfig;
  setBrand: (id: BrandID) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // State Initialization
  const [activeTab, setActiveTab] = useState('dashboard');
  const [infoOverlaysEnabled, setInfoOverlaysEnabled] = useState(false);
  const [brandID, setBrandID] = useState<BrandID>('1028BC'); // Default to Master

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