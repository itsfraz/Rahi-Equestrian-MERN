import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const Products = ({ limit, featured }) => {
  const [filteredData, setFilteredData] = useState(products);
  const [activeCategory, setActiveCategory] = useState('All');

  // Helper to extract unique categories plus our special filters
  const getCategories = () => {
    const defaultCats = [...new Set(products.map(item => item.category))];
    return ['All', 'Limited Edition', 'Seasonal', ...defaultCats];
  };

  const categories = getCategories();

  const filterItem = (category) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setFilteredData(products);
    } else if (category === 'Limited Edition') {
      setFilteredData(products.filter(item => item.limited_edition));
    } else if (category === 'Seasonal') {
      setFilteredData(products.filter(item => item.seasonal));
    } else {
      setFilteredData(products.filter(item => item.category === category));
    }
  };

  const getDisplayData = () => {
    if (featured) {
      // Just show a mix of everything for featured, prioritizing limited/seasonal if relevant
      const distinctCategories = [...new Set(products.map(item => item.category))];
      return distinctCategories.map(cat => products.find(item => item.category === cat));
    }
    return limit ? filteredData.slice(0, limit) : filteredData;
  };

  const displayData = getDisplayData();

  return (
    <>
      {!limit && !featured && (
        <Helmet>
          <title>Equestrian Products - Premium Saddles & Riding Gear | Rahi Equestrian</title>
          <meta name="description" content="Browse our complete collection of premium equestrian products including handcrafted saddles, riding gear, horse care essentials, and accessories." />
          <meta name="keywords" content="equestrian products, horse saddles, bridles, riding boots, horse blankets, grooming supplies" />
          <meta property="og:title" content="Equestrian Products | Rahi Equestrian" />
          <meta property="og:description" content="Browse our complete collection of premium equestrian products." />
          <link rel="canonical" href="https://rahiequestrian.com/products" />
        </Helmet>
      )}
      
      <div className="py-12 md:py-20 container-custom">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 gradient-text animate-fade-in">
          {featured ? 'Featured Collections' : (limit ? 'Featured Products' : 'Our Collection')}
        </h1>
        <div className="w-24 h-1.5 bg-linear-to-r from-primary via-accent to-primary mx-auto rounded-full animate-[scaleIn_0.8s_ease-out_0.2s_both]"></div>
      </div>

      {!limit && !featured && (
        <div className="flex gap-2 mb-12 overflow-x-auto py-2 scrollbar-none md:justify-center md:flex-wrap md:overflow-visible">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`
                btn-premium px-5 py-2.5 rounded-full font-semibold text-sm
                transition-all duration-200 ease-out
                whitespace-nowrap shrink-0 border-2
                ${activeCategory === cat 
                  ? 'bg-linear-to-r from-primary to-accent text-white border-transparent shadow-lg shadow-primary/20 scale-[1.02]' 
                  : 'bg-white border-gray-200 text-text-light hover:border-primary/30 hover:text-primary hover:bg-primary/5 hover:scale-[1.02]'
                }
                active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2
              `}
              onClick={() => filterItem(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
        {displayData.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Products;
