import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const ProductCard = memo(({ product, index }) => {
  return (
    <Link 
        to={`/product/${product.id}`} 
        className={`
            group card-premium flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2
            ${product.limited_edition ? 'ring-2 ring-accent shadow-accent/20' : ''}
        `}
        style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
    >
        <div className={`
            relative w-full aspect-square bg-linear-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center overflow-hidden rounded-t-2xl
            ${product.limited_edition ? 'from-accent/5 to-primary/5' : ''}
        `}>
            <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500"></div>
            
            {/* Limited Edition Badge */}
            {product.limited_edition && (
                <div className="absolute top-0 left-0 bg-accent text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-br-lg z-20 shadow-md">
                    Limited Edition
                </div>
            )}
            {/* Seasonal Badge */}
            {!product.limited_edition && product.seasonal && (
                <div className="absolute top-0 left-0 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-br-lg z-20 shadow-md">
                    Seasonal
                </div>
            )}

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
                <span className={`w-1.5 h-1.5 rounded-full ${product.limited_edition ? 'bg-accent' : 'bg-primary'}`}></span>
                {product.category}
            </span>
            <h3 className="text-base md:text-lg font-bold mb-2 text-text leading-snug group-hover:text-primary transition-colors duration-200">
                {product.name}
            </h3>
            <p className="text-text-light text-sm mb-4 leading-relaxed line-clamp-2 grow">
                {product.description}
            </p>

            <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <span className={`text-xl md:text-2xl font-black bg-clip-text text-transparent ${product.limited_edition ? 'bg-linear-to-r from-accent to-accent-dark' : 'bg-linear-to-r from-primary to-accent'}`}>
                    ${product.price}
                </span>
                <button className="btn-premium bg-text text-white py-2.5 px-5 rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-linear-to-r hover:from-primary hover:to-accent hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                    <span>Shop</span>
                    <FiShoppingBag className="w-4 h-4" />
                </button>
            </div>
        </div>
    </Link>
  );
});

export default ProductCard;
