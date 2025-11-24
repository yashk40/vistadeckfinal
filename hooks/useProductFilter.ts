import { useState, useMemo } from 'react';
import { Product } from '../data';

export const useProductFilter = (products: Product[]) => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [showOutOfStock, setShowOutOfStock] = useState(false);

  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(products.map(p => p.category)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                            product.description.toLowerCase().includes(search.toLowerCase());
      const matchesStock = showOutOfStock ? true : product.inStock;
      
      return matchesCategory && matchesSearch && matchesStock;
    }).sort((a, b) => {
        switch (sort) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default: return 0; 
        }
    });
  }, [products, category, search, sort, showOutOfStock]);

  return {
    category, setCategory,
    search, setSearch,
    sort, setSort,
    showOutOfStock, setShowOutOfStock,
    filteredProducts,
    categories,
    resetFilters: () => {
      setSearch('');
      setCategory('All');
      setSort('featured');
      setShowOutOfStock(false);
    }
  };
};