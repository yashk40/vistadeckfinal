
import React from 'react';
import { SearchIcon, FilterIcon, XIcon } from './Icons';

interface StoreFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showOutOfStock: boolean;
  onToggleStock: () => void;
  enableStockFilter?: boolean;
}

const StoreFilters: React.FC<StoreFiltersProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  showOutOfStock,
  onToggleStock,
  enableStockFilter = true
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-400" />
          </div>
          <input
              type="text"
              placeholder="Search products, demos..."
              aria-label="Search products, demos"
              className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
      </div>

      {/* Controls Group */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
                <div className="flex items-center text-slate-500 gap-2">
                    <FilterIcon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider" id="sort-label">Sort By:</span>
                </div>
                <select 
                    aria-labelledby="sort-label"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="form-select block w-full sm:w-auto pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-slate-50 font-medium text-slate-700 cursor-pointer"
                >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>

            {enableStockFilter && (
                <>
                    <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>

                    {/* Stock Toggle */}
                    <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                        <input 
                            type="checkbox" 
                            className="sr-only" 
                            checked={showOutOfStock}
                            onChange={onToggleStock}
                            aria-label="Show out of stock products"
                        />
                        <div className={`block w-10 h-6 rounded-full transition-colors duration-300 ${showOutOfStock ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${showOutOfStock ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                    <span className="ml-3 text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-700 transition-colors select-none">
                        Show Out of Stock
                    </span>
                </label>
                </>
            )}
      </div>
    </div>
  );
};

export default StoreFilters;