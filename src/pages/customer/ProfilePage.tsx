import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { User, Building2, ShieldCheck, MapPin, Save, Edit3, KeyRound, Plus } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [contactPerson, setContactPerson] = useState(user?.contactPerson || user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [gstNumber, setGstNumber] = useState(user?.gstNumber || '');
  const [businessType, setBusinessType] = useState(user?.businessType || 'Hotel / Restaurant');
  const [billingAddress, setBillingAddress] = useState(user?.billingAddress || '');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.deliveryAddress || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      businessName,
      contactPerson,
      name: contactPerson,
      phone,
      email,
      gstNumber,
      businessType,
      billingAddress,
      deliveryAddress
    });

    setIsEditing(false);
    addToast('Profile Updated', 'Your business profile details have been saved.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">B2B Business Profile</h1>
          <p className="text-xs text-slate-500">Manage account information, tax identifiers, and delivery locations.</p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
            isEditing ? 'bg-slate-100 text-slate-700' : 'bg-navy-900 text-white hover:bg-navy-950'
          }`}
        >
          <Edit3 className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Business Info */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-navy-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" /> Business & Tax Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Business Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 disabled:bg-slate-50 font-bold text-navy-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Business Type</label>
              <input
                type="text"
                disabled={!isEditing}
                value={businessType}
                onChange={e => setBusinessType(e.target.value)}
                className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 disabled:bg-slate-50 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">GST Number</label>
            <input
              type="text"
              disabled={!isEditing}
              value={gstNumber}
              onChange={e => setGstNumber(e.target.value)}
              className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 disabled:bg-slate-50 font-bold uppercase text-blue-700"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-navy-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-700" /> Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={contactPerson}
                onChange={e => setContactPerson(e.target.value)}
                className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 disabled:bg-slate-50 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (WhatsApp)</label>
              <input
                type="text"
                disabled={!isEditing}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 disabled:bg-slate-50 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              disabled={!isEditing}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 disabled:bg-slate-50 font-medium"
            />
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-navy-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-700" /> Addresses
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Billing Address</label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={billingAddress}
                onChange={e => setBillingAddress(e.target.value)}
                className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 disabled:bg-slate-50 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address</label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 disabled:bg-slate-50 font-medium"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        )}
      </form>

    </div>
  );
};
