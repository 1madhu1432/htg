import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  ShoppingBag,
  FileText,
  ClipboardList,
  Truck,
  PlusCircle,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  PackageCheck
} from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { requirements, quotations, orders, bookings, openQuoteModal } = useData();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const activeQuotations = quotations.filter(q => q.status === 'Sent' || q.status === 'Pending').length;
  const upcomingDeliveries = bookings.filter(b => b.status !== 'Delivered').length;

  const recentReqs = requirements.slice(0, 3);
  const recentQuotes = quotations.slice(0, 3);
  const recentOrdersList = orders.slice(0, 3);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="gradient-hero text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <span className="px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-white/20">
            Institutional Customer Account
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Welcome back, {user?.businessName || 'Valued Business Customer'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            Managing hygiene supplies for {user?.contactPerson || user?.name} • GST: {user?.gstNumber || 'N/A'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <Link
            to="/dashboard/requirements/new"
            className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-navy-900 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" /> New Requirement
          </Link>
          <Link
            to="/dashboard/bookings/new"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5"
          >
            <CalendarCheck className="w-4 h-4 text-cyan-300" /> Book Supply
          </Link>
          <button
            onClick={() => openQuoteModal()}
            className="px-4 py-2.5 bg-white text-navy-900 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-blue-700" /> Request Quote
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
            <p className="text-2xl font-black text-navy-900 mt-1">{totalOrders}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-blue-700 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Orders</span>
            <p className="text-2xl font-black text-amber-600 mt-1">{pendingOrders}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Quotations</span>
            <p className="text-2xl font-black text-blue-600 mt-1">{activeQuotations}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Bookings</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{upcomingDeliveries}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid of Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Quotations */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700" /> Recent Quotations
            </h3>
            <Link to="/dashboard/quotations" className="text-xs font-bold text-blue-700 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentQuotes.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No quotations available yet.</p>
            ) : (
              recentQuotes.map(q => (
                <div key={q.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-navy-900">{q.id}</span>
                    <p className="text-[11px] text-slate-500">{q.items.length} Products • Total: ₹{q.grandTotal.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={q.status} size="sm" />
                    <Link to={`/dashboard/quotations`} className="p-1.5 bg-white text-slate-700 hover:text-blue-700 rounded-lg border border-slate-200">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-700" /> Recent Orders & Tracking
            </h3>
            <Link to="/dashboard/orders" className="text-xs font-bold text-blue-700 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrdersList.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No active orders found.</p>
            ) : (
              recentOrdersList.map(ord => (
                <div key={ord.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-navy-900">{ord.id}</span>
                    <p className="text-[11px] text-slate-500">Order Date: {ord.orderDate} • ₹{ord.grandTotal.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={ord.status} size="sm" />
                    <Link to={`/dashboard/orders`} className="p-1.5 bg-white text-slate-700 hover:text-blue-700 rounded-lg border border-slate-200">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
