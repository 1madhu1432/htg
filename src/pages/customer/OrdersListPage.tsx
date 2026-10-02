import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { OrderTimeline } from '../../components/ui/OrderTimeline';
import { ShoppingBag, Truck, CheckCircle2, ChevronRight, PackageCheck, MapPin } from 'lucide-react';

export const OrdersListPage: React.FC = () => {
  const { orders } = useData();
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');

  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Active Orders & Delivery Tracking</h1>
          <p className="text-xs text-slate-500">Track real-time dispatch progression and order history.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Confirmed Orders</h3>
          <p className="text-xs text-slate-500">Accept an issued quotation to place your order.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Orders List */}
          <div className="lg:col-span-4 space-y-3">
            {orders.map(ord => {
              const isSelected = activeOrder?.id === ord.id;
              return (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrderId(ord.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-blue-600 ring-2 ring-sky-100 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-navy-900">{ord.id}</span>
                    <StatusBadge status={ord.status} size="sm" />
                  </div>

                  <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
                    <span>Date: {ord.orderDate}</span>
                    <span className="font-bold text-navy-900">₹{ord.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detailed Tracking View */}
          {activeOrder && (
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Order Dispatch Details</span>
                  <h3 className="text-xl font-black text-navy-900">{activeOrder.id}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Tracking Number: {activeOrder.trackingNumber || 'SAI-TPT-001'}</p>
                </div>
                <StatusBadge status={activeOrder.status} size="lg" />
              </div>

              {/* Delivery Step Timeline */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Delivery Progression</h4>
                  <span className="text-xs font-semibold text-blue-700">Estimated Arrival: {activeOrder.estimatedDelivery}</span>
                </div>
                <OrderTimeline steps={activeOrder.timeline} />
              </div>

              {/* Delivery Address */}
              <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-2xl border border-sky-100 text-xs text-sky-950">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Consignment Destination:</span>
                  <p className="mt-0.5">{activeOrder.deliveryAddress}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Consignment Items</h4>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-white flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{item.productName}</span>
                        <span className="text-[11px] text-slate-500">Pack: {item.packSize}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900 block">Qty: {item.quantity}</span>
                        <span className="text-[11px] text-slate-500">₹{item.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-navy-900">
                <span>Grand Total Paid / Billed:</span>
                <span className="text-lg text-blue-700">₹{activeOrder.grandTotal.toLocaleString()}</span>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
