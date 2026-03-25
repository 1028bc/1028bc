import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const InfoOverlay = ({ text, enabled }: { text: string; enabled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentBrand } = useApp();
  
  if (!enabled) return null;

  return (
    <div 
      className="absolute top-3 right-3 z-20"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={`w-5 h-5 rounded-full ${currentBrand.bgAlpha} border ${currentBrand.borderColor} flex items-center justify-center ${currentBrand.accentColor} font-mono text-[10px] font-bold cursor-help`}>
        i
      </div>
      {isOpen && (
        <div className={`absolute right-0 top-7 w-64 ${currentBrand.bgAlpha} backdrop-blur-md border ${currentBrand.borderColor} p-3 shadow-2xl z-50`}>
          <p className="font-mono text-[10px] text-white leading-relaxed uppercase tracking-tighter">{text}</p>
        </div>
      )}
    </div>
  );
};