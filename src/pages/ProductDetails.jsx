import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaStar, FaShoppingCart, FaHeart, FaChevronLeft } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (product) {
      // Default selections if available
      if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2>Product not found</h2>
        <Link to="/products" className="btn-secondary">Back to Products</Link>
      </div>
    );
  }

  // Fallback if no gallery images
  const galleryImages = product.images || [product.image];

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Sync Swiper when activeIndex changes (e.g. from thumbnail click)
  useEffect(() => {
    if (swiperInstance && swiperInstance.activeIndex !== activeIndex) {
      swiperInstance.slideTo(activeIndex);
    }
  }, [activeIndex, swiperInstance]);

  return (
    <div className="pb-20 md:pb-16 bg-white">
      <div className="container-custom">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="py-6 md:py-4 text-sm text-text-light flex items-center gap-2 flex-wrap">
          <Link 
            to="/products" 
            className="flex items-center gap-1 font-medium text-text transition-colors duration-200 active:text-primary"
          >
            <FaChevronLeft /> Back to Products
          </Link>
          <span className="text-gray-400 select-none">/</span>
          <span className="text-text-light">{product.category}</span>
          <span className="text-gray-400 select-none">/</span>
          <span className="text-text-light">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 mt-4">
          
          {/* LEFT COLUMN - GALLERY */}
          <div className="relative w-full">
            
            {/* Desktop Main Image */}
            <div className="hidden lg:block">
              <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center relative">
                 <img 
                   src={galleryImages[activeIndex]} 
                   alt={product.name} 
                   className="w-full h-full object-contain mix-blend-multiply" 
                 />
              </div>
            </div>

            {/* Mobile Swiper Gallery */}
            <div className="block lg:hidden mb-4 relative overflow-hidden">
              <div className="w-full max-w-full relative overflow-hidden">
                <Swiper
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  slidesPerView={1}
                  spaceBetween={0}
                  watchOverflow={true}
                  observer={true}
                  observeParents={true}
                  className="w-full max-w-full h-[350px] min-[480px]:h-[400px] rounded-xl bg-gray-100 relative"
                  onSwiper={setSwiperInstance}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                  {galleryImages.map((img, index) => (
                    <SwiperSlide key={index} className="h-full flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
                        <img
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          loading="eager"
                          className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>


            {/* Shared Thumbnails (Visible on both Desktop & Mobile) */}
            <div className="flex gap-3 overflow-x-auto pt-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {galleryImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`
                    w-[70px] h-[70px] md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden 
                    border-2 cursor-pointer bg-gray-100 transition-all duration-200
                    ${activeIndex === index 
                      ? 'border-primary shadow-[0_0_0_1px_rgba(37,99,235,0.2)]' 
                      : 'border-transparent'
                    }
                  `}
                  onClick={() => setActiveIndex(index)}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index}`} 
                    className={`w-full h-full object-cover transition-opacity duration-200 ${activeIndex === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                  />
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN - INFO */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="bg-blue-50 text-primary py-1 px-3 rounded-full text-[0.7rem] font-bold uppercase inline-block mb-3">
                New Arrival
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-text leading-tight">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap gap-4 items-center pb-4 mb-4 border-b border-gray-200">
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                  <span className="text-text-light text-sm ml-2">(4.8 Reviews)</span>
                </div>
                <span className="text-xs text-text-lighter">SKU: {`MK-${product.id}00${product.id}`}</span>
              </div>
              
              <div className="text-3xl md:text-4xl font-bold text-text mb-6">
                ${product.price}
              </div>
            </div>

            <p className="text-text-light leading-relaxed mb-6 text-sm md:text-base">
              {product.description}
            </p>

            {/* OPTIONS */}
            {product.sizes && (
              <div className="mb-6">
                <label className="block font-semibold mb-3 text-sm md:text-base">Select Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button 
                      key={size}
                      className={`
                        min-w-[48px] h-12 border rounded-lg font-medium transition-all duration-200 
                        flex items-center justify-center px-4
                        ${selectedSize === size 
                          ? 'border-primary text-primary bg-blue-50' 
                          : 'border-gray-200 bg-white hover:border-primary'
                        }
                        active:scale-95
                      `}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div className="mb-6">
                <label className="block font-semibold mb-3 text-sm md:text-base">Select Color</label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`
                        w-11 h-11 rounded-full border-2 cursor-pointer transition-all duration-200
                        ${selectedColor === color 
                          ? 'shadow-[0_0_0_2px_white,0_0_0_4px_#2563eb]' 
                          : 'shadow-[0_0_0_1px_#e5e7eb]'
                        }
                        active:scale-90
                      `}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label="Select Color"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex items-center border border-gray-200 rounded-full px-2 h-[52px] w-fit bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full bg-none border-none text-xl text-text cursor-pointer active:scale-90"
                >
                  -
                </button>
                <span className="min-w-[40px] text-center font-semibold text-base">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full bg-none border-none text-xl text-text cursor-pointer active:scale-90"
                >
                  +
                </button>
              </div>
              
              <div className="flex-1 flex gap-3">
                <button className="flex-1 h-[52px] rounded-full font-semibold flex items-center justify-center gap-2 text-sm md:text-base transition-all duration-200 bg-white border border-text text-text hover:bg-gray-50 active:scale-[0.98]">
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="flex-1 h-[52px] rounded-full font-semibold flex items-center justify-center gap-2 text-sm md:text-base transition-all duration-200 bg-text text-white border-none hover:bg-black active:scale-[0.98]">
                  Buy Now
                </button>
              </div>
            </div>

             {/* EXTRA INFO */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-8 text-sm text-text-light">
               <div className="extra-item">
                 <span>Free Shipping over $100</span>
               </div>
               <div className="extra-item">
                 <span>30 Days Return</span>
               </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Mobile Sticky Action Bar */}
      <div className="sm:hidden flex fixed bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.15)] z-[100] gap-3 items-center">
        <button 
          className="w-[52px] h-[52px] rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-xl text-text flex-shrink-0 active:scale-95 active:bg-gray-100"
          aria-label="Add to Cart"
        >
          <FaShoppingCart />
        </button>
        <button className="flex-1 h-[52px] bg-text text-white rounded-xl font-semibold text-base active:scale-[0.98] active:bg-black">
          Buy Now - ${product.price}
        </button>
      </div>

    </div>
  );
};

export default ProductDetails;
