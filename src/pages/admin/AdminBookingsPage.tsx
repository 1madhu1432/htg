import React from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { CalendarCheck, Check, Clock, Truck } from 'lucide-react';
import { BookingStatus } from '../../types';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useData();

  const statusOptions: BookingStatus[] = ['Requested', 'Reviewed', 'Confirmed', 'Processing', 'Dispatched', 'Delivered'];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white">Logistics & Supply Bookings</h1>
        <p className="text-xs text-slate-400">Manage doorstep delivery schedules and dispatch operations.</p>
      </div>

      <div className="space-y-4">
        {bookings.map(b => (
          <div key={b.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="font-extrabold text-sm text-cyan-400">{b.id}</span>
                <h3 className="text-base font-bold">{b.businessName}</h3>
                <p className="text-xs text-slate-400">Date: {b.preferredDate} ({b.preferredTime}) • {b.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={b.status} size="md" />
                <select
                  value={b.status}
                  onChange={e => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                  className="text-xs p-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold"
                >
                  {statusOptions.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-slate-400 block uppercase text-[10px]">Delivery Location</span>
              <p>{b.deliveryAddress}</p>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Booked Items</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {b.items.map((it, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-200">
                    {it.productName} (x{it.quantity})
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
