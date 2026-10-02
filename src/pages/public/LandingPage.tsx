import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Building2,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
  Home,
  HeartHandshake,
  Scroll,
  ChevronRight,
  PhoneCall,
  Handshake,
  Building,
  Briefcase
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { categories, products, openQuoteModal, addToDraftRequirement } = useData();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);

  const serviceCards = [
    {
      title: 'CLEANING',
      subtitle: 'Cleaning Chemicals & Solutions',
      description: 'Industrial floor cleaners, disinfectant concentrates, glass surface cleaners, and heavy degreasers.',
      icon: FlaskConical,
      slug: 'cleaning-chemicals',
      gradient: 'from-[#0B63CE] to-[#18C7D9]'
    },
    {
      title: 'HOUSEKEEPING',
      subtitle: 'Professional Supplies & Tools',
      description: 'Room attendant trolleys, janitorial mop wringers, microfiber mops, floor wipers, and scrubbers.',
      icon: Home,
      slug: 'housekeeping-supplies',
      gradient: 'from-[#062B5C] to-[#0B63CE]'
    },
    {
      title: 'HOME CARE',
      subtitle: 'Home-Care Essentials',
      description: 'Liquid hand washes, aerosol air fresheners, urinal screen mats, and surface sanitizer sprays.',
      icon: HeartHandshake,
      slug: 'air-fresheners',
      gradient: 'from-[#18C7D9] to-[#0B63CE]'
    },
    {
      title: 'DISPOSABLES',
      subtitle: 'Consumable Paper & Bags',
      description: 'Virgin paper C-fold towels, jumbo toilet rolls, bio-hazard waste bags, and nitrile safety gloves.',
      icon: Scroll,
      slug: 'tissue-products',
      gradient: 'from-[#0B63CE] to-[#062B5C]'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden gradient-hero text-white pt-12 pb-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#18C7D9_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 text-[#18C7D9] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#18C7D9]" />
              HYGIENE • HOUSEKEEPING • HOME CARE
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Your Complete Hygiene & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#18C7D9] to-sky-200">Home-Care Partner</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Reliable cleaning, housekeeping, home-care and disposable supplies for businesses, institutions and bulk buyers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/products"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#18C7D9] to-[#0B63CE] hover:from-cyan-300 hover:to-blue-600 text-[#062B5C] font-extrabold rounded-xl shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => openQuoteModal()}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 text-base"
              >
                <Sparkles className="w-5 h-5 text-[#18C7D9]" />
                Request Bulk Quote
              </button>
            </div>

            {/* Trust Line */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-bold uppercase tracking-wider">
              <span>Wholesale</span>
              <span>•</span>
              <span>Retail</span>
              <span>•</span>
              <span>Bulk Supply</span>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 p-4 sm:p-6 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-[#062B5C] aspect-4/3">
                <img
                  src="/assets/sai-hygiene-logo-full.png"
                  alt="SAI HYGIENE & HOME CARE SOLUTIONS Logo"
                  className="w-full h-full object-contain p-6 bg-[#041D3F]"
                />
              </div>

              <div className="bg-[#041D3F]/90 p-4 rounded-xl border border-white/10 text-xs text-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>SAI HYGIENE & HOME CARE SOLUTIONS</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-[#18C7D9] text-[10px]">PVT LTD</span>
                </div>
                <p className="text-slate-300">Clean Home • Healthy Living</p>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                  <span>Tirupati, Andhra Pradesh</span>
                  <span className="text-[#18C7D9] font-semibold">+91 9391843752</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-sky-50 text-[#0B63CE]"><Building2 className="w-5 h-5" /></div>
            <div className="text-left"><h4 className="text-xs font-bold text-[#102A43]">Wholesale Supply</h4><p className="text-[11px] text-slate-500">Tiered bulk rates</p></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-sky-50 text-[#0B63CE]"><Truck className="w-5 h-5" /></div>
            <div className="text-left"><h4 className="text-xs font-bold text-[#102A43]">Bulk Orders</h4><p className="text-[11px] text-slate-500">Tirupati dispatch</p></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-sky-50 text-[#0B63CE]"><ShieldCheck className="w-5 h-5" /></div>
            <div className="text-left"><h4 className="text-xs font-bold text-[#102A43]">B2B Procurement</h4><p className="text-[11px] text-slate-500">Itemized quotes</p></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-sky-50 text-[#0B63CE]"><Handshake className="w-5 h-5" /></div>
            <div className="text-left"><h4 className="text-xs font-bold text-[#102A43]">Recurring Supply</h4><p className="text-[11px] text-slate-500">Scheduled orders</p></div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#0B63CE] uppercase tracking-widest">Four Core Pillars</span>
          <h2 className="text-3xl font-black text-[#062B5C]">Everything You Need for a Cleaner Environment</h2>
          <p className="text-sm text-slate-600">From everyday hygiene essentials to professional housekeeping supplies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-bold text-[#0B63CE] uppercase tracking-wider">{card.title}</span>
                  <h3 className="text-lg font-bold text-[#062B5C] mt-0.5 mb-2">{card.subtitle}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{card.description}</p>
                </div>

                <Link
                  to={`/products/${card.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B63CE] hover:text-[#062B5C] group-hover:translate-x-1 transition-all"
                >
                  View Products
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT COMPANY SECTION */}
      <section className="bg-slate-100/80 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-[#062B5C] p-8 text-white space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/sai-hygiene-logo-icon.png"
                  alt="Logo"
                  className="w-16 h-16 object-contain bg-white/10 p-2 rounded-2xl border border-white/20"
                />
                <div>
                  <h3 className="font-black text-xl text-white">Sai Yadav</h3>
                  <p className="text-xs font-semibold text-[#18C7D9]">Director / Founder & Proprietor</p>
                  <p className="text-xs text-slate-300">Tirupati, Andhra Pradesh</p>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                SAI HYGIENE & HOME CARE SOLUTIONS PRIVATE LIMITED is dedicated to providing high-performance cleaning chemicals, housekeeping supplies, home-care essentials, and disposable products for residential, commercial and institutional customers.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <h5 className="font-bold text-xs text-[#18C7D9]">Reliable Products</h5>
                  <p className="text-[10px] text-slate-300 mt-0.5">High Efficacy</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <h5 className="font-bold text-xs text-[#18C7D9]">Responsive Service</h5>
                  <p className="text-[10px] text-slate-300 mt-0.5">Fast Quotes</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <h5 className="font-bold text-xs text-[#18C7D9]">Organized Supply</h5>
                  <p className="text-[10px] text-slate-300 mt-0.5">Tirupati Fleet</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-extrabold text-[#0B63CE] uppercase tracking-widest">Company Overview</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#062B5C] leading-tight">
              Built Around Reliable Hygiene Supply
            </h2>

            <p className="text-sm text-slate-700 leading-relaxed">
              SAI HYGIENE & HOME CARE SOLUTIONS supplies cleaning chemicals, housekeeping products, home-care essentials and disposable products for residential, commercial and institutional customers.
            </p>

            <p className="text-sm text-slate-700 leading-relaxed">
              Based out of <strong>Tirupati, Andhra Pradesh</strong>, our business focus spans wholesale distribution, retail supply, and customized institutional supply contracts for hotels, hospitals, offices, and schools.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#062B5C] hover:bg-navy-800 text-white font-bold rounded-xl text-xs shadow-md transition-all"
              >
                About Our Company
                <ArrowRight className="w-4 h-4 text-[#18C7D9]" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* PRODUCT CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#0B63CE] uppercase tracking-widest">Our Catalogue</span>
          <h2 className="text-3xl font-black text-[#062B5C]">Our Product Categories</h2>
          <p className="text-sm text-slate-600">Practical hygiene and housekeeping solutions for everyday and professional requirements.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products/${cat.slug}`}
              className="group bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden mb-3 bg-slate-100 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="text-xs font-bold text-[#062B5C] leading-tight group-hover:text-[#0B63CE] transition-colors line-clamp-2">
                {cat.name}
              </h4>
              <span className="text-[10px] text-slate-400 mt-1 font-semibold">{cat.itemCount}+ Items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-[#0B63CE] uppercase tracking-widest">Featured Products</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#062B5C]">High-Performance Supplies</h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-[#0B63CE] hover:underline">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-5 space-y-3">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#062B5C]/90 backdrop-blur-md text-[#18C7D9]">
                    {prod.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#062B5C] group-hover:text-[#0B63CE] transition-colors line-clamp-2">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Pack: {prod.packSize}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {prod.priceDisplay}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                <Link
                  to={`/products/${prod.id}`}
                  className="py-2 px-3 bg-white border border-slate-200 text-[#102A43] text-center text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
                >
                  View Product
                </Link>
                <button
                  onClick={() => addToDraftRequirement(prod)}
                  className="py-2 px-3 bg-[#0B63CE] hover:bg-blue-700 text-white text-center text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Add Requirement
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* B2B SOLUTIONS PROCESS */}
      <section className="bg-[#062B5C] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#18C7D9] uppercase tracking-widest">B2B Procurement Workflow</span>
            <h2 className="text-3xl font-black text-white">Built for Business. Designed for Recurring Supply.</h2>
            <p className="text-xs text-slate-300">Simple, structured, transparent procurement process for institutional clients.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Requirement', desc: 'Customer submits itemized product and quantity requirement.' },
              { num: '02', title: 'Quotation', desc: 'Clear itemized quotation issued with GST taxes and volume rates.' },
              { num: '03', title: 'Purchase Order', desc: 'Customer approves quotation via online confirmation or PO.' },
              { num: '04', title: 'Supply', desc: 'Products are packed and delivered via local Tirupati dispatch.' },
              { num: '05', title: 'Invoice & Payment', desc: 'Tax invoice is issued with tracked payment credit terms.' },
            ].map((step, index) => (
              <div key={index} className="bg-[#041D3F] p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-[#18C7D9]/50 transition-all">
                <span className="text-3xl font-black text-[#18C7D9] opacity-70">{step.num}</span>
                <h4 className="text-xs font-black text-white tracking-wider uppercase">{step.title}</h4>
                <p className="text-[11px] text-slate-300 leading-snug">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-[#18C7D9] hover:bg-cyan-300 text-[#062B5C] font-black rounded-xl text-xs transition-all shadow-md"
            >
              Start B2B Account
            </Link>
            <button
              onClick={() => openQuoteModal()}
              className="px-6 py-3 border border-white/30 hover:border-white text-white font-bold rounded-xl text-xs transition-all"
            >
              Request Bulk Quote
            </button>
          </div>
        </div>
      </section>

      {/* MANDATORY CLIENT TIE-UPS SECTION */}
      <section id="tie-ups" className="bg-[#041D3F] text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#18C7D9] uppercase tracking-widest">OUR CLIENTS</span>
            <h2 className="text-3xl font-black text-white">Trusted Client Partnerships</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Building dependable supply relationships with businesses and organizations. Reliable supply is built through consistent service, product availability and long-term business relationships.
            </p>
          </div>

          {/* Client Partnership Visual Composition */}
          <div className="relative max-w-4xl mx-auto">
            
            {/* Subtle connecting partnership line background */}
            <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-transparent via-[#18C7D9]/40 to-transparent -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              {/* Client Card 1 */}
              <div className="bg-[#062B5C] p-8 rounded-3xl border border-cyan-500/30 shadow-2xl hover:border-[#18C7D9] transition-all duration-300 space-y-4 group">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#18C7D9]/20 text-[#18C7D9] border border-[#18C7D9]/40 uppercase tracking-wider flex items-center gap-1">
                    <Handshake className="w-3.5 h-3.5" /> Client Partnership
                  </span>
                  <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-[#18C7D9] transition-colors" />
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="text-xl font-black text-white group-hover:text-[#18C7D9] transition-colors">
                    Excelrace Solutions
                  </h3>
                  <p className="text-xs font-bold text-cyan-200 tracking-wider uppercase">PRIVATE LIMITED</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                  Established institutional tie-up for recurring commercial hygiene, housekeeping consumables, and facility maintenance supplies.
                </p>
              </div>

              {/* Client Card 2 */}
              <div className="bg-[#062B5C] p-8 rounded-3xl border border-cyan-500/30 shadow-2xl hover:border-[#18C7D9] transition-all duration-300 space-y-4 group">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#18C7D9]/20 text-[#18C7D9] border border-[#18C7D9]/40 uppercase tracking-wider flex items-center gap-1">
                    <Handshake className="w-3.5 h-3.5" /> Client Partnership
                  </span>
                  <Building className="w-5 h-5 text-slate-400 group-hover:text-[#18C7D9] transition-colors" />
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="text-xl font-black text-white group-hover:text-[#18C7D9] transition-colors">
                    SJ BUILDING MATERIALS
                  </h3>
                  <p className="text-xs font-bold text-cyan-200 tracking-wider uppercase">Commercial Client Partner</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                  Long-term supply partnership providing high-grade floor cleaners, industrial cleaning chemicals, and heavy-duty janitorial supplies.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* QUOTE CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#062B5C] to-[#0B63CE] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black">Looking for a Reliable Hygiene Supply Partner?</h2>
          <p className="text-sm text-sky-100 max-w-xl mx-auto leading-relaxed">
            Share your product requirements and our team can prepare a suitable quotation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#18C7D9] text-[#062B5C] hover:bg-cyan-300 font-extrabold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#062B5C]" />
              Request a Quote
            </button>
            <a
              href="https://wa.me/919391843752?text=Hello%20Sai%20Yadav%20team,%20I%20would%20like%20to%20talk%20about%20supply."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              Talk on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
