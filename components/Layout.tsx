
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Facebook, Linkedin, Youtube, ArrowRight, ChevronDown, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = ['Suits', 'Shirts', 'Accessories', 'Outerwear', 'Trousers'];

  const headerBaseClass = "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-in-out";
  const headerActiveStyles = (isScrolled || !isHome)
    ? "bg-white text-brand-onyx py-4 shadow-xl border-b border-brand-onyx/5"
    : "bg-transparent text-white py-8";

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsMobileCategoryOpen(false);
  };

  return (
    <>
      <header className={`${headerBaseClass} ${headerActiveStyles}`}>
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 flex justify-between items-center">
          <Link to="/" onClick={closeMenus} className="text-2xl md:text-4xl font-serif tracking-tighter group flex flex-col">
            <span className="leading-none">ZONE J</span>
            <span className="text-[8px] uppercase tracking-[0.6em] text-brand-gold font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">Be Like Billionaire</span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-12">
            <Link 
              to="/" 
              onClick={closeMenus}
              className={`text-[12px] uppercase tracking-[0.3em] transition-all duration-300 relative group py-2 ${
                location.pathname === '/' ? 'text-brand-crimson font-bold' : 'hover:text-brand-crimson'
              }`}
            >
              Home
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-crimson transition-all duration-500 group-hover:w-full"></span>
            </Link>

            <Link 
              to="/shop" 
              onClick={closeMenus}
              className={`text-[12px] uppercase tracking-[0.3em] transition-all duration-300 relative group py-2 hover:text-brand-crimson`}
            >
              Wardrobe
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-crimson transition-all duration-500 group-hover:w-full"></span>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`text-[12px] uppercase tracking-[0.3em] transition-all duration-300 flex items-center space-x-2 py-2 group hover:text-brand-crimson`}
              >
                <span>Category</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-0 mt-4 bg-white shadow-2xl border border-brand-onyx/5 min-w-[220px] transition-all duration-300 origin-top ${isCategoryDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/shop?category=${cat}`}
                    onClick={closeMenus}
                    className="block px-8 py-5 text-[11px] uppercase tracking-[0.3em] text-brand-onyx hover:bg-brand-cream hover:text-brand-crimson transition-colors border-b border-brand-onyx/5 last:border-0 font-medium"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-4 w-[1px] bg-brand-slate/30"></div>
            
            <div className="flex items-center space-x-6">
              <Link to="/wishlist" className="relative group p-2">
                <Heart size={22} strokeWidth={1} className={`${wishlist.length > 0 ? 'text-brand-crimson fill-brand-crimson/10' : ''} group-hover:text-brand-crimson transition-colors`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-0 bg-brand-crimson text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">{wishlist.length}</span>
                )}
              </Link>

              <Link to="/cart" className="relative group p-2">
                <ShoppingBag size={22} strokeWidth={1} className="group-hover:text-brand-crimson transition-colors" />
                <span className="absolute top-1 right-0 bg-brand-crimson text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">2</span>
              </Link>
            </div>
          </nav>

          <div className="flex items-center space-x-6 lg:hidden">
            <Link to="/wishlist" className="relative">
              <Heart size={22} strokeWidth={1} className={wishlist.length > 0 ? 'text-brand-crimson fill-brand-crimson/10' : ''} />
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-brand-crimson text-white text-[6px] w-3 h-3 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>}
            </Link>
            <Link to="/cart">
              <ShoppingBag size={22} strokeWidth={1} />
            </Link>
            <button onClick={() => setIsMenuOpen(true)}>
              <Menu size={28} strokeWidth={1} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-onyx text-white z-[1100] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="p-12 flex justify-between items-center">
          <span className="text-3xl font-serif">ZONE J</span>
          <button onClick={() => setIsMenuOpen(false)} className="hover:rotate-90 transition-transform duration-500">
            <X size={40} strokeWidth={0.5} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-[75%] space-y-10 overflow-y-auto">
          <Link to="/" onClick={closeMenus} className="text-4xl md:text-6xl font-serif hover:text-brand-gold transition-all duration-500 tracking-tighter">Home</Link>
          <Link to="/shop" onClick={closeMenus} className="text-4xl md:text-6xl font-serif hover:text-brand-gold transition-all duration-500 tracking-tighter">Wardrobe</Link>
          <Link to="/wishlist" onClick={closeMenus} className="text-4xl md:text-6xl font-serif hover:text-brand-gold transition-all duration-500 tracking-tighter">Wishlist ({wishlist.length})</Link>
          <Link to="/cart" onClick={closeMenus} className="text-4xl md:text-6xl font-serif hover:text-brand-gold transition-all duration-500 tracking-tighter">Bag</Link>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
              className="text-4xl md:text-6xl font-serif hover:text-brand-gold transition-all duration-500 tracking-tighter flex items-center space-x-4"
            >
              <span>Category</span>
              <ChevronDown className={`transition-transform duration-500 ${isMobileCategoryOpen ? 'rotate-180' : ''}`} size={32} />
            </button>
            
            <div className={`flex flex-col items-center space-y-4 transition-all duration-500 overflow-hidden ${isMobileCategoryOpen ? 'max-h-[500px] mt-8 opacity-100' : 'max-h-0 opacity-0'}`}>
              {categories.map((cat) => (
                <Link key={cat} to={`/shop?category=${cat}`} onClick={closeMenus} className="text-xl md:text-2xl font-serif text-brand-slate hover:text-white transition-colors">{cat}</Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-onyx text-white pt-32 pb-16 z-[10] relative">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <h2 className="text-5xl font-serif mb-10 tracking-tighter">ZONE J</h2>
            <p className="text-brand-slate text-lg leading-relaxed mb-12 max-w-md">
              "We don't just sell suits; we engineer confidence for those who shape the world."
            </p>
            <div className="flex space-x-8">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-crimson hover:border-brand-crimson transition-all duration-500">
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">The Brand</h3>
            <ul className="space-y-4 text-sm text-brand-slate font-light">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Legacy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Private Boutiques</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Saved Pieces</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">Client Care</h3>
            <ul className="space-y-4 text-sm text-brand-slate font-light">
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">White Glove Delivery</Link></li>
              <li><Link to="/returns-policy" className="hover:text-white transition-colors">Returns & Alterations</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Sanctum</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">Membership</h3>
            <p className="text-sm text-brand-slate font-light leading-relaxed">Secure your place in the inner circle for seasonal looks and event invitations.</p>
            <div className="flex border-b border-white/20 py-4 group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent text-sm flex-grow outline-none placeholder:text-brand-slate/50" 
              />
              <button className="text-brand-gold group-hover:translate-x-2 transition-transform"><ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.5em] text-brand-slate font-bold">
          <p>&copy; 2024 ZONE J INTERNATIONAL TAILORING. LONDON | CHENNAI | NEW YORK.</p>
          <p className="mt-4 md:mt-0 text-brand-gold text-right">CRAFTED FOR THE TOP 1%</p>
        </div>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-crimson selection:text-white bg-brand-cream">
      <Header />
      <main className={`flex-grow relative z-0 ${isHome ? 'pt-0' : 'pt-24 md:pt-32'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
