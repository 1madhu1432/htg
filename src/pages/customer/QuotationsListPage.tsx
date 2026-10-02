import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { FileText, CheckCircle2, RefreshCw, Printer, Download, Sparkles } from 'lucide-react';

export const QuotationsListPage: React.FC = () => {
  const { quotations, acceptQuotation, requestQuotationRevision, addToast } = useData();
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(quotations[0]?.id || '');
  const [revisionNote, setRevisionNote] = useState('');
  const [showRevisionInput, setShowRevisionInput] = useState(false);

  const selectedQuote = quotations.find(q => q.id === selectedQuoteId) || quotations[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Quotations</h1>
          <p className="text-xs text-slate-500">Review formal B2B rates, tax breakdowns, and accept offers.</p>
        </div>
      </div>

      {quotations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Quotations Issued Yet</h3>
          <p className="text-xs text-slate-500">Submit a requirement list to receive a formal quotation from Sai Yadav.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Quotations List */}
          <div className="lg:col-span-4 space-y-3">
            {quotations.map(q => {
              const isSelected = selectedQuote?.id === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => { setSelectedQuoteId(q.id); setShowRevisionInput(false); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-blue-600 ring-2 ring-sky-100 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-navy-900">{q.id}</span>
                    <StatusBadge status={q.status} size="sm" />
                  </div>

                  <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
                    <span>Valid Until: {q.validUntil}</span>
                    <span className="font-bold text-navy-900">₹{q.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Quotation Detail / Invoice View */}
          {selectedQuote && (
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              
              {/* Top Banner Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 no-print">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Quotation Status:</span>
                  <StatusBadge status={selectedQuote.status} size="md" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Invoice
                  </button>
                </div>
              </div>

              {/* Printable Invoice Header */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <img src="/assets/sai-hygiene-logo-icon.png" alt="Logo" className="h-8 w-auto" />
                      <span className="font-black text-lg text-navy-900">SAI HYGIENE & HOME CARE SOLUTIONS</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Clean Home • Healthy Living • Wholesale & Bulk Supply</p>
                    <p className="text-xs text-slate-500">Tirupati, Andhra Pradesh | Contact: +91 9391843752</p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">Official Quotation</span>
                    <span className="text-xl font-black text-navy-900 block">{selectedQuote.id}</span>
                    <span className="text-xs text-slate-500 block">Date: {selectedQuote.date}</span>
                    <span className="text-xs text-slate-500 block">Valid Until: {selectedQuote.validUntil}</span>
                  </div>
                </div>

                {/* Billed To */}
                <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Issued To Customer:</span>
                    <span className="font-bold text-slate-900 block text-sm">{selectedQuote.businessName}</span>
                    <span className="text-slate-600 block">Attn: {selectedQuote.customerName}</span>
                    <span className="text-slate-600 block">Phone: {selectedQuote.phone}</span>
                    <span className="text-slate-600 block">Email: {selectedQuote.email}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">GST Identification:</span>
                    <span className="font-bold text-slate-900 block">{selectedQuote.gstNumber || 'Unregistered B2B'}</span>
                    <span className="text-slate-600 block mt-1">Supply Region: Tirupati Limits</span>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Product Description</th>
                        <th className="p-3">Pack Unit</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Unit Rate (₹)</th>
                        <th className="p-3 text-right">Total Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedQuote.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-900">{item.productName}</td>
                          <td className="p-3 text-slate-500">{item.packSize}</td>
                          <td className="p-3 text-center font-bold text-slate-900">{item.quantity}</td>
                          <td className="p-3 text-right text-slate-700">₹{item.unitPrice.toLocaleString()}</td>
                          <td className="p-3 text-right font-bold text-slate-900">₹{item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Calculations Summary */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-500 max-w-xs space-y-1">
                    <span className="font-bold text-slate-700 block">Quotation Terms & Notes:</span>
                    <p>{selectedQuote.notes}</p>
                  </div>

                  <div className="w-full sm:w-64 space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-bold">₹{selectedQuote.subtotal.toLocaleString()}</span>
                    </div>
                    {selectedQuote.discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Special Discount:</span>
                        <span className="font-bold">-₹{selectedQuote.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>GST Tax (18%):</span>
                      <span className="font-bold">₹{selectedQuote.taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Charge:</span>
                      <span className="font-bold">{selectedQuote.deliveryCharge === 0 ? 'FREE' : `₹${selectedQuote.deliveryCharge}`}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-300 flex justify-between text-base font-black text-navy-900">
                      <span>Grand Total:</span>
                      <span className="text-blue-700">₹{selectedQuote.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Accept / Request Revision Buttons */}
                {selectedQuote.status === 'Sent' && (
                  <div className="pt-6 border-t border-slate-200 space-y-4 no-print">
                    {showRevisionInput ? (
                      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-3">
                        <h4 className="text-xs font-bold text-purple-900">Request Quotation Revision</h4>
                        <textarea
                          rows={2}
                          value={revisionNote}
                          onChange={e => setRevisionNote(e.target.value)}
                          placeholder="Specify target unit rate, modified quantities or delivery requirements..."
                          className="w-full text-xs p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              requestQuotationRevision(selectedQuote.id, revisionNote);
                              setShowRevisionInput(false);
                            }}
                            className="px-4 py-2 bg-purple-700 text-white font-bold text-xs rounded-xl"
                          >
                            Send Revision Request
                          </button>
                          <button
                            onClick={() => setShowRevisionInput(false)}
                            className="px-4 py-2 bg-white text-slate-700 border border-slate-200 font-bold text-xs rounded-xl"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => acceptQuotation(selectedQuote.id)}
                          className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          Accept Quotation & Generate Order
                        </button>

                        <button
                          onClick={() => setShowRevisionInput(true)}
                          className="py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <RefreshCw className="w-4 h-4 text-purple-600" />
                          Request Rate Revision
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
