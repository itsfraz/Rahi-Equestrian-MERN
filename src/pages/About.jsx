import React from 'react';
import { FiTarget, FiTool } from 'react-icons/fi';

const About = () => {
  return (
    <div className="py-12 md:py-20 container-custom">
      <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 gradient-text animate-[fadeIn_0.6s_ease-out]">
          About Rahi Equestrian
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full mb-8 animate-[scaleIn_0.8s_ease-out_0.2s_both]"></div>
        <p className="text-lg md:text-xl text-text-light leading-relaxed animate-[slideUp_0.8s_ease-out_0.3s_both]">
          At Rahi Equestrian, we are passionate about the bond between horse and rider. 
          Founded in the heart of Kanpur, a hub for fine leather craftsmanship, we strive to bring 
          world-class saddlery and riding gear to equestrian enthusiasts everywhere.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-12">
        {[
          {
            icon: <FiTarget className="w-16 h-16" />,
            title: 'Our Mission',
            desc: 'To provide safe, durable, and stylish equipment that enhances performance and strengthens the connection between rider and horse.',
            gradient: 'from-blue-500 to-purple-600'
          },
          {
            icon: <FiTool className="w-16 h-16" />,
            title: 'Our Craft',
            desc: 'Blending traditional leatherworking techniques with modern ergonomic designs to create products that stand the test of time.',
            gradient: 'from-purple-500 to-pink-600'
          }
        ].map((item, index) => (
          <div 
            key={index}
            className="card-premium p-8 md:p-10 group relative overflow-hidden animate-[scaleIn_0.6s_ease-out]"
            style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'both' }}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="relative z-10">
              <div className="mb-6 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 inline-block text-shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-text group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-base md:text-lg text-text-light leading-relaxed">
                {item.desc}
              </p>
              <div className={`mt-6 w-16 h-1.5 bg-gradient-to-r ${item.gradient} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
