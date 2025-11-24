import React, { useState, useEffect } from 'react';
import { XIcon, ZapIcon } from './Icons';

interface PWAManagerProps {
  /** Callback function to lift the "install" action up to parent UI */
  onInstallAvailable?: (installFn: () => void) => void;
}

/**
 * PWAManager Component
 * 
 * Responsibilities:
 * 1. Listen for the browser's `beforeinstallprompt` event.
 * 2. Prevent the default mini-infobar from appearing.
 * 3. Expose a function to the parent component to trigger the install prompt manually.
 * 4. Monitor Network Status (Online/Offline) and display a toast notification.
 */
const PWAManager: React.FC<PWAManagerProps> = ({ onInstallAvailable }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOfflineToast, setShowOfflineToast] = useState(false);

  // --- INSTALL PROMPT LOGIC ---
  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      
      // Notify parent component that install is available
      if (onInstallAvailable) {
        onInstallAvailable(() => {
          // This function is called when the user clicks the "Install" button in the UI
          if (e && (e as any).prompt) {
             (e as any).prompt();
             // Wait for the user to respond to the prompt
             (e as any).userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                  console.log('User accepted the PWA install prompt');
                } else {
                  console.log('User dismissed the PWA install prompt');
                }
                setDeferredPrompt(null);
             });
          }
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [onInstallAvailable]);

  // --- NETWORK STATUS LOGIC ---
  useEffect(() => {
    const handleOnline = () => {
        setIsOffline(false);
        setShowOfflineToast(true);
        // Auto-hide the "Back Online" toast after 3 seconds
        setTimeout(() => setShowOfflineToast(false), 3000); 
    };
    
    const handleOffline = () => {
        setIsOffline(true);
        setShowOfflineToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineToast) return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 left-4 z-[100] animate-in slide-in-from-bottom-4 duration-300 pointer-events-none">
      <div className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-md transition-colors duration-300 ${
        isOffline 
          ? 'bg-slate-900/95 text-white border-slate-800 shadow-slate-900/20' 
          : 'bg-emerald-500/95 text-white border-emerald-400 shadow-emerald-500/20'
      }`}>
        <div className={`p-1.5 rounded-full ${isOffline ? 'bg-slate-700' : 'bg-emerald-600'}`}>
            {isOffline ? <XIcon className="w-4 h-4" /> : <ZapIcon className="w-4 h-4" />}
        </div>
        <div>
            <p className="text-xs font-bold uppercase tracking-wider">
                {isOffline ? 'You are Offline' : 'Back Online'}
            </p>
            {isOffline && (
                <p className="text-[10px] opacity-80">Browsing cached version</p>
            )}
        </div>
        {!isOffline && (
            <button onClick={() => setShowOfflineToast(false)} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
                <XIcon className="w-4 h-4" />
            </button>
        )}
      </div>
    </div>
  );
};

export default PWAManager;