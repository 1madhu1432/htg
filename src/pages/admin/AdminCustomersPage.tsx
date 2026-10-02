import React, { useState } from 'react';
import { MOCK_CUSTOMERS } from '../../data/mockCustomers';
import { useData } from '../../context/DataContext';
import { Users, Search, Eye, CheckCircle, XCircle, Building2 } from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const { requirements, quotations, orders } = useData();
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustId, setSelectedCustId] = useState<string | null>(null);

  const filtered = customers.filter(c =>
    c.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCust = customers.find(c => c.id === selectedCustId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Registered Customer Accounts</h1>
          <p className="text-xs text-slate-400">Institutional accounts, wholesale buyers, and retail profiles.</p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search business or contact..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 w-64"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">Business Name</th>
                <th className="p-4">Contact Person</th>
                <th className="p-4">Phone / Email</th>
                <th className="p-4">GST Number</th>
                <th className="p-4">Business Type</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {filtered.map(cust => (
                <tr key={cust.id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{cust.businessName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{cust.contactPerson || cust.name}</td>
                  <td className="p-4">
                    <span className="block text-white font-medium">{cust.phone}</span>
                    <span className="text-[11px] text-slate-500">{cust.email}</span>
                  </td>
                  <td className="p-4 font-mono text-cyan-400">{cust.gstNumber || 'N/A'}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium text-[11px]">
                      {cust.businessType}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedCustId(cust.id)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-[11px]"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer/Modal */}
      {activeCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Account Dossier</span>
                <h3 className="text-xl font-black">{activeCust.businessName}</h3>
                <p className="text-xs text-slate-400">Type: {activeCust.businessType} • GST: {activeCust.gstNumber}</p>
              </div>
              <button onClick={() => setSelectedCustId(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Contact Person</span>
                <span className="font-bold text-slate-200">{activeCust.contactPerson || activeCust.name}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Phone</span>
                <span className="font-bold text-cyan-400">{activeCust.phone}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Registered Delivery Address</span>
              <p className="text-slate-200">{activeCust.deliveryAddress}, {activeCust.city}, {activeCust.state} - {activeCust.pincode}</p>
            </div>

            <button
              onClick={() => setSelectedCustId(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
