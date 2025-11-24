
import React from 'react';
import { ShareIcon, DownloadIcon } from './Icons';
import { CONFIG } from '../config';
import { useCachedAsset } from '../utils/storage';
import { Brochure } from '../data';
import Tooltip from './Tooltip';

interface BrochureCardProps {
    doc: Brochure;
    onShare: (e: React.MouseEvent, title: string) => void;
    onClick?: () => void;
}

const BrochureCard: React.FC<BrochureCardProps> = ({ doc, onShare, onClick }) => {
    // Optimized: Use URL directly. IDB caching removed for performance.
    const cachedSrc = useCachedAsset(doc.image);
    
    return (
        <div className="group flex flex-col h-full cursor-pointer" onClick={onClick}>
            {/* Card Image Container */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[3/4] mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
                <img 
                src={cachedSrc} 
                alt={doc.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu backface-hidden"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* Logo / Watermark Overlay */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-60">
                <span className="text-[10px] md:text-xs text-white font-bold tracking-widest uppercase">{CONFIG.company.shortName}</span>
                </div>

                {/* Share Button */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <Tooltip content="Share Brochure" position="right">
                        <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onShare(e, doc.title);
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-lg transform transition-transform duration-200 hover:scale-110 hover:bg-primary-50"
                        aria-label="Share Brochure"
                        >
                        <ShareIcon className="w-4 h-4" />
                        </button>
                    </Tooltip>
                </div>

                {/* Download Overlay on Hover */}
                <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <DownloadIcon className="w-5 h-5" /> View Details
                    </div>
                </div>

                {/* Text Overlay on Image Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <h4 className="text-white font-display font-bold text-lg md:text-2xl leading-tight mb-1 md:mb-2">{doc.title.split(' ')[0]}</h4>
                    <p className="text-white/90 text-xs md:text-sm font-light tracking-wide uppercase line-clamp-1 md:line-clamp-none">{doc.title.split(' ').slice(1).join(' ')}</p>
                </div>
            </div>
            
            {/* Bottom Details */}
            <div className="px-1">
                <h4 className="font-bold text-slate-800 text-sm md:text-lg truncate">{doc.title}</h4>
                <p className="text-xs md:text-sm text-slate-500 mt-1 uppercase tracking-wide font-bold">{doc.size}</p>
            </div>
        </div>
    );
};

export default BrochureCard;
