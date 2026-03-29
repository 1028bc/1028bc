import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Terminal, ChevronDown, Map } from 'lucide-react';

const FAQS = [
  { q: "What is the 1028bc Protocol?", a: "An architectural umbrella encompassing the SolUrbana app, SolShift engine, and field service dispatch tools." },
  { q: "How do I recover my account?", a: "Navigate to Portal Uplink. If you have lost your cipher, the Embedded AI Host or a System Admin can force an override using the Master Key." },
  { q: "What stack powers the Portfolio?", a: "Vite, React, TailwindCSS, and Framer Motion for physics, with Leaflet providing the tactical geographic engine." },
  { q: "How does AI Integration work?", a: "You can set your AI level from 0 (Ghost) to 3 (Autonomous) in your profile. This dictates how much the AI intervenes in UI routing and data entry." }
];

export const HelpScreen = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{sender: 'user'|'host', text: string}[]>([
    { sender: 'host', text: "1028bc AI Host initialized. How can I facilitate your session?" }
  ]);

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput) return;
    setMessages(prev => [...prev, { sender: 'user', text: chatInput }, { sender: 'host', text: "Processing directive... (Simulated AI response)" }]);
    setChatInput('');
  };

  return (
    <div className="max-w-5xl mx-auto pt-20 pb-24 px-6 relative z-10 font-display">
      <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-8">
        <div className="p-4 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20"><HelpCircle size={32} /></div>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-widest text-white">Support & FAQs</h1>
          <p className="text-sky-400 font-mono text-sm uppercase tracking-widest">System Triage & Embedded Host Comms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* FAQ ACCORDION */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-white/50 uppercase tracking-widest mb-6">Frequently Asked Questions</h2>
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-xl bg-black/40 overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
                <span className="font-bold text-white text-sm">{faq.q}</span>
                <ChevronDown size={16} className={`text-white/40 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-sm text-white/60 leading-relaxed border-t border-white/5 mt-2 bg-black/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* EMBEDDED AI TERMINAL */}
        <div className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[500px] shadow-2xl">
          <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-3 text-emerald-400">
              <Terminal size={18} />
              <span className="text-xs font-black uppercase tracking-widest">AI Host Terminal</span>
            </div>
            <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[9px] font-mono uppercase border border-emerald-500/30 animate-pulse">Online</div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 text-sm rounded-xl ${m.sender === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 'bg-white/10 text-white/80 rounded-bl-none font-mono border border-white/5'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleChat} className="p-4 border-t border-white/10 bg-black/40">
            <div className="relative">
              <MessageSquare size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="w-full bg-black/50 border border-white/10 focus:border-sky-400 rounded-xl py-3 pl-12 pr-4 text-sm text-white font-mono transition-colors outline-none" placeholder="Transmit query to host..." />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};