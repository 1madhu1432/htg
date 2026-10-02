import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center space-y-4">
      <div className="max-w-md space-y-4">
        <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto" />
        <h1 className="text-3xl font-black text-navy-900">404 - Page Not Found</h1>
        <p className="text-xs text-slate-500">The page you requested does not exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-bold rounded-xl text-xs shadow-md">
          <ArrowLeft className="w-4 h-4" /> Back to Home Page
        </Link>
      </div>
    </div>
  );
};
