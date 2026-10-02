import React from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Repeat } from 'lucide-react';

export const AdminRecurringPage: React.FC = () => {
  const { recurring, toggleRecurringStatus } = useData();

  return (
    <div className="space-y-6 text-white">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black">Active Recurring Supply Schedules</h1>
        <p className="text-xs text-slate-400">Automated recurring contracts across Tirupati business clients.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recurring.map(rec => (
          <div key={rec.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="font-extrabold text-sm text-cyan-400">{rec.id}</span>
                <h3 className="text-base font-bold">{rec.businessName}</h3>
                <p className="text-xs text-slate-400">Frequency: <strong className="text-white">{rec.frequency}</strong></p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={rec.status} size="sm" />
                <button
                  onClick={() => toggleRecurringStatus(rec.id)}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-lg border border-slate-800"
                >
                  Toggle State
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-300">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Next Scheduled Dispatch</span>
              <span className="font-bold text-cyan-400">{rec.nextSupplyDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
