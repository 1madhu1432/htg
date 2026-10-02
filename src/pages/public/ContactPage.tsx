import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock, User } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useData();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message Sent', `Thank you ${name}. Your message has been sent to Sai Yadav & team.`);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setCompany('');
      setPhone('');
      setEmail('');
      setRequirement('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-sky-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-sky-100">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight">
          Contact SAI HYGIENE
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Direct communication line for institutional quotes, wholesale inquiries, and recurring supply contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Contact Info Card */}
        <div className="lg:col-span-5 bg-navy-900 text-white p-8 rounded-3xl shadow-2xl space-y-8">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Leadership & Proprietor</span>
            <h3 className="text-2xl font-black text-white mt-1">Sai Yadav</h3>
            <p className="text-xs text-slate-300 font-medium">Founder & Proprietor</p>
            <p className="text-xs font-bold text-cyan-300 mt-2">SAI HYGIENE & HOME CARE SOLUTIONS PRIVATE LIMITED</p>
          </div>

          <div className="space-y-6 text-xs text-slate-200">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 text-cyan-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Main Office Location</h5>
                <p className="text-slate-300 mt-0.5">Tirupati, Andhra Pradesh, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 text-cyan-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Direct Contact Phone</h5>
                <a href="tel:+919391843752" className="text-cyan-300 hover:underline font-bold text-sm block mt-0.5">
                  +91 9391843752
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 text-cyan-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Official Email</h5>
                <a href="mailto:saihygienesolutions24@gmail.com" className="text-cyan-300 hover:underline break-all block mt-0.5">
                  saihygienesolutions24@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 text-cyan-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Working Hours</h5>
                <p className="text-slate-300 mt-0.5">Monday - Saturday: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp CTA */}
          <div className="pt-6 border-t border-white/10">
            <a
              href="https://wa.me/919391843752?text=Hello%20Sai%20Yadav%20team,%20I%20would%20like%20to%20inquire%20about%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              Instant WhatsApp Enquiry (+91 9391843752)
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-navy-900">Thank You for Reaching Out!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your message has been logged. Sai Yadav and our business support representative will call you back on <strong>{phone}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-navy-900 mb-4">Send a Direct Business Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Enterprise</label>
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Hotel / Hospital / Store Name"
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contact@domain.com"
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Product Requirement</label>
                <select
                  value={requirement}
                  onChange={e => setRequirement(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select Category Interest</option>
                  <option value="Cleaning Chemicals">Cleaning Chemicals</option>
                  <option value="Housekeeping Supplies">Housekeeping Supplies</option>
                  <option value="Tissue Products">Tissue Products</option>
                  <option value="Dispensers & Hand Dryers">Dispensers & Hand Dryers</option>
                  <option value="Cleaning Machinery">Cleaning Machinery</option>
                  <option value="Bulk Institutional Order">Bulk Institutional Order</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message Details *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Share details regarding your required quantities, delivery timeline, or questions..."
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4 text-cyan-300" />
                Submit Enquiry
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
