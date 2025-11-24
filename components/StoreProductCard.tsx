
import React, { useState, memo } from 'react';
import { PlusIcon } from './Icons';
import { Product } from '../data';
import Tooltip from './Tooltip';

export const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full">
    <div className="aspect-square bg-slate-200 animate-pulse relative"></div>
    <div className="p-6 flex flex-col gap-3 flex-grow">
        <div className="h-3 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2">
            <div className="flex justify-between items-end">
                <div className="h-6 bg-slate-200 rounded w-1/3 animate-pulse"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded-lg w-full animate-pulse"></div>
        </div>
    </div>
  </div>
);

interface StoreProductCardProps {
    product: Product;
    addToCart: (p: Product) => void;
    onClick: (p: Product) => void;
}

export const StoreProductCard = memo(({ 
    product, 
    addToCart, 
    onClick 
}: StoreProductCardProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const discountPercentage = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
        : 0;
    const isLowStock = product.inStock && product.stockLevel !== undefined && product.stockLevel < 5;

    return (
        <div 
            onClick={() => onClick(product)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(product)}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${product.name}`}
            className={`group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer border border-transparent hover:border-primary-100 relative ${!product.inStock ? 'opacity-80' : 'hover:-translate-y-2'}`}
        >
            {!product.inStock && (
                <div className="absolute top-0 left-0 w-full h-full bg-white/30 z-10 pointer-events-none"></div>
            )}
            
            <div className="relative aspect-square overflow-hidden bg-slate-100">
                {/* Image Loading Skeleton */}
                <div className={`absolute inset-0 bg-slate-200 animate-pulse z-0 transition-opacity duration-500 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
                
                <img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsImageLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 transform-gpu backface-hidden relative z-10 ${isImageLoaded ? 'opacity-100' : 'opacity-0'} ${!product.inStock ? 'grayscale' : ''}`}
                />
                
                {/* Stock Badge */}
                {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-20">
                        <span className="bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded uppercase tracking-widest shadow-lg">
                            Sold Out
                        </span>
                    </div>
                )}
                
                {/* Discount Tag */}
                {discountPercentage > 0 && product.inStock && (
                    <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-md shadow-sm z-20">
                        -{discountPercentage}%
                    </div>
                )}

                {/* Quick Add (Only if in stock) */}
                {product.inStock && (
                    <div className="absolute bottom-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <Tooltip content="Quick Add" position="left">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                                className="bg-white text-slate-900 p-3 rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors"
                                aria-label={`Quick add ${product.name} to cart`}
                            >
                                <PlusIcon className="w-5 h-5" />
                            </button>
                        </Tooltip>
                    </div>
                )}
                
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-600 z-20 shadow-sm">
                    {product.category}
                </div>
            </div>
            
            <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-slate-500 text-xs md:text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                <span className={`text-lg md:text-xl font-bold ${!product.inStock ? 'text-slate-400 line-through decoration-red-500 decoration-2' : 'text-slate-900'}`}>
                                    ${product.price}
                                </span>
                                {product.originalPrice && (
                                        <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
                                )}
                                </div>
                                {/* Stock Indicator */}
                                {product.inStock && (
                                    <div className={`text-xs font-bold flex items-center gap-1.5 mt-0.5 ${isLowStock ? 'text-amber-600' : 'text-emerald-600'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${isLowStock ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                                        {isLowStock ? 'Limited Setup' : 'Available'}
                                    </div>
                                )}
                        </div>
                    </div>
                    
                    {/* Explicit Add Button */}
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        disabled={!product.inStock}
                        className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                            product.inStock 
                            ? 'bg-slate-900 text-white hover:bg-slate-800' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        {product.inStock ? 'Select Demo' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
});
