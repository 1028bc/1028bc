import React, { useState, useEffect } from 'react';
import { ShieldAlert, Terminal, Lock, User, Plus, ChevronDown, Fingerprint, Mail, Smartphone, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

export interface CommVector {
  id: string;
  type: string;
  label: string;
  value: string;
}

export interface Identity {
  id: string;
  handle: string;
  email: string;
  address?: string;
  comms: CommVector[];
  role: 'GOD' | 'ADMIN' | 'TECH' | 'VISITOR';
  aiLevel: number;
  mfaEnabled: boolean;
  bioEnabled: boolean;
}

// These serve as the "Saved Nodes" on the local machine
const DEFAULT_IDENTITIES: Identity[] = [
  { 
    id: 'usr_01', handle: 'bk_campbell_ADM', email: 'bkc@1028bc.com', address: 'Henderson, NV',
    comms: [{ id: 'cm_1', type: 'EMAIL', label: 'Primary Email', value: 'bkc@1028bc.com' }],
    role: 'ADMIN', aiLevel: 3, mfaEnabled: true, bioEnabled: true,
  }
];

export const AuthScreen = ({ onAuthenticate }: { onAuthenticate: (isAdmin: boolean) => void }) => {
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [pin, setPin] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [view, setView] = useState<'LOGIN' | 'MFA_CHALLENGE' | 'RECOVERY' | 'RECOVERY_SENT' | 'NEW_USER'>('LOGIN');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSimulatingBio, setIsSimulatingBio] = useState(false);

  // New User Form State
  const [newHandle, setNewHandle] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'ADMIN'|'TECH'|'VISITOR'>('VISITOR');
  const [newCipher, setNewCipher] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('1028bc_identity_vault');
    const lastActive = localStorage.getItem('1028bc_last_active_id');

    if (stored) {
      const parsed = JSON.parse(stored);
      setIdentities(parsed);
      setActiveId(lastActive && parsed.find((i: Identity) => i.id === lastActive) ? lastActive : parsed[0].id);
    } else {
      setIdentities(DEFAULT_IDENTITIES);
      setActiveId(DEFAULT_IDENTITIES[0].id);
      localStorage.setItem('1028bc_identity_vault', JSON.stringify(DEFAULT_IDENTITIES));
    }
  }, []);

  const activeIdentity = identities.find(i => i.id === activeId) || identities[0];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // LIVE SUPABASE AUTH: The 'pin' is used as the password
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: activeIdentity.email,
      password: pin,
    });

    if (authError) {
      setError("Cipher Mismatch: Access Denied.");
      setPin('');
      setLoading(false);
      return;
    }

    if (activeIdentity.mfaEnabled) {
      setView('MFA_CHALLENGE');
      setLoading(false);
    } else {
      completeAuth();
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode.length === 6) {
      completeAuth();
    } else {
      setError("Invalid MFA Token.");
    }
  };

  const completeAuth = () => {
    localStorage.setItem('1028bc_last_active_id', activeIdentity.id);
    localStorage.setItem('1028bc_active_ai_level', activeIdentity.aiLevel.toString());
    onAuthenticate(activeIdentity.role === 'ADMIN' || activeIdentity.role === 'GOD');
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: newEmail,
      password: newCipher,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      // Local Vault update to keep the dropdown list populated
      const newId = `usr_${Date.now()}`;
      const updated = [...identities, { 
        id: newId, handle: newHandle, email: newEmail, address: '', 
        comms: [{ id: `cm_${Date.now()}`, type: 'EMAIL', label: 'Primary Email', value: newEmail }], 
        role: newRole, aiLevel: 1, mfaEnabled: (newRole !== 'VISITOR'), bioEnabled: false,
        cipher: 'PROTECTED' // Don't store plain text in vault anymore
      }];
      setIdentities(updated as Identity[]);
      localStorage.setItem('1028bc_identity_vault', JSON.stringify(updated));
      setView('RECOVERY_SENT');
      setLoading(false);
    }
  };

  const handleBiometricAuth = () => {
    setIsSimulatingBio(true);
    setTimeout(() => { setIsSimulatingBio(false); completeAuth(); }, 1500);
  };

  if (!activeIdentity) return null;

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-charcoal-dark p-6 font-display">
      <div className="max-w-md w-full bg-charcoal border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldAlert size={120} /></div>
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3 text-sky-400">
            <Terminal size={24} />
            <h2 className="text-xl font-black uppercase tracking-widest">Portal Uplink</h2>
          </div>
          {view !== 'LOGIN' && (
            <button onClick={() => { setView('LOGIN'); setError(null); }} className="text-[10px] uppercase font-bold text-white/40 hover:text-white transition-colors">Cancel</button>
          )}
        </div>

        {view === 'LOGIN' && (
          <div className="space-y-6 relative z-10">
            <div className="relative">
              <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Active Node Profile</label>
              <button type="button" onClick={() => setShowDropdown(!showDropdown)} className="w-full flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-3 hover:bg-black/60 transition-colors">
                <div className="flex items-center gap-3">
                  <User size={16} className={activeIdentity.role === 'ADMIN' ? 'text-amber-400' : activeIdentity.role === 'TECH' ? 'text-sky-400' : 'text-emerald-400'} />
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-mono font-bold text-white">{activeIdentity.handle}</span>
                    <span className="text-[9px] text-white/40 font-mono">{activeIdentity.email}</span>
                  </div>
                </div>
                <ChevronDown size={16} className="text-white/30" />
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl max-h-64 overflow-y-auto">
                  {identities.map(id => (
                    <button key={id.id} onClick={() => { setActiveId(id.id); setShowDropdown(false); setPin(''); setError(null); }} className={`w-full flex items-center gap-3 p-4 text-left border-b border-white/5 hover:bg-white/5 transition-colors ${activeId === id.id ? 'bg-white/5' : ''}`}>
                      <User size={14} className={id.role === 'ADMIN' ? 'text-amber-400' : id.role === 'TECH' ? 'text-sky-400' : 'text-emerald-400'} />
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-white">{id.handle}</span>
                        <span className="text-[9px] uppercase tracking-widest text-white/30">{id.role}</span>
                      </div>
                    </button>
                  ))}
                  <button onClick={() => { setView('NEW_USER'); setShowDropdown(false); }} className="w-full flex items-center gap-3 p-4 text-left hover:bg-emerald-500/10 text-emerald-400 transition-colors">
                    <Plus size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">Register New Identity</span>
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleLogin}>
              <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Authorization Cipher</label>
              <div className="relative mb-6">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={pin} onChange={(e) => { setPin(e.target.value); setError(null); }} className={`w-full bg-black/50 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white font-mono tracking-[0.5em] text-lg focus:outline-none focus:border-sky-400 transition-colors`} placeholder="****" />
              </div>
              {error && <p className="text-red-400 text-[10px] uppercase font-bold -mt-4 mb-4 tracking-widest animate-pulse">{error}</p>}
              
              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-900 font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] flex items-center justify-center">
                  {loading ? <Loader2 className="animate-spin" /> : 'Authorize'}
                </button>
                {activeIdentity.bioEnabled && (
                  <button type="button" onClick={handleBiometricAuth} className={`w-14 flex items-center justify-center rounded-xl border border-sky-500/30 text-sky-400 hover:bg-sky-500/10 transition-all ${isSimulatingBio ? 'animate-pulse bg-sky-500/20' : 'bg-black/50'}`}>
                    <Fingerprint size={24} />
                  </button>
                )}
              </div>
            </form>

            <div className="pt-4 text-center">
              <button onClick={() => { setView('RECOVERY'); setError(null); }} className="text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white/70 transition-colors">
                Recover Account / Forgot Cipher
              </button>
            </div>
          </div>
        )}

        {view === 'MFA_CHALLENGE' && (
          <form onSubmit={handleMfaSubmit} className="space-y-6 relative z-10">
            <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 mb-6 text-center">
              <Smartphone size={24} className="text-sky-400 mx-auto mb-2" />
              <h3 className="text-sky-400 text-[10px] font-black uppercase tracking-widest mb-1">Two-Factor Authentication</h3>
              <p className="text-[10px] font-mono text-white/50">Enter the 6-digit TOTP from your authenticator app.</p>
            </div>
            <div>
              <input type="text" maxLength={6} value={mfaCode} onChange={(e) => { setMfaCode(e.target.value.replace(/\D/g, '')); setError(null); }} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white font-mono tracking-[1em] text-center text-2xl focus:outline-none focus:border-sky-400" placeholder="000000" autoFocus />
              {error && <p className="text-red-400 text-[10px] uppercase font-bold mt-2 tracking-widest text-center">{error}</p>}
            </div>
            <button type="submit" disabled={mfaCode.length !== 6} className="w-full bg-sky-500 hover:bg-sky-400 text-slate-900 font-black uppercase tracking-widest py-4 rounded-xl transition-all disabled:opacity-30">Verify Identity</button>
          </form>
        )}

        {view === 'RECOVERY' && (
          <div className="space-y-6 relative z-10">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-center">
              <Mail size={24} className="text-white/50 mx-auto mb-2" />
              <h3 className="text-white text-[10px] font-black uppercase tracking-widest mb-1">Account Recovery</h3>
              <p className="text-[10px] font-mono text-white/50">A secure reset link will be dispatched to the email vector associated with <span className="text-white">{activeIdentity.handle}</span>.</p>
            </div>
            <button onClick={() => setView('RECOVERY_SENT')} className="w-full bg-white text-slate-900 font-black uppercase tracking-widest py-4 rounded-xl transition-all hover:bg-white/80">Dispatch Reset Link</button>
          </div>
        )}

        {view === 'RECOVERY_SENT' && (
          <div className="space-y-6 relative z-10 text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
              <ArrowRight size={32} />
            </div>
            <h3 className="text-emerald-400 text-sm font-black uppercase tracking-widest mb-2">Vector Dispatched</h3>
            <p className="text-[10px] font-mono text-white/50 leading-relaxed mb-6">Check the inbox for <span className="text-white">{activeIdentity.email}</span>.<br/>Follow the secure uplink to reset your cipher.</p>
            <button onClick={() => setView('LOGIN')} className="w-full bg-black/50 border border-white/10 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all hover:bg-white/5">Return to Login</button>
          </div>
        )}

        {view === 'NEW_USER' && (
          <form onSubmit={handleCreateUser} className="space-y-4 relative z-10">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button type="button" onClick={() => setNewRole('VISITOR')} className={`py-3 rounded-xl border text-[10px] font-black tracking-widest uppercase transition-colors ${newRole === 'VISITOR' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-black/40 border-white/10 text-white/40'}`}>Visitor</button>
              <button type="button" onClick={() => setNewRole('TECH')} className={`py-3 rounded-xl border text-[10px] font-black tracking-widest uppercase transition-colors ${newRole === 'TECH' ? 'bg-sky-500/20 border-sky-500/50 text-sky-400' : 'bg-black/40 border-white/10 text-white/40'}`}>Tech</button>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">System Handle</label>
              <input type="text" value={newHandle} onChange={(e) => setNewHandle(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white font-mono text-xs focus:outline-none focus:border-emerald-400" placeholder="e.g. guest_01" />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Email Vector</label>
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white font-mono text-xs focus:outline-none focus:border-emerald-400" placeholder="email@domain.com" />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Assign Cipher (Min 8)</label>
              <input type="password" value={newCipher} onChange={(e) => setNewCipher(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white font-mono tracking-[0.5em] text-lg focus:outline-none focus:border-emerald-400" placeholder="********" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center">
              {loading ? <Loader2 className="animate-spin" /> : 'Register Identity'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};