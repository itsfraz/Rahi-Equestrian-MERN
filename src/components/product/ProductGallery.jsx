import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductGallery = ({ images, name }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Sync Swiper with activeIndex state
  useEffect(() => {
    if (swiperInstance && swiperInstance.activeIndex !== activeIndex) {
      swiperInstance.slideTo(activeIndex);
    }
  }, [activeIndex, swiperInstance]);

  return (
    <div className="relative w-full h-full">
      {/* Desktop Layout: Sticky Gallery */}
      <div className="hidden lg:grid grid-cols-[100px_1fr] gap-4 h-full sticky top-24">
        {/* Thumbnails Navigation */}
        <div className="h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pr-2">
          <div className="flex flex-col gap-4 min-h-full justify-center">
            {images.map((img, index) => (
              <button
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`
                  relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0
                  ${activeIndex === index 
                    ? 'border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/20' 
                    : 'border-gray-100 hover:border-primary/50'
                  }
                `}
              >
                <img 
                  src={img} 
                  alt={`${name} view ${index + 1}`} 
                  className="w-full h-full object-cover object-center" 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div className="relative h-[600px] rounded-3xl overflow-hidden bg-gray-50 group border border-gray-100">
            <div className="absolute inset-0 bg-linear-to-tr from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src={images[activeIndex]} 
              alt={name} 
              className="w-full h-full object-contain mix-blend-multiply p-8 transition-transform duration-700 ease-out group-hover:scale-110" 
            />
            
            {/* Zoom Hint */}
            <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold shadow-xl border border-gray-100/50">
              Hover to Zoom
            </div>
        </div>
      </div>

      {/* Mobile Layout: Swiper */}
      <div className="block lg:hidden relative">
        <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
          {activeIndex + 1} / {images.length}
        </div>
        <Swiper
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          className="w-full aspect-4/5 rounded-b-4xl bg-gray-50"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center p-8">
              <img 
                src={img} 
                alt={`${name} ${index + 1}`} 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
