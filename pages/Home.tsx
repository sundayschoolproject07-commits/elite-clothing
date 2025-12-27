
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Compass, ShieldCheck, Trophy } from 'lucide-react';
import { PRODUCTS, BRAND_PLACEHOLDER } from '../constants';
import VideoShorts from '../components/VideoShorts';
import BrandAbout from '../components/BrandAbout';
import AutoImage from '../components/AutoImage';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=2000",
    title: "BE LIKE BILLIONAIRE",
    subtitle: "The Signature Standard",
    quote: "Excellence is not an act, it is a habit."
  },
  {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000",
    title: "PRECISION TAILORING",
    subtitle: "Bespoke Excellence",
    quote: "Success is the byproduct of discipline and style."
  }
];

const GENERAL_CATEGORIES = [
  { name: 'SHIRTS', image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=800', path: '/shop?category=Shirts' },
  { name: 'T-SHIRTS', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800', path: '/shop?category=T-Shirts' },
  { name: 'TROUSERS', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800', path: '/shop?category=Trousers' },
  { name: 'WINTERWEAR', image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=800', path: '/shop?category=Outerwear' },
];

const SUIT_CATEGORIES = [
  { name: 'FORMAL SUITS', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800', path: '/shop?category=Suits&type=formal' },
  { name: 'TUXEDOS', image: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&q=80&w=800', path: '/shop?category=Suits&type=tuxedo' },
  { name: 'WEDDING SUITS', image: 'https://images.unsplash.com/photo-1555069519-048a85750dc1?auto=format&fit=crop&q=80&w=800', path: '/shop?category=Suits&type=wedding' },
  { name: 'BUSINESS SUITS', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', path: '/shop?category=Suits&type=business' },
  { name: 'BLAZERS', image: 'https://images.unsplash.com/photo-1594932224828-b4b05a832fe3?auto=format&fit=crop&q=80&w=800', path: '/shop?category=Suits&type=blazer' },
  { name: 'INDO-WESTERN', image: 'https://images.unsplash.com/photo-1617135671685-dd0df3cab3c8?auto=format&fit=crop&q=80&w=800', path: '/shop?category=Suits&type=indowestern' },
];

const CategoryGrid = ({ title, categories }: { title: string, categories: any[] }) => (
  <section className="py-24 bg-brand-cream relative z-20 border-b border-brand-onyx/5">
    <div className="max-w-[1600px] mx-auto px-8 md:px-16">
      <h2 className="text-6xl md:text-8xl font-serif text-center text-brand-onyx mb-20 tracking-tighter">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {categories.map((cat, i) => (
          <Link key={i} to={cat.path} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-white shadow-lg">
              <AutoImage
                productId={`cat-${cat.name}`}
                productName={`${cat.name} Collection`}
                category={cat.name}
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-onyx/0 group-hover:bg-brand-onyx/20 transition-all duration-700"></div>
            </div>
            <p className="text-center text-sm md:text-base uppercase tracking-[0.6em] font-bold text-brand-onyx group-hover:text-brand-gold transition-all duration-300">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="bg-brand-cream">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-brand-onyx/50 z-10"></div>
            <AutoImage
              productId={`hero-${index}`}
              productName="Luxury Bespoke Atelier"
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transform scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-8 text-center">
              <span className="text-sm md:text-base uppercase tracking-[1em] mb-10 font-bold text-brand-gold">
                {slide.subtitle}
              </span>
              <h1 className="text-7xl md:text-[11rem] font-serif mb-12 tracking-tighter leading-none">
                {slide.title}
              </h1>
              <p className="max-w-3xl text-xl md:text-2xl font-light mb-16 opacity-90 leading-relaxed text-brand-cream">
                "{slide.quote}"
              </p>
              <Link
                to="/shop"
                className="group flex items-center space-x-8 bg-brand-gold text-white px-16 py-8 text-sm uppercase tracking-[0.6em] font-bold hover:bg-white hover:text-brand-onyx transition-all duration-500 shadow-2xl"
              >
                <span>Explore Wardrobe</span>
                <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
              </Link>
            </div>
          </div>
        ))}

        <div className="absolute bottom-16 right-16 z-30 flex space-x-8">
          <button
            onClick={prevSlide}
            className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold transition-all duration-500"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
          <button
            onClick={nextSlide}
            className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold transition-all duration-500"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.5em] text-white/50 mb-8 font-bold">Scroll</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-brand-gold to-transparent"></div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-40 border-b border-brand-onyx/5 bg-brand-cream relative z-20">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-20">
          {[
            { icon: Compass, title: 'Global Sourcing', desc: 'Finest Italian & British Mills' },
            { icon: Trophy, title: 'Master Tailors', desc: '15+ Years of Bespoke Artistry' },
            { icon: ShieldCheck, title: 'Precision Fit', desc: 'CLO3D Digital Mapping' },
            { icon: Star, title: 'Elite Circle', desc: 'Serving the Top 1% Globally' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full border border-brand-gold/20 flex items-center justify-center mb-10 transition-colors duration-500 group-hover:bg-brand-gold group-hover:border-brand-gold">
                <item.icon 
                  size={36} 
                  strokeWidth={1} 
                  className="text-brand-gold transition-colors duration-500 group-hover:text-white" 
                />
              </div>
              <h3 className="text-base md:text-lg uppercase tracking-[0.5em] font-bold text-brand-onyx mb-6">{item.title}</h3>
              <p className="text-lg md:text-xl text-brand-slate font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <VideoShorts />

      <CategoryGrid title="Shop By Category" categories={GENERAL_CATEGORIES} />

      {/* Editorial Lookbook Section */}
      <section className="py-40 bg-white relative z-20 border-y border-brand-onyx/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4 space-y-12">
              <span className="text-brand-crimson text-sm uppercase tracking-[0.8em] font-bold block">The Atelier Lookbook</span>
              <h2 className="text-6xl md:text-8xl font-serif text-brand-onyx tracking-tighter leading-tight">Visual Mastery</h2>
              <p className="text-xl text-brand-slate font-light leading-relaxed">
                Every garment is a symphony of architecture and anatomy. Witness the precision of the Zone J double-breasted silhouette, where every stitch is intentional.
              </p>
              <button className="flex items-center space-x-6 text-xs uppercase tracking-[0.4em] font-bold text-brand-onyx border-b-2 border-brand-onyx/10 pb-4 hover:text-brand-gold hover:border-brand-gold transition-all">
                <span>View Private Collection</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="aspect-[3/4] overflow-hidden shadow-2xl relative group">
                <AutoImage 
                  productId="editorial-1"
                  productName="Bespoke Suit Editorial"
                  src="https://images.unsplash.com/photo-1617135671685-dd0df3cab3c8?auto=format&fit=crop&q=80&w=800" 
                  alt="" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-brand-onyx/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="aspect-[3/4] overflow-hidden shadow-2xl mt-16 md:mt-32 relative group">
                <AutoImage 
                  productId="editorial-2"
                  productName="Luxury Blazer Detail"
                  src="https://images.unsplash.com/photo-1594932224828-b4b05a832fe3?auto=format&fit=crop&q=80&w=800" 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-brand-onyx/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="aspect-[3/4] overflow-hidden shadow-2xl hidden md:block relative group">
                <AutoImage 
                  productId="editorial-3"
                  productName="Classic Executive Style"
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800" 
                  alt="" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-brand-onyx/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategoryGrid title="Shop By Suits" categories={SUIT_CATEGORIES} />

      {/* Featured Collections */}
      <section id="collections" className="py-40 bg-brand-cream relative z-20">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32">
            <div>
              <span className="text-brand-crimson text-sm uppercase tracking-[0.8em] font-bold mb-8 block">The Selection</span>
              <h2 className="text-6xl md:text-[9rem] font-serif tracking-tighter text-brand-onyx leading-tight text-brand-onyx">New Arrivals</h2>
            </div>
            <Link to="/shop" className="text-sm uppercase tracking-[0.5em] text-brand-onyx font-bold border-b-2 border-brand-gold/20 pb-4 hover:text-brand-gold hover:border-brand-gold transition-all mt-12 md:mt-0">
              View Entire Atelier
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {PRODUCTS.slice(0, 3).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden mb-12 shadow-2xl bg-white">
                  <AutoImage
                    productId={product.id}
                    productName={product.name}
                    category={product.category}
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-onyx/0 group-hover:bg-brand-onyx/20 transition-all duration-700"></div>
                  <div className="absolute bottom-12 left-12 right-12 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="bg-white/95 backdrop-blur-md p-10 shadow-xl text-center border border-brand-gold/10">
                      <span className="text-xs uppercase tracking-[0.6em] text-brand-gold font-bold mb-4 block">{product.category}</span>
                      <h4 className="text-brand-onyx font-serif text-2xl tracking-tight">Explore Piece</h4>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-serif text-brand-onyx mb-6 transition-all tracking-tight leading-none group-hover:text-brand-gold">{product.name}</h3>
                  <p className="text-2xl font-bold text-brand-crimson">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrandAbout />

      {/* Lifestyle Section */}
      <section className="relative py-80 overflow-hidden z-20 bg-brand-cream border-t border-brand-onyx/5">
        <div className="absolute inset-0 z-0">
          <AutoImage
            productId="lifestyle-bg"
            productName="Luxury Lifestyle Atmosphere"
            src="https://images.unsplash.com/photo-1594932224828-b4b05a832fe3?auto=format&fit=crop&q=80&w=2000"
            alt="Lifestyle"
            className="w-full h-full object-cover grayscale"
          />
          {/* Enhanced contrast overlay */}
          <div className="absolute inset-0 bg-brand-cream/70 z-0"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          <span className="text-brand-crimson text-sm uppercase tracking-[1.2em] font-bold mb-12 block">Beyond Fabric</span>
          <h2 className="text-5xl md:text-8xl font-serif tracking-tighter text-brand-onyx mb-16 leading-tight">
            "A suit is not just attire. <br /> It is a statement of intent."
          </h2>
          <div className="w-40 h-px bg-brand-crimson mx-auto mb-16"></div>
          <p className="text-brand-slate text-2xl md:text-3xl font-light leading-relaxed mb-24 max-w-4xl mx-auto">
            In the upper echelons of society, details are everything. At Zone J, we engineer your presence through meticulous geometry and the world's most luxurious textiles.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center space-x-10 text-sm uppercase tracking-[0.6em] font-bold text-brand-onyx hover:text-brand-gold transition-colors"
          >
            <span>Discover Our Legacy</span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
