import React, { useState } from 'react';
import { Menu, X, User, LogIn, Settings, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = ({ isLanding }: { isLanding: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setCurrentView, theme, setTheme } = useApp();

  return (
    <nav className={`${isLanding ? 'absolute' : 'fixed'} top-0 left-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* logo: lowercase protocol */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="text-2xl font-black tracking-tighter cursor-pointer italic"
        >
          1028bc
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 hover:bg-white/5 rounded-lg text-white/50"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-4 w-60 bg-[#050505] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
              <button 
                onClick={() => { setTheme(theme === 'cyber' ? 'minimal' : 'cyber'); setIsOpen(false); }}
                className="w-full px-4 py-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white"
              >
                <Palette size={14} /> toggle theme ({theme})
              </button>

              <div className="h-[1px] bg-white/5 my-1" />

              {user ? (
                <>
                  <button 
                    onClick={() => { setCurrentView('profile'); setIsOpen(false); }} 
                    className="w-full px-4 py-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white"
                  >
                    <User size={14} className="text-sky-400" /> edit profile
                  </button>
                  <button 
                    onClick={() => { setCurrentView('admin'); setIsOpen(false); }} 
                    className="w-full px-4 py-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white"
                  >
                    <Settings size={14} className="text-sky-400" /> node settings
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { setCurrentView('auth'); setIsOpen(false); }} 
                  className="w-full px-4 py-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-sky-400 hover:bg-sky-500/10"
                >
                  <LogIn size={14} /> establish uplink
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};