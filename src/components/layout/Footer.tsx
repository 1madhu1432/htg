import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#062B5C] text-slate-300 border-t border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/sai-hygiene-logo-icon.png"
                alt="SAI HYGIENE Logo"
                className="h-10 w-auto object-contain bg-white/10 p-1.5 rounded-xl border border-white/20"
              />
              <div>
                <h3 className="font-extrabold text-lg text-white tracking-tight">
                  SAI HYGIENE & HOME CARE SOLUTIONS
                </h3>
                <p className="text-xs font-semibold text-[#18C7D9]">PRIVATE LIMITED</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Clean Home • Healthy Living — Tirupati’s premier B2B & retail hygiene partner supplying certified cleaning chemicals, housekeeping equipment, paper disposables, and facility care products.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#18C7D9]">
              <span className="px-2.5 py-1 rounded-md bg-[#041D3F] border border-slate-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#18C7D9]" /> Wholesale
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#041D3F] border border-slate-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#18C7D9]" /> Retail
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#041D3F] border border-slate-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#18C7D9]" /> Bulk Supply
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-[#18C7D9] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#18C7D9]" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#18C7D9] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#18C7D9]" /> About Company
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#18C7D9] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#18C7D9]" /> Product Catalogue
                </Link>
              </li>
              <li>
                <Link to="/b2b" className="hover:text-[#18C7D9] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#18C7D9]" /> B2B Solutions
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-[#18C7D9] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#18C7D9]" /> Industries Served
                </Link>
              </li>
              <li>
                <a href="/#tie-ups" className="hover:text-[#18C7D9] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#18C7D9]" /> Our Tie-Ups
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#18C7D9] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#18C7D9]" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Portal */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Customer Portal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/login" className="hover:text-[#18C7D9]">Customer Login</Link></li>
              <li><Link to="/register" className="hover:text-[#18C7D9]">Create B2B Account</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#18C7D9]">Dashboard Home</Link></li>
              <li><Link to="/dashboard/requirements/new" className="hover:text-[#18C7D9]">New Requirement</Link></li>
              <li><Link to="/dashboard/quotations" className="hover:text-[#18C7D9]">My Quotations</Link></li>
              <li><Link to="/dashboard/orders" className="hover:text-[#18C7D9]">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Corporate Office
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#18C7D9] shrink-0 mt-0.5" />
                <span>Tirupati, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#18C7D9] shrink-0" />
                <a href="tel:+919391843752" className="hover:text-[#18C7D9] font-medium">
                  +91 9391843752
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#18C7D9] shrink-0" />
                <a href="mailto:saihygienesolutions24@gmail.com" className="hover:text-[#18C7D9] break-all">
                  saihygienesolutions24@gmail.com
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800 text-slate-400">
                <span className="block font-semibold text-white">Founder & Proprietor:</span>
                <span>Sai Yadav</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SAI HYGIENE & HOME CARE SOLUTIONS PRIVATE LIMITED. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-[#18C7D9]">Customer Portal</Link>
            <Link to="/admin/login" className="hover:text-[#18C7D9] flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#18C7D9]" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
