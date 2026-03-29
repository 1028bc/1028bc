import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, ShieldAlert, Activity, DollarSign, Server, 
  AlertTriangle, CheckCircle2, Play, TerminalSquare, Sparkles, 
  Image as ImageIcon, Check, X, RefreshCw, Zap, Globe, Package
} from 'lucide-react';

import { pushToContextKeep } from '../services/ContextKeep';

interface QueueItem {
  id: string;
  rawImg: string;
  status: string;
  confidence: number;
  processingTime: string;
  flag?: string;
  isVisitor?: boolean;
}

interface CommerceGridProps {
  isAdmin: boolean;
}

const INITIAL_QUEUE: QueueItem[] = [
  { id: 'ORD-8829', rawImg: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400', status: 'AUTO_ROUTED', confidence: 98, processingTime: '1.1s', isVisitor: false },
  { id: 'ORD-8830', rawImg: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400', status: 'PENDING_REVIEW', confidence: 62, processingTime: '1.8s', flag: 'Low Contrast Detected', isVisitor: false }
];

const VISITOR_ORDER: QueueItem = {
  id: 'ORD-9912 (YOU)',
  rawImg: 'https://images.unsplash.com/photo-1599643478524-4c76b91176f1?q=80&w=400',
  status: 'PENDING_REVIEW',
  confidence: 94.2,
  processingTime: '1.45s',
  flag: 'Simulation Priority Ingress',
  isVisitor: true
};

export const CommerceGridScreen: React.FC<CommerceGridProps> = ({ isAdmin }) => {
  const [activeView, setActiveView] = useState<'FINANCIAL' | 'NEURAL_QUEUE'>('NEURAL_QUEUE');
  const [queue, setQueue] = useState<QueueItem[]>([VISITOR_ORDER, ...INITIAL_QUEUE]);
  const [logs, setLogs] = useState<string[]>(['> COMMERCE ENGINE: ONLINE', '> PRINTIFY API: CONNECTED', `> SESSION: ADMIN UPLINK`]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [marginFloor, setMarginFloor] = useState(40);
  const [netProfit, setNetProfit] = useState(1482.40);
  
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  const handleApprove = async (item: QueueItem) => {
    setLogs(prev => [...prev, `> AUTHORIZING ORDER: ${item.id}`, `> SYNCING NEURAL ASSET TO PRINTIFY...`]);
    
    const syncResult = await pushToContextKeep(
      'order_fulfillment',
      `Order ${item.id} Finalized`,
      `Neural stylized asset for ${item.id} pushed to production node NV_HND_01.`
    );

    if (syncResult) {
      setLogs(prev => [...prev, `> CONTEXTKEEP: SYNC SUCCESSFUL (ID: ${item.id})`]);
    } else {
      setLogs(prev => [...prev, `> CONTEXTKEEP: SYNC FAILED`]);
    }

    if (item.isVisitor) {
      setTimeout(() => setShowSuccess(true), 800);
    }

    setTimeout(() => {
      setQueue(prev => prev.filter(q => q.id !== item.id));
      setLogs(prev => [...prev, `> HANDSHAKE SUCCESSFUL: NODE NV_HND_01`, `> STATUS: IN_PRODUCTION`]);
    }, 1500);
  };

  const triggerTestOrder = () => {
    setLogs(prev => [...prev, `> INGRESS: MANUAL TEST INITIATED`, `> MARGIN CHECK: ${marginFloor}% FLOOR`]);
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 relative z-10 font-display">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 border-b border-white/10 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <ShoppingCart size={32} className="text-sky-400" />
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-[0.1em] text-white">Commerce Grid</h1>
                <div className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest animate-pulse border bg-amber-400/20 text-amber-400 border-amber-400/30">
                  Admin Control
                </div>
              </div>
              <p className="text-xl font-bold tracking-widest text-sky-400 uppercase">Autonomous Fulfillment Engine</p>
            </div>
            
            <div className="flex bg-charcoal-dark/50 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <button onClick={() => setActiveView('FINANCIAL')} className={`px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${activeView === 'FINANCIAL' ? 'bg-sky-400/20 text-sky-400 border border-sky-400/30' : 'text-white/40 hover:text-white'}`}>Financials</button>
              <button onClick={() => setActiveView('NEURAL_QUEUE')} className={`px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${activeView === 'NEURAL_QUEUE' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-white/40 hover:text-white'}`}>
                <Sparkles size={14} /> Neural Queue
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'FINANCIAL' ? (
            <motion.div key="financial" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              <div className="xl:col-span-1 space-y-8">
                <div className="bg-charcoal-dark/40 border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-6 flex items-center gap-3"><DollarSign size={16} className="text-emerald-400"/> Financial Flow</h3>
                  <div className="text-5xl font-black text-white tracking-tighter mb-2">${netProfit.toFixed(2)}</div>
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Net Realized</div>
                </div>
                <button onClick={triggerTestOrder} className="w-full flex items-center justify-center gap-3 p-6 rounded-2xl border border-sky-400/30 bg-sky-400/10 text-sky-400 hover:bg-sky-400/20 transition-all font-bold tracking-[0.2em] uppercase">
                  <Play size={18} fill="currentColor" /> Test Ingress
                </button>
              </div>
              <div className="xl:col-span-2">
                <div className="bg-black/80 border border-white/10 rounded-2xl p-6 font-mono text-xs text-sky-400 h-80 overflow-y-auto relative shadow-2xl flex flex-col">
                  <div className="flex items-center gap-2 mb-4 text-white/40 pb-2 border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur z-10"><TerminalSquare size={14} /> Execution Logs</div>
                  <div className="flex-1 space-y-2">
                    {logs.map((log, i) => (<div key={i}>{log}</div>))}
                    <div ref={logEndRef} />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="queue" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <AnimatePresence>
                  {queue.map((item) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 50 }} className={`bg-charcoal-dark/60 backdrop-blur-md border rounded-2xl overflow-hidden shadow-2xl ${item.isVisitor ? 'border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)]' : 'border-white/10'}`}>
                      <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/40">
                        <span className="font-mono text-sm font-bold text-white">{item.id}</span>
                        <div className="flex items-center gap-6 text-xs font-mono">
                          <span className="text-white/50">RENDER: {item.processingTime}</span>
                          <span className="text-emerald-400 font-bold">{item.confidence}% MATCH</span>
                        </div>
                      </div>
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Source</span>
                          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10"><img src={item.rawImg} className="w-full h-full object-cover" alt="raw" /></div>
                        </div>
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">Output</span>
                          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-purple-500/30"><img src={item.rawImg} className="w-full h-full object-cover grayscale contrast-[250%] brightness-[1.1]" alt="processed" /></div>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-black/60 border-t border-white/5 flex justify-end">
                        <button onClick={() => handleApprove(item)} className="px-6 py-2 rounded-lg border border-purple-500/30 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"><Check size={14} /> Approve & Push</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-black/80 border border-white/10 rounded-2xl p-6 font-mono text-xs text-sky-400 h-[600px] overflow-y-auto relative shadow-2xl flex flex-col">
                  <div className="flex items-center gap-2 mb-4 text-white/40 pb-2 border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur z-10"><TerminalSquare size={14} /> System Logs</div>
                  <div className="flex-1 space-y-2">
                    {logs.map((log, i) => (<div key={i} className={log.includes('SUCCESSFUL') ? 'text-emerald-400 font-bold' : ''}>{log}</div>))}
                    <div ref={logEndRef} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal-dark/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-2xl bg-black border border-emerald-500/30 rounded-3xl p-12 text-center shadow-[0_0_100px_rgba(16,185,129,0.1)]">
              <Globe size={48} className="mx-auto mb-8 text-emerald-400 animate-pulse" />
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Lifecycle Finalized</h2>
              <p className="text-offwhite/60 mb-10 max-w-md mx-auto leading-relaxed">Simulated order routed to <span className="text-white font-bold">Printify Node NV_HND_01</span>. End-to-end infrastructure proof complete.</p>
              <button onClick={() => setShowSuccess(false)} className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-emerald-400 transition-all">Close Terminal</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};