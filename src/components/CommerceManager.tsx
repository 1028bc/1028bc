import React, { useState } from 'react';

export const CommerceManager = () => {
  const [targetMargin, setTargetMargin] = useState(40); // 40% Default Margin Floor

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-green-400">[RESTRICTED] AUTONOMOUS COMMERCE</h2>
      
      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-800 rounded shadow border border-gray-600">
          <p className="text-sm text-gray-400">AI Stylizer Status</p>
          <p className="text-lg font-mono text-blue-400">IDLE (Awaiting Cron)</p>
        </div>
        <div className="p-4 bg-gray-800 rounded shadow border border-gray-600">
          <p className="text-sm text-gray-400">Active Etsy Listings</p>
          <p className="text-lg font-mono">0</p>
        </div>
        <div className="p-4 bg-gray-800 rounded shadow border border-gray-600">
          <p className="text-sm text-gray-400">Net Profit (30 Days)</p>
          <p className="text-lg font-mono text-green-500">$0.00</p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="p-4 bg-gray-800 rounded border border-red-900">
        <h3 className="text-lg font-bold text-red-400 mb-2">SYSTEM OVERRIDES</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Margin Floor Protection</p>
            <p className="text-sm text-gray-400">Minimum profit required before Printify auto-fulfillment triggers.</p>
          </div>
          <div className="flex items-center">
            <input 
              type="number" 
              value={targetMargin} 
              onChange={(e) => setTargetMargin(Number(e.target.value))}
              className="w-16 p-1 text-black text-center font-mono rounded"
            />
            <span className="ml-2 font-mono">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};