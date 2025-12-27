
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { BRAND_PLACEHOLDER } from '../constants';
import AutoImage from '../components/AutoImage';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleMoveToBag = (item: any) => {
    alert(`${item.name} (${item.selectedSize}/${item.selectedColor}) moved to your consultation bag.`);
    removeFromWishlist(item.wishlistId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="pt-48 pb-32 px-6 text-center bg-brand-cream min-h-screen">
        <div className="max-w-md mx-auto">
          <Heart size={64} className="mx-auto text-brand-slate/20 mb-8" strokeWidth={1} />
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-brand-onyx tracking-tighter">Your Wishlist is Empty</h1>
          <p className="text-lg text-brand-slate mb-12 font-light leading-relaxed">
            Curate your personal collection of Zone J's bespoke masterpieces. Save pieces that resonate with your style.
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center space-x-6 bg-brand-onyx text-white px-12 py-6 text-xs uppercase tracking-[0.4em] font-black hover:bg-brand-crimson transition-all shadow-2xl"
          >
            <span>Browse Wardrobe</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto bg-brand-cream min-h-screen">
      <header className="mb-24 flex flex-col items-center text-center">
        <span className="text-brand-crimson text-[10px] uppercase tracking-[0.8em] font-bold mb-4 block">Private Curation</span>
        <h1 className="text-5xl md:text-8xl font-serif text-brand-onyx tracking-tighter leading-tight">My Saved Pieces</h1>
        <div className="w-16 h-px bg-brand-gold mt-10"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {wishlist.map((item) => (
          <div key={item.wishlistId} className="group flex flex-col h-full relative">
            <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-white shadow-2xl">
              <Link to={`/product/${item.productId}`} className="block w-full h-full">
                <AutoImage 
                  productId={item.productId}
                  productName={item.name}
                  category={item.category}
                  color={item.selectedColor}
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
              </Link>
              
              <button 
                onClick={() => removeFromWishlist(item.wishlistId)}
                className="absolute top-6 right-6 z-30 p-3 bg-white/90 backdrop-blur-md rounded-full text-brand-onyx hover:bg-brand-crimson hover:text-white transition-all shadow-lg"
                title="Remove from favorites"
              >
                <X size={16} />
              </button>

              <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 px-8 z-20">
                <Link 
                  to={`/product/${item.productId}`}
                  className="bg-brand-onyx text-white w-full py-5 text-center text-[10px] uppercase tracking-[0.5em] font-bold shadow-3xl"
                >
                    View Details
                </Link>
              </div>
            </div>

            <div className="text-center flex flex-col flex-grow">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 font-bold">{item.category}</p>
              <h3 className="text-2xl font-serif mb-3 text-brand-onyx transition-all tracking-tight line-clamp-2 min-h-[4rem]">
                {item.name}
              </h3>
              
              <div className="flex flex-col space-y-1 mb-4">
                <p className="text-[10px] uppercase tracking-widest text-brand-slate">
                  Size: <span className="font-black text-brand-onyx">{item.selectedSize}</span>
                </p>
                <p className="text-[10px] uppercase tracking-widest text-brand-slate">
                  Color: <span className="font-black text-brand-onyx">{item.selectedColor}</span>
                </p>
              </div>

              <p className="mt-auto text-lg font-bold text-brand-crimson mb-6">₹{item.price.toLocaleString('en-IN')}</p>
              
              <button 
                onClick={() => handleMoveToBag(item)}
                className="flex items-center justify-center space-x-3 text-[10px] uppercase tracking-widest font-black text-brand-onyx hover:text-brand-crimson transition-colors py-4 border-t border-brand-onyx/5"
              >
                <ShoppingBag size={14} />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-40 border-t border-brand-onyx/5 pt-20 flex flex-col items-center">
        <p className="text-brand-slate text-sm font-light italic mb-8">
          "Your taste is a legacy in progress."
        </p>
        <Link 
          to="/shop" 
          className="text-xs uppercase tracking-[0.4em] font-black text-brand-onyx border-b-2 border-brand-onyx/10 pb-2 hover:text-brand-crimson hover:border-brand-crimson transition-all"
        >
          Add More to Your Selection
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
