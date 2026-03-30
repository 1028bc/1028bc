import React, { useState } from 'react';
import { Menu, X, User, LogIn, Settings, Palette, Terminal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = ({ isLanding }: { isLanding: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setCurrentView, theme, setTheme } = useApp();

  return (
    <nav className={`${isLanding ? 'absolute' : 'fixed'} top-0 left-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* COMBINATION MARK: >_1028bc (lowercase protocol) */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2 group cursor-pointer font-mono"
        >
          <div className="flex items-center text-sky-400 font-black text-xl">
            <span>{'>'}</span>
            <span className="animate-pulse ml-0.5">_</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white group-hover:text-sky-400 transition-colors italic">
            1028bc
          </span>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 hover:bg-white/5 rounded-lg text-white/50"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* ... Kebab Menu logic remains ... */}
        </div>
      </div>
    </nav>
  );
};