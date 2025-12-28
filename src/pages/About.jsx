import React from 'react';

const About = () => {
  return (
    <div className="py-12 md:py-16 container-custom">
      <div className="content-wrapper">
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl mb-3 text-text px-4">
          About Rahi Equestrian
        </h1>
        <p className="text-center text-base md:text-lg text-text-light mb-10 max-w-2xl mx-auto px-4">
          At Rahi Equestrian, we are passionate about the bond between horse and rider. 
          Founded in the heart of Kanpur, a hub for fine leather craftsmanship, we strive to bring 
          world-class saddlery and riding gear to equestrian enthusiasts everywhere.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
           <div className="p-8 md:p-6 bg-white rounded-xl shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]">
             <h3 className="text-xl md:text-2xl">Our Mission</h3>
             <p className="text-base md:text-lg">To provide safe, durable, and stylish equipment that enhances performance.</p>
           </div>
           <div className="p-8 md:p-6 bg-white rounded-xl shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]">
             <h3 className="text-xl md:text-2xl">Our Craft</h3>
             <p className="text-base md:text-lg">Blending traditional leatherworking techniques with modern ergonomic designs.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
