import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ShieldCheck, UserCheck, KeyRound, Sparkles, ArrowRight, Shield } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginCustomer, loginAdmin } = useAuth();
  const { addToast } = useData();
  const navigate = useNavigate();

  const [email, setEmail] = useState('demo@business.com');
  const [password, setPassword] = useState('Demo@123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAdminMode || email.includes('admin')) {
      loginAdmin(email, password);
      addToast('Admin Authenticated', 'Welcome to SAI HYGIENE Admin Management Console.');
      navigate('/admin');
    } else {
      loginCustomer(email, password);
      addToast('Welcome Back', 'Logged in successfully to B2B Customer Portal.');
      navigate('/dashboard');
    }
  };

  const setDemoCustomer = () => {
    setIsAdminMode(false);
    setEmail('demo@business.com');
    setPassword('Demo@123');
  };

  const setDemoAdmin = () => {
    setIsAdminMode(true);
    setEmail('admin@saihygiene.com');
    setPassword('Admin@123');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Branding Panel (Desktop Split-Screen) */}
        <div className="lg:col-span-6 gradient-hero text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/assets/sai-hygiene-logo-icon.png" alt="Logo" className="h-12 w-auto bg-white/10 p-2 rounded-xl border border-white/20" />
              <div>
                <h3 className="font-extrabold text-xl text-white">SAI HYGIENE</h3>
                <p className="text-xs font-semibold text-cyan-300">Clean Home • Healthy Living</p>
              </div>
            </Link>

            <div className="pt-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Institutional B2B Procurement Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Access your custom quotations, active supply orders, delivery tracking, and recurring replenishment schedules.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 space-y-3">
            <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Quick Demo Logins:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={setDemoCustomer}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold border border-white/20 text-white transition-colors flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-300" />
                Demo B2B Customer
              </button>
              <button
                type="button"
                onClick={setDemoAdmin}
                className="px-3 py-2 rounded-xl bg-cyan-400/20 hover:bg-cyan-400/30 text-xs font-bold border border-cyan-400/30 text-cyan-200 transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-300" />
                Demo Admin
              </button>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-navy-900">
                {isAdminMode ? 'Admin Portal Login' : 'B2B Customer Login'}
              </h2>
              <button
                type="button"
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                Switch to {isAdminMode ? 'Customer' : 'Admin'} Mode
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">Enter your registered email or phone credentials.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email / Mobile Number *</label>
              <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="demo@business.com"
                className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-sky-500"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => addToast('Reset Link Sent', 'Password reset instructions sent to your registered email.')}
                className="text-blue-700 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-navy-900 hover:bg-navy-950 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              Sign In to {isAdminMode ? 'Admin Portal' : 'Customer Portal'}
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              New Business Customer?{' '}
              <Link to="/register" className="font-bold text-blue-700 hover:underline">
                Create B2B Account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
