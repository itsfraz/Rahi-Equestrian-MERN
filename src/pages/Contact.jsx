import React from 'react';
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="py-12 md:py-20 container-custom">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 gradient-text animate-[fadeIn_0.6s_ease-out]">
          Get in Touch
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full mb-6 animate-[scaleIn_0.8s_ease-out_0.2s_both]"></div>
        <p className="text-lg md:text-xl text-text-light max-w-2xl mx-auto animate-[slideUp_0.8s_ease-out_0.3s_both]">
          We'd love to hear from you
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-0 max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl animate-[scaleIn_0.8s_ease-out_0.4s_both]">
        <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-50 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 gradient-gold-text">
              Contact Information
            </h2>
            
            <div className="flex flex-col gap-6 mb-10">
              {[
                { icon: FaEnvelope, text: 'rahiequestrian@gmail.com', color: 'text-blue-400' },
                { icon: FaWhatsapp, text: '+91 7007786334', color: 'text-green-400' },
                { icon: FaLinkedin, text: 'LinkedIn', color: 'text-blue-500' },
                { icon: FaInstagram, text: 'Instagram', color: 'text-pink-400' },
                { icon: FaMapMarkerAlt, text: 'Safed Colony Juhi Kanpur Nagar, Uttar Pradesh, India', color: 'text-red-400' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 text-sm md:text-base group cursor-pointer hover:translate-x-2 transition-transform duration-300"
                >
                  <item.icon className={`${item.color} text-2xl min-w-[28px] flex-shrink-0 group-hover:scale-125 transition-transform duration-300`} />
                  <span className="group-hover:text-white transition-colors duration-300">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              {[
                { icon: FaFacebookF, color: 'hover:bg-blue-600' },
                { icon: FaInstagram, color: 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600' },
                { icon: FaTwitter, color: 'hover:bg-sky-500' },
                { icon: FaLinkedin, color: 'hover:bg-blue-700' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:-translate-y-2 hover:shadow-lg active:scale-90 group`}
                >
                  <social.icon className="group-hover:scale-125 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-[1.5] min-h-[350px] lg:min-h-[550px] bg-gray-200 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <iframe 
            src="https://maps.google.com/maps?q=Safed%20Colony%20Juhi%20Kanpur%20Nagar%2C%20Uttar%20Pradesh%2C%20India&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Google Maps Location"
            className="relative z-10"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
