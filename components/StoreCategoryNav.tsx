
import React from 'react';
import { ArrowLeftIcon } from './Icons';
import { ViewState } from './Header';

interface StoreCategoryNavProps {
  onNavigate: (view: ViewState) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const StoreCategoryNav: React.FC<StoreCategoryNavProps> = ({
  onNavigate,
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-8">
      <div>
        <button 
            onClick={() => onNavigate('home')}
            className="flex items-center text-slate-400 hover:text-primary-600 transition-colors text-xs font-bold uppercase tracking-wider group mb-3"
        >
            <ArrowLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Industry Demos</h1>
      </div>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
        {categories.map(category => (
        <button
            key={category}
            role="tab"
            aria-selected={selectedCategory === category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
            selectedCategory === category
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'
            }`}
        >
            {category}
        </button>
        ))}
      </div>
    </div>
  );
};

export default StoreCategoryNav;
