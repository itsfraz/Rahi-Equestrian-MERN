import React from 'react';

const Services = () => {
    const services = [
        { title: 'Custom Saddle Fitting', desc: 'Expert assessment to ensure the perfect fit for your horse.' },
        { title: 'Tack Repair', desc: 'Restoration and repair services for your leather equipment.' },
        { title: 'International Shipping', desc: 'Fast and secure delivery to equestrians worldwide.' },
        { title: 'Bulk Orders', desc: 'Special pricing for stable and riding school outfitting.' },
    ];

  return (
    <div className="py-12 md:py-16 container-custom">
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl mb-3 text-text px-4">
        Our Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
        {services.map((service, idx) => (
            <div 
              className="p-8 md:p-6 bg-white rounded-xl shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]" 
              key={idx}
            >
                <h3 className="text-xl md:text-2xl">{service.title}</h3>
                <p className="text-base md:text-lg">{service.desc}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
