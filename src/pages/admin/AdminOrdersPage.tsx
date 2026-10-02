import React from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ShoppingBag, Truck, CheckCircle2 } from 'lucide-react';
import { OrderStatus } from '../../types';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useData();

  const statuses: OrderStatus[] = ['Confirmed', 'Processing', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-6 text-white">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black">Active Orders & Dispatch Fulfillment</h1>
        <p className="text-xs text-slate-400">Update live delivery progression steps for customer tracking.</p>
      </div>

      <div className="space-y-4">
        {orders.map(ord => (
          <div key={ord.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="font-extrabold text-sm text-cyan-400">{ord.id}</span>
                <h3 className="text-base font-bold">{ord.businessName}</h3>
                <p className="text-xs text-slate-400">Order Date: {ord.orderDate} • Tracking: {ord.trackingNumber}</p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={ord.status} size="md" />
                <select
                  value={ord.status}
                  onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                  className="text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold"
                >
                  {statuses.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Consignment Items</span>
                <ul className="space-y-1">
                  {ord.items.map((it, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span className="font-semibold">{it.productName} (x{it.quantity})</span>
                      <span className="text-cyan-400">₹{it.amount.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Financial Summary</span>
                <div className="flex justify-between text-slate-300">
                  <span>Grand Total Billed:</span>
                  <span className="font-black text-cyan-400 text-sm">₹{ord.grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Arrival:</span>
                  <span className="font-bold text-white">{ord.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
