
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, ChevronRight, Image as ImageIcon, Loader2, Heart, Sparkles } from 'lucide-react';
import { PRODUCTS, BRAND_PLACEHOLDER } from '../constants';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import VisualSourcingModal from '../components/VisualSourcingModal';
import AutoImage from '../components/AutoImage';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-50 border border-slate-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <AutoImage 
            productId={product.id}
            productName={product.name}
            category={product.category}
            description={product.description}
            src={product.images && product.images.length > 0 ? product.images[0] : undefined} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
        >
          <Heart size={18} className={wishlisted ? 'fill-brand-crimson text-brand-crimson' : 'text-slate-400'} />
        </button>

        <div className="absolute bottom-0 inset-x-0 bg-white/90 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
           <Link to={`/product/${product.id}`} className="block text-[10px] uppercase font-bold text-center tracking-widest text-slate-900">
             Customize Now
           </Link>
        </div>
      </div>

      <Link to={`/product/${product.id}`} className="block space-y-1">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{product.category}</p>
        <h3 className="text-card font-semibold line-clamp-1">{product.name}</h3>
        <p className="text-sm font-bold text-brand-crimson">₹{product.price.toLocaleString('en-IN')}</p>
      </Link>
    </div>
  );
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');
  const [isSourcingModalOpen, setIsSourcingModalOpen] = useState(false);
  
  const categories = ['All', 'Suits', 'Shirts', 'Accessories', 'Outerwear', 'Trousers'];

  useEffect(() => {
    setActiveCategory(categoryParam || 'All');
  }, [categoryParam]);
  
  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'All') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 pt-10">
      <header className="mb-12 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-slate-900">Collections</span>
          </nav>
          
          <button 
            onClick={() => setIsSourcingModalOpen(true)}
            className="flex items-center space-x-3 bg-brand-crimson text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-onyx transition-all shadow-lg"
          >
            <Sparkles size={14} />
            <span>AI Visual Search</span>
          </button>
        </div>

        <h1 className="text-section font-bold">{activeCategory === 'All' ? 'Full Wardrobe' : activeCategory}</h1>

        <div className="flex flex-col md:flex-row justify-between items-center border-y py-4 gap-6">
          <div className="flex space-x-6 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeCategory === cat ? 'text-brand-crimson border-b-2 border-brand-crimson' : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-6">
            <button className="flex items-center text-xs font-bold uppercase tracking-widest">
              <Filter size={14} className="mr-2" /> Filter
            </button>
            <button className="flex items-center text-xs font-bold uppercase tracking-widest">
              Sort By <ChevronDown size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-24 text-center space-y-6">
          <p className="text-slate-400 font-bold uppercase tracking-widest">Collection Coming Soon</p>
          <button onClick={() => handleCategoryChange('All')} className="text-xs font-bold border-b border-brand-crimson text-brand-crimson">
            Back to All Products
          </button>
        </div>
      )}

      <VisualSourcingModal 
        isOpen={isSourcingModalOpen} 
        onClose={() => setIsSourcingModalOpen(false)} 
      />
    </div>
  );
};

export default Shop;
