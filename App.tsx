
import React, { useState, useEffect, Suspense, lazy, startTransition, useCallback } from 'react';
import Header, { ViewState } from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import LoadingScreen from './components/LoadingScreen';
import WelcomePopup from './components/WelcomePopup';
import SettingsModal from './components/SettingsModal';
import { MessageCircleIcon, ZapIcon } from './components/Icons';
import { CONFIG } from './config';
import { Product, products, brochures, galleryImages } from './data';
import { preloadAssetGroups } from './utils/storage';
import { OFFLINE_ASSET_GROUPS } from './offlineConfig';
import { useSettings } from './contexts/SettingsContext';
import type { CartItem, CheckoutData } from './components/CartDrawer';

// Lazy load heavy view components to speed up initial load
// These imports will strictly NOT trigger if the component is never rendered
const Store = lazy(() => import('./components/Store'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Pricing = lazy(() => import('./components/Pricing'));
const Magazine = lazy(() => import('./components/Magazine'));
const Contact = lazy(() => import('./components/Contact'));
const CartDrawer = lazy(() => import('./components/CartDrawer'));
const ExpoMode = lazy(() => import('./components/ExpoMode'));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { features } = useSettings();
  
  // Offline Caching Prompt State
  const [cachingStatus, setCachingStatus] = useState<string | null>(null);

  // Handle Hash Navigation and Feature Flag Redirection
  useEffect(() => {
      const handleHash = () => {
          const hash = window.location.hash.substring(1) as ViewState;
          // Redirect if feature is disabled
          if (hash === 'store' && !features.enableStore) return setCurrentView('home');
          if (hash === 'portfolio' && !features.enablePortfolio) return setCurrentView('home');
          if (hash === 'magazine' && !features.enableBlog) return setCurrentView('home');
          if (hash === 'expo' && !features.enableExpo) return setCurrentView('home');

          if (['home', 'store', 'portfolio', 'pricing', 'magazine', 'contact', 'expo'].includes(hash)) {
              setCurrentView(hash);
          }
      };
      
      handleHash(); // Check on mount
      window.addEventListener('hashchange', handleHash);
      return () => window.removeEventListener('hashchange', handleHash);
  }, [features]);

  // Force Redirect if current view gets disabled at runtime
  useEffect(() => {
    if (currentView === 'store' && !features.enableStore) setCurrentView('home');
    if (currentView === 'portfolio' && !features.enablePortfolio) setCurrentView('home');
    if (currentView === 'magazine' && !features.enableBlog) setCurrentView('home');
    if (currentView === 'expo' && !features.enableExpo) setCurrentView('home');
  }, [features, currentView]);

  // Dynamic Title Update based on CONFIG and Theme Initialization
  useEffect(() => {
    document.title = `${CONFIG.company.name} | ${CONFIG.company.tagline}`;

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    const root = document.documentElement;
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    // OFFLINE PRELOADING STRATEGY (Smart Feature-Aware)
    const initializeOfflineMode = async () => {
        // 1. Preload Code Chunks (Views) - ONLY for enabled features
        try {
             const imports: Promise<any>[] = [
                import('./components/Contact'),
                import('./components/CartDrawer'),
             ];
             
             if (features.enableStore) imports.push(import('./components/Store'));
             if (features.enablePortfolio) imports.push(import('./components/Portfolio'));
             if (features.enableBlog) imports.push(import('./components/Magazine'));
             if (features.enableExpo) imports.push(import('./components/ExpoMode'));
             imports.push(import('./components/Pricing')); // Usually lightweight

             await Promise.all(imports);
            console.log('✅ Offline Mode: Enabled Views Cached');
        } catch (e) { console.warn('Offline View Cache Failed', e); }

        // 2. Preload Asset Data (Images) based on Config Sequence
        // Using a small timeout to not block initial render
        setTimeout(() => {
            preloadAssetGroups(
                OFFLINE_ASSET_GROUPS,
                (label) => setCachingStatus(`Caching: ${label}`),
                () => {
                    setCachingStatus(null); // Hide prompt when done
                    console.log('✅ Offline Mode: All assets cached');
                }
            );
        }, 2000);
    };

    if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(initializeOfflineMode);
    } else {
        setTimeout(initializeOfflineMode, 3000);
    }
  }, [features]); // Re-run caching if features change

  // Navigation Handler with Transition for smoothness
  const handleNavigate = useCallback((view: ViewState) => {
    startTransition(() => {
        setCurrentView(view);
        window.scrollTo(0, 0);
    });
  }, []);

  // Cart Logic - Memoized to prevent Store re-renders
  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleCheckout = useCallback((data: CheckoutData) => {
    const orderId = "ORD-" + Math.floor(Math.random() * 1000000).toString();
    const orderDetails = {
        id: orderId,
        timestamp: new Date().toISOString(),
        items: cart,
        customerContact: data.contactNumber,
        notes: data.notes,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    console.group('📦 NEW ORDER RECEIVED');
    console.log('Sending to Dashboard API...', orderDetails);
    console.log('Sending Email to Store Owner...', {
        to: CONFIG.contact.email,
        subject: `New Order Enquiry ${orderId}`,
        body: orderDetails
    });
    console.groupEnd();

    alert(`Thank you! Your order enquiry #${orderId} has been successfully submitted.\n\nContact: ${data.contactNumber}\nNotes: "${data.notes}"\n\nWe will contact you shortly via email/phone to finalize the order.`);
    
    setCart([]);
    setIsCartOpen(false);
  }, [cart]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={handleNavigate} addToCart={addToCart} />;
      case 'store':
        return features.enableStore ? <Store addToCart={addToCart} onNavigate={handleNavigate} /> : <Home onNavigate={handleNavigate} addToCart={addToCart} />;
      case 'portfolio':
        return features.enablePortfolio ? <Portfolio /> : <Home onNavigate={handleNavigate} addToCart={addToCart} />;
      case 'pricing':
        return <Pricing onNavigate={handleNavigate} />;
      case 'magazine':
        return features.enableBlog ? <Magazine /> : <Home onNavigate={handleNavigate} addToCart={addToCart} />;
      case 'contact':
        return <Contact />;
      case 'expo':
        return features.enableExpo ? <ExpoMode onExit={() => handleNavigate('home')} /> : <Home onNavigate={handleNavigate} addToCart={addToCart} />;
      default:
        return <Home onNavigate={handleNavigate} addToCart={addToCart} />;
    }
  };

  // Special Render for Expo Mode (No Shell)
  if (currentView === 'expo' && features.enableExpo) {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <ExpoMode onExit={() => handleNavigate('home')} />
        </Suspense>
    );
  }

  return (
    <div className="bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-200 antialiased pb-24 md:pb-0 overflow-x-hidden font-sans selection:bg-primary-100">
      {/* Promotional / Welcome Popup */}
      <WelcomePopup />

      {/* Settings Modal */}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}

      <Header 
        currentView={currentView}
        onNavigate={handleNavigate} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <Suspense fallback={null}>
          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            onCheckout={handleCheckout}
          />
      </Suspense>

      <main>
        <Suspense fallback={<LoadingScreen />}>
            {renderView()}
        </Suspense>
      </main>
      
      <Footer onNavigate={handleNavigate} />
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />
      
      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${CONFIG.contact.phoneRaw.replace('+', '')}?text=${encodeURIComponent(`Hi ${CONFIG.company.name}, I found your digital catalog and would like to know more.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:scale-105 transition-transform z-50 flex items-center justify-center group" 
        aria-label="Chat on WhatsApp"
      >
        <MessageCircleIcon className="h-7 w-7 fill-current" />
      </a>

      {/* Offline Caching Prompt Toast */}
      {cachingStatus && (
          <div className="fixed bottom-24 md:bottom-8 left-4 z-[60] animate-in slide-in-from-left-4 duration-500 pointer-events-none">
              <div className="bg-slate-900/90 text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur border border-slate-800 flex items-center gap-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent"></div>
                  <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary-400">Offline Ready</p>
                      <p className="text-xs font-medium">{cachingStatus}...</p>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default App;
