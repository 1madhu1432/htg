import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { PlusCircle, ClipboardList, ChevronRight, FileText, Calendar } from 'lucide-react';

export const MyRequirementsPage: React.FC = () => {
  const { requirements } = useData();
  const [selectedReqId, setSelectedReqId] = useState<string | null>(requirements[0]?.id || null);

  const activeReq = requirements.find(r => r.id === selectedReqId) || requirements[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">My Product Requirements</h1>
          <p className="text-xs text-slate-500">Track submitted requirement lists and issued quotations.</p>
        </div>

        <Link
          to="/dashboard/requirements/new"
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" /> Create New Requirement
        </Link>
      </div>

      {requirements.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <ClipboardList className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Submitted Requirements Yet</h3>
          <p className="text-xs text-slate-500">Create your first product requirement to receive custom B2B pricing.</p>
          <Link to="/dashboard/requirements/new" className="inline-block px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-xl">
            Start New Requirement
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Requirement List */}
          <div className="lg:col-span-5 space-y-3">
            {requirements.map(req => {
              const isSelected = activeReq?.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReqId(req.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-blue-600 ring-2 ring-sky-100 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-navy-900">{req.id}</span>
                    <StatusBadge status={req.status} size="sm" />
                  </div>

                  <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
                    <span>{req.items.length} Products Included</span>
                    <span className="text-slate-400">{req.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Requirement Details */}
          {activeReq && (
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Requirement Details</span>
                  <h3 className="text-xl font-black text-navy-900">{activeReq.id}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Submitted on: {activeReq.date}</p>
                </div>
                <StatusBadge status={activeReq.status} size="lg" />
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Requested Line Items</h4>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  {activeReq.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{item.productName}</span>
                        <span className="text-[11px] text-slate-500">{item.category} • Pack: {item.packSize}</span>
                      </div>
                      <span className="font-black text-blue-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {activeReq.notes && (
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-900">
                  <span className="font-bold block">Notes:</span>
                  <p className="mt-0.5">{activeReq.notes}</p>
                </div>
              )}

              {activeReq.quotationId && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 block">Quotation Issued!</span>
                    <p className="text-xs text-emerald-700">Quotation #{activeReq.quotationId} is ready for review.</p>
                  </div>
                  <Link
                    to="/dashboard/quotations"
                    className="px-3.5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 shadow-xs"
                  >
                    View Quotation
                  </Link>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
