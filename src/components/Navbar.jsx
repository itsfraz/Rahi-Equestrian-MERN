import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`
        sticky top-0 z-[9999] border-b transition-all duration-500
        ${scrolled 
          ? 'bg-white/95 backdrop-blur-strong shadow-lg border-gray-200' 
          : 'bg-white/98 backdrop-blur-glass shadow-sm border-gray-100'
        }
      `}>
        <div className="container-custom">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link 
              to="/" 
              className="flex items-center gap-3 z-[10001] transition-all duration-300 hover:scale-105"
            >
              <img src="/images/Logo.png" alt="Rahi Equestrian Logo" className="h-10 md:h-12 w-auto object-contain" />
              <span className="text-xl md:text-2xl font-display font-black gradient-gold-text tracking-tight whitespace-nowrap hidden sm:block">
                Rahi Equestrian
              </span>
            </Link>
            
            <button
              className={`
                md:hidden flex items-center justify-center w-11 h-11 text-xl text-text 
                cursor-pointer rounded-xl transition-all duration-300 z-[10001]
                ${scrolled ? 'bg-primary/10 text-primary' : 'bg-gray-100 hover:bg-gray-200'}
                active:scale-90
              `}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span className="relative w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </span>
            </button>
            
            {/* Desktop Menu */}
            <ul className="hidden md:flex md:gap-6 lg:gap-8 items-center">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Products', path: '/products' },
                { name: 'Contact', path: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => `
                      relative font-semibold text-sm lg:text-base py-2 px-3 rounded-lg
                      transition-all duration-200 ease-out
                      ${isActive 
                        ? 'text-primary bg-primary/5' 
                        : 'text-text-light hover:text-text hover:bg-gray-50'
                      }
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                    `}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden animate-[fadeIn_0.3s_ease-out]"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-16 left-0 right-0 bottom-0
          bg-linear-to-br from-white via-blue-50/30 to-purple-50/30
          backdrop-blur-xl
          z-[9999]
          md:hidden
          overflow-y-auto
          overscroll-contain
          transition-all duration-500 ease-out
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
        style={{
          maxHeight: 'calc(100vh - 4rem)',
          maxHeight: 'calc(100dvh - 4rem)',
        }}
      >
        <ul className="flex flex-col p-6 gap-2">
          {[
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Services', path: '/services' },
            { name: 'Products', path: '/products' },
            { name: 'Contact', path: '/contact' }
          ].map((link, index) => (
            <li 
              key={index}
              className="animate-[slideUp_0.4s_ease-out]"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <NavLink 
                to={link.path}
                className={({ isActive }) => `
                  block font-semibold text-text py-4 px-6 text-lg
                  rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-linear-to-r from-primary to-accent text-white shadow-lg' 
                    : 'hover:bg-white/80 hover:shadow-md active:scale-95'
                  }
                `}
                onClick={toggleMenu}
              >
                <span className="flex items-center justify-between">
                  {link.name}
                  <FiChevronRight className="w-5 h-5" />
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-white/80 to-transparent backdrop-blur-sm">
          <p className="text-center text-sm text-text-light">
            Premium Equestrian Equipment
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
