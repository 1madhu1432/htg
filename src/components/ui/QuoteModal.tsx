import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { quoteModalOpen, selectedQuoteProduct, closeQuoteModal, addToast } = useData();
  const { user } = useAuth();

  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('10');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setBusinessName(user.businessName || '');
      setContactName(user.contactPerson || user.name || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
    }
  }, [user, quoteModalOpen]);

  if (!quoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Quote Request Submitted', `Thank you ${contactName}! We will email & WhatsApp your custom quotation shortly.`);
    setTimeout(() => {
      setSubmitted(false);
      closeQuoteModal();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="gradient-hero text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Request Institutional Quotation</h3>
              <p className="text-xs text-sky-200 mt-0.5">SAI HYGIENE Wholesale & Bulk Supply Division</p>
            </div>
          </div>
          <button
            onClick={closeQuoteModal}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce mb-3" />
              <h4 className="text-xl font-bold text-slate-900">Quote Request Received!</h4>
              <p className="text-sm text-slate-600 mt-2">
                Our sales team in Tirupati is reviewing your request. A formal quotation will be sent to <strong>{email || 'your email'}</strong> within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedQuoteProduct && (
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 flex items-center gap-3">
                  <img
                    src={selectedQuoteProduct.image}
                    alt={selectedQuoteProduct.name}
                    className="w-12 h-12 rounded-lg object-cover bg-white"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-sky-800 uppercase tracking-wide">{selectedQuoteProduct.category}</p>
                    <h5 className="text-sm font-bold text-slate-900 truncate">{selectedQuoteProduct.name}</h5>
                    <p className="text-xs text-slate-600">Pack: {selectedQuoteProduct.packSize}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Enterprise Name *</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Tirupati Hotel / Clinic"
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 9391843752"
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contact@business.com"
                    className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Quantity Needed</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  placeholder="e.g. 50 Litres / 20 Boxes"
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requirements / Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Specify delivery location, recurring frequency or custom packaging needs..."
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-navy-800 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4 text-cyan-300" />
                Submit Bulk Quote Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
