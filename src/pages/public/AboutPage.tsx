import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Eye, Award, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-sky-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-sky-100">
          Corporate Profile
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight">
          SAI HYGIENE & HOME CARE SOLUTIONS PRIVATE LIMITED
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Clean Home • Healthy Living — Wholesale, Retail & Bulk Supply Partner in Tirupati, Andhra Pradesh.
        </p>
      </div>

      {/* Main Corporate Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl font-bold text-navy-900 border-l-4 border-blue-600 pl-4">
            About Our Company
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            SAI HYGIENE & HOME CARE SOLUTIONS PRIVATE LIMITED is a premier distributor and institutional bulk supplier operating out of <strong>Tirupati, Andhra Pradesh</strong>. Under the leadership of Founder & Proprietor <strong>Sai Yadav</strong>, we specialize in providing high-quality cleaning chemicals, housekeeping supplies, home care essentials, and disposable products.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            We cater to a wide spectrum of clients ranging from commercial offices, hotels, restaurants, schools, and hospitals to retail shops, facility management firms, and walk-in retail customers. Our mission is centered around providing high-fidelity products, transparent wholesale rates, and seamless recurring supply schedules.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-200">
            <div>
              <span className="block text-2xl font-black text-blue-700">18+</span>
              <span className="text-xs text-slate-500 font-semibold">Specialized Categories</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-blue-700">100%</span>
              <span className="text-xs text-slate-500 font-semibold">Authentic Sourcing</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-gradient-to-br from-navy-900 to-navy-800 text-white p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <img
              src="/assets/sai-hygiene-logo-icon.png"
              alt="Logo"
              className="w-16 h-16 object-contain bg-white/10 p-2 rounded-2xl border border-white/20"
            />
            <div>
              <h3 className="font-bold text-lg text-white">Sai Yadav</h3>
              <p className="text-xs text-cyan-300 font-semibold">Founder & Proprietor</p>
              <p className="text-xs text-slate-300">Tirupati, Andhra Pradesh</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Headquarters: Tirupati, Andhra Pradesh</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Direct Phone: +91 9391843752</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Email: saihygienesolutions24@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-blue-700 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-navy-900">Our Vision</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To establish SAI HYGIENE & HOME CARE SOLUTIONS PRIVATE LIMITED as the most dependable and comprehensive hygiene product partner across Andhra Pradesh, driving higher standards of cleanliness and health for homes and commercial establishments.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-blue-700 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-navy-900">Our Mission</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To fulfill every client requirement with speed, accuracy, and competitive pricing. We combine robust inventory management with institutional bulk supply workflows, clear quotations, and personalized recurring replenishment services.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Our Strengths</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why Choose Us?</h2>
          <p className="text-xs text-slate-300">Delivering value and trust to every business partner.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            { title: 'Reliable Products', desc: 'Tested, high-efficacy cleaning chemicals and durable janitorial equipment.' },
            { title: 'Competitive Sourcing', desc: 'Direct wholesale rates with volume-based tiered discounts for bulk orders.' },
            { title: 'Timely Doorstep Supply', desc: 'Prompt delivery schedules across Tirupati and surrounding industrial areas.' },
            { title: 'Professional Service', desc: 'Dedicated B2B quotations, transparent tax invoicing, and account managers.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              <h4 className="font-bold text-sm text-white">{item.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
