
import React, { useState, useEffect, useCallback } from 'react';
import FadeIn from './FadeIn';
import GalleryItem from './GalleryItem';
import BrochureCard from './BrochureCard';
import { ViewState } from './Header';
import { products, Product, brochures, galleryImages, Brochure } from '../data';
import { CONFIG } from '../config';
import { preloadImages } from '../utils/storage';
import { useSwipe } from '../hooks/useSwipe';
import { 
  LayersIcon, PaletteIcon, SofaIcon, BuildingIcon, 
  ImageIcon, VideoIcon, PlusIcon, SearchIcon, FilterIcon,
  MapPinIcon, DiamondIcon, CheckBadgeIcon, UsersIcon,
  MessageCircleIcon, XIcon, DownloadIcon, MaximizeIcon,
  FileTextIcon, ChevronLeftIcon, ChevronRightIcon
} from './Icons';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
  addToCart: (product: Product) => void;
}

// Types for the Media Overlay
type MediaType = 'image' | 'video' | 'brochure';
interface LightboxState {
    type: MediaType;
    items: any[];
    initialIndex: number;
}

// Internal Media Overlay Component with Navigation
const MediaOverlay: React.FC<{ state: LightboxState; onClose: () => void }> = ({ state, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(state.initialIndex);
    const items = state.items;
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, handleNext, handlePrev]);

    // Swipe Navigation
    const swipeHandlers = useSwipe({
        onSwipeLeft: handleNext,
        onSwipeRight: handlePrev,
    });

    const renderContent = () => {
        const currentItem = items[currentIndex];

        switch(state.type) {
            case 'image':
                return (
                    <div className="max-w-5xl max-h-[90vh] p-2 relative animate-in zoom-in-95 duration-300 flex justify-center">
                        <img 
                            src={currentItem as string} 
                            alt={`Gallery View ${currentIndex + 1}`} 
                            className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl select-none" 
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                            {currentIndex + 1} / {items.length}
                        </div>
                    </div>
                );
            case 'video':
                return (
                     <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
                        {/* Simulated Video Player */}
                        <iframe 
                            key={currentIndex} // Force re-render on change
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
                            title="Video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                     </div>
                );
            case 'brochure':
                const doc = currentItem as Brochure;
                return (
                    <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300 max-h-[90vh]">
                        <div className="w-full md:w-1/2 bg-slate-100 relative h-64 md:h-auto">
                            <img src={doc.image} alt={doc.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col relative overflow-y-auto">
                             <div className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-2">Digital Brochure</div>
                             <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-display">{doc.title}</h2>
                             <p className="text-slate-500 leading-relaxed mb-8">
                                 Explore our detailed specifications and designs. This brochure contains high-resolution imagery and technical data.
                             </p>
                             
                             <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
                                 <div className="flex justify-between items-center mb-2">
                                     <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">File Size</span>
                                     <span className="text-slate-900 font-mono font-bold">{doc.size}</span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                     <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Format</span>
                                     <span className="text-slate-900 font-mono font-bold">PDF (Interactive)</span>
                                 </div>
                             </div>

                             <div className="mt-auto space-y-3">
                                 <button 
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-transform hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg"
                                    onClick={() => alert(`Downloading ${doc.title}...`)}
                                 >
                                     <DownloadIcon className="w-5 h-5" /> Download Now
                                 </button>
                                 <button 
                                     className="w-full bg-white text-slate-900 border-2 border-slate-200 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-50 transition-colors"
                                     onClick={onClose}
                                 >
                                     Close Viewer
                                 </button>
                             </div>
                             
                             <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-slate-100 md:hidden">
                                 <button onClick={handlePrev} className="p-2 bg-slate-100 rounded-full"><ChevronLeftIcon className="w-4 h-4" /></button>
                                 <span className="text-xs font-bold text-slate-400">{currentIndex + 1} / {items.length}</span>
                                 <button onClick={handleNext} className="p-2 bg-slate-100 rounded-full"><ChevronRightIcon className="w-4 h-4" /></button>
                             </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={onClose}
            {...swipeHandlers}
        >
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[110]"
            >
                <XIcon className="w-8 h-8" />
            </button>

            {/* Nav Buttons (Hidden on mobile usually, but good for desktop) */}
            {items.length > 1 && (
                <>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all z-[110] hidden md:flex"
                    >
                        <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all z-[110] hidden md:flex"
                    >
                        <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </>
            )}
            
            <div onClick={(e) => e.stopPropagation()} className="contents">
                {renderContent()}
            </div>
        </div>
    );
};

const Home: React.FC<HomeProps> = ({ onNavigate, addToCart }) => {
  const [activeTab, setActiveTab] = useState<'brochures' | 'demos' | 'gallery' | 'enquiry'>('demos');
  const [galleryView, setGalleryView] = useState<'images' | 'videos'>('images');
  const [lightboxState, setLightboxState] = useState<LightboxState | null>(null);

  // Map icon strings from config to components
  const getIcon = (name: string) => {
    const props = { className: "h-6 w-6 md:h-10 md:w-10" };
    const smallProps = { className: "w-8 h-8" }; // For benefits section

    switch(name.toLowerCase()) {
        case 'check': return <CheckBadgeIcon {...props} />;
        case 'users': return <UsersIcon {...props} />;
        case 'pin': return <MapPinIcon {...props} />;
        case 'diamond': return <DiamondIcon {...props} />;
        case 'sofa': return <SofaIcon {...props} className="text-primary-500" />;
        case 'building': return <BuildingIcon {...props} className="text-primary-500" />;
        case 'layers': return <LayersIcon {...props} className="text-primary-500" />;
        case 'message': return <MessageCircleIcon {...smallProps} />;
        case 'search': return <SearchIcon {...smallProps} />;
        default: return <LayersIcon {...props} />;
    }
  };

  const trendingProducts = products.slice(0, 6);

  // Preload assets on mount
  useEffect(() => {
    const assetsToPreload = [
        ...trendingProducts.map(p => p.image),
        ...brochures.map(b => b.image)
    ];
    preloadImages(assetsToPreload);
  }, []);

  const handleShare = async (e: React.MouseEvent, brochureTitle: string) => {
      e.stopPropagation();
      if (navigator.share) {
          try {
              await navigator.share({
                  title: brochureTitle,
                  text: `Check out this brochure: ${brochureTitle}`,
                  url: window.location.href,
              });
          } catch (error) {
              console.log('Error sharing', error);
          }
      } else {
          alert("Sharing not supported on this device. Link copied to clipboard!");
      }
  };

  const openLightbox = (type: MediaType, items: any[], index: number) => {
      setLightboxState({ type, items, initialIndex: index });
  };

  // --- SECTION RENDERERS ---

  const renderHero = () => (
    <div className="relative w-full h-[600px] lg:h-[750px] flex items-center mt-16 md:mt-24">
        <div className="absolute inset-0 z-0">
        <img
            src={CONFIG.hero.image}
            alt="Dashboard"
            className="w-full h-full object-cover"
            // @ts-ignore
            fetchPriority="high"
            decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn>
            <div className="max-w-3xl text-white">
            <div className="inline-block border border-white/30 px-4 py-2 rounded-full mb-8 backdrop-blur-sm bg-white/10">
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">{CONFIG.company.tagline}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8 text-white whitespace-pre-line">
                {CONFIG.hero.headline}
            </h1>
            <p className="text-lg md:text-2xl text-slate-200 mb-10 font-light max-w-xl leading-relaxed">
                {CONFIG.hero.subheadline}
            </p>
            <button
                onClick={() => onNavigate('contact')}
                className="bg-primary-600 text-white font-bold py-5 px-12 rounded-lg hover:bg-primary-700 transition-all shadow-glow hover:shadow-xl uppercase tracking-widest text-sm md:text-base transform hover:-translate-y-1"
            >
                {CONFIG.hero.ctaButton}
            </button>
            </div>
        </FadeIn>
        </div>
    </div>
  );

  const renderStats = () => (
    <div className="bg-white py-10 md:py-20 border-b border-slate-50 shadow-sm relative z-20">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-4 md:gap-16">
                {CONFIG.stats.map((stat, i) => (
                    <FadeIn key={i} delay={i * 50} className="flex flex-col items-center text-center group cursor-default px-2">
                        <div className="text-slate-400 mb-3 md:mb-5 group-hover:text-primary-600 transition-colors duration-300 transform group-hover:scale-110">
                            {getIcon(stat.icon)}
                        </div>
                        <div className="text-xl md:text-5xl font-bold text-slate-900 tracking-tight font-sans">{stat.value}</div>
                        <div className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider mt-2 leading-tight">{stat.label}</div>
                    </FadeIn>
                ))}
            </div>
        </div>
    </div>
  );

  const renderBenefits = () => (
    <section className="bg-white py-12 md:py-20 border-b border-slate-50">
        <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CONFIG.homepage.benefits.map((benefit, i) => (
                         <div key={i} className="flex items-center gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                            <div className="bg-primary-50 text-primary-600 p-5 rounded-xl group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                {getIcon(benefit.icon)}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base uppercase tracking-wide mb-1">{benefit.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </div>
    </section>
  );

  const renderExperience = () => {
    const tabItems = [
        { id: 'demos', label: 'Demos', icon: DiamondIcon, count: products.length },
        { id: 'brochures', label: 'Brochures', icon: FileTextIcon, count: brochures.length },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon, count: galleryImages.length + 2 },
        { id: 'enquiry', label: 'Enquiry', icon: MessageCircleIcon, count: null },
    ];

    return (
    <section className="py-20 md:py-28 bg-slate-50/50 min-h-[600px]">
        <div className="container mx-auto px-4 md:px-6">
            
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{CONFIG.homepage.experience.title}</h2>
                <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">{CONFIG.homepage.experience.subtitle}</p>
            </div>

            {/* Navigation Bar - Redesigned as Attention Catcher */}
            <div className="flex justify-center mb-12 md:mb-20 relative">
                {/* Decorative background line */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10"></div>

                <div className="bg-white p-2 rounded-[2rem] shadow-2xl border border-slate-100 flex flex-nowrap overflow-x-auto no-scrollbar snap-x snap-mandatory md:overflow-visible gap-2 md:gap-3 max-w-full relative z-10 animate-in slide-in-from-bottom-6 duration-700" role="tablist">
                    {tabItems.map((tab) => {
                         const Icon = tab.icon;
                         const isActive = activeTab === tab.id;
                         return (
                             <button
                                key={tab.id}
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`
                                    relative flex-shrink-0 flex items-center gap-2 md:gap-3 px-5 py-3 md:px-8 md:py-4 rounded-[1.5rem] transition-all duration-500 ease-out group snap-center
                                    ${isActive 
                                        ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/30 scale-105 ring-4 ring-white z-20' 
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }
                                `}
                             >
                                <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${isActive ? 'text-primary-400' : 'text-slate-400 group-hover:text-slate-600'}`} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap">{tab.label}</span>
                                {tab.count !== null && (
                                    <span className={`
                                        text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors hidden sm:inline-block
                                        ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}
                                    `}>
                                        {tab.count}
                                    </span>
                                )}
                             </button>
                         )
                    })}
                </div>
            </div>

            {/* Content Rendering */}
            <div className="bg-white rounded-3xl p-6 md:p-12 shadow-card border border-slate-100 min-h-[500px]">
                
                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                    <div className="animate-in fade-in zoom-in-95 duration-300" role="tabpanel">
                        {/* Sub-Navigation */}
                        <div className="flex justify-between items-center mb-8 md:mb-12 bg-slate-800 text-white rounded-xl overflow-hidden max-w-md mx-auto shadow-lg">
                            <button 
                            onClick={() => setGalleryView('images')}
                            className={`flex-1 flex items-center justify-center gap-3 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors ${galleryView === 'images' ? 'bg-slate-700' : 'hover:bg-slate-700/80'}`}
                            >
                            <ImageIcon className="w-4 h-4 md:w-5 md:h-5" /> Images
                            </button>
                            <div className="w-[1px] bg-white/20 h-8"></div>
                            <button 
                            onClick={() => setGalleryView('videos')}
                            className={`flex-1 flex items-center justify-center gap-3 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors ${galleryView === 'videos' ? 'bg-slate-700' : 'hover:bg-slate-700/80'}`}
                            >
                            <VideoIcon className="w-4 h-4 md:w-5 md:h-5" /> Videos
                            </button>
                        </div>

                        {galleryView === 'images' ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                                {galleryImages.map((img, idx) => (
                                    <GalleryItem 
                                        key={idx} 
                                        img={img} 
                                        onClick={() => openLightbox('image', galleryImages, idx)} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                {[1, 2].map((i, idx, arr) => (
                                    <div 
                                        key={i} 
                                        onClick={() => openLightbox('video', arr, idx)}
                                        className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-lg"
                                    >
                                        <img 
                                        src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80`} 
                                        className="w-full h-full object-cover opacity-60 transform-gpu backface-hidden transition-transform duration-700 group-hover:scale-110" 
                                        alt="Video Thumbnail" 
                                        loading="lazy"
                                        decoding="async"
                                        />
                                        <div className="absolute w-12 h-12 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                                            <div className="w-0 h-0 border-t-[8px] md:border-t-[12px] border-t-transparent border-l-[14px] md:border-l-[22px] border-l-white border-b-[8px] md:border-b-[12px] border-b-transparent ml-1.5"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Brochures Tab */}
                {activeTab === 'brochures' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300" role="tabpanel">
                        
                        {/* Search and Sort Controls */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
                        <div className="relative w-full md:w-96">
                            <input 
                            type="text" 
                            placeholder="Search digital resources..." 
                            aria-label="Search brochures"
                            className="w-full pl-12 pr-5 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100 cursor-pointer hover:bg-slate-100">
                            <FilterIcon className="w-4 h-4" />
                            <span>Latest Uploads</span>
                        </div>
                        </div>

                        {/* Brochure Cards Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                            {brochures.map((doc, i) => (
                                <BrochureCard 
                                    key={i} 
                                    doc={doc} 
                                    onShare={handleShare} 
                                    onClick={() => openLightbox('brochure', brochures, i)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'demos' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300" role="tabpanel">
                        <div className="flex items-center justify-between mb-8 md:mb-10">
                            <div>
                                <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900">Industry Demos</h3>
                                <p className="text-sm text-slate-500 mt-1">Explore industry-specific setups and pricing</p>
                            </div>
                            <button onClick={() => onNavigate('store')} className="text-xs md:text-sm font-bold text-primary-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                                View All Demos <span className="text-lg">&rarr;</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
                            {trendingProducts.map((product) => (
                                <div 
                                key={product.id} 
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigate('store')}
                                onClick={() => onNavigate('store')}
                                className="rounded-2xl border border-slate-100 overflow-hidden group relative cursor-pointer flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                                >
                                    <div className="aspect-square overflow-hidden bg-slate-100 relative">
                                        <img 
                                        src={product.image}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transform-gpu backface-hidden" 
                                        alt={product.name} 
                                        loading="lazy"
                                        decoding="async"
                                        />
                                        
                                        {/* Quick Add Button Overlay */}
                                        <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5 z-20">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                            className="bg-white text-slate-900 p-2.5 md:p-3.5 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-colors transform hover:scale-110"
                                            aria-label={`Add ${product.name} to cart`}
                                        >
                                            <PlusIcon className="w-5 h-5 md:w-6 md:h-6" />
                                        </button>
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-6 flex flex-col flex-grow">
                                        <div className="text-[10px] md:text-xs font-bold uppercase text-slate-400 mb-2 tracking-wide">{product.category}</div>
                                        <h4 className="font-bold text-slate-900 text-sm md:text-lg mb-2 line-clamp-1">{product.name}</h4>
                                        <div className="font-bold text-primary-600 text-base md:text-xl mt-auto">${product.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Enquiry Tab */}
                {activeTab === 'enquiry' && (
                    <div className="animate-in fade-in zoom-in-95 duration-300 max-w-2xl mx-auto py-8" role="tabpanel">
                        <div className="text-center mb-12">
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-3">Lead Generation System</h3>
                            <p className="text-slate-500 text-sm md:text-base">VistaDeck includes built-in forms that send leads directly to you.</p>
                        </div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="block w-full">
                                <span className="sr-only">Name</span>
                                <input type="text" placeholder="Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm md:text-base" />
                                </label>
                                <label className="block w-full">
                                <span className="sr-only">Phone</span>
                                <input type="tel" placeholder="Phone" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm md:text-base" />
                                </label>
                            </div>
                            <label className="block w-full">
                            <span className="sr-only">Email Address</span>
                            <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm md:text-base" />
                            </label>
                            <label className="block w-full">
                            <span className="sr-only">How can we help you?</span>
                            <textarea rows={4} placeholder="How can we help you?" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm md:text-base resize-none"></textarea>
                            </label>
                            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-transform hover:-translate-y-1 shadow-lg">
                                Send Test Enquiry
                            </button>
                        </form>
                    </div>
                )}
            </div>

        </div>
    </section>
    );
  };

  const renderCTA = () => (
    <section className="py-24 md:py-36 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="currentColor"/></pattern><rect width="100%" height="100%" fill="url(#grid)"/></svg>
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-1/2 text-center md:text-left">
            <span className="text-primary-400 font-bold tracking-widest text-sm uppercase mb-4 block">{CONFIG.homepage.cta.titleLabel}</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display leading-tight whitespace-pre-line">{CONFIG.homepage.cta.title}</h2>
            <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-light">{CONFIG.homepage.cta.description}</p>
            <button 
                onClick={() => onNavigate('store')}
                className="bg-primary-500 text-white font-bold py-5 px-12 rounded-lg hover:bg-primary-600 transition-colors shadow-glow uppercase tracking-widest text-sm hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
            >
                {CONFIG.homepage.cta.buttonText}
            </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-white/5 rounded-full p-12 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="absolute inset-0 bg-primary-500/20 rounded-full filter blur-2xl"></div>
                <PaletteIcon className="w-32 h-32 md:w-56 md:h-56 text-white relative z-10 opacity-90" strokeWidth="0.5" />
            </div>
            </div>
        </div>
    </section>
  );

  // Render logic based on Config
  const renderSection = (section: string) => {
      switch(section) {
          case 'hero': return renderHero();
          case 'stats': return renderStats();
          case 'benefits': return renderBenefits();
          case 'experience': return renderExperience();
          case 'cta': return renderCTA();
          default: return null;
      }
  };

  return (
    <div className="min-h-screen pb-12">
        {lightboxState && <MediaOverlay state={lightboxState} onClose={() => setLightboxState(null)} />}
        {CONFIG.layout.home.map((section, index) => (
            <React.Fragment key={`${section}-${index}`}>
                {renderSection(section)}
            </React.Fragment>
        ))}
    </div>
  );
};

export default Home;
