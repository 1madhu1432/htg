import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Shield,
  LayoutDashboard,
  Users,
  Package,
  FolderTree,
  ClipboardList,
  CalendarCheck,
  FileText,
  ShoppingBag,
  Repeat,
  LogOut,
  ArrowLeft,
  Search
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const adminLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Customer Accounts', path: '/admin/customers', icon: Users },
    { name: 'Products Catalog', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Requirements', path: '/admin/requirements', icon: ClipboardList },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Quotations Builder', path: '/admin/quotations', icon: FileText },
    { name: 'Orders Management', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Recurring Schedules', path: '/admin/recurring', icon: Repeat },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Admin Header */}
      <header className="sticky top-0 z-30 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold">
            <ArrowLeft className="w-4 h-4" /> Exit to Public Site
          </Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-sm text-white tracking-wide">
              SAI HYGIENE Admin Management Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Administrator: {user?.name || 'Sai Yadav'}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 hidden md:flex flex-col">
          <nav className="space-y-1 flex-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Management Modules</p>
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/50'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-cyan-300' : 'text-slate-500'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-bold text-slate-200">System Information</p>
            <p>Mode: Frontend Demo Mode</p>
            <p>Storage: LocalStorage Active</p>
          </div>
        </aside>

        {/* Admin Content View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-900">
          {/* Mobile sub-nav tabs */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-4 mb-4 border-b border-slate-800">
            {adminLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                  isActive(link.path) ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Outlet />
        </main>
      </div>

    </div>
  );
};
