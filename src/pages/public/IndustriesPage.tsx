import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Home,
  Store,
  Building,
  UtensilsCrossed,
  GraduationCap,
  Activity,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const IndustriesPage: React.FC = () => {
  const { openQuoteModal } = useData();

  const industries = [
    {
      title: 'Households & Walk-in Customers',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      description: 'Daily home-care essentials, disinfectants, air fresheners, and quality cleaning tools for residential spaces.',
      supplies: ['Floor Cleaner Concentrates', 'Air Freshener Sprays', 'Microfiber Cloths', 'Trash Liners']
    },
    {
      title: 'Retail Shops & Resellers',
      icon: Store,
      image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80',
      description: 'Wholesale distribution packages for general stores, supermarkets, and local sanitation retailers.',
      supplies: ['Packaged Liquid Soaps', 'Broom & Dustpan Sets', 'Boxed Paper Towels', 'Plastic Buckets & Mugs']
    },
    {
      title: 'Offices & Commercial Spaces',
      icon: Building,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      description: 'Corporate washroom hygiene, automatic soap dispensers, C-fold paper towels, and floor squeegees.',
      supplies: ['Automatic Sanitizer Dispensers', 'Jumbo Toilet Rolls', 'Bio Trash Bags', 'Glass Cleaners']
    },
    {
      title: 'Restaurants & Hotels',
      icon: UtensilsCrossed,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: 'Heavy-duty degreasers, room attendant service trolleys, stainless steel scrubbers, and napkin tissues.',
      supplies: ['Kitchen Degreasers', 'Housekeeping Trolleys', 'Scouring Scrubbers', 'Urinal Mats']
    },
    {
      title: 'Schools & Colleges',
      icon: GraduationCap,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      description: 'High-volume floor sanitizers, wet mop wringer carts, dust control brooms, and bulk waste bins.',
      supplies: ['Pine Floor Cleaners', 'Double Bucket Mop Carts', 'Large Trash Bags', 'Safety Floor Signs']
    },
    {
      title: 'Hospitals, Clinics & Facilities',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      description: 'Color-coded bio-hazard bags, medical grade nitrile gloves, enzymatic urinal screens, and disinfectant mops.',
      supplies: ['Color-Coded Bio Bags', 'Nitrile Hygiene Gloves', 'Germicidal Surface Cleaners', 'Microfiber Flat Mops']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-sky-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-sky-100">
          Target Sectors
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight">
          Industries Served Across Tirupati
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Customized product bundles and bulk supply lines engineered for specific commercial & institutional environments.
        </p>
      </div>

      {/* Industry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-navy-900/80 backdrop-blur-md text-cyan-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-blue-700 transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Products</span>
                  <ul className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                    {ind.supplies.map((s, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-1.5 text-[11px] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="truncate">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => openQuoteModal()}
                  className="w-full py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  Request {ind.title.split(' ')[0]} Quote
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
