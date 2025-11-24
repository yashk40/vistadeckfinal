
import React, { useState, useEffect } from 'react';
import { SofaIcon, BuildingIcon, LayersIcon } from './Icons';
import { ViewState } from './Header';
import FadeIn from './FadeIn';
import FeatureCard from './FeatureCard';
import { Product, products, features } from '../data';
import { CONFIG } from '../config';
import ProductModal from './ProductModal';
import StoreHero from './StoreHero';
import StoreCategoryNav from './StoreCategoryNav';
import StoreFilters from './StoreFilters';
import { StoreProductCard, ProductSkeleton } from './StoreProductCard';
import { useProductFilter } from '../hooks/useProductFilter';

interface StoreProps {
  addToCart: (product: Product) => void;
  onNavigate: (view: ViewState) => void;
}

const Store: React.FC<StoreProps> = ({ addToCart, onNavigate }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const {
    category, setCategory,
    search, setSearch,
    sort, setSort,
    showOutOfStock, setShowOutOfStock,
    filteredProducts,
    categories,
    resetFilters
  } = useProductFilter(products);

  // Simulate loading delay when category or sort changes
  useEffect(() => {
    // Only trigger if we have products (initial load check)
    if (products.length > 0) {
        setIsFiltering(true);
        const timer = setTimeout(() => {
            setIsFiltering(false);
        }, 600); // 600ms delay for visual feedback
        return () => clearTimeout(timer);
    }
  }, [category, sort, showOutOfStock]);

  const getIcon = (name: string) => {
    const props = { className: "h-6 w-6 md:h-10 md:w-10" };
    switch(name) {
        case 'sofa': return <SofaIcon {...props} className="text-primary-500" />;
        case 'building': return <BuildingIcon {...props} className="text-primary-500" />;
        case 'layers': return <LayersIcon {...props} className="text-primary-500" />;
        default: return <LayersIcon {...props} className="text-primary-500" />;
    }
  };

  return (
    <div className="pt-16 md:pt-24 min-h-screen bg-slate-50 pb-24">
      {/* Hero Slider */}
      <StoreHero />

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-20">
         <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10 mb-12">
            
            {/* Category Navigation */}
            <StoreCategoryNav 
                onNavigate={onNavigate}
                categories={categories}
                selectedCategory={category}
                onSelectCategory={setCategory}
            />

            {/* Toolbar: Filters, Search, Sort */}
            <StoreFilters 
                searchTerm={search}
                onSearchChange={setSearch}
                sortBy={sort}
                onSortChange={setSort}
                showOutOfStock={showOutOfStock}
                onToggleStock={() => setShowOutOfStock(!showOutOfStock)}
                enableStockFilter={CONFIG.store?.showOutOfStockFilter ?? true}
            />
         </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          addToCart={addToCart} 
        />
      )}

      {/* Product Grid */}
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
            {/* Loading Skeletons or Products */}
            {isFiltering ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ProductSkeleton key={`skeleton-${index}`} />
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm animate-in fade-in">
                    <p className="text-slate-500 text-xl mb-6">No demos found matching your criteria.</p>
                    <button 
                        onClick={resetFilters} 
                        className="text-primary-600 font-bold hover:underline uppercase text-sm tracking-widest"
                    >
                        Clear All Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                    {filteredProducts.map(product => (
                        <StoreProductCard 
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                            onClick={setSelectedProduct}
                        />
                    ))}
                </div>
            )}
        </FadeIn>
      </div>

      {/* Features Section moved from Home */}
      <section className="py-20 md:py-32 bg-white border-t border-slate-100 mt-12">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Why Choose VistaDeck</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 font-display leading-tight">
                  Platform excellence meets<br/>elegant design.
                </h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-10 md:gap-16 md:grid-cols-3">
              {features.map((feature, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <FeatureCard icon={getIcon(feature.iconName)} title={feature.title} description={feature.description} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
    </div>
  );
};

export default Store;