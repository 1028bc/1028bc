import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Activity, Server, Layout, Database, ShieldAlert, Cpu } from 'lucide-react';

const PROJECTS = [
  {
    id: 'field-engine',
    title: 'Tactical Field Engine',
    category: 'Logistics & Geographic UI',
    status: 'ACTIVE DEPLOYMENT',
    description: 'A context-aware React/TypeScript Field Service Terminal. Features dynamic Leaflet routing, offline-first geocoding, and a stealth push-down HUD for dispatch management.',
    tech: ['React 18', 'TypeScript', 'Leaflet', 'Framer Motion'],
    icon: ShieldAlert,
    accent: 'text-sky-400',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10'
  },
  {
    id: 'solurbana',
    title: 'SolUrbana Protocol',
    category: 'System Architecture',
    status: 'IN DEVELOPMENT',
    description: 'A comparative urban analytics engine designed to parse and visualize complex city data metrics in real-time. Built under the SolStudios umbrella.',
    tech: ['React', 'Node.js', 'Data Visualization', 'REST APIs'],
    icon: Server,
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10'
  },
  {
    id: 'iam-vault',
    title: '1028bc IAM Vault',
    category: 'Security & Authentication',
    status: 'ACTIVE DEPLOYMENT',
    description: 'Local Identity and Access Management (IAM) simulation. Features Role-Based Access Control (RBAC), biometric simulation, and Master Key override recovery protocols.',
    tech: ['React State', 'Local Storage', 'Cryptography Concepts'],
    icon: Database,
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10'
  },
  {
    id: 'solshift',
    title: 'SolShift Engine',
    category: 'Gamification Layer',
    status: 'PROTOTYPING',
    description: 'An interactive gamification layer intended to integrate directly into the SolUrbana protocol, transforming field service routing into a reactive logic engine.',
    tech: ['State Machines', 'React Context', 'Physics Logic'],
    icon: Cpu,
    accent: 'text-fuchsia-400',
    border: 'border-fuchsia-500/30',
    bg: 'bg-fuchsia-500/10'
  }
];

export const PortfolioScreen = () => {
  return (
    <div className="w-full pt-20 md:pt-32 pb-24 px-6 md:px-12 relative z-10 font-display min-h-[calc(100vh-60px)]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-16 border-b border-white/10 pb-8">
          <div className="p-4 bg-white/5 text-white/50 rounded-2xl border border-white/10">
            <FolderGit2 size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-widest text-white">Active Portfolio</h1>
            <p className="text-white/40 font-mono text-sm uppercase tracking-widest mt-1">Deployed Systems & Architecture</p>
          </div>
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all relative overflow-hidden"
            >
              {/* Background Status Glow */}
              <div className={`absolute top-0 right-0 p-32 opacity-5 blur-3xl rounded-full ${project.bg} group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl border ${project.border} ${project.bg} ${project.accent}`}>
                    <project.icon size={24} />
                  </div>
                  <div className="px-3 py-1 rounded border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest text-white/50">
                    {project.status}
                  </div>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-1">{project.title}</h3>
                <p className={`text-xs font-mono font-bold uppercase tracking-widest mb-6 ${project.accent}`}>
                  // {project.category}
                </p>
                
                <p className="text-sm text-white/60 leading-relaxed mb-8 h-20">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2 py-1 bg-black/60 border border-white/10 rounded text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* TELEMETRY FOOTER */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            1028bc_OS // Portfolio rendering complete. All systems nominal.
          </p>
        </div>

      </div>
    </div>
  );
};