import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Repeat, Plus, PauseCircle, PlayCircle, Calendar, MapPin, Trash2 } from 'lucide-react';

export const RecurringSupplyPage: React.FC = () => {
  const { user } = useAuth();
  const { products, recurring, createRecurringSupply, toggleRecurringStatus } = useData();

  const [frequency, setFrequency] = useState<'Weekly' | '15 Days' | 'Monthly' | 'Custom'>('15 Days');
  const [nextSupplyDate, setNextSupplyDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
  const [deliveryAddress, setDeliveryAddress] = useState(user?.deliveryAddress || 'Renigunta Road, Tirupati');
  const [showModal, setShowModal] = useState(false);

  const [selectedItems, setSelectedItems] = useState([
    { productName: 'Heavy-Duty Industrial Floor Cleaner 5L', quantity: 8, packSize: '5L Can' },
    { productName: 'C-Fold Hand Towels 2-Ply', quantity: 12, packSize: 'Box 20s' }
  ]);

  const [newProd, setNewProd] = useState('');
  const [newQty, setNewQty] = useState(5);

  const handleAddItem = () => {
    if (!newProd) return;
    setSelectedItems(prev => [...prev, { productName: newProd, quantity: newQty, packSize: 'Standard' }]);
    setNewProd('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;

    createRecurringSupply({
      customerId: user?.id,
      businessName: user?.businessName,
      frequency,
      nextSupplyDate,
      deliveryAddress,
      items: selectedItems
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Automated Recurring Supply</h1>
          <p className="text-xs text-slate-500">Automate your regular cleaning chemical and tissue replenishment schedules.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Recurring Schedule
        </button>
      </div>

      {/* Active Subscriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recurring.map(rec => (
          <div key={rec.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-blue-700" />
                  <span className="font-black text-sm text-navy-900">{rec.id}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Frequency: <strong className="text-blue-700">{rec.frequency}</strong></p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={rec.status} size="sm" />
                <button
                  onClick={() => toggleRecurringStatus(rec.id)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title={rec.status === 'Active' ? 'Pause Subscription' : 'Resume Subscription'}
                >
                  {rec.status === 'Active' ? <PauseCircle className="w-4 h-4 text-amber-600" /> : <PlayCircle className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>
            </div>

            <div className="text-xs space-y-1 text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                <span>Next Automated Dispatch: <strong className="text-slate-900">{rec.nextSupplyDate}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span className="truncate">{rec.deliveryAddress}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Scheduled Items</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {rec.items.map((it, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                    {it.productName} (x{it.quantity})
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Recurring Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-black text-navy-900">Schedule Recurring Supply</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Supply Frequency *</label>
                <select
                  value={frequency}
                  onChange={e => setFrequency(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                >
                  <option value="Weekly">Weekly (Every 7 Days)</option>
                  <option value="15 Days">15 Days (Fortnightly)</option>
                  <option value="Monthly">Monthly (Every 30 Days)</option>
                  <option value="Custom">Custom Schedule</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Next Delivery Date *</label>
                <input
                  type="date"
                  required
                  value={nextSupplyDate}
                  onChange={e => setNextSupplyDate(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address *</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Items */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Recurring Products</label>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl max-h-36 overflow-y-auto">
                  {selectedItems.map((it, i) => (
                    <div key={i} className="p-2 text-xs flex justify-between items-center bg-slate-50">
                      <span className="font-semibold text-slate-800">{it.productName} (x{it.quantity})</span>
                      <button type="button" onClick={() => setSelectedItems(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <select
                    value={newProd}
                    onChange={e => setNewProd(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="">-- Choose Product --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <button type="button" onClick={handleAddItem} className="px-3 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold">
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-3 bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md">
                  Create Subscription
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
