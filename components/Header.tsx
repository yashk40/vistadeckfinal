
import React, { useState, useEffect } from 'react';
import { ShoppingCartIcon, DownloadIcon, SettingsIcon } from './Icons';
import PWAManager from './PWAManager';
import { CONFIG } from '../config';
import Tooltip from './Tooltip';
import { useSettings } from '../contexts/SettingsContext';

export type ViewState = 'home' | 'store' | 'portfolio' | 'pricing' | 'magazine' | 'contact' | 'expo';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ currentView, onNavigate, cartCount = 0, onOpenCart, onOpenSettings }) => {
  const [installPWA, setInstallPWA] = useState<(() => void) | null>(null);
  const [animateCart, setAnimateCart] = useState(false);
  const { features } = useSettings();

  // Trigger animation when cartCount changes (and is not 0)
  useEffect(() => {
    if (cartCount > 0) {
        setAnimateCart(true);
        const timer = setTimeout(() => setAnimateCart(false), 300);
        return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const navLinks: { name: string; id: ViewState; enabled: boolean }[] = [
    { name: 'Home', id: 'home', enabled: true },
    { name: 'Platform', id: 'home', enabled: true },
    { name: 'Demos', id: 'store', enabled: features.enableStore },
  ];

  const handleNavClick = (e: React.MouseEvent, id: ViewState) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <>
      {/* Integrated PWA Manager handles install events and offline toasts */}
      <PWAManager onInstallAvailable={(fn) => setInstallPWA(() => fn)} />
      
      <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-100 dark:border-slate-800 h-16 md:h-24 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <a href="/" onClick={(e) => handleNavClick(e, 'home')} className="flex flex-col items-start group gap-0.5 md:gap-1">
              <div className="flex items-center">
                  <span className="text-2xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight uppercase leading-none font-sans transition-all">
                    {CONFIG.company.logoText}
                  </span>
              </div>
              <div className="flex items-center w-full">
                  <span className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-[0.25em] md:tracking-[0.35em] w-full block text-justify transition-all">
                      {CONFIG.company.logoSubText}
                  </span>
              </div>
              <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-700 mt-0.5 hidden md:block"></div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.filter(link => link.enabled).map((link) => (
                <a 
                  key={link.name} 
                  href={`#${link.id}`} 
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`transition-colors duration-200 font-medium text-base tracking-wide ${
                    currentView === link.id 
                      ? 'text-primary-600 dark:text-primary-400 font-bold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className={`transition-colors duration-200 font-medium text-base tracking-wide ${
                  currentView === 'contact' 
                    ? 'text-primary-600 dark:text-primary-400 font-bold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400'
                }`}
              >
                Contact
              </a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* PWA Install Button (Only shows if installable) */}
              {installPWA && (
                <Tooltip content="Install Application" position="bottom">
                  <button
                    onClick={installPWA}
                    className="hidden md:flex items-center gap-2 text-slate-400 hover:text-primary-600 transition-colors group"
                    title="Install App"
                    aria-label="Install App"
                  >
                    <DownloadIcon className="w-5 h-5 group-hover:animate-bounce" />
                    <span className="text-xs font-bold uppercase hidden lg:inline">Install App</span>
                  </button>
                </Tooltip>
              )}

              {/* Store Button */}
              {features.enableStore && (
                  <button 
                      onClick={() => onNavigate('store')}
                      className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-md border border-dashed transition-colors transform duration-200 hover:scale-105 ${
                        currentView === 'store'
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border-primary-400 dark:border-primary-600'
                          : 'bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 border-primary-300 dark:border-slate-700 hover:bg-primary-100 dark:hover:bg-slate-700 hover:border-primary-400'
                      }`}
                  >
                      <span className="text-sm font-bold tracking-wider">VIEW DEMOS</span>
                  </button>
              )}

              {/* Cart Button */}
              <Tooltip content="View Cart" position="bottom">
                <button 
                  onClick={onOpenCart}
                  className={`relative p-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-transform duration-200 ${animateCart ? 'scale-110 text-primary-600' : ''}`}
                  aria-label="Open Cart"
                >
                  <ShoppingCartIcon className="h-7 w-7" />
                  {cartCount > 0 && (
                    <span className={`absolute -top-1 -right-1 bg-[#f43f5e] text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 transition-transform duration-300 ${animateCart ? 'scale-125 bg-primary-700' : 'scale-100'}`}>
                      {cartCount}
                    </span>
                  )}
                </button>
              </Tooltip>

              {/* Settings Button */}
              <Tooltip content="Settings" position="bottom">
                  <button 
                    onClick={onOpenSettings}
                    className="p-2 text-slate-400 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors hover:rotate-90 duration-500"
                    aria-label="Open Settings"
                  >
                      <SettingsIcon className="w-6 h-6" />
                  </button>
              </Tooltip>
              
              {/* Estimate Button */}
              <button
                onClick={() => onNavigate('contact')}
                className="hidden sm:block bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm md:text-base px-6 py-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-200 shadow-lg shadow-slate-200 dark:shadow-none tracking-wide hover:-translate-y-0.5"
              >
                Start Showcasing
              </button>
              
              {/* Mobile Estimate Button */}
              <button 
                onClick={() => onNavigate('contact')}
                className="sm:hidden bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-3 py-2 rounded leading-tight shadow-sm"
              >
                  Start<br/>Free
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});

export default Header;
