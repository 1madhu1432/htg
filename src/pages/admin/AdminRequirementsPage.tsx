import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ClipboardList, ArrowRight, FileText } from 'lucide-react';

export const AdminRequirementsPage: React.FC = () => {
  const { requirements } = useData();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white">Incoming Customer Requirements</h1>
        <p className="text-xs text-slate-400">Review submitted items and generate custom formal quotations.</p>
      </div>

      <div className="space-y-4">
        {requirements.map(req => (
          <div key={req.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="font-extrabold text-sm text-cyan-400">{req.id}</span>
                <h3 className="text-base font-bold">{req.businessName}</h3>
                <p className="text-xs text-slate-400">Contact: {req.customerName} ({req.phone}) • {req.date}</p>
              </div>

              <StatusBadge status={req.status} size="md" />
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Requested Items ({req.items.length})</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {req.items.map((it, i) => (
                  <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 flex justify-between">
                    <span className="font-semibold">{it.productName} ({it.packSize})</span>
                    <span className="font-bold text-cyan-400">Qty: {it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => navigate(`/admin/quotations?reqId=${req.id}`)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <FileText className="w-4 h-4" /> Issue Quotation for {req.id}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
