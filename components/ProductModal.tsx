
import React, { useState, useEffect } from 'react';
import { XIcon, ChevronLeftIcon, ChevronRightIcon, MaximizeIcon, CheckIcon, SearchIcon, ShareIcon } from './Icons';
import { Product } from '../data';
import { CONFIG } from '../config';
import Tooltip from './Tooltip';
import { useSwipe } from '../hooks/useSwipe';

interface ProductModalProps {
    product: Product;
    onClose: () => void;
    addToCart: (p: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, addToCart }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    
    const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);
    
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: `Check out ${product.name} on ${CONFIG.company.name}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${product.name} - Check it out at ${window.location.href}`);
                alert("Link copied to clipboard!");
            } catch (err) {
                // Fallback if clipboard fails
            }
        }
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    };
    
    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };
    
    // Keyboard navigation for lightbox
    useEffect(() => {
        if (!isLightboxOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsLightboxOpen(false);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, galleryImages.length]);

    // Swipe Navigation for Lightbox
    const swipeHandlers = useSwipe({
        onSwipeLeft: handleNext,
        onSwipeRight: handlePrev,
    });
    
    const renderLightbox = () => (
        <div 
        className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300"
        onClick={() => setIsLightboxOpen(false)}
        {...swipeHandlers}
        >
        <div className="absolute top-6 right-6 z-[80]">
            <Tooltip content="Close" position="bottom">
                <button onClick={() => setIsLightboxOpen(false)} aria-label="Close lightbox" className="text-white/50 hover:text-white transition-colors p-2">
                    <XIcon className="w-10 h-10" />
                </button>
            </Tooltip>
        </div>
    
        {galleryImages.length > 1 && (
            <>
            <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[80] hidden md:block">
                <Tooltip content="Previous" position="right">
                    <button 
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
                        aria-label="Previous image"
                        className="p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                    >
                        <ChevronLeftIcon className="w-12 h-12" />
                    </button>
                </Tooltip>
            </div>
            <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[80] hidden md:block">
                <Tooltip content="Next" position="left">
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleNext(); }} 
                        aria-label="Next image"
                        className="p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                    >
                        <ChevronRightIcon className="w-12 h-12" />
                    </button>
                </Tooltip>
            </div>
            </>
        )}
    
        <div className="w-full h-full flex items-center justify-center p-4 md:p-20 pointer-events-none">
            <img 
                src={galleryImages[activeImageIndex]} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain shadow-2xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()} 
            />
        </div>
        
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-base font-bold tracking-[0.2em] pointer-events-none">
            {activeImageIndex + 1} / {galleryImages.length}
        </div>
        </div>
    );
    
    return (
        <>
        {isLightboxOpen && renderLightbox()}
        
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-5xl min-h-[600px] max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 relative">
            
            <div className="w-full md:w-[55%] bg-slate-100 flex flex-col relative group">
                <div 
                className="relative w-full aspect-square md:aspect-auto md:flex-1 cursor-zoom-in overflow-hidden"
                onClick={() => setIsLightboxOpen(true)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsLightboxOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="View image fullscreen"
                >
                <img 
                    src={galleryImages[activeImageIndex]} 
                    alt={product.name} 
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm text-slate-900 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                        <MaximizeIcon className="w-5 h-5" />
                        View Fullscreen
                    </div>
                </div>
                </div>
    
                {galleryImages.length > 1 && (
                <div className="flex gap-3 p-5 overflow-x-auto bg-white border-t border-slate-200 no-scrollbar shrink-0">
                    {galleryImages.map((img, idx) => (
                    <button 
                        key={idx} 
                        type="button"
                        aria-label={`View image ${idx + 1}`}
                        aria-current={activeImageIndex === idx ? 'true' : 'false'}
                        onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                        className={`relative w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${activeImageIndex === idx ? 'border-primary-500 ring-1 ring-primary-500 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
                    </button>
                    ))}
                </div>
                )}
            </div>
    
            <div className="w-full md:w-[45%] p-6 md:p-12 overflow-y-auto bg-white relative flex flex-col">
                <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
                    <Tooltip content="Share Product" position="bottom">
                        <button onClick={handleShare} aria-label="Share product" className="bg-slate-100 p-2.5 rounded-full hover:bg-slate-200 transition-colors text-slate-600 hover:text-primary-600">
                            <ShareIcon className="w-5 h-5" />
                        </button>
                    </Tooltip>
                    <Tooltip content="Close" position="bottom">
                        <button onClick={onClose} aria-label="Close details" className="bg-slate-100 p-2.5 rounded-full hover:bg-slate-200 transition-colors text-slate-600 hover:text-red-500">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </Tooltip>
                </div>
    
                <div className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-3">{product.category}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5 font-display">{product.name}</h2>
                <div className="flex items-center gap-4 mb-8">
                    <div className="text-3xl font-bold text-slate-900">${product.price}</div>
                    {!product.inStock && (
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">Sold Out</span>
                    )}
                </div>
                
                <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed flex-grow mb-8">
                <p>{product.description}</p>
                </div>
    
                {product.features && (
                <div className="mb-10">
                    <h3 className="text-xs font-bold uppercase text-slate-900 mb-4 tracking-wider">Included Features</h3>
                    <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-base text-slate-600">
                        <CheckIcon className="w-5 h-5 text-primary-500 mr-3 shrink-0" />
                        {feature}
                        </li>
                    ))}
                    </ul>
                </div>
                )}

                <div className="flex flex-col gap-3 mt-auto">
                    {product.demoUrl && (
                        <a 
                            href={product.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all border-2 border-slate-900 text-slate-900 hover:bg-slate-50 flex items-center justify-center gap-2 group"
                        >
                            <SearchIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            View Live Demo
                        </a>
                    )}
    
                    <button 
                    onClick={() => {
                        addToCart(product);
                        onClose();
                    }}
                    disabled={!product.inStock}
                    className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg ${
                        product.inStock 
                        ? 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl transform hover:-translate-y-0.5' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                    >
                    {product.inStock ? 'Purchase Setup' : 'Sold Out'}
                    </button>
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default ProductModal;
