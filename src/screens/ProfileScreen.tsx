import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, TerminalSquare, Activity, Server, Code2, Database, Layout, ShieldCheck, Network, Cpu, FileText, Lock, Fingerprint, Smartphone, Trash2, ShieldAlert, MapPin, Mail, Hash, Globe, MessageCircle, Send, Plus } from 'lucide-react';
import { useContextKeep } from '../hooks/useContextKeep';
import type { Identity, CommVector } from './AuthScreen';
import { supabase } from '../supabaseClient';

const ICON_MAP: Record<string, any> = { 'Cpu': Cpu, 'Database': Database, 'ShieldCheck': ShieldCheck, 'FileText': FileText, 'Network': Network };

const SKILL_MATRIX = [
  { category: 'System Architecture', icon: Server, skills: [{ name: 'SaaS Tier 3 Support', level: 5 }, { name: 'SQL & DB Troubleshooting', level: 4 }, { name: 'Agile / SDLC', level: 5 }, { name: 'DevOps (Jira/Azure)', level: 4 }] },
  { category: 'Interface Engineering', icon: Layout, skills: [{ name: 'React / Next.js', level: 5 }, { name: 'Tailwind CSS', level: 5 }, { name: 'UX Architecture', level: 5 }, { name: 'UAT & Regression', level: 5 }] },
  { category: 'Infrastructure & Networking', icon: Network, skills: [{ name: 'Active Directory / Servers', level: 5 }, { name: 'TCP/IP, DNS, DHCP', level: 5 }, { name: 'Hardware Diagnostics', level: 5 }, { name: 'Network Deployment', level: 4 }] }
];

// FIELD_REPORTS array has been purged. Data now flows via Kron from Supabase.

const TELEMETRY_LOGS = [ '> INITIALIZING SECURE UPLINK...', '> AUTHENTICATING NODE...', '> FETCHING ARCHITECT DOSSIER...', '> DEPLOYING V16_STABLE ARCHITECTURE', '> SOLURBANA ENGINE: ONLINE' ];

const DEFAULT_CREDENTIALS = [ { issuer: 'HP Inc.', cert: 'Certified Field Technician', status: 'ACTIVE' }, { issuer: 'Dell Technologies', cert: 'Certified Field Technician', status: 'ACTIVE' }, { issuer: 'Lenovo', cert: 'Certified Field Technician', status: 'ACTIVE' }, { issuer: 'ITT Technical Institute', cert: 'A.S. Software Development', status: 'COMPLETE' }, { issuer: 'ITT Technical Institute', cert: 'A.S. Computer Network Systems', status: 'COMPLETE' } ];
const DEFAULT_CV_ARCHIVE = [ { label: 'Field Engineer CV', file: '/Resume-BrianCampbell-FieldEngineer.pdf', iconString: 'Cpu' }, { label: 'SaaS QA Analyst CV', file: '/Resume-BrianCampbell-SaaS-QA-Analyst.pdf', iconString: 'Database' }, { label: 'Technical Specialist CV', file: '/Resume-BrianCampbell-TechnicalSpecialist.pdf', iconString: 'ShieldCheck' } ];

const SkillPips = ({ level }: { level: number }) => (
  <div className="flex gap-1.5">
    {[1, 2, 3, 4, 5].map((pip) => (
      <motion.div key={pip} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: pip * 0.1 }} className={`h-2 w-6 rounded-sm ${pip <= level ? 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/10'}`} />
    ))}
  </div>
);

export const ProfileScreen = () => {
  const { loadState, saveState } = useContextKeep();
  const [logs, setLogs] = useState<string[]>([]);
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false);
  const cvMenuRef = useRef<HTMLDivElement>(null);

  const [credentials, setCredentials] = useState(DEFAULT_CREDENTIALS);
  const [cvArchive, setCvArchive] = useState(DEFAULT_CV_ARCHIVE);

  // IAM & Chronology State
  const [activeIdentity, setActiveIdentity] = useState<Identity | null>(null);
  const [chronologyLogs, setChronologyLogs] = useState<any[]>([]); // KRON'S CLOUD STATE

  // Adaptive Comms State
  const [newCommValue, setNewCommValue] = useState('');
  const [pendingComm, setPendingComm] = useState<string | null>(null);
  const [suggestedTypes, setSuggestedTypes] = useState<{type: string, label: string, icon: any}[]>([]);

  // --- SUPABASE DATA FETCH ---
  useEffect(() => {
    const fetchProfileData = async () => {
      const activeId = localStorage.getItem('1028bc_last_active_id');
      if (!activeId) return;

      const { data: profile } = await supabase.from('profiles').select('*').eq('id', activeId).single();
      const { data: comms } = await supabase.from('comm_vectors').select('*').eq('profile_id', activeId);
      
      // KRON UPLINK: Fetch chronology ordered by your sort_order
      const { data: chrono } = await supabase
        .from('chronology_logs')
        .select('*')
        .eq('profile_id', activeId)
        .order('sort_order', { ascending: true });

      if (profile) {
        setActiveIdentity({
          id: profile.id,
          handle: profile.handle || 'OPERATOR',
          email: profile.email,
          address: profile.address || '',
          role: profile.role || 'VISITOR',
          mfaEnabled: profile.mfa_enabled || false,
          bioEnabled: profile.bio_enabled || false,
          comms: comms || [],
          aiLevel: profile.ai_level || 0,
        });
      }

      if (chrono) {
        setChronologyLogs(chrono);
      }
    };
    
    fetchProfileData();

    // Load static config
    const fetchProfileConfig = async () => {
      try {
        const res = await loadState('1028bc_PROFILE_CONFIG');
        if (res && res.data) {
          if (res.data.credentials) setCredentials(res.data.credentials);
          if (res.data.cvArchive) setCvArchive(res.data.cvArchive);
        } else saveState('1028bc_PROFILE_CONFIG', { credentials: DEFAULT_CREDENTIALS, cvArchive: DEFAULT_CV_ARCHIVE });
      } catch (err) { console.warn("Using local fallback data."); }
    };
    fetchProfileConfig();
  }, [loadState, saveState]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (cvMenuRef.current && !cvMenuRef.current.contains(e.target as Node)) setIsCvMenuOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < TELEMETRY_LOGS.length) { setLogs(prev => [...prev, TELEMETRY_LOGS[currentIndex]]); currentIndex++; } 
      else clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // --- SUPABASE MUTATION: IAM UPDATES ---
  const updateIAM = async (updates: Partial<Identity>) => {
    if (!activeIdentity) return;
    
    const updatedUser = { ...activeIdentity, ...updates };
    setActiveIdentity(updatedUser);
    
    const dbUpdates: any = {};
    if (updates.address !== undefined) dbUpdates.address = updates.address;
    if (updates.mfaEnabled !== undefined) dbUpdates.mfa_enabled = updates.mfaEnabled;
    if (updates.bioEnabled !== undefined) dbUpdates.bio_enabled = updates.bioEnabled;

    if (Object.keys(dbUpdates).length > 0) {
      await supabase.from('profiles').update(dbUpdates).eq('id', activeIdentity.id);
    }
  };

  const deleteAccount = async () => {
    if (!activeIdentity || activeIdentity.role === 'ADMIN') return; 
    
    if (window.confirm("Are you sure? This will purge your identity from the node.")) {
      await supabase.auth.signOut();
      localStorage.removeItem('1028bc_last_active_id');
      window.location.reload(); 
    }
  };

  // --- SUPABASE MUTATION: ADAPTIVE VECTORS ---
  const analyzeCommInput = (val: string) => {
    if (val.includes('@') && val.includes('.')) return [{type: 'EMAIL', label: 'Email', icon: Mail}];
    if (/^\+?[\d\s\-\(\)]{7,15}$/.test(val)) return [
      {type: 'SMS', label: 'SMS Text', icon: Smartphone},
      {type: 'WHATSAPP', label: 'WhatsApp', icon: MessageCircle},
      {type: 'SIGNAL', label: 'Signal', icon: ShieldCheck}
    ];
    if (val.startsWith('http')) return [
      {type: 'WEBHOOK', label: 'Custom Webhook', icon: Globe},
      {type: 'SLACK', label: 'Slack Webhook', icon: Hash}
    ];
    if (val.startsWith('@')) return [
      {type: 'TELEGRAM', label: 'Telegram', icon: Send},
      {type: 'DISCORD', label: 'Discord User', icon: Hash}
    ];
    return [{type: 'CUSTOM', label: 'Custom Protocol', icon: TerminalSquare}];
  };

  const handleAddComm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommValue.trim()) return;
    const types = analyzeCommInput(newCommValue);
    if (types.length === 1) {
      commitComm(newCommValue, types[0].type, types[0].label);
    } else {
      setSuggestedTypes(types);
      setPendingComm(newCommValue);
    }
  };

  const commitComm = async (value: string, type: string, label: string) => {
    if (!activeIdentity) return;

    const newVector = { profile_id: activeIdentity.id, type, value, label };
    
    const { data, error } = await supabase.from('comm_vectors').insert([newVector]).select().single();
    
    if (!error && data) {
      const currentComms = activeIdentity.comms || [];
      updateIAM({ comms: [...currentComms, data] });
    }

    setNewCommValue('');
    setPendingComm(null);
    setSuggestedTypes([]);
  };

  const removeComm = async (idToRemove: string) => {
    if (!activeIdentity || !activeIdentity.comms) return;
    
    const filtered = activeIdentity.comms.filter(c => c.id !== idToRemove);
    setActiveIdentity({ ...activeIdentity, comms: filtered });

    await supabase.from('comm_vectors').delete().eq('id', idToRemove);
  };

  const getCommIcon = (type: string) => {
    switch (type) {
      case 'EMAIL': return <Mail size={14} className="text-sky-400" />;
      case 'SMS': return <Smartphone size={14} className="text-emerald-400" />;
      case 'WHATSAPP': return <MessageCircle size={14} className="text-emerald-400" />;
      case 'SLACK': case 'DISCORD': return <Hash size={14} className="text-fuchsia-400" />;
      case 'WEBHOOK': return <Globe size={14} className="text-amber-400" />;
      case 'TELEGRAM': return <Send size={14} className="text-sky-400" />;
      default: return <TerminalSquare size={14} className="text-white/50" />;
    }
  };

  return (
    <div className="w-full pt-20 md:pt-32 pb-24 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-b border-white/10 pb-12">
          <div className="flex items-end gap-8">
            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden border border-white/20 relative group">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" alt="Brian K. Campbell" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-[0.1em] text-white mb-2">Brian Kurtis<br/>Campbell</h1>
              <h2 className="text-xl md:text-2xl font-bold tracking-widest text-sky-400 uppercase">Lead Architect & Field Engineer</h2>
            </div>
          </div>
          
          <div className="relative shrink-0" ref={cvMenuRef}>
            <button onClick={() => setIsCvMenuOpen(!isCvMenuOpen)} className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md text-xs font-bold tracking-widest uppercase transition-all hover:bg-white/10 group text-white">
              <Download size={18} className="group-hover:text-sky-400 transition-colors" /> Access CV Archive
            </button>
            <AnimatePresence>
              {isCvMenuOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-2xl flex flex-col z-50">
                  <span className="text-[9px] font-black p-4 pb-2 block text-white/50 uppercase tracking-widest">Select Operational Focus</span>
                  {cvArchive.map((cv, index) => {
                    const Icon = ICON_MAP[cv.iconString] || FileText;
                    return <a key={index} href={cv.file} download className="w-full py-4 px-4 text-xs font-bold text-left transition-all flex items-center gap-3 text-white/70 hover:bg-white/10 hover:text-sky-400 border-b border-white/5 last:border-0" onClick={() => setIsCvMenuOpen(false)}><Icon size={16} /> {cv.label}</a>;
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          
          <div className="xl:col-span-1 space-y-12">
            
            {activeIdentity && (
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldAlert size={100} /></div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-6 flex items-center gap-3 relative z-10">
                  <Lock size={16} className="text-amber-400"/> IAM Dashboard
                </h3>
                
                <div className="space-y-6 relative z-10">
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Active Identity</p>
                    <p className="text-lg font-mono font-bold text-white">{activeIdentity.handle} <span className="text-[10px] bg-white/10 px-2 py-1 rounded ml-2">{activeIdentity.role}</span></p>
                  </div>

                  {/* LOCATION VECTOR */}
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2"><MapPin size={12}/> Home Base Vector</label>
                    <input type="text" value={activeIdentity.address || ''} onBlur={(e) => updateIAM({ address: e.target.value })} onChange={(e) => setActiveIdentity({...activeIdentity, address: e.target.value})} className="w-full bg-black/60 border border-white/10 focus:border-sky-400 rounded-lg p-2 text-white font-mono text-xs tracking-widest transition-colors outline-none" placeholder="City, State or Full Address" />
                  </div>

                  {/* ADAPTIVE COMMS ARRAY */}
                  <div className="pt-4 border-t border-white/5">
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">Communication Vectors</label>
                    
                    <div className="space-y-2 mb-4">
                      {activeIdentity.comms?.map((comm) => (
                        <div key={comm.id} className="flex justify-between items-center bg-black/50 border border-white/5 p-2 rounded-lg group">
                          <div className="flex items-center gap-3 overflow-hidden">
                            {getCommIcon(comm.type)}
                            <div className="flex flex-col truncate">
                              <span className="text-[9px] uppercase text-white/40 tracking-widest">{comm.label}</span>
                              <span className="text-xs font-mono text-white truncate">{comm.value}</span>
                            </div>
                          </div>
                          <button onClick={() => removeComm(comm.id)} className="p-2 opacity-0 group-hover:opacity-100 hover:text-red-400 text-white/30 transition-all">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {!pendingComm ? (
                      <form onSubmit={handleAddComm} className="relative">
                        <input type="text" value={newCommValue} onChange={(e) => setNewCommValue(e.target.value)} className="w-full bg-black/60 border border-white/10 focus:border-emerald-400 rounded-lg py-2 pl-3 pr-10 text-white font-mono text-xs transition-colors outline-none" placeholder="Enter phone, email, or URL..." />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-300"><Plus size={16} /></button>
                      </form>
                    ) : (
                      <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-3">
                        <p className="text-[9px] uppercase tracking-widest text-sky-400 mb-2 font-bold">Multiple protocols detected. Clarify intent:</p>
                        <div className="grid grid-cols-1 gap-2">
                          {suggestedTypes.map((t, idx) => (
                            <button key={idx} onClick={() => commitComm(pendingComm, t.type, t.label)} className="flex items-center gap-2 p-2 bg-black/50 border border-white/10 hover:bg-white/10 rounded transition-colors text-xs text-white">
                              <t.icon size={12} className="text-sky-400"/> {t.label}
                            </button>
                          ))}
                        </div>
                        <button onClick={() => setPendingComm(null)} className="mt-3 text-[9px] text-white/40 uppercase w-full text-center hover:text-white">Cancel</button>
                      </div>
                    )}
                  </div>

                  {/* Auth Factors */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">Authentication Factors</label>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5">
                      <div className="flex items-center gap-3">
                        <Fingerprint size={16} className={activeIdentity.bioEnabled ? "text-emerald-400" : "text-white/30"} />
                        <div>
                          <p className="text-xs font-bold text-white">WebAuthn / Biometrics</p>
                          <p className="text-[9px] text-white/40 uppercase">Device-level passkey</p>
                        </div>
                      </div>
                      <button onClick={() => updateIAM({ bioEnabled: !activeIdentity.bioEnabled })} className={`w-10 h-5 rounded-full relative transition-colors ${activeIdentity.bioEnabled ? 'bg-emerald-500' : 'bg-white/20'}`}>
                        <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${activeIdentity.bioEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5">
                      <div className="flex items-center gap-3">
                        <Smartphone size={16} className={activeIdentity.mfaEnabled ? "text-sky-400" : "text-white/30"} />
                        <div>
                          <p className="text-xs font-bold text-white">Two-Factor (2FA)</p>
                          <p className="text-[9px] text-white/40 uppercase">{activeIdentity.role !== 'VISITOR' ? 'Mandated by Security Policy' : 'Optional TOTP/SMS'}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => activeIdentity.role === 'VISITOR' && updateIAM({ mfaEnabled: !activeIdentity.mfaEnabled })} 
                        disabled={activeIdentity.role !== 'VISITOR'}
                        className={`w-10 h-5 rounded-full relative transition-colors ${activeIdentity.mfaEnabled ? 'bg-sky-500' : 'bg-white/20'} ${activeIdentity.role !== 'VISITOR' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${activeIdentity.mfaEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Lifecycle Management */}
                  {activeIdentity.role !== 'ADMIN' && (
                    <div className="pt-4 border-t border-white/5">
                      <button onClick={deleteAccount} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-colors">
                        <Trash2 size={14} /> Purge Identity (Delete Account)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-8 flex items-center gap-3"><Activity size={16} className="text-sky-400"/> Competency Matrix</h3>
              <div className="space-y-10">
                {SKILL_MATRIX.map((category) => (
                  <div key={category.category}>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2"><category.icon size={14} className="text-sky-400/70" /> {category.category}</h4>
                    <div className="space-y-4 pl-6 border-l border-white/5">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="flex flex-col gap-2"><span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">{skill.name}</span><SkillPips level={skill.level} /></div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6 flex items-center gap-2"><ShieldCheck size={14} /> Field Credentials</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {credentials.map((c, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                        <div className="flex flex-col"><span className="text-[10px] font-bold text-white/80">{c.cert}</span><span className="text-[8px] font-mono text-white/30 uppercase tracking-tighter">{c.issuer}</span></div>
                        <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border ${c.status === 'ACTIVE' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-sky-400 bg-sky-400/10 border-sky-400/20'}`}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 font-mono text-[10px] sm:text-xs leading-relaxed text-emerald-400 h-64 overflow-hidden relative shadow-2xl">
              <div className="flex items-center gap-2 mb-4 text-white/40 pb-2 border-b border-white/10"><TerminalSquare size={14} /> System Telemetry Feed</div>
              <div className="space-y-2">
                {logs.map((log, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>{log}</motion.div>))}
                {logs.length === TELEMETRY_LOGS.length && (<motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-emerald-400 mt-2" />)}
              </div>
            </div>
          </div>

          <div className="xl:col-span-2">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-[0.1em] text-white mb-12">Deployment Chronology</h3>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              
              {chronologyLogs.length === 0 ? (
                <div className="text-white/40 font-mono text-sm animate-pulse ml-16 md:ml-0 md:text-center">FETCHING CHRONOLOGY FROM VAULT...</div>
              ) : (
                chronologyLogs.map((report, index) => (
                  <motion.div key={report.id || index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.2 }} className="relative flex items-center md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-2xl z-10"><div className="w-3 h-3 bg-sky-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div></div>
                    <div className="ml-8 md:ml-0 w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/30 transition-colors duration-300">
                      <div className="flex flex-col gap-1 mb-4"><span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">[{report.date_range}]</span><h4 className="text-xl font-bold uppercase tracking-widest text-white">{report.role}</h4><span className="text-xs font-bold uppercase tracking-widest text-white/40">// {report.project}</span></div>
                      <ul className="space-y-3 mt-6">
                        {report.details && report.details.map((detail: string, i: number) => (
                          <li key={i} className="text-sm leading-relaxed text-white/70 flex items-start gap-3"><Code2 size={14} className="mt-1 shrink-0 text-white/20" />{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};