import React from 'react';
import { Terminal, MoreVertical } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StatusIndicator = () => {
  const { currentBrand } = useApp();
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
      <span className="text-offwhite/50 hidden sm:inline">System Status:</span>
      <span className={`${currentBrand.accentColor} flex items-center gap-1.5`}>
        <span className="relative flex h-2 w-2">
          {/* [PATCH]: Using explicit bgColor instead of dynamic string replacement */}
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentBrand.bgColor} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${currentBrand.bgColor}`}></span>
        </span>
        Active
      </span>
    </div>
  );
};

interface PageHeaderProps {
  titleTop: string;
  titleBottom: string;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
  activePage?: string;
}

export const PageHeader = ({ titleTop, titleBottom, rightContent, children, activePage }: PageHeaderProps) => {
  const { currentBrand } = useApp();

  return (
    <div className={`pt-12 flex flex-col items-start w-full border-l-2 ${currentBrand.borderColor} pl-6`}>
      <div className="flex justify-between items-center w-full mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-charcoal-light bg-charcoal-light/30 text-xs font-mono text-offwhite/70 uppercase tracking-widest">
          <Terminal size={12} className={currentBrand.accentColor} />
          <span>{`>_ ${currentBrand.shortName} / ${activePage || titleTop}`}</span>
        </div>
        <div className="flex items-center gap-4">
          <StatusIndicator />
          <button className="text-offwhite/70 hover:text-white">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      <div className="w-full flex justify-between items-end">
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase leading-[0.85] tracking-tighter flex flex-col items-start">
          <span className="text-white">{titleTop}</span>
          <span className={currentBrand.accentColor}>{titleBottom}</span>
        </h1>
        {rightContent && <div>{rightContent}</div>}
      </div>
      <div className="mt-10 w-full relative">
        {children}
      </div>
    </div>
  );
};