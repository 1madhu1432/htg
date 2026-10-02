import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { MOCK_CUSTOMERS } from '../../data/mockCustomers';
import { QuotationItem } from '../../types';
import { FileText, Plus, Trash2, Send, Calculator } from 'lucide-react';

export const AdminQuotationBuilderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reqId = searchParams.get('reqId');
  const navigate = useNavigate();

  const { products, requirements, createQuotation, addToast } = useData();

  const linkedReq = requirements.find(r => r.id === reqId);

  const [selectedCustomerId, setSelectedCustomerId] = useState(linkedReq?.customerId || 'cust-101');
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [discount, setDiscount] = useState(1000);
  const [notes, setNotes] = useState('Bulk institutional rate applied. Doorstep supply included.');

  const [quoteItems, setQuoteItems] = useState<QuotationItem[]>(() => {
    if (linkedReq) {
      return linkedReq.items.map(it => {
        const p = products.find(prod => prod.id === it.productId);
        const unitPrice = p?.price || 480;
        return {
          productId: it.productId,
          productName: it.productName,
          packSize: it.packSize,
          quantity: it.quantity,
          unitPrice,
          amount: unitPrice * it.quantity
        };
      });
    }
    return [
      {
        productId: 'prod-1',
        productName: 'Heavy-Duty Industrial Floor Cleaner 5L',
        packSize: '5 Litres Can',
        quantity: 15,
        unitPrice: 480,
        amount: 7200
      }
    ];
  });

  const [selectProdId, setSelectProdId] = useState('');
  const [selectQty, setSelectQty] = useState(10);
  const [selectRate, setSelectRate] = useState(450);

  const activeCustomer = MOCK_CUSTOMERS.find(c => c.id === selectedCustomerId) || MOCK_CUSTOMERS[0];

  const subtotal = quoteItems.reduce((acc, item) => acc + item.amount, 0);
  const taxAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + taxAmount + Number(deliveryCharge) - Number(discount);

  const handleAddItem = () => {
    if (!selectProdId) return;
    const p = products.find(prod => prod.id === selectProdId);
    if (p) {
      setQuoteItems(prev => [
        ...prev,
        {
          productId: p.id,
          productName: p.name,
          packSize: p.packSize,
          quantity: selectQty,
          unitPrice: selectRate,
          amount: selectQty * selectRate
        }
      ]);
      setSelectProdId('');
    }
  };

  const handleRemoveItem = (idx: number) => {
    setQuoteItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateItem = (idx: number, field: 'quantity' | 'unitPrice', value: number) => {
    setQuoteItems(prev => prev.map((item, i) => {
      if (i === idx) {
        const qty = field === 'quantity' ? value : item.quantity;
        const rate = field === 'unitPrice' ? value : item.unitPrice;
        return {
          ...item,
          quantity: qty,
          unitPrice: rate,
          amount: qty * rate
        };
      }
      return item;
    }));
  };

  const handleSendQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteItems.length === 0) return;

    createQuotation({
      requirementId: reqId || undefined,
      customerId: activeCustomer.id,
      customerName: activeCustomer.contactPerson || activeCustomer.name,
      businessName: activeCustomer.businessName,
      gstNumber: activeCustomer.gstNumber,
      email: activeCustomer.email,
      phone: activeCustomer.phone,
      items: quoteItems,
      subtotal,
      taxAmount,
      deliveryCharge: Number(deliveryCharge),
      discount: Number(discount),
      grandTotal,
      notes
    });

    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black">Interactive B2B Quotation Builder</h1>
        <p className="text-xs text-slate-400">Generate tax-compliant pricing quotes for business accounts.</p>
      </div>

      <form onSubmit={handleSendQuotation} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        {/* Customer Select */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300">Select Target Business Customer *</label>
          <select
            value={selectedCustomerId}
            onChange={e => setSelectedCustomerId(e.target.value)}
            className="w-full text-xs p-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold"
          >
            {MOCK_CUSTOMERS.map(c => (
              <option key={c.id} value={c.id}>{c.businessName} ({c.contactPerson}) - {c.city}</option>
            ))}
          </select>
        </div>

        {/* Add Product Row */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase">Add Product Line Item</span>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs">
            <div className="sm:col-span-6">
              <select
                value={selectProdId}
                onChange={e => {
                  setSelectProdId(e.target.value);
                  const p = products.find(prod => prod.id === e.target.value);
                  if (p?.price) setSelectRate(p.price);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                <option value="">-- Choose Product --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <input
                type="number"
                min="1"
                value={selectQty}
                onChange={e => setSelectQty(parseInt(e.target.value) || 1)}
                placeholder="Qty"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-center font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <input
                type="number"
                value={selectRate}
                onChange={e => setSelectRate(parseFloat(e.target.value) || 0)}
                placeholder="Rate ₹"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-center font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={handleAddItem}
                className="w-full p-2.5 bg-blue-600 font-bold rounded-xl text-white text-xs"
              >
                Add Line
              </button>
            </div>
          </div>
        </div>

        {/* Line Items List */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300">Quotation Line Items ({quoteItems.length})</span>
          <div className="divide-y divide-slate-900 border border-slate-800 rounded-2xl overflow-hidden bg-slate-900">
            {quoteItems.map((item, idx) => (
              <div key={idx} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">{item.productName}</span>
                  <span className="text-[11px] text-slate-400">Pack: {item.packSize}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 text-[10px]">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => handleUpdateItem(idx, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-14 p-1 rounded bg-slate-950 border border-slate-800 text-center font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 text-[10px]">Rate ₹:</span>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={e => handleUpdateItem(idx, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-20 p-1 rounded bg-slate-950 border border-slate-800 text-center font-bold text-cyan-400"
                    />
                  </div>

                  <span className="font-bold text-white w-20 text-right">₹{item.amount.toLocaleString()}</span>

                  <button type="button" onClick={() => handleRemoveItem(idx)} className="text-rose-400 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adjustments & Calculation Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs">
          <div className="space-y-3">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Special Discount (₹)</label>
              <input
                type="number"
                value={discount}
                onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Delivery Charge (₹)</label>
              <input
                type="number"
                value={deliveryCharge}
                onChange={e => setDeliveryCharge(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
              />
            </div>
          </div>

          <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 font-medium">
            <div className="flex justify-between text-slate-400">
              <span>Items Subtotal:</span>
              <span className="text-white font-bold">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>GST Tax (18%):</span>
              <span className="text-white font-bold">₹{taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Discount Applied:</span>
              <span className="font-bold">-₹{discount.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-black text-cyan-400">
              <span>Grand Total:</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Quotation Notes / Terms</label>
          <textarea
            rows={2}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full text-xs p-3 rounded-xl bg-slate-900 border border-slate-800 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Send className="w-4 h-4" /> Send Quotation to Customer Portal
        </button>
      </form>

    </div>
  );
};
