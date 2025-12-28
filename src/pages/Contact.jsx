import React from 'react';
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="py-12 md:py-16 container-custom">
      <h1 className="text-center text-3xl md:text-4xl lg:text-5xl mb-3 text-text px-4">
        Get in Touch
      </h1>
      <p className="text-center text-text-light mb-10 max-w-2xl mx-auto px-4">
        We'd love to hear from you
      </p>
      
      <div className="flex flex-col lg:flex-row gap-0 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white">
        <div className="flex-1 bg-gray-800 text-gray-50 p-6 md:p-12 flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 text-sm md:text-base">
              <FaEnvelope className="text-accent text-xl min-w-[24px] flex-shrink-0" />
              <span>rahiequestrian@gmail.com</span>
            </div>
            <div className="flex items-start gap-4 text-sm md:text-base">
              <FaWhatsapp className="text-accent text-xl min-w-[24px] flex-shrink-0" />
              <span>+91 7007786334</span>
            </div>
            <div className="flex items-start gap-4 text-sm md:text-base">
              <FaLinkedin className="text-accent text-xl min-w-[24px] flex-shrink-0" />
              <span>LinkedIn</span>
            </div>
            <div className="flex items-start gap-4 text-sm md:text-base">
              <FaInstagram className="text-accent text-xl min-w-[24px] flex-shrink-0" />
              <span>Instagram</span>
            </div>
            <div className="flex items-start gap-4 text-sm md:text-base">
              <FaMapMarkerAlt className="text-accent text-xl min-w-[24px] flex-shrink-0" />
              <span>Safed Colony Juhi Kanpur Nagar, Uttar Pradesh, India</span>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <a 
              href="#" 
              className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-accent hover:-translate-y-1 hover:text-gray-800 active:scale-90"
            >
              <FaFacebookF />
            </a>
            <a 
              href="#" 
              className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-accent hover:-translate-y-1 hover:text-gray-800 active:scale-90"
            >
              <FaInstagram />
            </a>
            <a 
              href="#" 
              className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-accent hover:-translate-y-1 hover:text-gray-800 active:scale-90"
            >
              <FaTwitter />
            </a>
            <a 
              href="#" 
              className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-accent hover:-translate-y-1 hover:text-gray-800 active:scale-90"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="flex-[1.5] min-h-[300px] lg:min-h-[500px] bg-gray-300">
          <iframe 
            src="https://maps.google.com/maps?q=Safed%20Colony%20Juhi%20Kanpur%20Nagar%2C%20Uttar%20Pradesh%2C%20India&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Google Maps Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
