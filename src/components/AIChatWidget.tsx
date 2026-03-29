import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';

export const AIChatWidget = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      
      if (data.text) {
        setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: '[SYSTEM FAULT: INVALID RESPONSE]' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: '[NETWORK ERROR: UNABLE TO REACH EDGE NODE]' }]);
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-20 right-4 md:right-8 w-[90%] md:w-96 h-[500px] bg-charcoal border border-charcoal-light rounded-lg shadow-2xl z-[80] flex flex-col overflow-hidden">
      <div className="border-b border-white/10 p-4 flex justify-between items-center bg-charcoal-light/20">
        <div className="flex items-center gap-2"><Sparkles size={18} className="text-indigo-400" /><span className="font-mono text-xs font-bold text-white">1028bc Logic Core</span></div>
        <button onClick={onClose} className="text-offwhite/50 hover:text-white"><X size={16} /></button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && <div className="text-center text-offwhite/40 font-mono text-xs mt-10">Connection established. Awaiting input.</div>}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded p-3 font-mono text-xs ${m.role === 'user' ? 'bg-indigo-500/20 text-indigo-100 border border-indigo-500/30' : 'bg-charcoal-light/30 text-offwhite border border-charcoal-light'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><Loader2 className="animate-spin text-indigo-400 w-4 h-4" /></div>}
      </div>

      <form onSubmit={sendMessage} className="border-t border-white/10 p-3 bg-charcoal-light/10 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter command..." className="flex-1 bg-charcoal border border-charcoal-light rounded px-3 py-2 font-mono text-xs text-white focus:outline-none focus:border-indigo-500" />
        <button type="submit" disabled={loading} className="bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-400 border border-indigo-500/50 p-2 rounded transition-colors disabled:opacity-50"><Send size={16} /></button>
      </form>
    </motion.div>
  );
};