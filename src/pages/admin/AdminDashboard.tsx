import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  Users,
  ClipboardList,
  FileText,
  ShoppingBag,
  CalendarCheck,
  Truck,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { MOCK_CUSTOMERS } from '../../data/mockCustomers';

export const AdminDashboard: React.FC = () => {
  const { requirements, quotations, orders, bookings } = useData();

  const totalCustomers = MOCK_CUSTOMERS.length + 2;
  const newRequirements = requirements.filter(r => r.status === 'Pending Review' || r.status === 'Under Review').length;
  const pendingQuotations = quotations.filter(q => q.status === 'Sent' || q.status === 'Pending').length;
  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const todaysBookings = bookings.length;
  const pendingDeliveries = orders.filter(o => o.status === 'Dispatched' || o.status === 'Packed').length;

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Executive Control Dashboard</h1>
          <p className="text-xs text-slate-400">SAI HYGIENE & HOME CARE SOLUTIONS Operations Center</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/quotations"
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" /> Create New Quote
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Customers</span>
          <p className="text-2xl font-black text-white">{totalCustomers}</p>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +12% this month
          </span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">New Requirements</span>
          <p className="text-2xl font-black text-amber-400">{newRequirements}</p>
          <span className="text-[10px] text-slate-400">Awaiting Quotations</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending Quotes</span>
          <p className="text-2xl font-black text-sky-400">{pendingQuotations}</p>
          <span className="text-[10px] text-slate-400">Issued to clients</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Orders</span>
          <p className="text-2xl font-black text-blue-400">{activeOrders}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">In Fulfillment</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Today's Bookings</span>
          <p className="text-2xl font-black text-purple-400">{todaysBookings}</p>
          <span className="text-[10px] text-slate-400">Logistics Scheduled</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dispatched</span>
          <p className="text-2xl font-black text-emerald-400">{pendingDeliveries}</p>
          <span className="text-[10px] text-slate-400">In Transit</span>
        </div>
      </div>

      {/* Visual Analytics / Mock Bar Chart */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Monthly Institutional Order Volume (Tirupati Hub)</h3>
            <p className="text-xs text-slate-400">Consolidated supply revenue overview</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
            Total Gross: ₹4,85,200
          </span>
        </div>

        <div className="pt-4 flex items-end gap-3 h-36">
          {[
            { month: 'Apr', height: '40%', val: '₹1.2L' },
            { month: 'May', height: '55%', val: '₹1.8L' },
            { month: 'Jun', height: '65%', val: '₹2.4L' },
            { month: 'Jul', height: '70%', val: '₹2.9L' },
            { month: 'Aug', height: '85%', val: '₹3.8L' },
            { month: 'Sep', height: '100%', val: '₹4.8L' },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-[10px] font-bold text-cyan-400">{bar.val}</span>
              <div
                style={{ height: bar.height }}
                className="w-full bg-gradient-to-t from-blue-700 to-cyan-400 rounded-t-lg transition-all duration-500 hover:brightness-125"
              />
              <span className="text-[10px] text-slate-400 font-semibold">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Streams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Requirements */}
        <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Incoming Requirements</h4>
            <Link to="/admin/requirements" className="text-[11px] text-cyan-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-2">
            {requirements.slice(0, 3).map(r => (
              <div key={r.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{r.id}</span>
                  <StatusBadge status={r.status} size="sm" />
                </div>
                <p className="text-slate-400 text-[11px] truncate">{r.businessName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quotations */}
        <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Issued Quotations</h4>
            <Link to="/admin/quotations" className="text-[11px] text-cyan-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-2">
            {quotations.slice(0, 3).map(q => (
              <div key={q.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{q.id}</span>
                  <span className="text-cyan-400 font-bold">₹{q.grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-slate-400 text-[11px] truncate">{q.businessName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Confirmed Orders</h4>
            <Link to="/admin/orders" className="text-[11px] text-cyan-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-2">
            {orders.slice(0, 3).map(o => (
              <div key={o.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{o.id}</span>
                  <StatusBadge status={o.status} size="sm" />
                </div>
                <p className="text-slate-400 text-[11px] truncate">{o.businessName}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
