// src/hooks/useTabProtocol.ts
import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const useTabProtocol = () => {
  const { user, currentView } = useApp();

  useEffect(() => {
    // 1. Dynamic Title Logic
    const rolePrefix = user?.role === 'god' ? 'core' : user?.role || 'public';
    const context = currentView === 'landing' ? 'master' : currentView;
    document.title = `>_ 1028bc // ${rolePrefix}.${context}`;

    // 2. Favicon #7 Implementation (Isometric Node)
    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      // SVG for Option #7: An isometric 3D cube/node
      const svgIcon = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
          <path d='M50 5 L90 25 V75 L50 95 L10 75 V25 Z' fill='%2338bdf8' fill-opacity='0.2' stroke='%2338bdf8' stroke-width='4'/>
          <path d='M50 95 V50 L90 25 M50 50 L10 25' stroke='%2338bdf8' stroke-width='4'/>
          <circle cx='50' cy='50' r='8' fill='%2338bdf8'/>
        </svg>
      `.replace(/\s+/g, ' ');

      favicon.setAttribute('href', `data:image/svg+xml,${svgIcon}`);
    }
  }, [user, currentView]);
};