import React, { useState } from 'react';

type ShellType = 'ps' | 'bash' | 'native';

export const CommandLine = ({ shell = 'native' }: { shell?: ShellType }) => {
  const get_prompt = () => {
    switch(shell) {
      case 'ps': return 'PS 1028bc> ';
      case 'bash': return 'architect@1028bc:~$ ';
      default: return '1028bc> ';
    }
  };

  return (
    <div className="font-mono text-sm p-4 bg-black/50 border border-white/5 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">{get_prompt()}</span>
        <input 
          type="text" 
          className="bg-transparent border-none outline-none text-white flex-1"
          autoFocus
        />
        <span className="animate-pulse text-sky-400 font-black">_</span>
      </div>
    </div>
  );
};