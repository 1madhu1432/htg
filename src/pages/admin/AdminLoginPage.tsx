import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Shield, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin } = useAuth();
  const { addToast } = useData();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@saihygiene.com');
  const [password, setPassword] = useState('Admin@123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(email, password);
    addToast('Admin Authenticated', 'Access granted to SAI HYGIENE Administration.');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 max-w-md w-full shadow-2xl space-y-6 text-white">
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Management Access</h1>
          <p className="text-xs text-slate-400">SAI HYGIENE & HOME CARE SOLUTIONS PVT LTD</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Admin Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
          >
            Authenticate Admin Credentials
            <ArrowRight className="w-4 h-4 text-cyan-300" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-300">
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};
