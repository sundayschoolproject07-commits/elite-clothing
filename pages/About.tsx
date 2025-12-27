
import React from 'react';
import BrandAbout from '../components/BrandAbout';
import BrandMission from '../components/BrandMission';
import KeyServices from '../components/KeyServices';
import Founder from '../components/Founder';
import DeliveryZones from '../components/DeliveryZones';
import AutoImage from '../components/AutoImage';

const About = () => {
  return (
    <div className="pt-32 pb-24">
      <header className="px-6 md:px-12 max-w-[1440px] mx-auto mb-32 text-center">
        <h1 className="text-5xl md:text-8xl font-serif mb-12 leading-tight text-brand-onyx tracking-tighter">Crafting the Future <br /> of Bespoke</h1>
        <div className="w-px h-24 bg-brand-onyx/10 mx-auto"></div>
      </header>

      {/* 1. About Zone J (intro content) */}
      <BrandAbout className="bg-transparent" />
      
      {/* 2. Mission & Vision Section */}
      <BrandMission />

      {/* 3. Key Services & Offerings Section */}
      <KeyServices />

      {/* 4. Founder / Team Section */}
      <Founder />

      {/* 5. Delivery Zones & Charges Section */}
      <DeliveryZones />

      {/* Brand Image Grid (Contextual Visuals) */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto my-48">
        <div className="aspect-[16/9] overflow-hidden shadow-2xl bg-white">
          <AutoImage 
            productId="atelier-interior"
            productName="Luxury Bespoke Atelier Interior"
            category="Atelier"
            src="https://images.unsplash.com/photo-1558775033-dbe189828694?auto=format&fit=crop&q=80&w=2000" 
            alt="Atelier" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-brand-onyx text-white py-48 mb-48 overflow-hidden">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-serif mb-16 tracking-tighter">The Tailor's Oath</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div>
                    <h3 className="text-2xl font-serif mb-6 text-brand-gold">Precision</h3>
                    <p className="text-brand-slate text-sm leading-relaxed">No detail is too small. Every measurement is double-verified to ensure absolute perfection.</p>
                </div>
                <div>
                    <h3 className="text-2xl font-serif mb-6 text-brand-gold">Integrity</h3>
                    <p className="text-brand-slate text-sm leading-relaxed">We source only the finest fabrics from global mills that share our commitment to excellence.</p>
                </div>
                <div>
                    <h3 className="text-2xl font-serif mb-6 text-brand-gold">Legacy</h3>
                    <p className="text-brand-slate text-sm leading-relaxed">Every piece we create is designed to last a lifetime, becoming a hallmark of your personal history.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
