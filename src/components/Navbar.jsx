import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
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
      <nav className="bg-white/98 backdrop-blur-glass shadow-sm sticky top-0 z-[9999] border-b border-gray-100">
        <div className="container-custom">
          <div className="flex justify-between items-center h-14 md:h-16">
            <Link to="/" className="text-lg md:text-xl font-bold text-primary tracking-tight whitespace-nowrap z-[10001]">
              Rahi Equestrian
            </Link>
            
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-xl text-text cursor-pointer rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors z-[10001]"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? '✕' : '☰'}
            </button>
            
            {/* Desktop Menu */}
            <ul className="hidden md:flex md:gap-6 lg:gap-8">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `
                    font-medium text-text py-2 transition-colors duration-200 relative
                    ${isActive ? 'text-primary after:w-full' : 'after:w-0'}
                    after:content-[''] after:absolute after:bottom-0 after:left-0 
                    after:h-0.5 after:bg-primary after:transition-all after:duration-300
                    hover:after:w-full
                  `}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => `
                    font-medium text-text py-2 transition-colors duration-200 relative
                    ${isActive ? 'text-primary after:w-full' : 'after:w-0'}
                    after:content-[''] after:absolute after:bottom-0 after:left-0 
                    after:h-0.5 after:bg-primary after:transition-all after:duration-300
                    hover:after:w-full
                  `}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services" 
                  className={({ isActive }) => `
                    font-medium text-text py-2 transition-colors duration-200 relative
                    ${isActive ? 'text-primary after:w-full' : 'after:w-0'}
                    after:content-[''] after:absolute after:bottom-0 after:left-0 
                    after:h-0.5 after:bg-primary after:transition-all after:duration-300
                    hover:after:w-full
                  `}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/products" 
                  className={({ isActive }) => `
                    font-medium text-text py-2 transition-colors duration-200 relative
                    ${isActive ? 'text-primary after:w-full' : 'after:w-0'}
                    after:content-[''] after:absolute after:bottom-0 after:left-0 
                    after:h-0.5 after:bg-primary after:transition-all after:duration-300
                    hover:after:w-full
                  `}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => `
                    font-medium text-text py-2 transition-colors duration-200 relative
                    ${isActive ? 'text-primary after:w-full' : 'after:w-0'}
                    after:content-[''] after:absolute after:bottom-0 after:left-0 
                    after:h-0.5 after:bg-primary after:transition-all after:duration-300
                    hover:after:w-full
                  `}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-14 left-0 right-0 bottom-0
          bg-white
          z-[9999]
          md:hidden
          overflow-y-auto
          overscroll-contain
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{
          maxHeight: 'calc(100vh - 3.5rem)',
          maxHeight: 'calc(100dvh - 3.5rem)', // Dynamic viewport height for mobile browsers
        }}
      >
        <ul className="flex flex-col">
          <li className="border-b border-gray-100">
            <NavLink 
              to="/" 
              className={({ isActive }) => `
                block font-medium text-text py-3.5 px-6 text-base
                transition-colors duration-200
                ${isActive ? 'text-primary bg-blue-50' : ''}
                hover:bg-gray-50 active:bg-gray-100
              `}
              onClick={toggleMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="border-b border-gray-100">
            <NavLink 
              to="/about" 
              className={({ isActive }) => `
                block font-medium text-text py-3.5 px-6 text-base
                transition-colors duration-200
                ${isActive ? 'text-primary bg-blue-50' : ''}
                hover:bg-gray-50 active:bg-gray-100
              `}
              onClick={toggleMenu}
            >
              About Us
            </NavLink>
          </li>
          <li className="border-b border-gray-100">
            <NavLink 
              to="/services" 
              className={({ isActive }) => `
                block font-medium text-text py-3.5 px-6 text-base
                transition-colors duration-200
                ${isActive ? 'text-primary bg-blue-50' : ''}
                hover:bg-gray-50 active:bg-gray-100
              `}
              onClick={toggleMenu}
            >
              Services
            </NavLink>
          </li>
          <li className="border-b border-gray-100">
            <NavLink 
              to="/products" 
              className={({ isActive }) => `
                block font-medium text-text py-3.5 px-6 text-base
                transition-colors duration-200
                ${isActive ? 'text-primary bg-blue-50' : ''}
                hover:bg-gray-50 active:bg-gray-100
              `}
              onClick={toggleMenu}
            >
              Products
            </NavLink>
          </li>
          <li className="border-b border-gray-100">
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `
                block font-medium text-text py-3.5 px-6 text-base
                transition-colors duration-200
                ${isActive ? 'text-primary bg-blue-50' : ''}
                hover:bg-gray-50 active:bg-gray-100
              `}
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
