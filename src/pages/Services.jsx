import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiTarget, FiTool, FiSend, FiLayers } from 'react-icons/fi';

const Services = () => {
    const services = [
        { 
          icon: <FiTarget className="w-16 h-16" />, 
          title: 'Custom Saddle Fitting', 
          desc: 'Expert assessment to ensure the perfect fit for your horse.',
          color: 'from-blue-500 to-cyan-500'
        },
        { 
          icon: <FiTool className="w-16 h-16" />, 
          title: 'Tack Repair', 
          desc: 'Restoration and repair services for your leather equipment.',
          color: 'from-purple-500 to-pink-500'
        },
        { 
          icon: <FiSend className="w-16 h-16" />, 
          title: 'International Shipping', 
          desc: 'Fast and secure delivery to equestrians worldwide.',
          color: 'from-orange-500 to-red-500'
        },
        { 
          icon: <FiLayers className="w-16 h-16" />, 
          title: 'Bulk Orders', 
          desc: 'Special pricing for stable and riding school outfitting.',
          color: 'from-green-500 to-emerald-500'
        },
    ];

  return (
    <>
      <Helmet>
        <title>Our Services - Custom Fitting, Repairs & Shipping | Rahi Equestrian</title>
        <meta name="description" content="Explore Rahi Equestrian's professional services including custom saddle fitting, tack repair, international shipping, and bulk order discounts for riding schools." />
        <meta name="keywords" content="saddle fitting, tack repair, equestrian shipping, bulk horse equipment, riding school supplies" />
        <meta property="og:title" content="Our Services | Rahi Equestrian" />
        <meta property="og:description" content="Professional equestrian services from custom fitting to worldwide shipping." />
        <link rel="canonical" href="https://rahiequestrian.com/services" />
      </Helmet>
      
      <div className="py-12 md:py-20 container-custom">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 gradient-text animate-fade-in">
          Our Services
        </h1>
        <div className="w-24 h-1.5 bg-linear-to-r from-primary via-accent to-primary mx-auto rounded-full animate-[scaleIn_0.8s_ease-out_0.2s_both]"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {services.map((service, idx) => (
          <div 
            key={idx}
            className="card-premium p-8 md:p-10 group relative overflow-hidden animate-[scaleIn_0.6s_ease-out]"
            style={{ animationDelay: `${idx * 0.15}s`, animationFillMode: 'both' }}
          >
            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-linear-to-br ${service.color} opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="relative z-10">
              <div className="mb-6 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 inline-block text-shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-text group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-base md:text-lg text-text-light leading-relaxed">
                {service.desc}
              </p>
              <div className={`mt-6 w-16 h-1.5 bg-linear-to-r ${service.color} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Services;
