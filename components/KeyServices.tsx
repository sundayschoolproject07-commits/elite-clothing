
import React from 'react';

const KeyServices: React.FC = () => {
  const services = [
    "Custom-made suits, shirts, trousers & formal wear",
    "Personal styling & wardrobe consultation",
    "3D garment design & visualization (CLO3D)",
    "Limited-edition and special-occasion outfits"
  ];

  return (
    <section className="py-32 bg-brand-cream relative z-20 border-b border-brand-onyx/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Title */}
        <header className="mb-24">
          <h2 className="text-5xl md:text-7xl font-serif text-brand-onyx tracking-tighter">
            Key Services & Offerings
          </h2>
          <div className="w-24 h-px bg-brand-crimson mt-8"></div>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group flex items-start space-x-8 pb-12 border-b border-brand-onyx/5 last:border-0 md:border-b"
            >
              {/* Subtle visual indicator */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center mt-1 group-hover:bg-brand-onyx group-hover:border-brand-onyx transition-all duration-500">
                <span className="text-[10px] text-brand-gold font-black group-hover:text-white transition-colors">
                  0{index + 1}
                </span>
              </div>
              
              <div className="space-y-4">
                <p className="text-2xl md:text-3xl font-serif text-brand-onyx leading-snug tracking-tight">
                  {service}
                </p>
                <div className="w-0 group-hover:w-full h-[1px] bg-brand-gold/40 transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyServices;
