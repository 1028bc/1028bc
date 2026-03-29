import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, Server, Activity, CheckCircle2, RefreshCw, TerminalSquare, Search, Layers } from 'lucide-react';

const SIM_STAGES = [
  { id: 'INGRESS', label: 'Asset Ingress', sub: 'Hashing Raw File...' },
  { id: 'SCAN', label: 'Neural Scan', sub: 'Mapping Edge Variance...' },
  { id: 'STYLE', label: 'Neuropaint v4', sub: 'Applying High-Contrast Vector...' },
  { id: 'SYNC', label: 'Node Handshake', sub: 'Routing to Printify NV_HND_01...' }
];

export const NeuralEngineSim = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['> SYSTEM IDLE: AWAITING INPUT']);

  const runSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);
    setLogs(['> INITIATING SIMULATED ORDER: ORD-9912', '> TARGET: WALNUT KEYCHAIN BLANK']);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          return 100;
        }
        return old + 1;
      });
    }, 45); // Total sim time ~4.5 seconds for dramatic effect

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (progress > 0 && progress < 25) {
      setCurrentStep(0);
      if (logs.length === 2) setLogs(p => [...p, '> HASH VERIFIED: 0x82f...a12', '> UPLOAD BUFFERED TO CLOUD_NODE_01']);
    } else if (progress >= 25 && progress < 50) {
      setCurrentStep(1);
      if (logs.length === 4) setLogs(p => [...p, '> ENGINE: SCANNING LIGHTWEIGHT PIXELS...', '> CONTRAST RATIO: 14:1 [OPTIMAL]']);
    } else if (progress >= 50 && progress < 75) {
      setCurrentStep(2);
      if (logs.length === 6) setLogs(p => [...p, '> NEUROPAINT: GENERATING VECTOR PATHS...', '> RENDER TIME: 1.45s', '> CONFIDENCE: 98.4%']);
    } else if (progress >= 75 && progress < 100) {
      setCurrentStep(3);
      if (logs.length === 9) setLogs(p => [...p, '> SYNCING VENDOR: PRINTIFY API', '> STATUS: ROUTED TO MONSTER DIGITAL']);
    } else if (progress === 100) {
      setIsRunning(false);
      setLogs(p => [...p, '-----------------------------------', '> LIFECYCLE COMPLETE: FULFILLMENT ACTIVE']);
    }
  }, [progress]);

  return (
    <div className="w-full bg-charcoal-dark/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TerminalSquare size={16} className="text-sky-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 font-mono">Neural Engine Lifecycle Simulator</span>
        </div>
        {!isRunning && progress === 0 ? (
          <button 
            onClick={runSimulation}
            className="flex items-center gap-2 px-3 py-1 bg-sky-400/20 border border-sky-400/40 rounded text-sky-400 text-[10px] font-black uppercase tracking-widest hover:bg-sky-400/30 transition-all"
          >
            <Zap size={12} fill="currentColor" /> Initialize Sim
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sky-400/50 text-[10px] font-mono">
            <RefreshCw size={12} className={isRunning ? "animate-spin" : ""} /> 
            {isRunning ? "PROCESSING..." : "PROCESS COMPLETE"}
          </div>
        )}
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Visual Pipeline */}
        <div className="space-y-8">
          <div className="relative">
            <div className="absolute -left-3 top-0 bottom-0 w-px bg-white/10"></div>
            {SIM_STAGES.map((stage, i) => (
              <div key={stage.id} className={`relative pl-8 pb-8 last:pb-0 transition-opacity duration-500 ${currentStep >= i ? 'opacity-100' : 'opacity-20'}`}>
                <div className={`absolute left-[-15px] top-1 w-3 h-3 rounded-full border-2 transition-colors ${currentStep === i ? 'bg-sky-400 border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]' : currentStep > i ? 'bg-emerald-400 border-emerald-400' : 'bg-charcoal border-white/20'}`}></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white mb-1">{stage.label}</h4>
                <p className="text-[10px] font-mono text-white/40">{stage.sub}</p>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-mono text-white/30 uppercase tracking-tighter">
              <span>Engine Load</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-sky-400" 
                initial={{ width: 0 }} 
                animate={{ width: `${progress}%` }}
              ></motion.div>
            </div>
          </div>
        </div>

        {/* Right: Asset Transformation View */}
        <div className="space-y-6">
          <div className="aspect-video bg-black/80 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
            {/* Raw vs Styled Visualizer */}
            <div className="absolute inset-0 grid grid-cols-2 gap-px opacity-30">
              <div className="bg-[url('https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=400')] bg-cover"></div>
              <div className="bg-[url('https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=400')] bg-cover grayscale contrast-[200%]"></div>
            </div>
            
            <AnimatePresence>
              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-10 flex flex-col items-center">
                  <Search className="text-sky-400 animate-pulse mb-2" size={32} />
                  <span className="text-[10px] font-mono text-sky-400 bg-black/60 px-2 py-1 rounded">SCANNING TOPOLOGY...</span>
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-10 flex flex-col items-center">
                  <Layers className="text-purple-400 animate-bounce mb-2" size={32} />
                  <span className="text-[10px] font-mono text-purple-400 bg-black/60 px-2 py-1 rounded">MAPPING VECTOR PATHS...</span>
                </motion.div>
              )}
              {progress === 100 && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 flex flex-col items-center">
                  <CheckCircle2 className="text-emerald-400 mb-2" size={48} />
                  <span className="text-[10px] font-mono text-emerald-400 bg-black/60 px-4 py-2 rounded border border-emerald-400/20">READY FOR PRODUCTION</span>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 pointer-events-none border border-white/10 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>

          {/* Terminal Output */}
          <div className="h-40 bg-black border border-white/10 rounded-xl p-4 font-mono text-[10px] text-sky-400/80 overflow-y-auto leading-relaxed">
            {logs.map((log, i) => (
              <div key={i} className={log.includes('COMPLETE') ? 'text-emerald-400 font-bold' : log.includes('INITIATING') ? 'text-white' : ''}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer / Reset */}
      {!isRunning && progress === 100 && (
        <div className="px-6 py-4 bg-emerald-400/5 border-t border-emerald-400/20 text-center">
          <button onClick={() => { setProgress(0); setCurrentStep(-1); setLogs(['> SYSTEM IDLE: AWAITING INPUT']); }} className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest transition-colors">
            Reset Lifecycle Simulation
          </button>
        </div>
      )}
    </div>
  );
};