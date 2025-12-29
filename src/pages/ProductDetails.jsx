import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaStar, FaShoppingCart, FaHeart, FaChevronLeft, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (swiperInstance && swiperInstance.activeIndex !== activeIndex) {
      swiperInstance.slideTo(activeIndex);
    }
  }, [activeIndex, swiperInstance]);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-3xl font-display font-bold mb-6">Product not found</h2>
        <Link to="/products" className="btn-premium bg-gradient-to-r from-primary to-accent text-white py-3 px-8 rounded-full inline-flex items-center gap-2">
          <FaChevronLeft /> Back to Products
        </Link>
      </div>
    );
  }

  const galleryImages = product.images || [product.image];

  return (
    <div className="pb-20 md:pb-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        
        {/* Breadcrumb */}
        <div className="py-6 md:py-8 text-sm flex items-center gap-2 flex-wrap animate-[fadeIn_0.5s_ease-out]">
          <Link 
            to="/products" 
            className="flex items-center gap-2 font-semibold text-text hover:text-primary transition-all duration-300 hover:gap-3 group"
          >
            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300" /> 
            <span>Back to Products</span>
          </Link>
          <span className="text-gray-300">•</span>
          <span className="text-text-light">{product.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 mt-4">
          
          {/* LEFT COLUMN - GALLERY */}
          <div className="relative w-full animate-[scaleIn_0.6s_ease-out]">
            
            {/* Desktop Main Image */}
            <div className="hidden lg:block">
              <div className="card-premium w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <img 
                  src={galleryImages[activeIndex]} 
                  alt={product.name} 
                  className="relative z-10 w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-primary shadow-lg">
                  {activeIndex + 1} / {galleryImages.length}
                </div>
              </div>
            </div>

            {/* Mobile Swiper Gallery */}
            <div className="block lg:hidden mb-4 relative overflow-hidden">
              <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={0}
                className="w-full h-[400px] rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100"
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                {galleryImages.map((img, index) => (
                  <SwiperSlide key={index} className="flex items-center justify-center p-6">
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="hidden lg:flex justify-center gap-3 mt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300
                      ${activeIndex === index 
                        ? 'border-primary shadow-lg shadow-primary/30 scale-105' 
                        : 'border-gray-200 hover:border-primary/50 hover:scale-105'
                      }
                    `}
                  >
                    <img src={img} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - INFO */}
          <div className="flex flex-col gap-6 animate-[slideUp_0.6s_ease-out_0.2s_both]">
            
            {/* Title & Category */}
            <div>
              <span className="inline-block bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-text mb-4 leading-tight">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`${i < 4 ? 'text-yellow-400' : 'text-gray-300'} text-lg`} />
                  ))}
                </div>
                <span className="text-text-light text-sm font-medium">(4.0) • 128 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 py-4 border-y border-gray-200">
              <span className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ${product.price}
              </span>
              <span className="text-2xl text-gray-400 line-through">${(product.price * 1.3).toFixed(2)}</span>
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Save 30%
              </span>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-text-light leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-text mb-3 uppercase tracking-wide">Select Size</h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        btn-premium px-6 py-3 rounded-xl font-bold text-sm border-2 transition-all duration-300 min-w-[60px]
                        ${selectedSize === size
                          ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-lg'
                          : 'bg-white border-gray-200 text-text hover:border-primary'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-text mb-3 uppercase tracking-wide">Select Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`
                        w-12 h-12 rounded-full border-4 transition-all duration-300
                        ${selectedColor === color 
                          ? 'border-primary scale-110 shadow-lg' 
                          : 'border-gray-200 hover:border-primary/50 hover:scale-105'
                        }
                      `}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-bold text-text mb-3 uppercase tracking-wide">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 bg-gray-50 hover:bg-gray-100 font-bold text-lg transition-colors duration-200 active:scale-90"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 font-bold text-lg min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 bg-gray-50 hover:bg-gray-100 font-bold text-lg transition-colors duration-200 active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="btn-premium flex-1 bg-gradient-to-r from-primary to-accent text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                <FaShoppingCart />
                Add to Cart
              </button>
              <button className="btn-premium bg-white border-2 border-gray-200 text-text py-4 px-6 rounded-xl font-bold transition-all duration-300 hover:border-red-500 hover:text-red-500 hover:bg-red-50 active:scale-90">
                <FaHeart className="text-2xl" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              {[
                { icon: FaTruck, text: 'Free Shipping', color: 'text-blue-500' },
                { icon: FaShieldAlt, text: 'Secure Payment', color: 'text-green-500' },
                { icon: FaUndo, text: '30 Days Return', color: 'text-purple-500' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
                  <feature.icon className={`${feature.color} text-2xl`} />
                  <span className="text-sm font-semibold text-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-strong border-t border-gray-200 p-4 shadow-2xl md:hidden z-50 animate-[slideUp_0.4s_ease-out]">
        <div className="flex gap-3">
          <button className="btn-premium flex-1 bg-gradient-to-r from-primary to-accent text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95">
            <FaShoppingCart />
            Add to Cart
          </button>
          <button className="btn-premium bg-white border-2 border-gray-200 text-text py-4 px-5 rounded-xl active:scale-90">
            <FaHeart className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
