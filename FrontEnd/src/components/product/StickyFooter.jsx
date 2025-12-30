import React from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const StickyFooter = ({ product, onAddToCart }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-strong border-t border-gray-200 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] md:hidden z-50 animate-[slideUp_0.4s_ease-out]">
        
        {/* Helper Text / Low Stock Warning (Optional Detail) */}
        {product.quantity < 5 && (
             <div className="text-xs text-orange-500 font-bold mb-2 text-center animate-pulse">
                Only {product.quantity || 'a few'} left in stock!
             </div>
        )}

        <div className="flex gap-3 items-center">
            <div className="flex flex-col">
                <span className="text-xs text-text-light font-medium">Total Price</span>
                <span className="text-xl font-black text-primary">${product.price}</span>
            </div>

            <button 
                onClick={onAddToCart} 
                className="btn-premium flex-1 bg-linear-to-r from-primary to-primary-dark text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-primary/25"
            >
                <FaShoppingCart />
                Add to Cart
            </button>
            <button className="btn-premium w-12 h-12 flex items-center justify-center bg-gray-50 border-2 border-gray-200 text-gray-400 rounded-xl active:scale-90 hover:text-red-500 hover:border-red-200 transition-colors">
                <FaHeart className="text-lg" />
            </button>
        </div>
    </div>
  );
};

export default StickyFooter;
