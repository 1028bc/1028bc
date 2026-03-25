import React, { useState, useEffect } from 'react';
import { 
  Terminal, Cpu, Smartphone, Activity, Code2, Wrench, 
  ShieldCheck, Zap, Server, Network, Shield, Radio, 
  Lock, Badge, Power, RefreshCw, Upload, 
  FileText, Image as ImageIcon, Folder, CheckCircle2, Circle,
  Mic, Volume2, MessageSquare, Phone, Camera, Bot, Hash, Users, Search,
  Menu, Eye, X, MoreVertical, Paperclip, Map, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Components ---

const StatusIndicator = () => (
  <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
    <span className="text-offwhite/50 hidden sm:inline">System Status:</span>
    <span className="text-yellow flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow"></span>
      </span>
      Active
    </span>
  </div>
);
const InfoOverlay = ({ text, enabled }: { text: string, enabled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!enabled) return null;

  return (
    <>
      <div 
        className="absolute top-3 right-3 z-10 cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-5 h-5 rounded-full bg-yellow/20 border border-yellow/50 flex items-center justify-center text-yellow font-mono text-xs font-bold hover:bg-yellow/40 transition-colors">
          i
        </div>
        
        <div className={`hidden sm:block absolute right-0 top-6 w-64 bg-charcoal border border-yellow rounded-lg p-3 shadow-xl transition-opacity duration-200 pointer-events-none ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-mono text-xs text-offwhite leading-relaxed">{text}</p>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="sm:hidden fixed bottom-16 left-0 right-0 z-50 bg-charcoal border-t border-yellow p-6 rounded-t-lg shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-yellow text-xs font-bold uppercase tracking-widest">System Info</span>
              <button onClick={() => setIsOpen(false)} className="text-offwhite/50 hover:text-white p-2">✕</button>
            </div>
            <p className="font-mono text-sm text-offwhite leading-relaxed">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const PageHeader = ({ titleTop, titleBottom, rightContent, children, activePage }: { titleTop: string, titleBottom: string, rightContent?: React.ReactNode, children?: React.ReactNode, activePage?: string }) => (
  <div className="pt-12 flex flex-col items-start w-full border-l-2 border-yellow-400 pl-6">
    <div className="flex justify-between items-center w-full mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 border border-charcoal-light bg-charcoal-light/30 text-xs font-mono text-offwhite/70 uppercase tracking-widest">
        <Terminal size={12} className="text-yellow" />
        <span>{`>_ 1028BC / ${activePage || titleTop}`}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[10px] font-mono text-offwhite/70 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          SYSTEM STATUS: ● ACTIVE
        </div>
        <button className="text-offwhite/70 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
    <div className="w-full flex justify-between items-end">
      <h1 className="font-display text-4xl md:text-5xl font-bold uppercase leading-[0.85] tracking-tighter flex flex-col items-start">
        <span style={{ color: '#F5F5F5' }}>{titleTop}</span>
        <span style={{ color: '#FFD700' }}>{titleBottom}</span>
      </h1>
      {rightContent && <div>{rightContent}</div>}
    </div>
    <div className="mt-10 w-full">
      {children}
    </div>
  </div>
);

const THEMES = {
  tactical: { bg: '#1A1A1A', accent: '#FFD700', text: '#F5F5F5' },
  emergency: { bg: '#2A0008', accent: '#FF4136', text: '#F5F5F5' },
  'ada-high-contrast': { bg: '#000000', accent: '#FFFF00', text: '#FFFFFF' },
  daylight: { bg: '#FFFFFF', accent: '#0000FF', text: '#1A1A1A' },
};

const ProgressiveBentoPanel = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  updateText, 
  targetTab, 
  setActiveTab, 
  infoOverlaysEnabled, 
  infoText,
  className,
  delay = 0,
  titleColors = ['#F5F5F5', '#FFD700']
}: any) => {
  const [expansionLevel, setExpansionLevel] = useState(0);
  
  const handleTap = () => {
    setExpansionLevel(prev => (prev + 1) % 3);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      onClick={handleTap}
      className={`tactical-border bg-charcoal-light/20 p-4 pt-2 hover:bg-charcoal-light/40 transition-colors duration-300 group flex flex-col gap-4 rounded-lg cursor-pointer overflow-hidden h-auto ${className}`}
    >
      <InfoOverlay enabled={infoOverlaysEnabled} text={infoText} />
      
      <div className="shrink-0 mb-4 pt-2">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-2 flex items-center gap-2">
          <Icon size={24} className="opacity-80 text-white" />
          <div className="flex flex-col">
            {title.map((t: string, i: number) => <span key={i} style={{ color: titleColors[i] || titleColors[0] }}>{t}</span>)}
          </div>
        </h2>
        <p className="font-mono text-xs text-offwhite/60">{subtitle}</p>
      </div>

      <motion.div 
        className="mt-4 pt-4 border-t border-charcoal-light/50 flex flex-col"
        animate={{ height: (expansionLevel === 0 || expansionLevel === 3) ? '40px' : 'auto' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div className="flex items-center gap-2 mb-2 shrink-0">
          <span className="bg-yellow text-charcoal text-[8px] font-bold px-1 py-0.5 rounded-sm uppercase tracking-widest">NEW</span>
          <span className="text-[9px] font-mono text-offwhite/40 uppercase tracking-widest">System Update</span>
        </div>
        <p className={`font-mono text-xs text-white leading-relaxed ${expansionLevel === 0 || expansionLevel === 3 ? 'line-clamp-1' : ''}`}>
          {updateText}
        </p>
        
        <AnimatePresence>
          {expansionLevel === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 shrink-0"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveTab(targetTab); }}
                className="w-full py-2 bg-charcoal border border-charcoal-light text-yellow font-mono text-xs font-bold uppercase tracking-widest hover:bg-yellow hover:text-charcoal transition-colors rounded-lg"
              >
                [OPEN PAGE]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// --- Screen Components ---

const DashboardScreen = ({ infoOverlaysEnabled, setActiveTab }: { infoOverlaysEnabled: boolean, setActiveTab: (tab: string) => void }) => (
  <div className="max-w-7xl mx-auto w-full pb-24">
    <PageHeader titleTop="DASHBOARD" titleBottom="COMM CTR">
      <div className="absolute top-0 right-12 opacity-10 pointer-events-none">
        <Cpu size={400} strokeWidth={0.5} />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 max-w-3xl relative z-10"
      >
        <p className="font-mono text-sm md:text-base text-offwhite/60 max-w-xl leading-relaxed">
          High-level check and deployment protocol. Bridging the gap between physical infrastructure and digital execution. No fluff. Just systems that work.
        </p>
      </motion.div>
      <section className="flex flex-col gap-4 mt-10">
        <ProgressiveBentoPanel 
          className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2 relative h-auto" 
          delay={0.1}
          title={['FIELD', 'OPS']}
          subtitle="Certified hardware technician. On-site checks, repair, and deployment."
          icon={Wrench}
          moduleNum="01"
          moduleName="Physical Layer"
          updateText="Field Ops: New ticket assigned. Node 04 temperature exceeding safe limits. IMMEDIATE action required. Standby for updates."
          targetTab="fieldops"
          setActiveTab={setActiveTab}
          infoOverlaysEnabled={infoOverlaysEnabled}
          infoText="Physical layer checks and repair module. Certified hardware technician interface."
        />

        <ProgressiveBentoPanel 
          className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 relative" 
          delay={0.2}
          title={['LOGIC', 'LAB']}
          subtitle="Open source contributions and core systems engineering."
          icon={Code2}
          moduleNum="02"
          moduleName="Application Layer"
          updateText="Logic Lab: PR #690 merged. tscircuit core components updated. AutoKey integration tests passing. Highlight syntax improvements deployed."
          targetTab="logiclab"
          setActiveTab={setActiveTab}
          infoOverlaysEnabled={infoOverlaysEnabled}
          infoText="Core systems engineering and open source contributions."
        />

        <ProgressiveBentoPanel 
          className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 relative" 
          delay={0.3}
          title={['SOLUTIONS', 'SOLURBANA']}
          titleColors={['#F5F5F5', '#FFD700']}
          subtitle="Mobile application development. SolUrbana deployment."
          icon={Smartphone}
          moduleNum="03"
          moduleName="User Layer"
          updateText="Solutions: SolUrbana v2.1.0 released. New system data dashboard integrated. User feedback loop optimized for faster response times."
          targetTab="solutions"
          setActiveTab={setActiveTab}
          infoOverlaysEnabled={infoOverlaysEnabled}
          infoText="Mobile application development and SolUrbana deployment."
        />
      </section>
    </PageHeader>
  </div>
);

const FieldOpsScreen = ({ infoOverlaysEnabled, setHasPriorityInterrupt }: { infoOverlaysEnabled: boolean, setHasPriorityInterrupt?: (v: boolean) => void }) => {
  const [micActive, setMicActive] = useState(false);
  const [ttsActive, setTtsActive] = useState(false);
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);
  const [sitePrepOpen, setSitePrepOpen] = useState(true);
  const [checklist, setChecklist] = useState([
    { label: 'Job Site Secured', icon: ShieldCheck, checked: true },
    { label: '4-Point Inspection', icon: Search, checked: false },
    { label: 'Message Hub Established', icon: Radio, checked: true },
    { label: 'Power Isolated', icon: Zap, checked: false },
    { label: 'System Data Sync', icon: Network, checked: false },
  ]);

  const [drafts, setDrafts] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index].checked = !newChecklist[index].checked;
    setChecklist(newChecklist);
  };

  const toggleDraft = (id: number) => {
    setDrafts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const keywordWatchlist = ["EMERGENCY", "CRITICAL", "IMMEDIATE"];
  const isPriority = (text: string) => keywordWatchlist.some(kw => text.toUpperCase().includes(kw));

  const messages = [
    { id: 1, platform: 'SLACK', channel: '#OPS-FIELD', sender: '@dispatch', text: 'What\'s the ETA on Node 04 repair?', time: '14:32:01 PST', icon: Hash, color: 'text-rose-400/80', draft: 'Brian is currently on-site and will respond shortly. Estimated completion: 60 mins.' },
    { id: 2, platform: 'TEAMS', channel: 'PARTS', sender: 'Sarah T', text: 'Logic board delivered to site lockbox.', time: '14:35:22 PST', icon: Users, color: 'text-indigo-400/80', draft: 'Acknowledged. Will retrieve from lockbox upon completion of current task.' },
    { id: 3, platform: 'SMS', channel: 'CLIENT', sender: '+1 (555) 0192', text: 'Confirming 15 min downtime?', time: '14:40:11 PST', icon: MessageSquare, color: 'text-emerald-400/80', draft: 'Yes, downtime is confirmed for 15 minutes. We will notify you once systems are restored.' },
    { id: 4, platform: 'PHONE', channel: 'NOC', sender: 'Automated', text: 'CRITICAL: Node 04 temperature exceeding safe limits. IMMEDIATE action required.', time: '14:45:00 PST', icon: Phone, color: 'text-sky-400/80', draft: 'Investigating Node 04 thermal anomaly now. Standby for updates.' },
  ];

  useEffect(() => {
    const hasInterrupt = messages.some(m => isPriority(m.text));
    if (setHasPriorityInterrupt) {
      setHasPriorityInterrupt(hasInterrupt);
    }
  }, [messages, setHasPriorityInterrupt]);

  return (
    <div className="max-w-[1600px] mx-auto w-full pb-24 px-4">
      <PageHeader 
        titleTop="FIELD" 
        titleBottom="OPS"
        rightContent={
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => setTtsActive(!ttsActive)}
              className={`p-3 border rounded-lg transition-colors ${ttsActive ? 'bg-yellow text-charcoal border-yellow' : 'bg-charcoal-light/20 border-charcoal-light text-offwhite hover:bg-charcoal-light/40'}`}
            >
              <Volume2 size={20} />
            </button>
            <button 
              onClick={() => setMicActive(!micActive)}
              className={`p-3 border rounded-lg transition-colors ${micActive ? 'bg-red text-white border-red animate-pulse' : 'bg-charcoal-light/20 border-charcoal-light text-offwhite hover:bg-charcoal-light/40'}`}
            >
              <Mic size={20} />
            </button>
          </div>
        }
      >
        <div className="h-[2px] w-full bg-charcoal-light mb-4"></div>
        <div className="flex justify-between items-center pt-2 mb-6">
          <p className="text-xs uppercase font-bold tracking-widest text-offwhite/40">TECH CONSOLE v5.0 // MULTI NODE</p>
          <span className="text-[9px] font-black bg-yellow text-charcoal px-2 py-0.5 rounded-sm uppercase tracking-widest">Release Candidate</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT PANE: SOP & Checklist */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-charcoal-light/10 p-6 border border-charcoal-light rounded-lg space-y-6 relative">
              <InfoOverlay enabled={infoOverlaysEnabled} text="Current routing and GPS system data." />
              <h4 className="font-display font-bold text-lg uppercase tracking-widest border-b border-charcoal-light/30 pb-2 flex flex-col">
                <span>NAV DATA</span>
                <span>/ ROUTING</span>
              </h4>
              <div className="w-full h-32 bg-charcoal border border-charcoal-light rounded-lg flex items-center justify-center mb-4">
                <Map size={32} className="text-offwhite/20" />
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-offwhite/40">DESTINATION:</span>
                  <span className="text-offwhite">Node 04</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-offwhite/40">ETA:</span>
                  <span className="text-yellow">14 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-offwhite/40">STATUS:</span>
                  <span className="text-emerald-400">En Route</span>
                </div>
              </div>
            </div>

            <div className="bg-charcoal-light/10 p-6 border border-charcoal-light rounded-lg space-y-6 relative">
              <InfoOverlay enabled={infoOverlaysEnabled} text="Standard Operating Procedure. Follow all steps sequentially to ensure safety and compliance." />
              <h4 className="font-display font-bold text-lg uppercase tracking-widest border-b border-charcoal-light/30 pb-2 flex flex-col">
                <span>ACTIVE</span>
                <span>SOP</span>
              </h4>
              <div className="text-xs font-mono text-offwhite/60 space-y-2">
                <p className="text-yellow font-bold">CURRENT DIRECTIVE:</p>
                <p>Run hardware check and replace faulty logic board on Node 04.</p>
                <p className="text-red font-bold mt-2">WARNING:</p>
                <p>High voltage area. Ensure residual power drainage before chassis breach.</p>
              </div>
            </div>

            <div className="bg-charcoal-light/10 p-6 border border-charcoal-light rounded-lg space-y-6 relative">
              <InfoOverlay enabled={infoOverlaysEnabled} text="4-Point Inspection Protocol: Job Site Secure, Point-of-Inspection, Message Hub, System Data Sync." />
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-charcoal-light/30">
                <h4 className="font-display font-bold text-lg uppercase tracking-widest flex flex-col">
                  <span>SITE</span>
                  <span>PREP</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setSitePrepOpen(!sitePrepOpen)}
                  aria-expanded={sitePrepOpen}
                  className="shrink-0 text-yellow hover:text-offwhite transition-colors"
                >
                  <Plus size={16} className={sitePrepOpen ? 'rotate-45 transition-transform' : 'transition-transform'} />
                </button>
              </div>
              {sitePrepOpen && (
                <div className="space-y-4">
                  {checklist.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start group gap-4 p-2 hover:bg-charcoal-light/20 rounded-lg transition-colors cursor-pointer"
                      onClick={() => toggleCheck(i)}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <item.icon size={20} className="text-offwhite/40 group-hover:text-yellow transition-colors shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono whitespace-normal break-words">{item.label}</span>
                      </div>
                      <div className={`w-14 h-7 border flex items-center px-1 transition-colors shrink-0 rounded-full ${item.checked ? 'bg-yellow border-yellow' : 'bg-charcoal-light border-offwhite/20'}`}>
                        <div className={`w-5 h-5 bg-white transition-transform rounded-full shadow-sm ${item.checked ? 'translate-x-7' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>

        {/* CENTER PANE: Main Workspace */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-charcoal-light/10 p-6 border border-charcoal-light rounded-lg space-y-6 flex flex-col h-full relative">
            <InfoOverlay enabled={infoOverlaysEnabled} text="Primary interaction zone for field notes, asset uploads, and AI assistance." />
            <h4 className="font-display font-bold text-lg uppercase tracking-widest border-b border-charcoal-light/30 pb-2 flex flex-col">
              <span>MAIN</span>
              <span>WORKSPACE</span>
            </h4>
            
            {/* Voice Notes Prominent Toggle */}
            <button 
              onClick={() => setMicActive(!micActive)}
              className={`w-full py-6 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${micActive ? 'bg-red/10 border-red text-red' : 'bg-charcoal-light/20 border-charcoal-light text-offwhite/60 hover:bg-charcoal-light/40 hover:text-white hover:border-yellow'}`}
            >
              <Mic size={32} className={micActive ? 'animate-pulse' : ''} />
              <span className="font-display font-bold tracking-widest uppercase text-sm">
                {micActive ? 'RECORDING FIELD NOTES...' : 'TAP TO DICTATE NOTES'}
              </span>
            </button>

            <div className="space-y-2 flex-1">
              <label className="text-[10px] font-black text-offwhite/40 uppercase tracking-widest font-mono">Closing Notes</label>
              <textarea className="w-full bg-charcoal border border-charcoal-light focus:border-yellow focus:outline-none text-white font-mono text-sm p-4 h-32 placeholder-offwhite/20 rounded-lg resize-none" placeholder="ENTER SYSTEM ARTIFACTS OR ERRORS..."></textarea>
            </div>

            <div className="relative">
              <button 
                onClick={() => setAttachMenuOpen(!attachMenuOpen)}
                className="w-full bg-charcoal-light/20 border border-charcoal-light hover:border-yellow hover:text-yellow text-offwhite/60 transition-colors rounded-lg p-4 flex items-center justify-center gap-3">
                <Paperclip size={20} />
                <span className="text-xs font-bold uppercase tracking-widest font-mono">ATTACH ASSET</span>
              </button>
              {attachMenuOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-charcoal border border-charcoal-light rounded-lg p-2 flex flex-col gap-2 shadow-xl z-10">
                  <button 
                    onClick={() => setAttachMenuOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-charcoal-light/30 rounded text-offwhite/80 hover:text-yellow transition-colors text-xs font-mono uppercase tracking-widest">
                    <Camera size={16} /> CAPTURE
                  </button>
                  <button 
                    onClick={() => setAttachMenuOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-charcoal-light/30 rounded text-offwhite/80 hover:text-yellow transition-colors text-xs font-mono uppercase tracking-widest">
                    <Upload size={16} /> UPLOAD
                  </button>
                </div>
              )}
            </div>

            {/* Intelligent Support Agent */}
            <div className="bg-charcoal border border-charcoal-light rounded-lg p-4 space-y-4 relative">
              <InfoOverlay enabled={infoOverlaysEnabled} text="Real-time AI-driven translation for multi-language documentation and speech decoding." />
              <div className="flex items-center gap-2 border-b border-charcoal-light/50 pb-2">
                <Bot size={16} className="text-yellow" />
                <span className="text-[10px] font-bold text-yellow uppercase tracking-widest font-mono">INTELLIGENT SUPPORT AGENT</span>
              </div>
              <div className="font-mono text-xs text-offwhite/80 space-y-2">
                <p className="text-offwhite/40 italic">"Awaiting voice input or system data sync..."</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-br from-charcoal-dark to-charcoal-light border-2 border-yellow text-offwhite py-4 font-black uppercase tracking-[0.3em] text-sm hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all active:scale-[0.98] rounded-lg mt-auto">
              SUBMIT TO MAIN LOG
            </button>
          </div>
        </div>

        {/* RIGHT PANE: MESSAGE HUB & WORK CALENDAR */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <div className="bg-charcoal-light/10 p-6 border border-charcoal-light rounded-lg space-y-6 relative shrink-0">
            <InfoOverlay enabled={infoOverlaysEnabled} text="Upcoming deployments on the current work calendar." />
            <h4 className="font-display font-bold text-lg uppercase tracking-widest border-b border-charcoal-light/30 pb-2 flex flex-col">
              <span>WORK</span>
              <span>CALENDAR</span>
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono border-b border-charcoal-light/20 pb-2">
                <span className="text-offwhite/80">Starbucks NV-04</span>
                <span className="text-yellow">0900hrs</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono border-b border-charcoal-light/20 pb-2">
                <span className="text-offwhite/80">Substation Alpha</span>
                <span className="text-yellow">1130hrs</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono border-b border-charcoal-light/20 pb-2">
                <span className="text-offwhite/80">Sector 7G Relay</span>
                <span className="text-yellow">1415hrs</span>
              </div>
            </div>
          </div>

          <div className="bg-charcoal-light/10 p-6 border border-charcoal-light rounded-lg flex flex-col flex-1 relative min-h-[400px]">
            <InfoOverlay enabled={infoOverlaysEnabled} text="Agentic message filtering. Summarizes Slack, Teams, and SMS to reduce cognitive load while on-site." />
            <h4 className="font-display font-bold text-lg uppercase tracking-widest border-b border-charcoal-light/30 pb-2 flex flex-col mb-4">
              <span>MESSAGE</span>
              <span>HUB</span>
            </h4>

            {/* AI Summary */}
            <div className="bg-yellow/10 border border-yellow/30 rounded-lg p-3 mb-6">
              <span className="text-[10px] font-bold text-yellow uppercase tracking-widest font-display block mb-1">AI SUMMARY</span>
              <p className="font-mono text-xs text-offwhite/80 leading-relaxed">
                1 Slack ping regarding Node 04; 1 SMS from client; 1 critical interrupt detected.
              </p>
            </div>

            {/* Live Feeds */}
            <div className="space-y-4 overflow-y-auto flex-1 pr-2 scrollbar-hide">
              {messages.map((msg) => {
                const priority = isPriority(msg.text);
                return (
                  <div key={msg.id} className={`bg-charcoal/50 border rounded-lg p-3 transition-colors ${priority ? 'border-[#FF4136]' : 'border-charcoal-light/50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <msg.icon size={12} className={msg.color} />
                        <span className="text-[10px] font-bold text-offwhite/60 uppercase tracking-widest font-mono">{msg.platform} // {msg.channel}</span>
                      </div>
                      <span className="text-[10px] font-mono text-offwhite/40">{msg.time}</span>
                    </div>
                    <p className="font-mono text-xs text-white mb-3"><span className="text-yellow">{msg.sender}:</span> {msg.text}</p>
                    
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => toggleDraft(msg.id)}
                        className="self-start text-[10px] font-mono font-bold text-offwhite/40 hover:text-yellow transition-colors uppercase tracking-widest border border-charcoal-light/50 hover:border-yellow/50 rounded-lg px-2 py-1"
                      >
                        [DRAFT_REPLY]
                      </button>
                      
                      {drafts[msg.id] && (
                        <div className="bg-charcoal-light/20 p-2 rounded-lg border border-charcoal-light/30 mt-1">
                          <p className="font-mono text-[10px] text-offwhite/60 italic">"{msg.draft}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageHeader>
  </div>
);
};

const LogicLabScreen = ({ infoOverlaysEnabled }: { infoOverlaysEnabled: boolean }) => {
  const [prs, setPrs] = useState<any[]>([]);
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch Active PRs for 1028bc
        const prRes = await fetch('https://api.github.com/search/issues?q=author:1028bc+type:pr+state:open&sort=updated&order=desc');
        const prData = await prRes.json();
        
        // Fetch Mentions for 1028bc
        const mentionRes = await fetch('https://api.github.com/search/issues?q=mentions:1028bc&sort=updated&order=desc');
        const mentionData = await mentionRes.json();

        // Fetch recent comments by 1028bc
        const commentRes = await fetch('https://api.github.com/search/issues?q=commenter:1028bc&sort=updated&order=desc');
        const commentData = await commentRes.json();

        if (prData.items) setPrs(prData.items.slice(0, 5));
        
        const combined = [
          ...(mentionData.items || []).map((item: any) => ({ ...item, feedType: 'mention' })),
          ...(commentData.items || []).map((item: any) => ({ ...item, feedType: 'comment' }))
        ].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 6);
        
        setFeed(combined);
      } catch (error) {
        console.error("Failed to fetch GitHub data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto w-full space-y-8 pb-24 pt-8 relative">
      <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden opacity-10">
        <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>
      </div>

      <section className="mb-12">
        <div className="flex justify-between items-end mb-2 gap-4 pt-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter break-words flex flex-col">
            <span style={{ color: '#F5F5F5' }}>LOGIC</span>
            <span style={{ color: '#FFD700' }}>LAB</span>
          </h2>
          <span className="font-mono text-[10px] tracking-widest text-offwhite/40 uppercase shrink-0">REF CORE: 001-A / 1028</span>
        </div>
        <div className="h-[1px] w-full bg-charcoal-light opacity-50 mb-8"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="tactical-border bg-charcoal-light/20 p-6 flex flex-col border-l-4 border-yellow relative overflow-hidden rounded-lg">
          <InfoOverlay enabled={infoOverlaysEnabled} text="Live feed of active pull requests and open source contributions." />
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tighter flex flex-col">
              <span>ACTIVE</span>
              <span>CONTRIBUTIONS</span>
            </h3>
            <span className="px-2 py-1 bg-yellow/10 text-yellow text-[10px] font-bold font-mono tracking-widest rounded-lg">PULL REQUESTS</span>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 bg-charcoal-light/30 rounded-lg"></div>
                ))}
              </div>
            ) : prs.length > 0 ? (
              prs.map((pr) => {
                const repoName = pr.repository_url.split('/').slice(-2).join('/');
                return (
                  <div key={pr.id} className="bg-charcoal/50 p-4 border border-charcoal-light/50 rounded-lg hover:border-yellow/50 transition-colors">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <span className="font-mono text-[10px] font-bold text-yellow uppercase tracking-widest truncate">{repoName}</span>
                      <span className="font-mono text-[10px] text-offwhite/40 shrink-0">#{pr.number}</span>
                    </div>
                    <h4 className="font-mono text-sm text-white mb-3 line-clamp-2">{pr.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow animate-pulse"></span>
                      <span className="font-mono text-[10px] text-offwhite/60 uppercase tracking-widest">{pr.state}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-offwhite/40 font-mono text-sm">No active pull requests found.</div>
            )}
          </div>
        </div>

        <div className="tactical-border bg-charcoal-light/20 p-6 flex flex-col border-l-4 border-yellow relative overflow-hidden rounded-lg">
          <InfoOverlay enabled={infoOverlaysEnabled} text="Aggregated activity feed including mentions, comments, and system alerts." />
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tighter flex flex-col">
              <span>UNIFIED</span>
              <span>FEED</span>
            </h3>
            <span className="px-2 py-1 bg-yellow/10 text-yellow text-[10px] font-bold font-mono tracking-widest rounded-lg">ACTIVITY</span>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-charcoal-light/30 rounded-lg"></div>
                ))}
              </div>
            ) : feed.length > 0 ? (
              <div className="space-y-3">
                {feed.map(item => {
                  const repoName = item.repository_url.split('/').slice(-2).join('/');
                  const isMention = item.feedType === 'mention';
                  return (
                    <div key={item.id} className={`bg-charcoal/50 p-3 border border-charcoal-light/50 rounded-lg border-l-2 ${isMention ? 'border-yellow' : 'border-red'}`}>
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${isMention ? 'bg-yellow' : 'bg-red'}`}></span>
                          <span className={`font-mono text-[10px] font-bold uppercase tracking-widest truncate ${isMention ? 'text-yellow' : 'text-red'}`}>
                            {isMention ? `@${item.user.login}` : `Commented on ${repoName}`}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-offwhite/40 shrink-0">{isMention ? repoName : ''}</span>
                      </div>
                      <p className="font-mono text-xs text-offwhite/80 line-clamp-2">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-offwhite/40 font-mono text-sm">No recent message hub activity found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SolutionsScreen = ({ infoOverlaysEnabled }: { infoOverlaysEnabled: boolean }) => {
  const [project, setProject] = useState<'solurbana' | 'internal'>('solurbana');

  const projectData = {
    solurbana: {
      name: 'SolUrbana',
      status: 'DEVELOPMENT BUILD',
      version: 'v.4.2.0-stable',
      metric1: '98.4%',
      metric1Label: 'BUILD SUCCESS',
      metric2: '24 / 04',
      metric2Label: 'OPEN TICKETS / ACTIVE SPRINTS',
      description: 'High-precision deployment environment for mission-critical mobile architecture.'
    },
    internal: {
      name: 'Internal Tools',
      status: 'DEVELOPMENT BUILD',
      version: 'v.1.0.8-beta',
      metric1: '95.2%',
      metric1Label: 'BUILD SUCCESS',
      metric2: '12 / 02',
      metric2Label: 'OPEN TICKETS / ACTIVE SPRINTS',
      description: 'Fleet management and asset tracking modules for regional operations.'
    }
  };

  const data = projectData[project];

  return (
    <div className="max-w-7xl mx-auto w-full space-y-8 pb-24 pt-8">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-charcoal-light/50 pb-8">
          <div className="w-full md:w-auto">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-yellow mb-2 block">Tactical Unit // 04</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter break-words flex flex-col pt-8">
              <span style={{ color: '#F5F5F5' }}>SOLUTIONS</span>
              <span style={{ color: '#FFD700' }}>SOLURBANA</span>
            </h1>
          </div>
          <div className="flex bg-charcoal-light/20 p-1 border border-charcoal-light rounded-lg">
            <button 
              onClick={() => setProject('solurbana')}
              className={`px-4 py-2 font-display font-bold text-xs tracking-widest uppercase transition-all rounded-md ${project === 'solurbana' ? 'bg-yellow text-charcoal' : 'text-offwhite/50 hover:bg-charcoal-light/50'}`}
            >
              [SOLURBANA]
            </button>
            <button 
              onClick={() => setProject('internal')}
              className={`px-4 py-2 font-display font-bold text-xs tracking-widest uppercase transition-all rounded-md ${project === 'internal' ? 'bg-yellow text-charcoal' : 'text-offwhite/50 hover:bg-charcoal-light/50'}`}
            >
              [INTERNAL TOOLS]
            </button>
          </div>
        </div>
      </section>

      <motion.div 
        key={project}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        <div className="md:col-span-8 bg-charcoal-light/20 p-8 relative overflow-hidden group border border-charcoal-light rounded-lg">
          <InfoOverlay enabled={infoOverlaysEnabled} text={`Primary ${data.name} deployment. Tracking build metrics.`} />
          <div className="absolute top-4 right-4 font-mono text-[10px] text-offwhite/30">001-A / 1028</div>
          <div className="flex flex-col sm:flex-row justify-between items-start mb-12 gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold mb-1">{data.name}</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-yellow text-charcoal text-[10px] font-bold px-2 py-0.5 uppercase tracking-tighter font-mono">{data.status}</span>
                <span className="bg-charcoal-light text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-tighter font-mono">{data.version}</span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="text-4xl font-display font-black text-white">{data.metric1}</span>
              <span className="text-[10px] font-mono uppercase text-offwhite/50 tracking-widest">{data.metric1Label}</span>
            </div>
          </div>
          <div className="aspect-video mb-8 relative bg-charcoal overflow-hidden border border-charcoal-light/50 flex items-center justify-center">
            <span className="font-display text-6xl font-black text-offwhite/10">{data.metric2}</span>
            <span className="absolute bottom-4 left-4 font-mono text-[10px] text-offwhite/40 tracking-widest">{data.metric2Label}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-yellow text-charcoal font-bold uppercase text-xs py-3 px-4 hover:brightness-110 active:scale-95 transition-all font-mono tracking-widest">
              Access Console
            </button>
            <button className="border border-yellow/20 bg-charcoal-light/50 text-white font-bold uppercase text-xs py-3 px-4 hover:bg-charcoal-light transition-all font-mono tracking-widest">
              Repo Sync
            </button>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-charcoal-light/20 p-6 flex-1 border border-charcoal-light rounded-lg relative">
            <InfoOverlay enabled={infoOverlaysEnabled} text="Real-time repository sync status." />
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest">REPO SYNC STATUS</h3>
              <Network size={16} className="text-yellow" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono uppercase mb-1">
                  <span>Sync Health</span>
                  <span className="text-yellow">98%</span>
                </div>
                <div className="h-1 bg-charcoal-light w-full">
                  <div className="h-1 bg-yellow w-[98%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono uppercase mb-1">
                  <span>Last Sync</span>
                  <span className="text-yellow">2m ago</span>
                </div>
                <div className="h-1 bg-charcoal-light w-full">
                  <div className="h-1 bg-yellow w-[62%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-charcoal-light/20 p-6 flex-1 border-t-2 border-red border-x border-b border-charcoal-light rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red">Incident Alerts</h3>
              <ShieldCheck size={16} className="text-red" />
            </div>
            <p className="text-[10px] font-mono text-offwhite/50 uppercase mb-4 leading-relaxed">No critical security breaches detected in the last 24h cycle.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red"></span>
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter font-mono">System Shield: Level 01</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TransferScreen = ({ infoOverlaysEnabled }: { infoOverlaysEnabled: boolean }) => {
  const [mode, setMode] = useState<'local' | 'remote'>('local');

  return (
    <div className="max-w-4xl mx-auto w-full pb-24">
      <PageHeader titleTop="TRANSFER" titleBottom="CONSOLE" activePage="TRANSFER">
        <div className="grid grid-cols-2 bg-charcoal-light/20 p-1 border border-charcoal-light rounded-lg mb-6">
          <button 
            onClick={() => setMode('local')}
            className={`py-2.5 font-display font-bold text-xs tracking-widest uppercase transition-all rounded-md ${mode === 'local' ? 'bg-yellow text-charcoal' : 'text-offwhite/50 hover:bg-charcoal-light/50'}`}
          >
            LOCAL
          </button>
          <button 
            onClick={() => setMode('remote')}
            className={`py-2.5 font-display font-bold text-xs tracking-widest uppercase transition-all rounded-md ${mode === 'remote' ? 'bg-yellow text-charcoal' : 'text-offwhite/50 hover:bg-charcoal-light/50'}`}
          >
            REMOTE
          </button>
        </div>

      {mode === 'local' ? (
        <>
          <section className="bg-charcoal-light/10 p-4 border-l-2 border-yellow relative overflow-hidden border-y border-r border-charcoal-light rounded-lg">
            <InfoOverlay enabled={infoOverlaysEnabled} text="Local file transfer status and active upload sessions." />
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <RefreshCw size={64} className="animate-spin-slow" />
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10 gap-4">
              <div className="space-y-1 min-w-0">
                <span className="flex items-center gap-2 text-[10px] font-mono text-yellow font-bold tracking-widest uppercase truncate">
                  <span className="w-1.5 h-1.5 bg-yellow animate-pulse shrink-0 rounded-full"></span>
                  <span className="truncate">UPLOADING SESSION X2</span>
                </span>
                <p className="text-sm font-display font-medium text-white tracking-widest truncate">DATA ENCRYPT MANIFEST.LOG</p>
              </div>
              <span className="text-lg font-display font-bold text-yellow shrink-0">74%</span>
            </div>
            <div className="h-1 bg-offwhite/10 w-full mb-2 relative z-10 rounded-full overflow-hidden">
              <div className="h-full bg-yellow w-3/4 shadow-[0_0_10px_rgba(255,215,0,0.4)] rounded-full"></div>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-offwhite/40 tracking-wider relative z-10">
              <span>12.4 MB / 18.2 MB</span>
              <span>4.2 MB/S</span>
            </div>
          </section>

          <section className="space-y-2">
            <div className="flex justify-between px-2 mb-2">
              <span className="text-[10px] font-mono text-offwhite/40 uppercase tracking-widest">Filename</span>
              <span className="text-[10px] font-mono text-offwhite/40 uppercase tracking-widest">Size</span>
            </div>
            <div className="space-y-1">
              {[
                { name: 'SECURE PROTOCOL V4.HEX', size: '450 KB', icon: FileText, color: 'text-offwhite/40' },
                { name: 'UPLINK ASSETS 2024', size: '--', icon: Folder, color: 'text-yellow' },
                { name: 'SATELLITE THERMAL 09.RAW', size: '142.1 MB', icon: ImageIcon, color: 'text-offwhite/40' },
                { name: 'SYSTEM DUMP ERR.TXT', size: '12 KB', icon: Terminal, color: 'text-offwhite/40' },
              ].map((file, i) => (
                <div key={i} className="group flex justify-between items-center p-3 bg-charcoal-light/20 border border-charcoal-light hover:bg-charcoal-light/40 hover:border-yellow/50 transition-all cursor-pointer gap-2 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <file.icon size={16} className={`shrink-0 ${file.color}`} />
                    <span className="text-xs font-display font-medium text-white tracking-wide truncate">{file.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-offwhite/60 tracking-tighter shrink-0">{file.size}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 pt-4">
            <button className="w-full bg-gradient-to-br from-charcoal-dark to-charcoal-light border-2 border-yellow text-offwhite py-4 font-black uppercase tracking-widest text-sm hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all active:scale-[0.98] rounded-lg flex flex-col items-center gap-1">
              <RefreshCw size={24} className="text-yellow" />
              <span className="text-[10px] font-display font-bold tracking-widest text-offwhite uppercase mt-1">SYNC</span>
            </button>
            <button className="relative bg-yellow py-4 flex flex-col items-center gap-1 active:scale-95 transition-all group rounded-lg overflow-hidden">
              <span className="absolute top-1 left-1 w-1 h-1 bg-charcoal/40 rounded-full"></span>
              <Upload size={24} className="text-charcoal" />
              <span className="text-[10px] font-display font-bold tracking-widest text-charcoal uppercase mt-1">PUSH</span>
            </button>
          </section>
        </>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          <section className="bg-charcoal-light/10 p-6 border border-charcoal-light rounded-lg space-y-6 relative">
            <InfoOverlay enabled={infoOverlaysEnabled} text="Remote server connection settings and protocol configuration." />
            <div className="flex items-center gap-3 border-b border-charcoal-light/50 pb-4">
              <Terminal size={20} className="text-yellow" />
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-widest">Target Configuration</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-offwhite/40 uppercase tracking-widest font-mono">Hostname / IP Address</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="192.168.1.100" 
                    className="w-full bg-charcoal/50 border border-charcoal-light focus:border-yellow focus:outline-none text-white font-mono text-sm p-3 placeholder-offwhite/20 rounded-lg transition-colors"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red animate-pulse"></span>
                    <span className="text-[10px] font-mono text-offwhite/40">OFFLINE</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-offwhite/40 uppercase tracking-widest font-mono">Port</label>
                  <input 
                    type="text" 
                    placeholder="22" 
                    className="w-full bg-charcoal/50 border border-charcoal-light focus:border-yellow focus:outline-none text-white font-mono text-sm p-3 placeholder-offwhite/20 rounded-lg transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-offwhite/40 uppercase tracking-widest font-mono">Protocol</label>
                  <select className="w-full bg-charcoal/50 border border-charcoal-light focus:border-yellow focus:outline-none text-white font-mono text-sm p-3 rounded-lg transition-colors appearance-none cursor-pointer">
                    <option value="ssh">SSH</option>
                    <option value="rdp">RDP</option>
                    <option value="vnc">VNC</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-br from-charcoal-dark to-charcoal-light border-2 border-yellow text-offwhite py-4 font-black uppercase tracking-widest text-sm hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all active:scale-[0.98] rounded-lg flex items-center justify-center gap-2">
              <Power size={18} /> INITIATE CONNECTION
            </button>
          </section>

          <section className="space-y-3">
            <h3 className="text-[10px] font-bold text-offwhite/40 uppercase tracking-widest font-mono px-2">Quick Connect History</h3>
            <div className="space-y-2">
              {[
                { host: '10.0.0.45', name: 'PROD DB PRIMARY', proto: 'SSH', port: '22', status: 'active' },
                { host: '192.168.1.200', name: 'LOCAL DEV ENV', proto: 'VNC', port: '5900', status: 'offline' },
                { host: '172.16.0.10', name: 'BACKUP SERVER', proto: 'SSH', port: '2222', status: 'offline' },
              ].map((conn, i) => (
                <div key={i} className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-charcoal-light/20 border border-charcoal-light hover:bg-charcoal-light/40 hover:border-yellow/50 transition-all cursor-pointer gap-3 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${conn.status === 'active' ? 'bg-yellow animate-pulse' : 'bg-offwhite/20'}`}></div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-display font-medium text-white tracking-wide truncate">{conn.name}</span>
                      <span className="text-[10px] font-mono text-offwhite/50 tracking-tighter truncate">{conn.host}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] font-mono text-offwhite/40 bg-charcoal px-2 py-1 rounded-md border border-charcoal-light">{conn.proto}:{conn.port}</span>
                    <button className="text-[10px] font-bold text-yellow uppercase font-mono tracking-widest hover:text-white transition-colors">CONNECT</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
      </PageHeader>
    </div>
  );
};

const SystemDataScreen = ({ infoOverlaysEnabled, setInfoOverlaysEnabled, navLabelsEnabled, setNavLabelsEnabled }: { infoOverlaysEnabled: boolean, setInfoOverlaysEnabled: (v: boolean) => void, navLabelsEnabled: boolean, setNavLabelsEnabled: (v: boolean) => void }) => (
  <div className="max-w-md mx-auto w-full space-y-8 pb-24 pt-8">
    <section className="mt-4">
      <div className="flex justify-between items-end mb-2 gap-2">
        <span className="text-[10px] font-bold text-yellow font-display uppercase tracking-widest truncate">Run/Check Shell / V.04</span>
        <span className="text-[10px] font-bold text-offwhite/40 font-display uppercase tracking-widest shrink-0">REF: 1028-SYS</span>
      </div>
      <div className="bg-charcoal-light/20 p-6 border-l-4 border-yellow border-y border-r border-charcoal-light rounded-lg">
        <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white break-words flex flex-col">
          <span>SYSTEM DATA</span>
          <span>CONFIGURATION</span>
        </h2>
        <p className="text-offwhite/60 text-xs mt-2 font-medium tracking-wide leading-relaxed uppercase font-mono">Manual override of automated polling protocols and sensor thresholds.</p>
      </div>
    </section>

    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold text-white uppercase font-display tracking-tighter flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 bg-yellow block shrink-0"></span>
          <span className="truncate">NAV LABELS</span>
        </label>
        <div 
          onClick={() => setNavLabelsEnabled(!navLabelsEnabled)}
          className={`w-12 h-6 flex items-center px-1 cursor-pointer shrink-0 rounded-full transition-colors ${navLabelsEnabled ? 'bg-yellow' : 'bg-charcoal-light'}`}
        >
          <div className={`w-4 h-4 bg-charcoal rounded-full transition-transform ${navLabelsEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold text-white uppercase font-display tracking-tighter flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 bg-yellow block shrink-0"></span>
          <span className="truncate">INFO / OVERLAYS</span>
        </label>
        <div 
          onClick={() => setInfoOverlaysEnabled(!infoOverlaysEnabled)}
          className={`w-12 h-6 flex items-center px-1 cursor-pointer shrink-0 rounded-full transition-colors ${infoOverlaysEnabled ? 'bg-yellow' : 'bg-charcoal-light'}`}
        >
          <div className={`w-4 h-4 bg-charcoal rounded-full transition-transform ${infoOverlaysEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold text-white uppercase font-display tracking-tighter flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 bg-yellow block shrink-0"></span>
          <span className="truncate">Polling Frequency</span>
        </label>
        <span className="text-[10px] text-offwhite/40 font-mono shrink-0">MS-DELAY: 250</span>
      </div>
      <div className="bg-charcoal-light/30 p-4 flex flex-col gap-4 border border-charcoal-light rounded-lg">
        <div className="relative h-1 bg-charcoal w-full">
          <div className="absolute h-full bg-yellow w-[40%]"></div>
          <div className="absolute top-1/2 -translate-y-1/2 left-[40%] w-4 h-8 bg-yellow border-4 border-charcoal shadow-lg cursor-pointer"></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-offwhite/40 uppercase font-display">
          <span>10ms (Realtime)</span>
          <span>1000ms (Power Save)</span>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-charcoal-light/20 p-4 space-y-6 border border-charcoal-light rounded-lg relative">
        <InfoOverlay enabled={infoOverlaysEnabled} text="Thermal monitoring and automated cooling overrides for Node 04." />
        <div className="flex justify-between">
          <span className="text-[10px] font-bold text-red uppercase font-display tracking-widest">Thermal [THRM]</span>
          <span className="text-[10px] text-offwhite/40 font-mono">001-A</span>
        </div>
        <div className="space-y-2">
          <div className="bg-charcoal-light/30 p-2 border border-charcoal-light/50">
            <span className="block text-[10px] text-offwhite/40 uppercase font-bold font-mono">Limit (°C)</span>
            <input className="bg-transparent border-none p-0 text-xl font-display font-bold text-white focus:ring-0 w-full outline-none" type="text" defaultValue="85.0" />
          </div>
          <div className="flex items-center justify-between bg-charcoal/50 px-3 py-2 border border-charcoal-light/50 gap-2">
            <span className="text-[10px] font-bold text-white uppercase tracking-tighter font-mono truncate">Auto-Cool</span>
            <div className="w-10 h-5 bg-yellow flex items-center justify-end px-0.5 cursor-pointer shrink-0">
              <div className="w-4 h-4 bg-charcoal"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-charcoal-light/20 p-4 space-y-6 border border-charcoal-light rounded-lg relative">
        <InfoOverlay enabled={infoOverlaysEnabled} text="Voltage regulation and over-volt protection settings." />
        <div className="flex justify-between">
          <span className="text-[10px] font-bold text-yellow uppercase font-display tracking-widest">Voltage [VOLT]</span>
          <span className="text-[10px] text-offwhite/40 font-mono">001-B</span>
        </div>
        <div className="space-y-2">
          <div className="bg-charcoal-light/30 p-2 border border-charcoal-light/50">
            <span className="block text-[10px] text-offwhite/40 uppercase font-bold font-mono">Target (V)</span>
            <input className="bg-transparent border-none p-0 text-xl font-display font-bold text-white focus:ring-0 w-full outline-none" type="text" defaultValue="+1.24" />
          </div>
          <div className="flex items-center justify-between bg-charcoal/50 px-3 py-2 border border-charcoal-light/50 gap-2">
            <span className="text-[10px] font-bold text-offwhite/40 uppercase tracking-tighter font-mono truncate">Over-Volt</span>
            <div className="w-10 h-5 bg-charcoal-light flex items-center justify-start px-0.5 cursor-pointer shrink-0">
              <div className="w-4 h-4 bg-offwhite/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section className="space-y-4">
      <h3 className="text-xs font-bold text-white uppercase font-display tracking-tighter flex items-center gap-2">
        <span className="w-2 h-2 bg-red block"></span>
        Alert Aggression Level
      </h3>
      <div className="flex flex-col border border-charcoal-light/50 rounded-lg overflow-hidden">
        {[
          { title: 'Nominal Monitoring', desc: 'Standard logging. No critical interrupts.', active: false },
          { title: 'Aggressive Defense', desc: 'Immediate interrupt on threshold deviation.', active: true },
          { title: 'Strict Lockdown', desc: 'System halt on any voltage fluctuation.', active: false },
        ].map((level, i) => (
          <button key={i} className={`flex items-center justify-between p-4 border-b border-charcoal-light/50 transition-colors gap-4 ${level.active ? 'bg-yellow text-charcoal' : 'bg-charcoal-light/20 hover:bg-charcoal-light/40 text-white'}`}>
            <div className="text-left min-w-0">
              <span className="block text-xs font-bold uppercase font-display tracking-widest truncate">{level.title}</span>
              <span className={`block text-[10px] font-medium font-mono mt-1 truncate ${level.active ? 'opacity-80' : 'text-offwhite/40'}`}>{level.desc}</span>
            </div>
            {level.active ? <CheckCircle2 size={20} className="text-charcoal shrink-0" /> : <Circle size={20} className="text-offwhite/40 shrink-0" />}
          </button>
        ))}
      </div>
    </section>

    <button className="w-full bg-gradient-to-br from-charcoal-dark to-charcoal-light border-2 border-yellow text-offwhite font-display font-bold py-5 uppercase tracking-widest text-sm hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all active:scale-[0.98] rounded-lg">
      COMMIT CONFIGURATION
    </button>
  </div>
);

const AuthScreen = ({ infoOverlaysEnabled }: { infoOverlaysEnabled: boolean }) => (
  <div className="flex flex-col items-center justify-center h-full pt-16 pb-24 px-6 w-full max-w-md mx-auto relative z-20">
    <div className="w-full bg-charcoal-light/20 p-1 relative border-l-4 border-yellow border-y border-r border-charcoal-light rounded-lg">
      <InfoOverlay enabled={infoOverlaysEnabled} text="Operator authentication gateway. Requires 256-AES secure link." />
      <div className="absolute -top-6 right-0 text-[10px] font-mono text-offwhite/40 uppercase tracking-[0.2em]">
        LOC DATA: 34.0522 N / 118.2437 W
      </div>
      <div className="p-8 space-y-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] bg-yellow text-charcoal px-2 py-0.5 font-black uppercase tracking-widest font-mono shrink-0">V1.0 AUTH</span>
            <span className="text-[10px] text-offwhite/40 font-mono tracking-tighter truncate">REF: 1028-A/SYS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white leading-none uppercase tracking-tighter pt-2 break-words flex flex-col">
            <span>OPERATOR</span>
            <span>LOGIN V1.0</span>
          </h1>
          <div className="h-px w-full bg-charcoal-light mt-4"></div>
        </div>

        <div className="space-y-6">
          <div className="group relative bg-charcoal/50 transition-all duration-100 focus-within:ring-1 focus-within:ring-yellow border border-charcoal-light/50 rounded-lg overflow-hidden">
            <label className="absolute top-2 left-3 text-[10px] font-bold text-offwhite/40 uppercase tracking-widest font-mono">Operator ID</label>
            <input className="w-full bg-transparent border-none pt-7 pb-3 px-3 text-white font-mono text-lg focus:ring-0 placeholder:text-offwhite/20 outline-none" placeholder="####-####-####" type="text" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20">
              <Badge size={16} />
            </div>
          </div>
          <div className="group relative bg-charcoal/50 transition-all duration-100 focus-within:ring-1 focus-within:ring-yellow border border-charcoal-light/50 rounded-lg overflow-hidden">
            <label className="absolute top-2 left-3 text-[10px] font-bold text-offwhite/40 uppercase tracking-widest font-mono">Secure Key</label>
            <input className="w-full bg-transparent border-none pt-7 pb-3 px-3 text-white font-mono text-lg focus:ring-0 placeholder:text-offwhite/20 outline-none" placeholder="••••••••••••" type="password" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20">
              <Lock size={16} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-gradient-to-br from-charcoal-dark to-charcoal-light border-2 border-yellow text-offwhite py-5 font-display font-black text-lg uppercase tracking-widest text-sm hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all duration-75 active:scale-[0.98] rounded-lg flex items-center justify-center gap-3 group">
            <Power size={20} className="font-black" />
            INITIALIZE SESSION
          </button>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono text-offwhite/40 uppercase gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red shrink-0"></span>
              <span>Secure Link: 256-AES</span>
            </div>
            <a className="hover:text-yellow transition-colors underline decoration-offwhite/20 underline-offset-4" href="#">Bypass Request</a>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-charcoal-light/10 p-4 space-y-2 opacity-60 border border-charcoal-light/50 rounded-lg">
        <span className="text-[9px] font-bold text-offwhite/40 block tracking-widest uppercase font-mono">Kernel Entropy</span>
        <div className="flex items-end gap-1 h-5">
          <div className="w-1.5 h-3 bg-yellow"></div>
          <div className="w-1.5 h-5 bg-yellow"></div>
          <div className="w-1.5 h-2 bg-charcoal-light"></div>
          <div className="w-1.5 h-4 bg-yellow"></div>
          <div className="w-1.5 h-2 bg-charcoal-light"></div>
        </div>
      </div>
      <div className="bg-charcoal-light/10 p-4 space-y-1 opacity-60 border border-charcoal-light/50 rounded-lg">
        <span className="text-[9px] font-bold text-offwhite/40 block tracking-widest uppercase font-mono">Auth. Server</span>
        <div className="text-xs font-mono text-white flex items-center gap-2 mt-2">
          <Server size={12} />
          US-WEST-02
        </div>
      </div>
    </div>
  </div>
);


type SettingsSectionKey = 'network' | 'security' | 'troubleshooting';

function SettingsScreen({
  section,
  setSection,
}: {
  section: SettingsSectionKey;
  setSection: (s: SettingsSectionKey) => void;
}) {
  const sectionTitle =
    section === 'network' ? 'NETWORK SETTINGS' : section === 'security' ? 'SECURITY' : 'TROUBLESHOOTING';

  return (
    <div className="max-w-4xl mx-auto w-full pb-24 pt-8 px-4">
      <PageHeader titleTop="SETTINGS" titleBottom={sectionTitle}>
        <div className="bg-charcoal-light/10 p-6 border border-charcoal-light rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setSection('network')}
              className={`w-full py-3 font-mono text-xs font-bold uppercase tracking-widest rounded-lg border transition-colors ${
                section === 'network'
                  ? 'bg-yellow border-yellow text-charcoal'
                  : 'bg-charcoal-light/20 border-charcoal-light/50 text-offwhite hover:bg-charcoal-light/30'
              }`}
            >
              Network Settings
            </button>
            <button
              type="button"
              onClick={() => setSection('security')}
              className={`w-full py-3 font-mono text-xs font-bold uppercase tracking-widest rounded-lg border transition-colors ${
                section === 'security'
                  ? 'bg-yellow border-yellow text-charcoal'
                  : 'bg-charcoal-light/20 border-charcoal-light/50 text-offwhite hover:bg-charcoal-light/30'
              }`}
            >
              Security
            </button>
            <button
              type="button"
              onClick={() => setSection('troubleshooting')}
              className={`w-full py-3 font-mono text-xs font-bold uppercase tracking-widest rounded-lg border transition-colors ${
                section === 'troubleshooting'
                  ? 'bg-yellow border-yellow text-charcoal'
                  : 'bg-charcoal-light/20 border-charcoal-light/50 text-offwhite hover:bg-charcoal-light/30'
              }`}
            >
              Troubleshooting
            </button>
          </div>

          {section === 'network' && (
            <div className="space-y-3">
              <h3 className="font-display font-bold uppercase tracking-widest">Network</h3>
              <p className="font-mono text-sm text-offwhite/60 leading-relaxed">
                Configure connectivity endpoints, retry windows, and bandwidth constraints for on-site operations.
              </p>
            </div>
          )}

          {section === 'security' && (
            <div className="space-y-3">
              <h3 className="font-display font-bold uppercase tracking-widest">Security</h3>
              <p className="font-mono text-sm text-offwhite/60 leading-relaxed">
                Review access controls, key rotation, and tamper-resistance posture for compliant sessions.
              </p>
            </div>
          )}

          {section === 'troubleshooting' && (
            <div className="space-y-3">
              <h3 className="font-display font-bold uppercase tracking-widest">Troubleshooting</h3>
              <p className="font-mono text-sm text-offwhite/60 leading-relaxed">
                Use guided Run/Check prompts to validate routing, handshakes, and system data integrity.
              </p>
            </div>
          )}
        </div>
      </PageHeader>
    </div>
  );
}

// --- Main Application ---

export default function App() {
  const [navLabelsEnabled, setNavLabelsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [infoOverlaysEnabled, setInfoOverlaysEnabled] = useState(false);
  const [hasPriorityInterrupt, setHasPriorityInterrupt] = useState(true);
  const [stealthMode, setStealthMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<keyof typeof THEMES>('tactical');
  const [settingsSection, setSettingsSection] = useState<SettingsSectionKey>('network');

  const [lastTap, setLastTap] = useState(0);
  const handleGesture = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target !== e.currentTarget) return;
    
    if ('touches' in e) { // TouchEvent
      const now = Date.now();
      if (now - lastTap < 300) {
        setStealthMode(prev => !prev);
      }
      setLastTap(now);
    } else { // MouseEvent
      setStealthMode(prev => !prev);
    }
  };

  const navItems = [
    { id: 'dashboard', icon: Terminal, label: 'COMM CTR' },
    { id: 'fieldops', icon: Wrench, label: 'Field Ops' },
    { id: 'logiclab', icon: Code2, label: 'Logic Lab' },
    { id: 'solutions', icon: Smartphone, label: 'Solutions' },
    { id: 'transfer', icon: Network, label: 'Transfer' },
    { id: 'telemetry', icon: Activity, label: 'System Data' },
    { id: 'auth', icon: Shield, label: 'Auth' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardScreen infoOverlaysEnabled={infoOverlaysEnabled} setActiveTab={setActiveTab} />;
      case 'fieldops': return <FieldOpsScreen infoOverlaysEnabled={infoOverlaysEnabled} setHasPriorityInterrupt={setHasPriorityInterrupt} />;
      case 'logiclab': return <LogicLabScreen infoOverlaysEnabled={infoOverlaysEnabled} />;
      case 'solutions': return <SolutionsScreen infoOverlaysEnabled={infoOverlaysEnabled} />;
      case 'transfer': return <TransferScreen infoOverlaysEnabled={infoOverlaysEnabled} />;
      case 'telemetry': return <SystemDataScreen infoOverlaysEnabled={infoOverlaysEnabled} setInfoOverlaysEnabled={setInfoOverlaysEnabled} navLabelsEnabled={navLabelsEnabled} setNavLabelsEnabled={setNavLabelsEnabled} />;
      case 'auth': return <AuthScreen infoOverlaysEnabled={infoOverlaysEnabled} />;
      case 'settings': return <SettingsScreen section={settingsSection} setSection={setSettingsSection} />;
      default: return <DashboardScreen infoOverlaysEnabled={infoOverlaysEnabled} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden" 
      style={{ backgroundColor: THEMES[theme].bg, color: THEMES[theme].text }}
      onDoubleClick={handleGesture}
      onTouchStart={handleGesture}
    >
      <div className="scanline"></div>
      
      {/* Global Header */}
      <motion.header
        initial={false}
        animate={{ y: stealthMode ? '-100%' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 w-full py-4 px-4 sm:px-6 flex justify-between items-center border-b border-charcoal-light/50 bg-charcoal/80 backdrop-blur-md z-40"
      >
        {/* Far Left: Tactical Menu */}
        <button onClick={() => setDrawerOpen(true)} className="text-yellow hover:text-white transition-colors p-2 -ml-2">
          <Menu size={20} />
        </button>

        {/* Center/Right: Logo */}
        <div className="font-display font-bold text-lg sm:text-xl tracking-tighter text-offwhite flex items-center gap-2 uppercase">
          <Terminal size={16} className="text-yellow" />
          <span>1028bc</span>
        </div>

        {/* Right: System Status & Stealth Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <StatusIndicator />
          </div>
        </div>
      </motion.header>

      {/* Restore UI Tab */}
      <AnimatePresence>
        {stealthMode && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => setStealthMode(false)}
            className="fixed top-0 left-1/2 -translate-x-1/2 bg-charcoal-light/40 backdrop-blur-md border border-t-0 border-charcoal-light/50 text-yellow px-4 py-1.5 rounded-b-lg z-50 text-[10px] font-mono font-bold tracking-widest hover:bg-charcoal-light/60 transition-colors flex items-center gap-2"
          >
            <Eye size={12} />
            RESTORE UI
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide px-4 md:px-8 relative z-10 pt-24 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Bottom Nav */}
      <motion.nav
        initial={false}
        animate={{ y: stealthMode ? '100%' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bottom-0 w-full h-16 flex items-stretch bg-charcoal/90 backdrop-blur-md border-t border-charcoal-light/50 z-40 overflow-x-auto scrollbar-hide"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center min-w-[72px] flex-1 px-2 transition-all relative ${
              activeTab === item.id 
                ? 'bg-yellow text-charcoal' 
                : 'text-offwhite/40 hover:text-white hover:bg-charcoal-light/20'
            }`}
          >
            <item.icon size={navLabelsEnabled ? 18 : 22} className={navLabelsEnabled ? "mb-1" : ""} />
            {navLabelsEnabled && <span className="font-mono uppercase text-[9px] tracking-tighter font-bold">{item.label}</span>}
            {item.id === 'fieldops' && hasPriorityInterrupt && activeTab !== 'fieldops' && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red animate-pulse"></span>
            )}
          </button>
        ))}
      </motion.nav>

      {/* Side Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-charcoal border-r border-charcoal-light/50 z-50 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-xs text-yellow tracking-widest uppercase font-bold">Tactical Menu</span>
                <button onClick={() => setDrawerOpen(false)} className="text-offwhite/50 hover:text-white p-1">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="font-mono text-[10px] text-offwhite/40 uppercase tracking-widest mb-3">Global Settings</h4>
                  <div className="space-y-2">
                    <button
                      className="w-full text-left font-mono text-xs text-offwhite hover:text-yellow py-2 border-b border-charcoal-light/30 transition-colors"
                      onClick={() => { setSettingsSection('network'); setActiveTab('settings'); setDrawerOpen(false); }}
                    >
                      Network Settings
                    </button>
                    <button
                      className="w-full text-left font-mono text-xs text-offwhite hover:text-yellow py-2 border-b border-charcoal-light/30 transition-colors"
                      onClick={() => { setSettingsSection('security'); setActiveTab('settings'); setDrawerOpen(false); }}
                    >
                      Security
                    </button>
                    <button
                      className="w-full text-left font-mono text-xs text-offwhite hover:text-yellow py-2 border-b border-charcoal-light/30 transition-colors"
                      onClick={() => { setSettingsSection('troubleshooting'); setActiveTab('settings'); setDrawerOpen(false); }}
                    >
                      Troubleshooting
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-offwhite/40 uppercase tracking-widest mb-3">Theme Selector</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(THEMES).map((t) => {
                      const themeKey = t as keyof typeof THEMES;
                      const label =
                        themeKey === 'daylight' ? 'DAYLIGHT MODE' : themeKey === 'emergency' ? 'EMERGENCY MODE' : t.toUpperCase();

                      return (
                        <button
                          key={t}
                          onClick={() => setTheme(themeKey)}
                          className={`text-[10px] font-mono p-2 rounded flex items-center gap-2 ${
                            theme === themeKey ? 'bg-yellow text-charcoal' : 'bg-charcoal-light/20 text-offwhite'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: THEMES[themeKey].bg }} />
                          <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: THEMES[themeKey].accent }} />
                          <span className="truncate">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-charcoal-light/50">
                <button className="w-full flex items-center justify-center gap-2 bg-red/10 text-red hover:bg-red/20 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-widest transition-colors">
                  <Power size={14} />
                  SIGN OUT
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
