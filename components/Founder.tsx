
import React from 'react';
import AutoImage from './AutoImage';

const Founder: React.FC = () => {
  return (
    <section className="py-32 bg-brand-cream relative z-20 border-b border-brand-onyx/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Title */}
        <header className="mb-24">
          <h2 className="text-5xl md:text-7xl font-serif text-brand-onyx tracking-tighter">
            Founder
          </h2>
          <div className="w-24 h-px bg-brand-crimson mt-8"></div>
        </header>

        {/* Founder Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 lg:col-start-1 max-w-3xl">
            <h3 className="text-4xl md:text-6xl font-serif text-brand-onyx tracking-tight mb-4 leading-none">
              Jith (Nishajith)
            </h3>
            <p className="text-[10px] uppercase tracking-[0.6em] text-brand-gold font-black mb-12">
              Fashion Designer & Styling Consultant
            </p>
            
            <div className="space-y-8 border-l-2 border-brand-gold/20 pl-8 md:pl-12">
              <p className="text-xl md:text-2xl text-brand-onyx/80 font-sans font-light leading-relaxed">
                4+ years experience in 3D fashion design, tailoring, and brand development, working across custom wear, digital garments, and production-ready designs.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-4 hidden lg:block">
            <div className="aspect-[3/4] bg-white border border-brand-onyx/5 overflow-hidden shadow-2xl grayscale">
               <AutoImage 
                productId="founder-portrait"
                productName="Bespoke Fashion Designer Portrait"
                category="Corporate"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" 
                alt="Founder Portrait" 
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
