
import React from 'react';
import { CONFIG } from '../config';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center bg-white animate-in fade-in duration-500">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] animate-pulse">
        Loading {CONFIG.company.shortName}...
      </p>
    </div>
  );
};

export default LoadingScreen;
