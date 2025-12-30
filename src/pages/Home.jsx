import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { FiAward, FiTool, FiGlobe } from 'react-icons/fi';

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
    <>
      <Helmet>
        <title>Rahi Equestrian - Premium Equestrian Equipment & Riding Gear</title>
        <meta name="description" content="Discover premium equestrian equipment, handcrafted leather saddles, riding gear, and horse care essentials. Equipping champions with quality and craftsmanship." />
        <meta name="keywords" content="equestrian equipment, horse saddles, riding gear, horse care, leather saddles, equestrian supplies" />
        <meta property="og:title" content="Rahi Equestrian - Premium Equestrian Equipment" />
        <meta property="og:description" content="Equipping champions with the finest tack, riding gear, and horse care essentials." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://rahiequestrian.com/" />
      </Helmet>
      
      <div className="home-page bg-linear-to-b from-gray-50 to-white">
      {/* Hero Slider */}
      <div className="w-full h-[65vh] min-h-[450px] max-h-[750px] md:h-[80vh] md:min-h-[550px] relative overflow-hidden">
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
                <div className="absolute inset-0 bg-linear-to-br from-black/50 via-black/40 to-black/60"></div>
                <div className="relative z-10 max-w-5xl px-6 container-custom animate-[fadeIn_1s_ease-out]">
                  <h1 className="mb-6 text-shadow-lg leading-tight font-display animate-[slideUp_0.8s_ease-out]">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-10 opacity-95 text-shadow-md max-w-3xl mx-auto leading-relaxed animate-[slideUp_1s_ease-out_0.2s_both]">
                    {slide.subtitle}
                  </p>
                  <a 
                    href="#products-section" 
                    className="btn-premium inline-flex items-center justify-center bg-linear-to-r from-primary to-accent text-white py-4 px-10 rounded-full font-bold text-base md:text-lg transition-all duration-300 border-2 border-white/20 shadow-2xl min-h-[56px] hover:shadow-glow hover:scale-105 active:scale-95 animate-[bounceIn_1.2s_ease-out_0.4s_both]"
                  >
                    <span className="relative z-10">Explore Collection</span>
                    <svg className="w-5 h-5 ml-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Features Section */}
      <section className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            { icon: <FiAward className="w-12 h-12" />, title: 'Premium Leather', desc: 'Hand-selected leather for durability and elegance.' },
            { icon: <FiTool className="w-12 h-12" />, title: 'Expert Craftsmanship', desc: 'Designed by riders, for riders.' },
            { icon: <FiGlobe className="w-12 h-12" />, title: 'Global Shipping', desc: 'Delivering equestrian excellence worldwide.' }
          ].map((feature, index) => (
            <div 
              key={index}
              className="card-premium p-8 group animate-[scaleIn_0.6s_ease-out]"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'both' }}
            >
              <div className="mb-4 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-text group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-base md:text-lg text-text-light leading-relaxed">
                {feature.desc}
              </p>
              <div className="mt-6 w-12 h-1 bg-linear-to-r from-primary to-accent rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <div id="products-section" className="bg-linear-to-b from-white to-gray-50 py-16">
        <Products featured={true} />
      </div>
      
      {/* Services Section */}
      <section id="services-section" className="bg-linear-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 py-16">
        <Services />
      </section>

      {/* About Section */}
      <section id="about-section" className="py-16">
        <About />
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="bg-linear-to-br from-gray-50 to-blue-50/30 py-16">
        <Contact />
      </section>
    </div>
    </>
  );
};

export default Home;
