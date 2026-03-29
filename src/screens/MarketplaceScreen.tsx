import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Upload, Sparkles, ArrowRight, ShieldCheck, Zap, 
  Image as ImageIcon, Cpu, Laptop, CreditCard, Package, 
  CheckCircle2, X, Activity, Check, Server 
} from 'lucide-react';

// --- TYPE DEFINITION ---
interface MarketplaceProps {
  onNavigateToAdmin: () => void;
}

// --- CONSOLIDATED INVENTORY ---
const INVENTORY = {
  ETCHINGS: [
    {
      id: 'trinket-01',
      name: 'Neural-Etched Silver Bar Necklace',
      description: 'Surgical-grade stainless steel. Upload custom handwriting or audio waveforms. High-margin flagship.',
      price: 22.00, retailCompare: 35.88, tag: 'JEWELRY / CHARM',
      requiresUpload: true, isSimulated: true,
      image: 'https://images.unsplash.com/photo-1599643478524-4c76b91176f1?q=80&w=800'
    },
    {
      id: 'trinket-02',
      name: 'Walnut Pet ID Tag',
      description: 'Solid walnut blank. Upload your pet portrait. High-contrast vector profile burned directly into the grain.',
      price: 14.00, retailCompare: 24.88, tag: 'ACCESSORY / TRINKET',
      requiresUpload: true, isSimulated: true,
      image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=800'
    },
    {
      id: 'trinket-03',
      name: 'Neural-Etched Whiskey Glass Set',
      description: 'Heavyweight premium glass. Tactical styling engine prepares your custom silhouettes for deep etching.',
      price: 19.50, retailCompare: 32.00, tag: 'TACTICAL GIFT',
      requiresUpload: true, isSimulated: true,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800'
    }
  ],
  HARDWARE: [
    {
      id: 'hw-dell-7400',
      name: 'Dell Latitude 7400 (Field Refurb)',
      description: 'Enterprise-grade Core i7. Diagnosed and cleared by certified technicians. Ready for deployment.',
      price: 285.00, retailCompare: 380.00, tag: 'LEGACY HARDWARE',
      requiresUpload: false, isSimulated: true,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800'
    },
    {
      id: 'hw-lenovo-t490',
      name: 'Lenovo ThinkPad T490 (Field Refurb)',
      description: 'The industry standard field node. 16GB RAM, 512GB SSD. Fully stress-tested.',
      price: 310.00, retailCompare: 420.00, tag: 'LEGACY HARDWARE',
      requiresUpload: false, isSimulated: true,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800'
    }
  ]
};

const CheckoutModal = ({ product, onClose, onNavigateToAdmin }: { product: any, onClose: () => void, onNavigateToAdmin: () => void }) => {
  const [step, setStep] = useState(product.requiresUpload ? 'CONFIG' : 'SPECS');
  const [isUploading, setIsUploading] = useState(false);
  const [processLog, setProcessLog] = useState('');
  const [progress, setProgress] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setProcessLog('INGESTING RAW ASSET...'); setProgress(15);
    setTimeout(() => { setProcessLog('APPLYING NEURAL EDGE-DETECTION...'); setProgress(45); }, 800);
    setTimeout(() => { setProcessLog('CALIBRATING LASER-READY CONTRAST...'); setProgress(75); }, 1800);
    setTimeout(() => { setProcessLog('SYNCING PRINTIFY PRODUCTION NODE...'); setProgress(90); }, 2600);
    setTimeout(() => { setIsUploading(false); setStep('CHECKOUT'); }, 3200);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => { setIsProcessingPayment(false); setStep('RECEIPT'); }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-full max-w-2xl bg-charcoal border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-white/10 bg-black/40 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            {step === 'RECEIPT' ? <CheckCircle2 className="text-emerald-400" size={20} /> : <ShoppingCart className="text-sky-400" size={20} />}
            <span className="text-xs font-bold uppercase tracking-widest text-white">{step === 'RECEIPT' ? 'Authorization Complete' : 'Secure Ingress Terminal'}</span>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={20} /></button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex gap-6 mb-8 pb-8 border-b border-white/5 relative">
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 shrink-0"><img src={product.image} alt={product.name} className="w-full h-full object-cover" /></div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-white mb-2">{product.name}</h2>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-mono text-emerald-400">${product.price.toFixed(2)}</span>
                <span className="text-sm font-mono text-white/30 line-through">${product.retailCompare.toFixed(2)} Retail</span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'CONFIG' && (
              <motion.div key="config" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <div className="space-y-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-3">Hardware Configuration</label>
                  <div className="flex flex-wrap gap-3">
                    {['STANDARD', 'PREMIUM'].map(s => <button key={s} className="px-4 py-3 rounded-lg border border-white/10 font-mono text-xs text-white/60 hover:border-sky-400 hover:text-sky-400 transition-all">{s}</button>)}
                  </div>
                  <button onClick={() => setStep('UPLOAD')} className="w-full py-4 bg-sky-400 text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-sky-300 transition-all flex items-center justify-center gap-2">Proceed to Asset Ingress <ArrowRight size={18} /></button>
                </div>
              </motion.div>
            )}

            {step === 'UPLOAD' && (
              <motion.div key="upload" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <div onClick={!isUploading ? handleUpload : undefined} className={`w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all relative overflow-hidden ${isUploading ? 'border-sky-400/50 bg-sky-400/5' : 'border-white/20 bg-black/40 hover:border-sky-400/50 hover:bg-white/5 cursor-pointer'}`}>
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Activity size={32} className="text-sky-400 mb-4 animate-pulse" />
                      <span className="text-xs font-mono text-sky-400 uppercase">{processLog}</span>
                      <div className="w-48 h-1 bg-black rounded-full mt-4 overflow-hidden"><div className="h-full bg-sky-400 transition-all duration-300" style={{ width: `${progress}%` }}></div></div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center"><Upload size={32} className="text-white/40 mb-3" /><span className="text-xs font-bold tracking-widest text-white/60 uppercase">Initialize Ingress</span></div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'CHECKOUT' && (
               <motion.div key="checkout" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="bg-black/60 border border-white/5 rounded-xl p-4 flex justify-between items-center"><span className="text-xs font-bold tracking-widest uppercase text-white">Total Authorization</span><span className="text-2xl font-mono text-emerald-400">${(product.price + 5.99).toFixed(2)}</span></div>
                  <button type="submit" className="w-full py-4 bg-sky-400 text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-sky-300 transition-all flex items-center justify-center gap-2">Confirm Transaction <ShieldCheck size={18} /></button>
                </form>
              </motion.div>
            )}

            {step === 'RECEIPT' && (
              <motion.div key="receipt" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-6">
                <div className="w-20 h-20 bg-emerald-400/10 border border-emerald-400/30 rounded-full flex items-center justify-center mx-auto text-emerald-400"><Check size={40} /></div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Transaction Secured</h3>
                  <p className="text-xs font-mono text-white/50 uppercase">ID: 1028BC-{Math.floor(Math.random() * 1000000)}</p>
                </div>
                <button 
                  onClick={() => { onClose(); onNavigateToAdmin(); }} 
                  className="w-full py-4 bg-purple-500 text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-purple-400 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(168,85,247,0.3)]"
                >
                  View Neural Processing Queue <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export const MarketplaceScreen: React.FC<MarketplaceProps> = ({ onNavigateToAdmin }) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 relative z-10">
      {selectedProduct && <CheckoutModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onNavigateToAdmin={onNavigateToAdmin} />}

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-12">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-[0.1em] text-white mb-4">The Shop</h1>
          <p className="text-xl font-bold tracking-widest text-sky-400 uppercase flex items-center gap-3"><Zap size={20} /> Direct-To-Consumer Infrastructure</p>
        </div>

        <div className="mb-20">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-8 flex items-center gap-3"><Sparkles size={16} className="text-purple-400"/> Neural Etchings (Trinkets & Apparel)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INVENTORY.ETCHINGS.map((product) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} className="group bg-charcoal-dark/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col relative transition-all cursor-pointer">
                <div className={`h-56 relative bg-[#1a1a1b] overflow-hidden product-image-frame ${product.isSimulated ? 'simulated' : ''}`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60 transition-opacity duration-300" />
                  {product.isSimulated && <div className="coming-soon-badge">Simulation Only - Real Products Coming Soon</div>}
                  <div className="absolute top-4 right-4 bg-sky-400/20 text-sky-400 border border-sky-400/30 px-3 py-1 rounded text-[9px] font-bold tracking-widest uppercase z-20">{product.tag}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-lg font-black uppercase tracking-widest text-white mb-2 leading-tight">{product.name}</h4>
                  <p className="text-xs leading-relaxed text-offwhite/60 mb-6 flex-1 line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex flex-col"><span className="text-xl font-mono text-emerald-400">${product.price.toFixed(2)}</span><span className="text-[10px] font-mono text-white/30 line-through">Market: ${product.retailCompare.toFixed(2)}</span></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Configure <ArrowRight size={14}/></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-8 flex items-center gap-3"><Cpu size={16} className="text-sky-400"/> Legacy Hardware (Refurbished)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INVENTORY.HARDWARE.map((product) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} className="group bg-charcoal-dark/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col relative transition-all cursor-pointer">
                <div className={`h-48 relative bg-[#1a1a1b] overflow-hidden product-image-frame ${product.isSimulated ? 'simulated' : ''}`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60 transition-opacity duration-300" />
                  {product.isSimulated && <div className="coming-soon-badge">Simulation Only - Real Products Coming Soon</div>}
                  <div className="absolute top-4 right-4 bg-white/5 text-white/40 border border-white/10 px-3 py-1 rounded text-[9px] font-bold tracking-widest uppercase z-20">{product.tag}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-lg font-black uppercase tracking-widest text-white mb-2 leading-tight">{product.name}</h4>
                  <p className="text-xs leading-relaxed text-offwhite/60 mb-6 flex-1 line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex flex-col"><span className="text-xl font-mono text-emerald-400">${product.price.toFixed(2)}</span><span className="text-[10px] font-mono text-white/30 line-through">Market: ${product.retailCompare.toFixed(2)}</span></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">View Specs <ArrowRight size={14}/></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};