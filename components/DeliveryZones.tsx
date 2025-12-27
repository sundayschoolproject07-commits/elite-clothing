
import React from 'react';

const DeliveryZones: React.FC = () => {
  const points = [
    "Delivery across India",
    "International shipping available on request",
    "Charges calculated based on location and order value"
  ];

  return (
    <section className="py-32 bg-brand-cream relative z-20 border-b border-brand-onyx/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Title */}
        <header className="mb-24">
          <h2 className="text-5xl md:text-7xl font-serif text-brand-onyx tracking-tighter">
            Delivery Zones & Charges
          </h2>
          <div className="w-24 h-px bg-brand-crimson mt-8"></div>
        </header>

        {/* Delivery Content List */}
        <div className="max-w-4xl">
          <ul className="space-y-12">
            {points.map((point, index) => (
              <li 
                key={index} 
                className="flex items-center space-x-6 text-2xl md:text-3xl font-serif text-brand-onyx leading-tight tracking-tight"
              >
                <div className="w-1.5 h-1.5 bg-brand-crimson rounded-full flex-shrink-0"></div>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DeliveryZones;
