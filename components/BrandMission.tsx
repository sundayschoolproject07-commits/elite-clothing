
import React from 'react';

const BrandMission: React.FC = () => {
  return (
    <section className="py-32 bg-brand-cream relative z-20 border-b border-brand-onyx/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Main Section Title */}
        <header className="mb-24">
          <h2 className="text-5xl md:text-7xl font-serif text-brand-onyx tracking-tighter">
            Mission & Vision
          </h2>
          <div className="w-24 h-px bg-brand-crimson mt-8"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          {/* Subsection 1: Mission */}
          <div className="max-w-xl space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.8em] text-brand-gold font-black">
              Mission
            </h3>
            <p className="text-3xl md:text-4xl font-serif text-brand-onyx leading-tight tracking-tight border-l-2 border-brand-gold/20 pl-8">
              To redefine custom tailoring by blending craftsmanship, technology, and style into perfectly fitted garments.
            </p>
          </div>

          {/* Subsection 2: Vision */}
          <div className="max-w-xl space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.8em] text-brand-gold font-black">
              Vision
            </h3>
            <p className="text-3xl md:text-4xl font-serif text-brand-onyx leading-tight tracking-tight border-l-2 border-brand-gold/20 pl-8">
              To become a globally recognized fashion studio where design, fit, and innovation meet—making premium tailoring accessible and future-ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandMission;
