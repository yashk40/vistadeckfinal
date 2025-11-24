
import React from 'react';
import { useCachedAsset } from '../utils/storage';

interface GalleryItemProps {
    img: string;
    onClick?: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ img, onClick }) => {
    // Optimized: Use URL directly. IDB caching removed for performance.
    const cachedSrc = useCachedAsset(img);
    
    return (
        <div 
            onClick={onClick}
            className="rounded-xl overflow-hidden aspect-[4/3] group relative cursor-pointer"
            role="button"
            aria-label="View Image"
        >
            <img 
                src={cachedSrc} 
                alt="Gallery" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu backface-hidden" 
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
    );
};

export default GalleryItem;
