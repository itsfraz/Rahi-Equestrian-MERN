import React from 'react';
import { FaStar, FaShoppingCart, FaHeart, FaTruck, FaShieldAlt, FaUndo, FaRuler, FaPalette } from 'react-icons/fa';

const ProductInfo = ({ 
  product, 
  selectedSize, 
  setSelectedSize, 
  selectedColor, 
  setSelectedColor, 
  quantity, 
  setQuantity,
  onAddToCart 
}) => {
  const originalPrice = (product.price * 1.3).toFixed(2);
  const savings = (product.price * 0.3).toFixed(2);

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {product.category}
          </span>
          {product.status === 'New' && (
             <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               New Arrival
             </span>
          )}
        </div>
        
        <h1 className="text-3xl md:text-5xl font-display font-black text-text leading-tight">
          {product.name}
        </h1>

        {/* Ratings */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`${i < 4 ? 'text-yellow-400' : 'text-gray-200'} text-lg transition-transform group-hover:scale-110 duration-200`} />
            ))}
          </div>
          <p className="text-sm font-medium text-text-light group-hover:text-primary transition-colors">
            4.8 <span className="mx-1">•</span> 128 Reviews
          </p>
        </div>
      </div>

      {/* Dynamic Pricing */}
      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl lg:text-5xl font-black text-text">
            ${product.price}
          </span>
          <span className="text-xl text-gray-400 line-through font-medium">
            ${originalPrice}
          </span>
        </div>
        <p className="text-sm text-green-600 font-bold flex items-center gap-2">
          <span className="bg-green-100 px-2 py-0.5 rounded text-xs">SAVE 30%</span>
          You save ${savings}
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed text-lg">
        {product.description}
      </p>

      <div className="h-px bg-gray-100 w-full" />

      {/* Variants Selection */}
      <div className="space-y-6">
        {/* Color Selector */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-3">
             <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg w-full md:w-auto md:inline-flex pr-4 mb-2">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-md shadow-sm text-gray-500">
                        <FaPalette size={14}/>
                    </div>
                    <span className="text-sm font-bold text-text uppercase tracking-wide">Color</span>
                </div>
                 <span className="text-sm font-medium text-text-light ml-2">{selectedColor}</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`
                    group relative w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center
                    ${selectedColor === color 
                      ? 'ring-2 ring-offset-2 ring-primary scale-110 shadow-lg' 
                      : 'hover:scale-110 hover:shadow-md ring-1 ring-gray-200'
                    }
                  `}
                  title={color}
                >
                  <span 
                    className="w-full h-full rounded-full border border-black/5" 
                    style={{ backgroundColor: color }}
                  />
                  {selectedColor === color && (
                    <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center w-full">
                 <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg w-full md:w-auto md:inline-flex pr-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md shadow-sm text-gray-500">
                            <FaRuler size={14}/>
                        </div>
                        <span className="text-sm font-bold text-text uppercase tracking-wide">Size</span>
                    </div>
                     <span className="text-sm font-medium text-text-light ml-2">{selectedSize}</span>
                </div>
               <button className="text-xs font-semibold text-primary hover:underline underline-offset-4">Size Guide</button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    relative min-w-14 h-12 px-4 rounded-xl font-bold text-sm transition-all duration-200
                    ${selectedSize === size
                      ? 'bg-text text-white shadow-lg shadow-gray-200 -translate-y-1'
                      : 'bg-white border border-gray-200 text-text hover:border-text hover:bg-gray-50'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quantity & Actions (Desktop) */}
      <div className="hidden lg:flex flex-col gap-4 mt-4">
        <label className="text-sm font-bold text-text uppercase tracking-wide">Quantity</label>
        <div className="flex gap-4">
          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 w-32">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-full flex items-center justify-center text-lg font-bold text-gray-500 hover:text-text hover:bg-white rounded-l-xl transition-colors"
            >
              −
            </button>
            <input 
              type="text" 
              value={quantity} 
              readOnly 
              className="w-full text-center bg-transparent font-bold text-text focus:outline-none"
            />
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-full flex items-center justify-center text-lg font-bold text-gray-500 hover:text-text hover:bg-white rounded-r-xl transition-colors"
            >
              +
            </button>
          </div>
          
          <button 
            onClick={onAddToCart}
            className="flex-1 btn-premium bg-linear-to-r from-primary to-primary-dark text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-transform"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
          
          <button className="w-14 h-14 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-300">
            <FaHeart className="text-xl" />
          </button>
        </div>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-2 gap-4 pt-6">
        {[
          { icon: FaTruck, title: 'Free Shipping', desc: 'On orders over $150' },
          { icon: FaShieldAlt, title: '2 Year Warranty', desc: 'Full protection' },
          { icon: FaUndo, title: 'Free Returns', desc: 'Within 30 days' },
          { icon: FaShieldAlt, title: 'Secure Checkout', desc: '100% Protected' }, // Reusing icon for example
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="mt-1 text-primary bg-primary/10 p-2 rounded-lg">
                <item.icon size={16} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-text">{item.title}</h4>
              <p className="text-xs text-text-light">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
