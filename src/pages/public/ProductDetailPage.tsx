import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  ArrowLeft,
  Plus,
  Minus,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Truck,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToDraftRequirement, openQuoteModal } = useData();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500">The product you are looking for does not exist or was removed.</p>
        <Link to="/products" className="inline-block px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-xl">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80'
  ];

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  const whatsappMessage = `Hello SAI HYGIENE Team, I would like to enquire about: ${product.name} (Pack: ${product.packSize}, Qty: ${quantity}). Please share bulk rates.`;
  const whatsappUrl = `https://wa.me/919391843752?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Button */}
      <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-navy-900 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Products Catalogue
      </Link>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            <img
              src={galleryImages[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-blue-600 ring-2 ring-sky-100 scale-105' : 'border-slate-200 opacity-70'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-blue-700 border border-sky-100 uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-900 mt-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">Pack Size: {product.packSize}</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Standard Pricing</span>
              <p className="text-xl font-black text-emerald-700">{product.priceDisplay}</p>
            </div>
            <StatusBadge status={product.availability} size="lg" />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Specifications */}
          {product.specifications && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Product Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-semibold">{key}</span>
                    <span className="font-bold text-slate-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">Select Quantity / Packs</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-slate-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-slate-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-slate-500 font-medium">Available for immediate bulk dispatch</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4">
            <button
              onClick={() => addToDraftRequirement(product, quantity)}
              className="w-full py-3.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <PackageCheck className="w-4 h-4" />
              Add {quantity} to My Requirement List
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => openQuoteModal(product)}
                className="py-3 px-4 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                Request Custom Quote
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                WhatsApp Enquiry
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-around text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-sky-600" /> Authentic Quality</span>
            <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-sky-600" /> Fast Tirupati Delivery</span>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <h3 className="text-xl font-extrabold text-navy-900">Related Category Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <div key={rel.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <img src={rel.image} alt={rel.name} className="w-full h-36 object-cover rounded-xl" />
                <h4 className="text-xs font-bold text-navy-900 line-clamp-1">{rel.name}</h4>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700">{rel.priceDisplay}</span>
                  <Link to={`/products/${rel.id}`} className="text-blue-700 font-bold hover:underline">View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
