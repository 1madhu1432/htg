import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Package, Plus, Search, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [name, setName] = useState('');
  const [catSlug, setCatSlug] = useState('cleaning-chemicals');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80');
  const [packSize, setPackSize] = useState('5 Litres Can');
  const [availability, setAvailability] = useState<'In Stock' | 'Bulk Order Available' | 'Out of Stock'>('In Stock');

  const filtered = products.filter(p => {
    const mSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const mCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    return mSearch && mCat;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find(c => c.slug === catSlug);
    addProduct({
      name,
      category: cat?.name || 'Cleaning Chemicals',
      categorySlug: catSlug,
      description: desc,
      image,
      packSize,
      availability,
      priceDisplay: 'Price on Request'
    });

    setShowAddModal(false);
    setName('');
    setDesc('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Product Inventory Catalog</h1>
          <p className="text-xs text-slate-400">Manage items, stock statuses, pack sizes, and images.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search catalog items..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-4">Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Pack Size</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                    <span className="line-clamp-1">{p.name}</span>
                  </td>
                  <td className="p-4 text-slate-400">{p.category}</td>
                  <td className="p-4 text-slate-300 font-medium">{p.packSize}</td>
                  <td className="p-4">
                    <StatusBadge status={p.availability} size="sm" />
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-1.5 text-rose-400 hover:bg-rose-950/60 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 shadow-2xl">
            <h3 className="text-lg font-black">Add New Inventory Product</h3>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Pine Floor Concentrate"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Category *</label>
                <select
                  value={catSlug}
                  onChange={e => setCatSlug(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Pack Size *</label>
                  <input
                    type="text"
                    required
                    value={packSize}
                    onChange={e => setPackSize(e.target.value)}
                    placeholder="5 Litres Can"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Availability *</label>
                  <select
                    value={availability}
                    onChange={e => setAvailability(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Bulk Order Available">Bulk Order Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-blue-600 font-bold rounded-xl text-white">Save Product</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2.5 bg-slate-800 font-bold rounded-xl text-slate-300">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
