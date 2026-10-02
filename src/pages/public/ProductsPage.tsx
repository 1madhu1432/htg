import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Search, Filter, ArrowUpDown, Sparkles, Plus, Check } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

export const ProductsPage: React.FC = () => {
  const { category: categorySlugParam } = useParams<{ category?: string }>();
  const { products, categories, addToDraftRequirement, openQuoteModal } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlugParam || 'all');
  const [sortBy, setSortBy] = useState<'name' | 'newest'>('name');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || product.categorySlug === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.id.localeCompare(a.id);
    });
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Complete Catalogue</span>
          <h1 className="text-3xl font-black text-navy-900 mt-1">Hygiene & Home Care Products</h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing {filteredProducts.length} wholesale & institutional supplies for Tirupati businesses.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 w-64 shadow-xs"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs appearance-none pr-8 cursor-pointer"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map(c => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs appearance-none pr-8 cursor-pointer"
            >
              <option value="name">Sort A-Z</option>
              <option value="newest">Recently Added</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Quick Chips */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
            selectedCategory === 'all'
              ? 'bg-navy-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Items
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-4">
          <p className="text-base font-bold text-slate-800">No products match your search or filter.</p>
          <p className="text-xs text-slate-500">Try clearing your search query or choosing another category.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-4 space-y-3">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-navy-900/80 backdrop-blur-md text-cyan-300">
                    {product.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-navy-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Pack: {product.packSize}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {product.priceDisplay}
                  </span>
                  <StatusBadge status={product.availability} size="sm" />
                </div>
              </div>

              {/* Product Actions */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                <Link
                  to={`/products/${product.id}`}
                  className="py-2 px-2.5 bg-white border border-slate-200 text-slate-800 text-center text-[11px] font-bold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToDraftRequirement(product)}
                  className="py-2 px-2.5 bg-blue-700 hover:bg-blue-800 text-white text-center text-[11px] font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Requirement
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
