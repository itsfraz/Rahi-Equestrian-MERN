import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { FaChevronLeft } from 'react-icons/fa';

// Modular Components
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductSpecs from '../components/product/ProductSpecs';
import ProductReviews from '../components/product/ProductReviews';
import StickyFooter from '../components/product/StickyFooter';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  
  // Lifted State for Shared Logic
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Initialize selection when product loads
  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log('Added to cart', { product, selectedSize, selectedColor, quantity });
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  if (!product) {
    return (
      <div className="container-custom py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-display font-bold mb-6 text-text">Product not found</h2>
        <p className="text-text-light mb-8 text-lg">The product you are looking for might have been removed or is temporarily unavailable.</p>
        <Link to="/products" className="btn-premium bg-linear-to-r from-primary to-primary-dark text-white py-4 px-10 rounded-full inline-flex items-center gap-2 font-bold shadow-lg hover:shadow-xl transition-all">
          <FaChevronLeft /> Back to Products
        </Link>
      </div>
    );
  }

  const galleryImages = product.images || [product.image];

  return (
    <div className="bg-white min-h-screen pb-32">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50/80 border-b border-gray-100 mb-8 sticky top-nav md:top-nav-md z-40 backdrop-blur-md">
            <div className="container-custom py-4">
                <div className="text-sm flex items-center gap-2 flex-wrap text-text-light font-medium">
                  <Link 
                    to="/products" 
                    className="hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <FaChevronLeft className="text-xs group-hover:-translate-x-1 transition-transform" /> 
                    Products
                  </Link>
                  <span className="text-gray-300">/</span>
                  <span className="text-primary font-semibold truncate max-w-[200px]">{product.name}</span>
                </div>
            </div>
        </div>

      <div className="container-custom">
        <main className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20">
          
          {/* Left Column: Gallery */}
          <section className="animate-fade-in">
            <ProductGallery images={galleryImages} name={product.name} />
          </section>

          {/* Right Column: Info & Actions */}
          <section className="animate-[slideUp_0.6s_ease-out_0.1s_both]">
            <ProductInfo 
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              quantity={quantity}
              setQuantity={setQuantity}
              onAddToCart={handleAddToCart}
            />
          </section>

        </main>

        {/* Below the Fold Content */}
        <div className="mt-20 lg:mt-32 grid grid-cols-1 gap-16 animate-[fadeIn_0.8s_ease-out_0.2s_both]">
           {/* Section Layout: Specs and Reviews often take full width or split based on design */}
           <div className="max-w-5xl mx-auto w-full flex flex-col gap-16">
              <ProductSpecs product={product} />
              <ProductReviews />
           </div>
        </div>

      </div>

      {/* Mobile Sticky Footer */}
      <StickyFooter product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductDetails;
