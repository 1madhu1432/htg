import React from 'react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppFloatProps {
  message?: string;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ message = 'Hello SAI HYGIENE team, I would like to inquire about bulk supply & products.' }) => {
  const whatsappUrl = `https://wa.me/919391843752?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-ping"></span>
      </div>
      <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">WhatsApp Enquiry</span>
    </a>
  );
};
