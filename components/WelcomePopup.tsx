
import React, { useState, useEffect } from 'react';
import { XIcon, MessageCircleIcon } from './Icons';
import { CONFIG } from '../config';

const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check localStorage to see if user has visited before
    const hasSeenPopup = localStorage.getItem('vistadeck_welcome_seen');
    
    if (!hasSeenPopup && CONFIG.welcomePopup.isOpen) {
      // Small delay to allow initial paint to happen smoothly before interrupting
      const timer = setTimeout(() => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    // Mark as seen in localStorage
    localStorage.setItem('vistadeck_welcome_seen', 'true');
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={handleClose}
      />

      {/* Popup Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full text-slate-500 hover:text-red-500 transition-colors shadow-sm"
          aria-label="Close popup"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {/* Image Section (Left) */}
        {CONFIG.welcomePopup.image && (
            <div className="w-full md:w-1/2 relative h-48 md:h-auto">
                <img 
                    src={CONFIG.welcomePopup.image} 
                    alt="Welcome" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent md:bg-gradient-to-r">
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">
                            Connect With Us
                        </span>
                        <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight">
                            {CONFIG.company.name}
                        </h3>
                    </div>
                </div>
            </div>
        )}

        {/* Content Section (Right) */}
        <div className={`w-full ${CONFIG.welcomePopup.image ? 'md:w-1/2' : 'w-full'} p-8 md:p-12 flex flex-col justify-center items-center text-center md:items-start md:text-left bg-white`}>
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-display">
                {CONFIG.welcomePopup.title}
            </h2>
            
            <p className="text-slate-500 mb-8 leading-relaxed">
                {CONFIG.welcomePopup.message}
            </p>

            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                {/* QR Code Section */}
                {CONFIG.welcomePopup.qrCode && (
                    <div className="shrink-0 p-2 bg-white border border-slate-100 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <img 
                            src={CONFIG.welcomePopup.qrCode} 
                            alt="Scan QR Code" 
                            className="w-32 h-32 object-contain"
                        />
                        <div className="text-[10px] text-center font-bold uppercase tracking-widest text-slate-400 mt-2">Scan Me</div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3 w-full">
                     <button 
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 px-6 rounded-xl font-bold hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-500/20"
                        onClick={(e) => {
                            // Example action: Open WhatsApp or Phone
                            window.location.href = `tel:${CONFIG.contact.phoneRaw}`;
                        }}
                    >
                        <MessageCircleIcon className="w-5 h-5" />
                        <span>Chat on WhatsApp</span>
                    </button>
                    
                    <button 
                        onClick={handleClose}
                        className="w-full bg-slate-900 text-white py-3.5 px-6 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-all"
                    >
                        {CONFIG.welcomePopup.ctaText}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
