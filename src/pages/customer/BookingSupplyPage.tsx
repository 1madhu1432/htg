import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { CalendarCheck, Send, Plus, Trash2, Truck } from 'lucide-react';

export const BookingSupplyPage: React.FC = () => {
  const { user } = useAuth();
  const { products, createBooking } = useData();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState(user?.deliveryAddress || 'Renigunta Road, Tirupati - 517501');
  const [preferredDate, setPreferredDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 01:00 PM');
  const [orderType, setOrderType] = useState<'One-time Supply' | 'Recurring Supply'>('One-time Supply');
  const [notes, setNotes] = useState('');

  const [selectedItems, setSelectedItems] = useState([
    { productName: 'Heavy-Duty Industrial Floor Cleaner 5L', quantity: 10, packSize: '5L Can' },
    { productName: 'Commercial Black Trash Bags', quantity: 20, packSize: 'Bundle 100s' }
  ]);

  const [newProdName, setNewProdName] = useState('');
  const [newQty, setNewQty] = useState(5);

  const handleAddItem = () => {
    if (!newProdName) return;
    setSelectedItems(prev => [...prev, { productName: newProdName, quantity: newQty, packSize: 'Standard Pack' }]);
    setNewProdName('');
  };

  const handleRemoveItem = (idx: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;

    createBooking({
      customerId: user?.id,
      businessName: user?.businessName,
      phone: user?.phone,
      deliveryAddress,
      preferredDate,
      preferredTime,
      orderType,
      items: selectedItems,
      notes
    });

    navigate('/dashboard/bookings');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-navy-900">Book Your Supply Request</h1>
        <p className="text-xs text-slate-500">Schedule immediate or recurring doorstep logistics for your establishment.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Order Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Order Supply Type *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('One-time Supply')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all ${
                  orderType === 'One-time Supply'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                One-time Supply
              </button>
              <button
                type="button"
                onClick={() => setOrderType('Recurring Supply')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all ${
                  orderType === 'Recurring Supply'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Recurring Supply
              </button>
            </div>
          </div>

          {/* Product Items to Book */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">Products & Quantities to Book *</label>
            
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {selectedItems.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-navy-900 block">{item.productName}</span>
                    <span className="text-[11px] text-slate-500">Pack: {item.packSize}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-blue-700">Qty: {item.quantity}</span>
                    <button type="button" onClick={() => handleRemoveItem(idx)} className="text-rose-500 hover:text-rose-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center pt-2">
              <select
                value={newProdName}
                onChange={e => setNewProdName(e.target.value)}
                className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">-- Add Another Product --</option>
                {products.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={newQty}
                onChange={e => setNewQty(parseInt(e.target.value) || 1)}
                className="w-16 text-xs px-2 py-2 border border-slate-200 rounded-xl font-bold text-center"
              />
              <button
                type="button"
                onClick={handleAddItem}
                className="px-3 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Delivery Preferences */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address *</label>
              <textarea
                rows={2}
                required
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Delivery Date *</label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Window *</label>
                <select
                  value={preferredTime}
                  onChange={e => setPreferredTime(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                >
                  <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                  <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                  <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                  <option value="05:00 PM - 08:00 PM">05:00 PM - 08:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Additional Logistics Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Gate entry instructions, contact person on site..."
                className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Send className="w-4 h-4 text-cyan-300" />
            Submit Supply Booking Request
          </button>
        </form>
      </div>

    </div>
  );
};
