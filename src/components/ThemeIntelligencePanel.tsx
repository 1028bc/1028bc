import React from 'react';
import { X } from 'lucide-react';

export function ThemeIntelligencePanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-doc-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close panel"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-charcoal-dark/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] font-medium tracking-[0.22em] text-offwhite/50">SOLURBANA DESIGN DOC</p>
            <h2 id="theme-doc-title" className="font-display mt-1 text-xl font-semibold tracking-tight text-white">
              Theme intelligence
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-offwhite/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-offwhite/75">
          <section>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/90">Tactical</h3>
            <p className="mt-2">
              Field-first density: high contrast, scan-friendly hierarchy, and controls that stay legible under pressure.
              Built for ops, deployments, and fast decisions.
            </p>
          </section>
          <section>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/90">Premiere</h3>
            <p className="mt-2">
              Cinematic rhythm: generous space, editorial type, and surfaces that feel like a finished product—not a
              template. Presence without noise.
            </p>
          </section>
          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-blue-400/90">
              Pushing the edge
            </h3>
            <p className="mt-2 text-offwhite/80">
              SolUrbana treats the UI as part of the story: interfaces should feel one step ahead—sharp, intentional, and
              human—without trading clarity for spectacle.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
