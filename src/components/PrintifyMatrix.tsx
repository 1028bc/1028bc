import React from 'react';

export const PrintifyMatrix = () => {
  const vendors = [
    { id: 'V-01', name: 'Monster Digital', product: 'Bella+Canvas 3001', cost: '$10.40', time: '1.4 Days', status: 'PRIMARY', color: 'text-green-400' },
    { id: 'V-02', name: 'SwiftPOD', product: 'Gildan 18500 Hoodie', cost: '$18.50', time: '2.1 Days', status: 'FALLBACK', color: 'text-yellow-400' },
    { id: 'V-03', name: 'Spoke Custom', product: 'Black Mug 11oz', cost: '$6.30', time: '3.0 Days', status: 'TESTING', color: 'text-blue-400' }
  ];

  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
      <h3 className="text-lg font-bold text-gray-300 mb-4">PRINTIFY VENDOR ROUTING</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs text-gray-500 uppercase bg-gray-800 border-b border-gray-600">
            <tr>
              <th className="px-4 py-2">Vendor</th>
              <th className="px-4 py-2">Target Product</th>
              <th className="px-4 py-2">Base Cost</th>
              <th className="px-4 py-2">Avg Prod. Time</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} className="border-b border-gray-700 bg-gray-800/50">
                <td className="px-4 py-3 font-medium text-white">{v.name}</td>
                <td className="px-4 py-3">{v.product}</td>
                <td className="px-4 py-3 font-mono">{v.cost}</td>
                <td className="px-4 py-3">{v.time}</td>
                <td className={`px-4 py-3 font-bold ${v.color}`}>{v.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};