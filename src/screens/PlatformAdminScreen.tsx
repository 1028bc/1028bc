import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/PageHeader';
import { Calendar, ShieldAlert, Cloud, CloudOff, Globe, Link, Bluetooth, Usb, Wifi, RefreshCw, Database } from 'lucide-react';

export const PlatformAdminScreen = () => {
  const { currentBrand } = useApp();
  const [syncMethod, setSyncMethod] = useState<'oauth' | 'manual'>('oauth');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full pb-24 px-4">
      <PageHeader titleTop="PLATFORM" titleBottom="ADMIN" activePage="ENGINE / HYBRID_SYNC" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 relative z-10">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-charcoal-light/10 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-white">Universal Dispatch Sync</h3>
                <p className="font-mono text-[10px] text-offwhite/40 uppercase tracking-widest mt-1">±14 Day Rolling Window</p>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${isOnline ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-red-500/30 bg-red-500/10 text-red-400'}`}>
                {isOnline ? <Cloud size={12} /> : <CloudOff size={12} />}
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest">{isOnline ? 'Cloud Uplink Live' : 'Edge Mode'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button onClick={() => setSyncMethod('oauth')} className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${syncMethod === 'oauth' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-black/40 border-white/5 text-offwhite/40'}`}>
                <Globe size={24} />
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Cloud-Sync (OAuth)</span>
              </button>
              <button onClick={() => setSyncMethod('manual')} className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${syncMethod === 'manual' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-black/40 border-white/5 text-offwhite/40'}`}>
                <Link size={24} />
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Manual .ICS Hard-Link</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
              <h4 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                <RefreshCw size={12} className="text-indigo-400" /> Device-to-Device Reconciliation
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-indigo-500/20 transition-all">
                  <Bluetooth size={14} className="text-blue-400" /> Bluetooth
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-indigo-500/20 transition-all">
                  <Usb size={14} className="text-slate-400" /> USB Bridge
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-indigo-500/20 transition-all">
                  <Wifi size={14} className="text-green-400" /> Local Net
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-charcoal-light/10 border border-white/10 rounded-2xl p-6 h-full">
            <h3 className="font-mono text-[10px] text-offwhite/50 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Database size={12} className="text-indigo-400" /> PERSISTENT VAULT
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-offwhite/70 tracking-widest">±14 DAY BUFFER</span>
                <span className="text-[10px] font-bold text-green-400 uppercase">SYNCD</span>
              </div>
            </div>
            
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-[10px] uppercase mb-2">
                <ShieldAlert size={14} /> Reconciliation Logic
              </div>
              <p className="text-[9px] font-mono text-offwhite/60 leading-relaxed italic">
                Platform uses "Last-Write-Wins" reconciliation for mesh-handshake via Bluetooth/USB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};