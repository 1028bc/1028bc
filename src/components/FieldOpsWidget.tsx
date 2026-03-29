import React, { useState, useEffect } from 'react';

export const FieldOpsWidget = () => {
  const [timeLeft, setTimeLeft] = useState('CALCULATING...');

  useEffect(() => {
    // Target: Today at 07:35 AM
    const target = new Date();
    target.setHours(7, 35, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('00:00:00 [DEPARTURE OVERDUE]');
        clearInterval(timer);
        return;
      }
      
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg border border-yellow-600 mb-6">
      <h2 className="text-xl font-bold mb-3 text-yellow-500">FIELD SERVICE SCHEDULE</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 p-3 bg-gray-800 rounded border border-gray-600">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Next Appointment</p>
          <p className="text-lg font-bold text-white">7-Eleven Node Maintenance</p>
          <p className="text-sm text-gray-300">Target: 10:00 AM PST</p>
        </div>
        
        <div className="flex-1 p-3 bg-gray-800 rounded border border-red-900/50">
          <p className="text-xs text-red-400 uppercase tracking-wider">Departure Timer</p>
          <p className="text-2xl font-mono text-red-500 font-bold animate-pulse">{timeLeft}</p>
          <p className="text-sm text-gray-400">Departure: 07:35 AM PST</p>
        </div>
      </div>
    </div>
  );
};