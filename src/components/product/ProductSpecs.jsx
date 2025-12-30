import React from 'react';

const ProductSpecs = ({ product }) => {
  // Mock Technical Specs based on product category
  const specs = [
    { label: "Material", value: "Premium Full-Grain Leather" },
    { label: "Weight", value: "1.2 kg" },
    { label: "Intended Use", value: product.category },
    { label: "Warranty", value: "2 Years Manufacturer Warranty" },
    { label: "Care Instructions", value: "Wipe clean with damp cloth, apply leather conditioner monthly." },
    { label: "Country of Origin", value: "Italy" },
    { label: "Safety Rating", value: "Certified ISO 9001" },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
      <h3 className="text-2xl font-display font-bold text-text mb-8 flex items-center gap-3">
        Technical Specifications
        <span className="h-px flex-1 bg-gray-100 ml-4"></span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {specs.map((spec, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-50 last:border-0 group hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
            <span className="text-text-light font-medium text-sm sm:w-1/3">{spec.label}</span>
            <span className="text-text font-semibold text-sm sm:w-2/3 text-right sm:text-left">{spec.value}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-gray-50 rounded-2xl flex items-start gap-4">
        <svg className="w-6 h-6 text-primary shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 className="font-bold text-text mb-1">Expert Note</h4>
          <p className="text-sm text-text-light leading-relaxed">
            This detailed specification sheet ensures you have all the information needed for professional use. 
            For specific sizing measurements beyond the standard chart, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecs;
