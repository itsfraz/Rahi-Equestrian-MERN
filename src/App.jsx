import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-accent to-primary"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
          
          <div className="container-custom py-16 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              {/* Logo & Brand - Horizontal on Desktop */}
              <div className="flex items-center gap-4 md:gap-6">
                <img src="/images/Logo.png" alt="Rahi Equestrian" className="h-16 md:h-20 w-auto object-contain" />
                <div className="text-left hidden md:block">
                  <h3 className="text-2xl md:text-3xl font-display font-black gradient-gold-text leading-tight mb-1">
                    Rahi Equestrian
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 tracking-wide">
                    Premium Equestrian Equipment
                  </p>
                </div>
              </div>

              {/* Copyright - Centered on mobile, left-aligned in flex flow */}
              <p className="text-sm text-gray-500 order-3 md:order-2 font-medium">
                &copy; 2024 Rahi Equestrian. All rights reserved.
              </p>

              {/* Socials - Right aligned */}
              <div className="flex gap-4 order-2 md:order-3">
                {[
                  { icon: FaFacebookF, label: 'Facebook' },
                  { icon: FaInstagram, label: 'Instagram' },
                  { icon: FaTwitter, label: 'Twitter' },
                  { icon: FaLinkedinIn, label: 'LinkedIn' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
