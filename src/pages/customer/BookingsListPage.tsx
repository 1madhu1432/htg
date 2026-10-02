import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { CalendarCheck, PlusCircle, Clock, MapPin } from 'lucide-react';

export const BookingsListPage: React.FC = () => {
  const { bookings } = useData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Supply Bookings</h1>
          <p className="text-xs text-slate-500">Overview of scheduled doorstep deliveries and dispatch requests.</p>
        </div>

        <Link
          to="/dashboard/bookings/new"
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" /> Book New Supply
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Active Supply Bookings</h3>
          <p className="text-xs text-slate-500">Book your first delivery request to schedule logistics.</p>
          <Link to="/dashboard/bookings/new" className="inline-block px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-xl">
            Book Supply Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-navy-900">{booking.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-blue-700 border border-sky-100">
                      {booking.orderType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Booked on: {booking.createdDate}</p>
                </div>

                <StatusBadge status={booking.status} size="md" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Preferred Delivery Slot</span>
                    <span>{booking.preferredDate} ({booking.preferredTime})</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 md:col-span-2">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Delivery Address</span>
                    <span>{booking.deliveryAddress}</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Booked Items</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {booking.items.map((item, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold text-[11px]">
                      {item.productName} (x{item.quantity})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
