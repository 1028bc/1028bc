import React, { useState, useEffect, useCallback } from 'react';
import { 
  MapPin, Settings, ChevronUp, ChevronDown, ShieldAlert, Activity, 
  Bluetooth, Share2, Database, Globe, MessageSquare, 
  CheckCircle, FileText, ExternalLink, Laptop, Clock, UserCheck, CalendarDays, Navigation, Briefcase
} from 'lucide-react';
import { CalendarService } from '../services/CalendarService';
import { MeshService } from '../services/MeshService';
import { TacticalMap, type JobNode } from '../components/TacticalMap';
import { pushToContextKeep } from '../services/ContextKeep';
import { getSystemIdentity } from '../utils/identity';
import type { AccessLevel } from '../utils/identity'; 
import { supabase } from '../supabaseClient'; // NEW: Added Supabase Import

export const FieldOpsScreen = ({ 
  accessLevel = 'USER', 
  onSequenceDetected 
}: { 
  accessLevel?: AccessLevel, 
  onSequenceDetected?: (taps: number) => void 
}) => {
  const [geo] = useState({ lat: 0, lng: 0, speed: 0 });
  const [vault, setVault] = useState<any>({ past: [], future: [], lastSync: null });
  const [isMeshSyncing, setIsMeshSyncing] = useState(false);
  const [isUplinking, setIsUplinking] = useState(false);
  const [dispatchOpen, setDispatchOpen] = useState(true);
  
  const [dispatchTab, setDispatchTab] = useState<'info' | 'schedule' | 'route' | 'history' | 'comms' | 'complete'>('schedule');
  
  const [activeTheme, setActiveTheme] = useState('solurbana');
  const [closingNotes, setClosingNotes] = useState('');
  const [jobType, setJobType] = useState('Project'); 
  const [vendorPlatform, setVendorPlatform] = useState('TGoTG');
  const [repName, setRepName] = useState('');
  const [taps, setTaps] = useState(0);
  const [timeIn, setTimeIn] = useState<string>("");

  const [activeJob, setActiveJob] = useState<JobNode | null>(null);
  const [routeData, setRouteData] = useState<any>(null);

  // NEW: Home Base Vector Tracking
  const [homeVector, setHomeVector] = useState<[number, number]>([36.0395, -115.0821]); // Default Henderson
  const [isGridSyncing, setIsGridSyncing] = useState(true);

  const identity = getSystemIdentity(accessLevel);

  // --- MS FORM LOGIC MATRIX ---
  const MS_FORM_ID = "7PX2w2i3KkKM44bzMyXrvjMguFeh_4BAu7cwceHIGh1UNzRXUFBYTjVEVlQ0Nk1DV0pOUzVKNkVVTi4u";
  
  const GLOBAL_FIELDS = {
    JOB_ID: "r62ff67d7172a4a2a8e7bd67ffb637cbb",
    DATE: "re3488006e6c4452d85744a0b3539a0b4",
    TIME_IN: "r06995910a7f34b96b06a3572e971f66c",
    TIME_OUT: "r893b87d2efe94db69f5900bc8a17d77b",
    SUCCESS: "raeb35c5bacae463eb2f2e6ce60c180e6",
    JOB_TYPE_SELECT: "rb74351cada7c4c8b849231ee5423b157"
  };

  const TYPE_SPECIFIC_FIELDS: any = {
    "Laptop/PC": { DONE: "r59ab42fc645f41f08bee6d9c949a5a28", FUNCTIONAL: "rec6bd2d182814be99074e48120ac3374" },
    "Printer": { DONE: "rf5d0044571e345c2be7d3b7d9397b2ca", FUNCTIONAL: "r7240ab9692e94413b5e7baecf042cae3", TROUBLESHOOT: "rc98a3e4b64784cbaa56e12916128f866" },
    "Project": { DONE: "r81a3c1703aaa49a5b84caffa1022fc77", REP: "rbf618b4da4534837b8b891f35cb79813", VENDOR: "rad3d9d9c7e5749a08d696455f8c3ce29" }
  };

  // --- VYK: SUPABASE HOME VECTOR SYNC ---
  useEffect(() => {
    const fetchHomeBase = async () => {
      const activeId = localStorage.getItem('1028bc_last_active_id');
      if (!activeId) {
        setIsGridSyncing(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('address')
        .eq('id', activeId)
        .single();

      if (data?.address) {
        console.log(`[VYK] Validating Home Base Vector: ${data.address}`);
        // Integration Note: A geocoding service converts this address to Lat/Lng here.
        // setHomeVector([lat, lng]);
      }
      setIsGridSyncing(false);
    };

    fetchHomeBase();
  }, []);

  // --- SYNC ENGINE ---
  useEffect(() => {
    const sync = async () => {
      const icsUrl = 'https://outlook.office365.com/owa/calendar/306293bb94a64dec9b7929e6dc369d5f@techguyonthego.com/4b84ad9fcb4d4e8c9f1923cf556b89cb9132888194912497333/calendar.ics';
      const data = await CalendarService.fetchRollingWindow(icsUrl);
      
      if (data) {
        setVault(data);
        if (data.future.length > 0) setActiveJob(data.future[0]);
      }
    };
    
    if (vault.future.length === 0) sync();
    const saved = localStorage.getItem('1028bc_field_theme');
    if (saved) setActiveTheme(saved);
  }, [vault.future.length]);

  // --- OPERATIONS LOGIC ---
  const handleSelectJob = (job: JobNode) => {
    setActiveJob(job);
    setRouteData(null);
    setDispatchTab('info');
  };

  const handleInitiateDeployment = async () => {
    if (!activeJob) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    setTimeIn(now);
    setIsUplinking(true);
    await pushToContextKeep('field_operation', `Check-In: ${activeJob.title}`, `In: ${now}`);
    setIsUplinking(false);
    setDispatchTab('comms');
  };

  const handleCompleteJob = async () => {
    if (!activeJob || !closingNotes) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    setIsUplinking(true);

    await pushToContextKeep('job_completion', activeJob.title, `Notes: ${closingNotes}\nType: ${jobType}\nTimes: ${timeIn}-${now}`);

    const params: any = {
      id: MS_FORM_ID,
      wdPublicPrefill: "true",
      [GLOBAL_FIELDS.JOB_ID]: activeJob.id || activeJob.title,
      [GLOBAL_FIELDS.DATE]: new Date().toISOString().split('T')[0],
      [GLOBAL_FIELDS.TIME_IN]: timeIn,
      [GLOBAL_FIELDS.TIME_OUT]: now,
      [GLOBAL_FIELDS.SUCCESS]: "Yes",
      [GLOBAL_FIELDS.JOB_TYPE_SELECT]: jobType
    };

    const specific = TYPE_SPECIFIC_FIELDS[jobType];
    if (specific) {
      if (specific.DONE) params[specific.DONE] = closingNotes;
      if (specific.FUNCTIONAL) params[specific.FUNCTIONAL] = "Yes";
      if (specific.REP) params[specific.REP] = repName;
      if (specific.VENDOR) params[specific.VENDOR] = vendorPlatform;
      if (specific.TROUBLESHOOT) params[specific.TROUBLESHOOT] = "No";
    }

    const urlParams = new URLSearchParams(params);
    window.open(`https://forms.office.com/pages/responsepage.aspx?${urlParams.toString()}`, '_blank');

    setIsUplinking(false);
    setDispatchTab('info');
    setClosingNotes('');
    setRepName('');
  };

  const handleSecretTap = useCallback(() => {
    setTaps(prev => {
      const next = prev + 1;
      if (onSequenceDetected) onSequenceDetected(next);
      return next;
    });
  }, [onSequenceDetected]);

  return (
    <div className={`w-full h-full relative bg-[#0a0f16] ${identity.font}`}>
      
      {/* EDGE-TO-EDGE MAP LAYER */}
      <div className="absolute inset-0 z-0">
        <TacticalMap 
          jobs={vault.future} 
          activeJobId={activeJob?.id} 
          onRouteData={setRouteData} 
          center={homeVector} // Vyk integration
        />
      </div>

      {/* SCANNING LINES (Nox Stealth Styling) */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[5] bg-[length:100%_4px,3px_100%]"></div>

      {/* TACTICAL HUD OVERLAY (Vyk & Nox) */}
      <div className="absolute top-20 left-6 z-[50] flex flex-col gap-4 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-xl border border-sky-500/30 p-4 rounded-2xl shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${isGridSyncing ? 'bg-amber-500/20 text-amber-400 animate-pulse' : 'bg-sky-500/20 text-sky-400'}`}>
              <Navigation size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</p>
              <p className="text-xs font-mono text-white">
                {isGridSyncing ? 'CALIBRATING GRID...' : 'GRID_SYNC: ACTIVE'}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-white/5">
            <p className="text-[9px] font-mono text-sky-400/70 uppercase">Node: {accessLevel}</p>
          </div>
        </div>
      </div>

      {/* FLOATING IDENTITY HUD */}
      <div className="absolute top-20 left-4 right-4 z-[50] flex justify-between items-start pointer-events-none transition-all duration-300 hidden md:flex">
        <div className="flex flex-col gap-1 pointer-events-auto ml-auto pr-4">
           {/* Shifted right so it doesn't collide with the Tactical HUD */}
        </div>

        <div className="pointer-events-auto px-6 py-2 border border-white/10 bg-black/80 backdrop-blur-xl rounded-full flex items-center gap-6 shadow-2xl">
          <button onClick={handleSecretTap} className="flex items-center gap-2 group transition-transform py-1">
            <Activity size={14} className={`${identity.accent} animate-pulse`} />
            <span className={`text-[10px] uppercase tracking-widest font-bold ${identity.accent}`}>Active</span>
          </button>
          <div className="w-px h-4 bg-white/10"></div>
          <span className={`text-xs font-black text-white`}>{geo.speed} MPH</span>
        </div>
      </div>

      {/* LOGISTICS COMMAND TERMINAL */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[550px] z-40">
        <div className={`rounded-2xl border ${identity.border} bg-slate-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden`}>
          
          <div onClick={() => setDispatchOpen(!dispatchOpen)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <ShieldAlert size={20} className={identity.accent} />
              <h2 className="text-sm font-black text-white tracking-widest uppercase">Logistics Command</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${activeJob ? 'border-sky-500/50 text-sky-400 bg-sky-500/10' : 'border-white/10 text-white/40'}`}>
                {activeJob ? 'WO-ENGAGED' : 'SYSTEM IDLE'}
              </div>
              {dispatchOpen ? <ChevronDown size={16} className="text-white/40" /> : <ChevronUp size={16} className="text-white/40" />}
            </div>
          </div>

          {dispatchOpen && (
            <div>
              <div className="flex text-[9px] uppercase font-black tracking-widest border-b border-white/5 bg-black/40 overflow-x-auto no-scrollbar">
                {['info', 'schedule', 'route', 'comms', 'complete'].map(tab => (
                  <button key={tab} onClick={() => setDispatchTab(tab as any)} className={`flex-none px-4 py-4 transition-all ${dispatchTab === tab ? `bg-white/5 border-b-2 ${identity.accent.replace('text-', 'border-')}` : 'opacity-40 hover:opacity-100'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-5 h-[320px] overflow-y-auto">
                
                {/* INFO (DOSSIER) */}
                {dispatchTab === 'info' && activeJob && (
                  <div className="space-y-4">
                    <div className="p-4 bg-sky-900/20 border border-sky-500/30 rounded-xl">
                       <h3 className="text-sky-400 font-black tracking-widest text-[10px] uppercase border-b border-sky-500/30 pb-2 mb-3 flex items-center gap-2"><Briefcase size={12}/> DOSSIER: {activeJob.id}</h3>
                       <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[10px] font-mono">
                          <span className="text-white/50">Contact:</span><span className="text-white truncate">{activeJob.contact || "N/A"}</span>
                          <span className="text-white/50">Branch:</span><span className="text-emerald-400 truncate">{activeJob.brand || "N/A"}</span>
                          <span className="text-white/50">Tools:</span><span className="text-amber-400 truncate">{activeJob.tools || "Standard"}</span>
                       </div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-4">
                      <MapPin size={18} className={identity.accent} />
                      <div className="text-xs text-white/80 font-medium leading-relaxed">{activeJob.location}</div>
                    </div>
                    <button onClick={handleInitiateDeployment} disabled={isUplinking} className={`w-full py-4 rounded-xl ${identity.accent.replace('text-', 'bg-').replace('400', '600')} text-white text-xs font-black uppercase shadow-lg active:scale-95 transition-all`}>Initiate Deployment</button>
                  </div>
                )}

                {/* ROUTE DATA (TURN-BY-TURN) */}
                {dispatchTab === 'route' && (
                  <div className="space-y-4">
                    {!routeData ? (
                      <div className="text-center text-white/40 font-mono text-[10px] animate-pulse mt-10">CALCULATING GEOMETRY...</div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-xl border border-sky-500/20 bg-sky-500/5">
                          <div className="text-sky-400 font-black text-xl tracking-tighter">{(routeData.summary.totalDistance / 1609.34).toFixed(1)} <span className="text-[10px] tracking-widest text-sky-400/50">MILES</span></div>
                          <div className="text-emerald-400 font-black text-xl tracking-tighter">{Math.round(routeData.summary.totalTime / 60)} <span className="text-[10px] tracking-widest text-emerald-400/50">MINS</span></div>
                        </div>
                        <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2">
                          {routeData.instructions.map((inst: any, idx: number) => (
                             <div key={idx} className="text-[10px] text-white/70 font-mono flex gap-3 border-b border-white/5 pb-2">
                                <span className="text-sky-400 shrink-0 w-12 text-right">{Math.round(inst.distance * 3.28084)} ft</span>
                                <span>{inst.text}</span>
                             </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SCHEDULE */}
                {dispatchTab === 'schedule' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarDays size={14} className={identity.accent} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Feed</span>
                    </div>
                    {vault.future.map((job: JobNode) => (
                      <button key={job.id} onClick={() => handleSelectJob(job)} className={`w-full text-left p-3 rounded-xl border transition-all ${activeJob?.id === job.id ? 'bg-sky-900/20 border-sky-500/50' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] font-black uppercase ${activeJob?.id === job.id ? 'text-sky-400' : 'text-white'}`}>{job.id}</span>
                          <span className="text-[9px] font-mono text-white/40">{job.date}</span>
                        </div>
                        <div className="text-xs font-bold text-white/90 truncate">{job.title}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* COMMS */}
                {dispatchTab === 'comms' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-lg font-mono text-[10px]">
                      <span className="text-sky-400 font-black">CHECKED IN: {timeIn || "PENDING"}</span>
                    </div>
                  </div>
                )}

                {/* COMPLETE */}
                {dispatchTab === 'complete' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="bg-black/60 border border-white/10 rounded-lg p-2 text-[10px] text-white font-bold uppercase">
                        <option>Project</option>
                        <option>Laptop/PC</option>
                        <option>Printer</option>
                        <option>Phones/Tablets/Aftermarket</option>
                      </select>
                      <select value={vendorPlatform} onChange={(e) => setVendorPlatform(e.target.value)} className="bg-black/60 border border-white/10 rounded-lg p-2 text-[10px] text-white font-bold uppercase">
                        <option>TGoTG</option>
                        <option>Barrister (Job number starts with a 5)</option>
                        <option>FieldNation</option>
                        <option>WorkMarket</option>
                      </select>
                    </div>
                    {jobType === 'Project' && (
                      <input type="text" value={repName} onChange={(e) => setRepName(e.target.value)} placeholder="On-site Representative Name" className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-sky-400 focus:outline-none" />
                    )}
                    <textarea value={closingNotes} onChange={(e) => setClosingNotes(e.target.value)} placeholder="Closing Notes..." className="w-full h-24 bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-white focus:border-sky-400 focus:outline-none resize-none font-medium" />
                    <button onClick={handleCompleteJob} disabled={!closingNotes || isUplinking} className="w-full py-4 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 disabled:opacity-20">
                      <ExternalLink size={14} /> Commit & Open Form
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};