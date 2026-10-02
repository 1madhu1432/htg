import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Plus, Send, CheckCircle2, PackageCheck, Search } from 'lucide-react';

export const RequirementBuilderPage: React.FC = () => {
  const { user } = useAuth();
  const {
    products,
    draftRequirement,
    removeFromDraftRequirement,
    updateDraftQuantity,
    submitRequirement,
    addToDraftRequirement
  } = useData();

  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customQty, setCustomQty] = useState(10);

  const handleAddSelectProduct = () => {
    if (!selectedProductId) return;
    const prod = products.find(p => p.id === selectedProductId);
    if (prod) {
      addToDraftRequirement(prod, customQty);
      setSelectedProductId('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (draftRequirement.length === 0) return;

    submitRequirement(user || {}, notes);
    navigate('/dashboard/requirements');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-navy-900">Create New Product Requirement</h1>
        <p className="text-xs text-slate-500">
          Build a multi-item list of hygiene and home care supplies for quotation review.
        </p>
      </div>

      {/* Add Products Quick Selector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Quick Add Product to List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-7">
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            >
              <option value="">-- Choose Product from Catalogue --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.packSize})</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <input
              type="number"
              min="1"
              value={customQty}
              onChange={e => setCustomQty(parseInt(e.target.value) || 1)}
              placeholder="Qty"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleAddSelectProduct}
              className="w-full py-2.5 px-3 bg-navy-900 hover:bg-navy-950 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Selected Items Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-sm font-extrabold text-navy-900 uppercase tracking-wider">
          Current Requirement Items ({draftRequirement.length})
        </h2>

        {draftRequirement.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <PackageCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Your requirement list is empty.</p>
            <p className="text-xs text-slate-500">Select items from the quick adder above or browse the product catalogue.</p>
            <Link
              to="/dashboard/products"
              className="inline-block px-4 py-2 bg-blue-700 text-white font-bold rounded-xl text-xs"
            >
              Browse Products Catalogue
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {draftRequirement.map(item => (
                <div key={item.productId} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">{item.category}</span>
                    <h4 className="text-xs font-bold text-navy-900">{item.productName}</h4>
                    <p className="text-[11px] text-slate-500">Pack Unit: {item.packSize}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600">Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => updateDraftQuantity(item.productId, parseInt(e.target.value) || 1)}
                        className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromDraftRequirement(item.productId)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes / Delivery Instructions</label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Mention specific delivery gate instructions, special packaging, or target supply date..."
                className="w-full text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Send className="w-4 h-4 text-cyan-200" />
              Submit Requirement for Quotation
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
