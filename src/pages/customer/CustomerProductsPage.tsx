import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Search, Plus, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomerProductsPage: React.FC = () => {
  const { products, categories, draftRequirement, addToDraftRequirement } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Browse Institutional Catalogue</h1>
          <p className="text-xs text-slate-500">Select items directly to build your supply requirement order.</p>
        </div>

        <Link
          to="/dashboard/requirements/new"
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm w-fit"
        >
          <ShoppingBag className="w-4 h-4" />
          Review Requirement List ({draftRequirement.length})
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(product => {
          const inDraft = draftRequirement.some(i => i.productId === product.id);
          return (
            <div key={product.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-xl bg-slate-100" />
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">{product.category}</span>
                <h3 className="text-xs font-bold text-navy-900 line-clamp-2 leading-tight">{product.name}</h3>
                <p className="text-[11px] text-slate-500">Pack: {product.packSize}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700">{product.priceDisplay}</span>
                <button
                  onClick={() => addToDraftRequirement(product, 1)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    inDraft ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-navy-900 text-white hover:bg-navy-950'
                  }`}
                >
                  {inDraft ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Added
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" /> Add Requirement
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
