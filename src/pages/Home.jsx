import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import About from './About';
import Services from './Services';
import Products from './Products';
import Contact from './Contact';

const Home = () => {
  const slides = [
    {
      id: 1,
      image: '/images/hero.png',
      title: 'Rahi Equestrian',
      subtitle: 'Equipping champions with the finest tack, riding gear, and horse care essentials.'
    },
    {
      id: 2,
      image: '/images/Hero1.png',
      title: 'Premium Craftsmanship',
      subtitle: 'Experience the quality of handcrafted leather saddlery born from tradition.'
    },
    {
      id: 3,
      image: '/images/Hero3.png',
      title: 'Ride with Confidence',
      subtitle: 'Safety meets style in our exclusive collection of rider apparel.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Slider */}
      <div className="w-full h-[60vh] min-h-[400px] max-h-[700px] md:h-[75vh] md:min-h-[500px]">
        <Swiper
          spaceBetween={0}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="h-full [&_.swiper-slide]:h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div 
                className="relative h-full flex items-center justify-center text-center bg-cover bg-center text-white"
                style={{backgroundImage: `url('${slide.image}')`}}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
                <div className="relative z-10 max-w-4xl px-6 container-custom">
                  <h1 className="mb-4 text-shadow-md leading-tight">{slide.title}</h1>
                  <p className="text-base md:text-xl lg:text-2xl mb-8 opacity-95 text-shadow-sm max-w-2xl mx-auto leading-normal">
                    {slide.subtitle}
                  </p>
                  <a 
                    href="#products-section" 
                    className="inline-flex items-center justify-center bg-primary text-white py-3.5 px-8 rounded-full font-semibold text-base transition-all duration-300 border-2 border-transparent shadow-lg min-h-[48px] hover:bg-primary-dark hover:shadow-xl active:scale-[0.98]"
                  >
                    Shop Collection
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Features Section */}
      <section className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-8 lg:py-12">
        <div className="p-8 sm:p-6 bg-white rounded-xl shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]">
          <h3 className="text-xl md:text-2xl">Premium Leather</h3>
          <p className="text-base md:text-lg">Hand-selected leather for durability and elegance.</p>
        </div>
        <div className="p-8 sm:p-6 bg-white rounded-xl shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]">
          <h3 className="text-xl md:text-2xl">Expert Craftsmanship</h3>
          <p className="text-base md:text-lg">Designed by riders, for riders.</p>
        </div>
        <div className="p-8 sm:p-6 bg-white rounded-xl shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]">
          <h3 className="text-xl md:text-2xl">Global Shipping</h3>
          <p className="text-base md:text-lg">Delivering equestrian excellence worldwide.</p>
        </div>
      </section>

      {/* Products Section */}
      <div id="products-section">
        <Products limit={3} />
      </div>
      
      {/* Services Section */}
      <section id="services-section" className="bg-secondary">
        <Services />
      </section>

      {/* About Section */}
      <section id="about-section">
        <About />
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="bg-secondary">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
