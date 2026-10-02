import React from 'react';
import { useData } from '../../context/DataContext';
import { FolderTree } from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const { categories } = useData();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white">Product Categories Management</h1>
        <p className="text-xs text-slate-400">All 18 product categories defined in the company catalogue.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
            <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-xl object-cover bg-slate-900" />
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">{cat.name}</h4>
              <span className="text-[10px] text-cyan-400 font-semibold">{cat.itemCount} Items</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
