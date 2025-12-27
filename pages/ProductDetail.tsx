
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Heart, 
  ShoppingBag, 
  Star
} from 'lucide-react';
import { PRODUCTS, BRAND_PLACEHOLDER } from '../constants';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import AutoImage from '../components/AutoImage';

const RelatedProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group flex flex-col h-full">
      <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-white shadow-xl flex-shrink-0">
        <AutoImage 
          productId={product.id}
          productName={product.name}
          category={product.category}
          src={product.images && product.images.length > 0 ? product.images[0] : undefined} 
          alt={product.name} 
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h4 className="text-lg font-serif mb-2 text-brand-onyx group-hover:text-brand-crimson transition-colors line-clamp-1">
          {product.name}
        </h4>
        <p className="text-sm font-bold text-brand-crimson">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </Link>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist } = useWishlist();
  
  const product = useMemo(() => 
    PRODUCTS.find(p => p.id === id) || PRODUCTS[0]
  , [id]);

  const relatedProducts = useMemo(() => 
    PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  , [product]);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [mainImage, setMainImage] = useState<string | undefined>(product.images && product.images.length > 0 ? product.images[0] : undefined);
  
  useEffect(() => {
    // Reset main image to first product image when product changes
    setMainImage(product.images && product.images.length > 0 ? product.images[0] : undefined);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    window.scrollTo(0, 0);
  }, [product]);

  // If user changes color, we can force the main image to regenerate if needed
  // This is handled by AutoImage's color prop.

  const handleBuyNow = () => {
    navigate('/checkout', { state: { product, selectedSize, selectedColor } });
  };

  const handleAddToCart = () => {
    alert(`${product.name} has been added to your consultation bag.`);
  };

  const handleWishlistAction = () => {
    addToWishlist(product, selectedSize, selectedColor);
    navigate('/wishlist');
  };

  const isPreOrder = product.status === 'Pre-order';
  const wishlisted = isInWishlist(product.id, selectedSize, selectedColor);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Breadcrumbs */}
      <nav className="max-w-[1600px] mx-auto px-8 md:px-16 py-8 flex items-center text-[10px] uppercase tracking-[0.5em] text-brand-slate font-bold">
        <Link to="/" className="hover:text-brand-onyx transition-colors">Home</Link>
        <ChevronRight size={10} className="mx-4" />
        <Link to="/shop" className="hover:text-brand-onyx transition-colors">Wardrobe</Link>
        <ChevronRight size={10} className="mx-4" />
        <span className="text-brand-slate/60">{product.category}</span>
        <ChevronRight size={10} className="mx-4" />
        <span className="text-brand-onyx">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Media */}
        <div className="lg:col-span-5 space-y-10">
          <div className="max-w-[580px] mx-auto lg:mx-0">
            <div className="aspect-[3/4] max-h-[700px] bg-white overflow-hidden shadow-2xl relative group border border-brand-onyx/5">
              <AutoImage 
                productId={product.id}
                productName={product.name}
                category={product.category}
                color={selectedColor}
                description={product.description}
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              {isPreOrder && (
                <div className="absolute top-8 left-8 bg-brand-crimson/95 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.5em] px-5 py-2.5 font-bold shadow-lg z-10">
                  Pre-Order Only
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-8">
              {(product.images && product.images.length > 0 ? product.images : [undefined]).map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-[3/4] overflow-hidden border-2 transition-all duration-300 ${
                    mainImage === img ? 'border-brand-onyx opacity-100' : 'border-transparent opacity-60'
                  }`}
                >
                  <AutoImage 
                    productId={`${product.id}-thumb-${i}`}
                    productName={product.name}
                    category={product.category}
                    src={img} 
                    alt="" 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />)}
              </div>
              <span className="text-[10px] text-brand-slate uppercase tracking-widest font-black">Private Selection</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif text-brand-onyx tracking-tighter font-black leading-tight">
              {product.name}
            </h1>
            
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 pt-2">
                <span className="text-5xl font-black text-brand-crimson">₹{product.price.toLocaleString('en-IN') ?? 0}</span>
                <span className="text-[11px] text-brand-slate uppercase tracking-widest font-bold">Inclusive of all taxes</span>
              </div>
              
              <div className="flex flex-col space-y-2 pt-4">
                <div className={`flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] font-black ${isPreOrder ? 'text-brand-crimson' : 'text-emerald-600'}`}>
                  <span className={`w-2 h-2 rounded-full ${isPreOrder ? 'bg-brand-crimson animate-pulse' : 'bg-emerald-600'}`}></span>
                  <span>Stock Status: {product.status}</span>
                </div>
              </div>
            </div>

            <p className="text-brand-onyx text-xl leading-relaxed font-light border-l-2 border-brand-gold/30 pl-8">
              {product.description}
            </p>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4 border-t border-brand-onyx/5">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-brand-onyx">Selection: Size</span>
                <button className="text-[9px] uppercase tracking-[0.4em] text-brand-crimson font-black border-b border-brand-crimson/20">Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-xs font-black border transition-all ${
                      selectedSize === size ? 'bg-brand-onyx text-white border-brand-onyx' : 'bg-white text-brand-slate border-brand-onyx/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-brand-onyx block">Selection: Color</span>
              <div className="flex space-x-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      // Clearing main image forces AutoImage to reconsider the color variant
                      setMainImage(undefined);
                    }}
                    className={`w-10 h-10 rounded-full border-2 p-1 transition-all ${
                      selectedColor === color ? 'border-brand-gold' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full rounded-full border border-brand-onyx/10" style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button 
              onClick={handleBuyNow}
              className="w-full bg-brand-onyx text-white py-8 text-xs uppercase tracking-[0.6em] font-black hover:bg-brand-crimson transition-all duration-500 shadow-2xl flex items-center justify-center"
            >
              {isPreOrder ? 'PLACE PRE-ORDER' : 'BUY NOW'}
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={handleAddToCart}
                className="bg-white border-2 border-brand-onyx text-brand-onyx py-6 text-[10px] uppercase tracking-[0.5em] font-black hover:bg-brand-onyx hover:text-white transition-all flex items-center justify-center space-x-3"
              >
                <ShoppingBag size={18} />
                <span>Add to Bag</span>
              </button>
              
              <button 
                onClick={handleWishlistAction}
                className={`border py-6 text-[10px] uppercase tracking-[0.5em] font-black transition-all flex items-center justify-center space-x-3 ${
                  wishlisted 
                  ? 'bg-brand-crimson text-white border-brand-crimson shadow-lg' 
                  : 'bg-brand-cream border-brand-onyx/10 text-brand-slate hover:border-brand-onyx'
                }`}
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
                <span>{wishlisted ? 'Saved to Favorites' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="bg-white py-24 border-t border-brand-onyx/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-brand-crimson text-[10px] uppercase tracking-[0.8em] font-bold mb-4 block">Extended Collections</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-onyx tracking-tighter">Related Creations</h2>
            </div>
            <Link to="/shop" className="text-[10px] uppercase tracking-[0.4em] font-black text-brand-onyx border-b border-brand-onyx/20 pb-2 hover:text-brand-crimson transition-colors">
              Explore All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {(relatedProducts.length > 0 ? relatedProducts : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)).map(p => (
              <RelatedProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
