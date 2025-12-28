import React, { useState } from 'react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

const Products = ({ limit }) => {
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

  const displayData = limit ? filteredData.slice(0, limit) : filteredData;

  return (
    <div className="py-12 md:py-16 container-custom">
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl mb-3 text-text px-4">
        {limit ? 'Featured Products' : 'Our Collection'}
      </h1>

      {!limit && (
        <div className="flex gap-3 mb-8 overflow-x-auto py-2 scrollbar-none md:justify-center md:flex-wrap md:overflow-visible">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`
                bg-white border rounded-full py-2.5 px-5 font-medium transition-all duration-200 
                whitespace-nowrap flex-shrink-0 min-h-[44px]
                ${activeCategory === cat 
                  ? 'bg-primary text-white border-primary shadow-[0_2px_8px_rgba(37,99,235,0.3)]' 
                  : 'border-gray-300 text-text-light hover:border-primary hover:text-primary'
                }
                active:scale-95
              `}
              onClick={() => filterItem(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 pb-8">
        {displayData.map(product => (
          <Link 
            to={`/product/${product.id}`} 
            className="bg-white rounded-xl overflow-hidden shadow transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]" 
            key={product.id}
          >
            <div className="w-full aspect-square bg-gray-100 p-5 flex items-center justify-center relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain transition-transform duration-400 mix-blend-multiply hover:scale-110"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <span className="text-[0.7rem] uppercase tracking-wider text-primary font-semibold mb-2">
                {product.category}
              </span>
              <h3 className="text-lg font-bold mb-2 text-text leading-tight">
                {product.name}
              </h3>
              <p className="text-text-light text-sm mb-4 leading-normal line-clamp-2">
                {product.description}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3">
                <span className="text-xl font-bold text-text">
                  ${product.price}
                </span>
                <button className="bg-text text-white py-2 px-4 rounded-md font-medium text-sm transition-colors duration-200 whitespace-nowrap min-h-[40px] hover:bg-primary active:scale-95">
                  Buy Now
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
