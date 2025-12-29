import React, { useState } from 'react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const Products = ({ limit, featured }) => {
  const [filteredData, setFilteredData] = useState(products);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(item => item.category))];

  const filterItem = (category) => {
    setActiveCategory(category);
    setFilteredData(
      category === 'All'
        ? products
        : products.filter(item => item.category === category)
    );
  };

  const getDisplayData = () => {
    if (featured) {
      const distinctCategories = [...new Set(products.map(item => item.category))];
      return distinctCategories.map(cat => products.find(item => item.category === cat));
    }
    return limit ? filteredData.slice(0, limit) : filteredData;
  };

  const displayData = getDisplayData();

  return (
    <div className="py-12 md:py-20 container-custom">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 gradient-text animate-[fadeIn_0.6s_ease-out]">
          {featured ? 'Featured Collections' : (limit ? 'Featured Products' : 'Our Collection')}
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full animate-[scaleIn_0.8s_ease-out_0.2s_both]"></div>
      </div>

      {!limit && !featured && (
        <div className="flex gap-2 mb-12 overflow-x-auto py-2 scrollbar-none md:justify-center md:flex-wrap md:overflow-visible">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`
                btn-premium px-5 py-2.5 rounded-full font-semibold text-sm
                transition-all duration-200 ease-out
                whitespace-nowrap flex-shrink-0 border-2
                ${activeCategory === cat 
                  ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-lg shadow-primary/20 scale-[1.02]' 
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
          <Link 
            to={`/product/${product.id}`} 
            className="group card-premium flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2" 
            key={product.id}
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
          >
            <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center overflow-hidden rounded-t-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500"></div>
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full h-full object-contain transition-all duration-500 mix-blend-multiply group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex items-center">
                View <FiArrowRight className="ml-1 w-3 h-3" />
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs uppercase tracking-wider text-primary font-bold mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                {product.category}
              </span>
              <h3 className="text-base md:text-lg font-bold mb-2 text-text leading-snug group-hover:text-primary transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-text-light text-sm mb-4 leading-relaxed line-clamp-2 flex-grow">
                {product.description}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <button className="btn-premium bg-text text-white py-2.5 px-5 rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                  <span>Shop</span>
                  <FiShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
