
import React from 'react';

interface BrandAboutProps {
  className?: string;
}

const BrandAbout: React.FC<BrandAboutProps> = ({ className = "" }) => {
  return (
    <section className={`py-32 bg-brand-cream border-b border-brand-onyx/5 ${className}`}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-serif text-brand-onyx mb-12 tracking-tighter">
            About Zone J
          </h2>
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-brand-onyx/80 font-sans font-light leading-relaxed">
              Zone J is a premium fashion studio specializing in custom tailoring, luxury suits, shirts, and complete styling solutions. We combine traditional craftsmanship with modern design tools like 3D garment visualization and digital pattern making to deliver precision-fit garments.
            </p>
            <p className="text-xl md:text-2xl text-brand-onyx/80 font-sans font-light leading-relaxed">
              From concept to final stitch, Zone J focuses on fit, fabric, and finish—serving individuals, professionals, brands, and creators who value quality and detail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandAbout;
