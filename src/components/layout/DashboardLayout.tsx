import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  CalendarCheck,
  FileText,
  ShoppingBag,
  Repeat,
  User,
  LogOut,
  Bell,
  Search,
  Home,
  PlusCircle,
  Menu,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { draftRequirement, openQuoteModal } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/dashboard/products', icon: Package },
    { name: 'My Requirements', path: '/dashboard/requirements', icon: ClipboardList, badge: draftRequirement.length > 0 ? draftRequirement.length : undefined },
    { name: 'Bookings', path: '/dashboard/bookings', icon: CalendarCheck },
    { name: 'Quotations', path: '/dashboard/quotations', icon: FileText },
    { name: 'Orders', path: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Recurring Supply', path: '/dashboard/recurring', icon: Repeat },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const mobileBottomLinks = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Products', path: '/dashboard/products', icon: Package },
    { name: 'Bookings', path: '/dashboard/bookings', icon: CalendarCheck },
    { name: 'Orders', path: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/assets/sai-hygiene-logo-icon.png" alt="Logo" className="h-8 w-auto" />
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold text-sm text-navy-900 leading-tight">SAI HYGIENE</span>
              <span className="text-[10px] text-sky-600 font-semibold">B2B Customer Portal</span>
            </div>
          </Link>
        </div>

        {/* Global Portal Search & Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openQuoteModal()}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-blue-700 hover:bg-sky-100 text-xs font-bold border border-sky-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            Request Quote
          </button>

          <Link
            to="/dashboard/requirements/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Requirement</span>
          </Link>

          {/* User Info & Logout */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-900 leading-tight">{user?.businessName || user?.name}</span>
              <span className="text-[10px] text-slate-500">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-navy-900 text-slate-300 border-r border-navy-800 shrink-0">
          <div className="p-4 border-b border-navy-800 bg-navy-800/40">
            <p className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">Account Overview</p>
            <h4 className="text-sm font-bold text-white truncate mt-0.5">{user?.businessName}</h4>
            <p className="text-xs text-slate-400 truncate">{user?.gstNumber ? `GST: ${user.gstNumber}` : user?.businessType}</p>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/40'
                      : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-cyan-300' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-400 text-navy-900">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-navy-800 bg-navy-950/60 text-xs">
            <p className="text-slate-400">Need Immediate Assistance?</p>
            <a
              href="https://wa.me/919391843752"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              +91 9391843752 (WhatsApp)
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 mb-16 lg:mb-0 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Mandatory Rule) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {mobileBottomLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 p-1.5 text-center min-w-[56px] ${
                active ? 'text-blue-700 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-blue-700' : 'text-slate-400'}`} />
              <span className="text-[10px] leading-none">{link.name}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
};
