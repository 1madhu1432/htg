import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  FileText,
  Truck,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ClipboardList,
  DollarSign,
  Repeat
} from 'lucide-react';

export const B2BSolutionsPage: React.FC = () => {
  const { openQuoteModal } = useData();

  const b2bWorkflow = [
    {
      step: '01',
      title: 'REQUIREMENT',
      subtitle: 'Customer Requirement Submission',
      desc: 'Customer shares detailed product and quantity requirements through our portal or direct sales desk.',
      icon: ClipboardList,
      details: ['Multi-item requirement builder', 'Custom volume specifications', 'Recurring frequency tags']
    },
    {
      step: '02',
      title: 'QUOTATION',
      subtitle: 'Transparent Pricing & Taxes',
      desc: 'Our team generates a clear quotation with itemized rates, applicable GST taxes, and bulk discounts.',
      icon: FileText,
      details: ['GST-compliant quotes', 'Volume discount rates', '14-day price lock guarantee']
    },
    {
      step: '03',
      title: 'PURCHASE ORDER',
      subtitle: 'Order Confirmation',
      desc: 'Customer approves the quotation through Purchase Order (PO) or online portal confirmation.',
      icon: CheckCircle2,
      details: ['Digital PO acceptance', 'Automated stock reservation', 'Custom delivery scheduling']
    },
    {
      step: '04',
      title: 'SUPPLY',
      subtitle: 'Fulfillment & Doorstep Logistics',
      desc: 'Products are packed securely and dispatched via our dedicated local Tirupati transport fleet.',
      icon: Truck,
      details: ['Batch quality check', 'Tamper-proof packaging', 'Live dispatch notifications']
    },
    {
      step: '05',
      title: 'INVOICE & PAYMENT',
      subtitle: 'Billing & Credit Terms',
      desc: 'Tax invoice is issued alongside delivery with transparent tracking as per agreed credit terms.',
      icon: DollarSign,
      details: ['Digital invoice PDF', 'Agreed payment terms', 'Account statement history']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-sky-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-sky-100">
          Institutional Supply Chain
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight">
          Reliable Supply for Your Business
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Structured procurement solutions tailored for hotels, hospitals, corporate parks, retail stores, and facility management firms across Tirupati.
        </p>
      </div>

      {/* B2B Workflow Timeline */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-navy-900">5-Step Structured B2B Workflow</h2>
          <p className="text-xs text-slate-500 mt-1">End-to-end transparency from initial requirement to doorstep delivery.</p>
        </div>

        <div className="space-y-6">
          {b2bWorkflow.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group"
              >
                <div className="lg:col-span-2 flex items-center gap-4">
                  <span className="text-4xl font-black text-blue-600 group-hover:scale-110 transition-transform">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-1">
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">{item.title}</span>
                  <h3 className="text-lg font-bold text-navy-900">{item.subtitle}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="lg:col-span-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Features</span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {item.details.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corporate Perks */}
      <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 text-cyan-400 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">Dedicated Account Manager</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Single point of contact for custom quotes, billing inquiries, and scheduled recurring restocking.
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 text-cyan-400 flex items-center justify-center">
            <Repeat className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">Automated Recurring Supply</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Never run out of essential cleaning chemicals or tissue products with weekly or monthly automated supply.
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 text-cyan-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">GST Invoicing & Credit Terms</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            100% tax compliant invoices with customizable credit cycles for verified business accounts.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-700 to-sky-600 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-black">Ready to Streamline Your Hygiene Procurement?</h2>
        <p className="text-sm text-sky-100 max-w-xl mx-auto">
          Create your verified B2B customer account now or request a custom institutional quote.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-navy-900 hover:bg-navy-950 text-white font-bold rounded-xl text-sm transition-all shadow-md"
          >
            Create B2B Account
          </Link>
          <button
            onClick={() => openQuoteModal()}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-900 hover:bg-slate-100 font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-blue-700" />
            Request Bulk Quote
          </button>
        </div>
      </div>

    </div>
  );
};
