
import React, { useEffect, useRef, useState } from 'react';
import { XIcon, MapPinIcon, PhoneIcon } from './Icons';
import { CONFIG } from '../config';
import { products, projects } from '../data';

interface ExpoModeProps {
  onExit: () => void;
}

const ExpoMode: React.FC<ExpoModeProps> = ({ onExit }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let lastTime = 0;
    const speed = 75; // Pixels per second
    
    // Initialize with current scroll position to support resume
    let preciseScrollTop = scrollContainer.scrollTop;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isPaused && scrollContainer) {
        // Check if we reached the bottom with a small buffer
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 1) {
          
          // Pause to admire the footer
          setIsPaused(true);
          
          // Logic to reset (handled via timeouts to coordinate with pause state)
          // 1. Wait 2s at bottom
          setTimeout(() => {
            if (scrollContainer) {
               scrollContainer.scrollTo({ top: 0, behavior: 'auto' }); // Force auto for instant jump
               preciseScrollTop = 0;
            }
            // 2. Wait for reset + small delay before restarting
            setTimeout(() => {
                setIsPaused(false);
                lastTime = 0; 
            }, 2500);
          }, 2000);

        } else {
          // Normal scroll down
          const scrollAmount = (speed * deltaTime) / 1000;
          preciseScrollTop += scrollAmount;
          scrollContainer.scrollTop = preciseScrollTop;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 font-sans overflow-hidden">
      
      {/* Top Bar (Fixed) */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-md border-b border-slate-200 z-20 flex items-center justify-between px-8 md:px-12 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg">
                <span className="font-bold text-2xl tracking-tighter leading-none block">{CONFIG.company.shortName.charAt(0)}</span>
            </div>
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">{CONFIG.company.name}</h1>
                <p className="text-xs font-bold text-primary-600 uppercase tracking-[0.3em]">Exhibition Mode</p>
            </div>
         </div>

         {/* QR Code Call to Action - Sticky Header */}
         <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900 uppercase tracking-wider">Scan to View on Mobile</p>
                <p className="text-xs text-slate-500">Take the catalog with you</p>
            </div>
            <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm">
                {CONFIG.welcomePopup.qrCode ? (
                    <img src={CONFIG.welcomePopup.qrCode} className="w-16 h-16 object-contain" alt="Scan QR" />
                ) : (
                    <div className="w-16 h-16 bg-slate-200 flex items-center justify-center text-[8px]">NO QR</div>
                )}
            </div>
            <button 
                onClick={onExit}
                className="ml-8 p-3 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
                title="Exit Exhibition Mode"
            >
                <XIcon className="w-6 h-6" />
            </button>
         </div>
      </div>

      {/* Scrolling Content Area */}
      {/* Added !scroll-auto to override any global scroll-smooth behavior which causes jitter in JS animations */}
      <div 
        ref={scrollRef}
        className="h-full overflow-y-auto no-scrollbar pt-24 pb-32 !scroll-auto"
        style={{ scrollBehavior: 'auto' }} 
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Hero Section */}
        <div className="relative h-[70vh] w-full overflow-hidden">
            <img 
                src={CONFIG.hero.image} 
                className="w-full h-full object-cover" 
                alt="Expo Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex items-end p-12 md:p-24">
                <div className="max-w-4xl">
                    <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 leading-tight">
                        {CONFIG.hero.headline}
                    </h2>
                    <p className="text-2xl md:text-3xl text-slate-300 font-light leading-relaxed">
                        {CONFIG.hero.subheadline}
                    </p>
                </div>
            </div>
        </div>

        {/* Featured Products Grid */}
        <div className="bg-white py-24 px-8 md:px-16">
             <div className="flex items-center justify-between mb-16">
                <h3 className="text-4xl font-bold text-slate-900 font-display">Trending Collection</h3>
                <div className="h-[1px] flex-1 bg-slate-200 mx-12"></div>
                <span className="text-slate-400 font-bold uppercase tracking-widest">Featured Items</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map((product) => (
                    <div key={product.id} className="group">
                        <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden mb-8 shadow-sm">
                            <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-2">{product.category}</div>
                            <h4 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h4>
                            <p className="text-slate-500 text-lg mb-4 line-clamp-2">{product.description}</p>
                            <div className="text-2xl font-bold text-slate-900">${product.price}</div>
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* Showcase Projects - Horizontal Scroll Style (Simulated in Grid for Vertical) */}
        <div className="bg-slate-900 text-white py-32 px-8 md:px-16">
             <div className="max-w-3xl mb-20">
                <span className="text-primary-400 font-bold tracking-[0.3em] uppercase text-lg block mb-4">Our Portfolio</span>
                <h3 className="text-5xl md:text-7xl font-bold font-display">Design Excellence</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 {projects.slice(0, 4).map((project, idx) => (
                     <div key={project.id} className={`bg-slate-800 rounded-3xl overflow-hidden ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}>
                         <div className="aspect-[4/3]">
                             <img src={project.image} className="w-full h-full object-cover opacity-80" alt={project.title} />
                         </div>
                         <div className="p-10">
                             <div className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-3">{project.category}</div>
                             <h4 className="text-3xl font-bold text-white mb-4">{project.title}</h4>
                             <p className="text-slate-400 text-lg leading-relaxed">{project.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </div>

        {/* Final CTA */}
        <div className="h-[60vh] bg-primary-600 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="text-center relative z-10 text-white p-12">
                 <h2 className="text-5xl md:text-7xl font-bold mb-8 font-display">Start Your Journey</h2>
                 <p className="text-2xl text-primary-100 mb-12">Visit us online or scan the code below</p>
                 
                 <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl transform scale-125">
                    {CONFIG.welcomePopup.qrCode && (
                        <img src={CONFIG.welcomePopup.qrCode} className="w-48 h-48 object-contain" alt="QR Code" />
                    )}
                 </div>
                 <p className="mt-8 text-xl font-bold tracking-widest uppercase opacity-80">{CONFIG.company.url}</p>
             </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white py-16 px-16 flex justify-between items-center">
            <div>
                <h4 className="font-bold text-slate-900 text-xl mb-2">{CONFIG.company.name}</h4>
                <p className="text-slate-500">{CONFIG.company.tagline}</p>
            </div>
            <div className="flex gap-12">
                <div className="flex items-center gap-3 text-slate-600">
                    <PhoneIcon className="w-6 h-6" />
                    <span className="text-lg font-bold">{CONFIG.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                    <MapPinIcon className="w-6 h-6" />
                    <span className="text-lg font-bold">Visit Our Studio</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ExpoMode;
