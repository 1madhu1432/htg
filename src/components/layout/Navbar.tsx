import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Menu, X, ShoppingBag, User, Shield, PhoneCall, ChevronRight, Sparkles, Handshake } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { draftRequirement, openQuoteModal } = useData();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'B2B Solutions', path: '/b2b' },
    { name: 'Industries', path: '/industries' },
    { name: 'Our Tie-Ups', path: '/#tie-ups', isAnchor: true },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isAnchor) {
      if (location.pathname !== '/') {
        navigate('/#tie-ups');
        setTimeout(() => {
          const el = document.getElementById('tie-ups');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('tie-ups');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && !path.includes('#') && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Corporate Contact Bar */}
      <div className="bg-[#062B5C] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#18C7D9] animate-pulse"></span>
              SAI HYGIENE & HOME CARE SOLUTIONS PRIVATE LIMITED
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">Tirupati, Andhra Pradesh</span>
          </div>

          <div className="flex items-center gap-5">
            <a href="tel:+919391843752" className="flex items-center gap-1.5 hover:text-[#18C7D9] transition-colors font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-[#18C7D9]" />
              +91 9391843752
            </a>
            <span className="text-slate-700">|</span>
            {isAdmin ? (
              <Link to="/admin" className="text-[#18C7D9] hover:text-cyan-300 font-semibold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Admin Portal
              </Link>
            ) : (
              <Link to="/admin/login" className="hover:text-slate-200 font-medium">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/assets/sai-hygiene-logo-icon.png"
            alt="SAI HYGIENE Logo"
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl text-[#062B5C] tracking-tight leading-tight group-hover:text-[#0B63CE] transition-colors">
              SAI HYGIENE
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#0B63CE] uppercase tracking-wider">
              Clean Home • Healthy Living
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-[#102A43] hover:text-[#0B63CE] hover:bg-slate-50 transition-all duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-[#0B63CE] bg-sky-50 font-bold'
                    : 'text-[#102A43] hover:text-[#0B63CE] hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated && (
            <Link
              to="/dashboard/requirements/new"
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-[#062B5C] hover:text-[#0B63CE] transition-colors"
              title="View Draft Requirements"
            >
              <ShoppingBag className="w-5 h-5" />
              {draftRequirement.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#18C7D9] text-[#062B5C] text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {draftRequirement.length}
                </span>
              )}
            </Link>
          )}

          {isAuthenticated ? (
            <Link
              to={isAdmin ? '/admin' : '/dashboard'}
              className="px-4 py-2.5 rounded-xl bg-[#062B5C] text-white hover:bg-navy-800 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <User className="w-4 h-4 text-[#18C7D9]" />
              {isAdmin ? 'Admin Dashboard' : 'Customer Portal'}
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-xl border-2 border-[#062B5C] text-[#062B5C] hover:bg-[#062B5C] hover:text-white text-xs font-bold transition-all"
            >
              B2B Login
            </Link>
          )}

          <button
            onClick={() => openQuoteModal()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B63CE] to-[#18C7D9] hover:from-[#062B5C] hover:to-[#0B63CE] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-cyan-100" />
            Get a Quote
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); handleNavClick(link); }}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-[#102A43] hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
                    isActive(link.path)
                      ? 'text-[#0B63CE] bg-sky-50 font-bold'
                      : 'text-[#102A43] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              )
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <Link
                to={isAdmin ? '/admin' : '/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 bg-[#062B5C] text-white font-bold text-center rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#18C7D9]" />
                Go to Portal
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 border border-[#062B5C] text-[#062B5C] text-center font-bold rounded-xl text-xs"
                >
                  Customer Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 bg-[#062B5C] text-white text-center font-bold rounded-xl text-xs"
                >
                  Register Account
                </Link>
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#0B63CE] to-[#18C7D9] text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-100" />
              Request Bulk Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
