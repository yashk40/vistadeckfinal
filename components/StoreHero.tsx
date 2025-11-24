import React, { useState, useEffect } from 'react';

const StoreHero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            id: 1,
            title: "VistaDeck Demo",
            subtitle: "Experience the future of digital showcasing.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        },
        {
            id: 2,
            title: "Unlimited SKUs",
            subtitle: "Scale your catalog without any limits.",
            image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        },
        {
            id: 3,
            title: "Mobile Perfect",
            subtitle: "Optimized for every screen, everywhere.",
            image: "https://images.unsplash.com/photo-1512428559087-560fa0db7f59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-slate-900">
            {slides.map((slide, index) => (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-full object-cover opacity-50" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className={`transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <span className="text-primary-400 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Interactive Platform Demo</span>
                            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">{slide.title}</h2>
                            <p className="text-slate-200 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">{slide.subtitle}</p>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-white' : 'w-3 bg-white/30 hover:bg-white/60'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StoreHero;