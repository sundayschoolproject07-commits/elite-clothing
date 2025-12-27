
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, ChevronDown, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import AutoImage from '../components/AutoImage';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { 
      ...PRODUCTS[0], 
      selectedSize: 'L', 
      selectedColor: 'Onyx Black', 
      quantity: 1 
    },
    { 
      ...PRODUCTS[1], 
      selectedSize: '42', 
      selectedColor: 'Navy Blue', 
      quantity: 1 
    }
  ]);

  const updateQuantity = (id: string, newQty: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const updateSize = (id: string, newSize: string) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, selectedSize: newSize };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="pt-48 pb-32 px-6 text-center bg-brand-cream min-h-screen">
        <div className="max-w-md mx-auto">
          <ShoppingBag size={64} className="mx-auto text-brand-slate/30 mb-8" strokeWidth={1} />
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-brand-onyx">Your Bag is Empty</h1>
          <p className="text-lg text-brand-slate mb-12 font-light">Refine your wardrobe with our latest bespoke collections.</p>
          <Link 
            to="/shop" 
            className="inline-block bg-brand-onyx text-white px-12 py-6 text-sm uppercase tracking-[0.4em] font-black hover:bg-brand-crimson transition-all shadow-2xl"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto bg-brand-cream min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-onyx tracking-tight">Your Bag</h1>
        <p className="text-sm uppercase tracking-widest text-brand-slate mt-2">
          {totalItems} {totalItems === 1 ? 'Item' : 'Items'} in Consultation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8 space-y-8">
          <div className="border-t border-brand-onyx/10">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-stretch py-10 border-b border-brand-onyx/10 gap-8 md:gap-12 group">
                <div className="w-full md:w-40 aspect-[3/4] bg-white overflow-hidden flex-shrink-0 shadow-sm border border-brand-onyx/5">
                  <AutoImage 
                    productId={item.id}
                    productName={item.name}
                    category={item.category}
                    color={item.selectedColor}
                    src={item.images && item.images.length > 0 ? item.images[0] : undefined} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl md:text-2xl font-serif text-brand-onyx font-bold tracking-tight leading-tight">
                        {item.name}
                      </h3>
                      <p className="md:hidden text-lg font-black text-brand-crimson">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 mt-6">
                      <div className="relative group/select">
                        <label className="text-[10px] uppercase tracking-widest font-black text-brand-slate block mb-2">Size</label>
                        <div className="relative">
                          <select 
                            value={item.selectedSize}
                            onChange={(e) => updateSize(item.id, e.target.value)}
                            className="appearance-none bg-white border border-brand-onyx/20 px-4 py-3 pr-10 text-sm font-bold text-brand-onyx outline-none focus:border-brand-onyx min-w-[100px] rounded-none cursor-pointer"
                          >
                            {item.sizes.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-slate" />
                        </div>
                      </div>

                      <div className="relative group/select">
                        <label className="text-[10px] uppercase tracking-widest font-black text-brand-slate block mb-2">Quantity</label>
                        <div className="relative">
                          <select 
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="appearance-none bg-white border border-brand-onyx/20 px-4 py-3 pr-10 text-sm font-bold text-brand-onyx outline-none focus:border-brand-onyx min-w-[80px] rounded-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5].map(q => (
                              <option key={q} value={q}>{q}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-slate" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 mt-10">
                    <button className="flex items-center text-[10px] uppercase tracking-widest font-black text-brand-slate hover:text-brand-crimson transition-colors group/action">
                      <Heart size={14} className="mr-2 group-hover/action:fill-brand-crimson" /> Move to Wishlist
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="flex items-center text-[10px] uppercase tracking-widest font-black text-brand-slate hover:text-brand-onyx transition-colors group/action"
                    >
                      <X size={14} className="mr-2" /> Remove
                    </button>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-end justify-start pt-2">
                  <p className="text-2xl font-black text-brand-crimson">₹{item.price.toLocaleString('en-IN')}</p>
                  {item.quantity > 1 && (
                    <p className="text-[10px] text-brand-slate uppercase tracking-widest mt-2">₹{(item.price * item.quantity).toLocaleString('en-IN')} total</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <Link to="/shop" className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.4em] font-black text-brand-onyx border-b-2 border-brand-onyx/20 pb-2 hover:text-brand-crimson hover:border-brand-crimson transition-all group">
              <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 h-full">
          <div className="bg-white p-10 md:p-14 shadow-2xl border border-brand-onyx/5 sticky top-32">
            <h2 className="text-xl uppercase tracking-[0.2em] font-black mb-10 text-brand-onyx border-b border-brand-onyx/10 pb-6">Order Summary</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-base">
                <span className="text-brand-slate font-medium">Subtotal</span>
                <span className="text-brand-onyx font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-brand-slate font-medium">Shipping</span>
                <span className="text-brand-crimson font-black uppercase tracking-widest text-[11px]">Complimentary</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-brand-slate font-medium">Estimated Taxes</span>
                <span className="text-brand-onyx font-medium text-sm text-right">Inclusive of all taxes</span>
              </div>
            </div>

            <div className="pt-8 border-t-2 border-brand-onyx/10 flex justify-between items-center mb-10">
              <span className="text-lg font-black uppercase tracking-[0.3em] text-brand-onyx">Total</span>
              <span className="text-4xl font-serif font-black text-brand-crimson">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="space-y-6">
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-brand-onyx text-white py-8 flex items-center justify-center text-sm uppercase tracking-[0.5em] font-black group hover:bg-brand-crimson transition-all duration-500 shadow-xl"
              >
                CHECKOUT
              </button>
            </div>

            <div className="mt-12 space-y-6 border-t border-brand-onyx/5 pt-10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-slate">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-brand-onyx">Secure Checkout</p>
                  <p className="text-[9px] text-brand-slate uppercase tracking-widest font-bold">Encrypted SSL Transaction</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-slate">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-brand-onyx">Easy Returns</p>
                  <p className="text-[9px] text-brand-slate uppercase tracking-widest font-bold">15-Day Bespoke Guarantee</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-slate">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-brand-onyx">Free Shipping</p>
                  <p className="text-[9px] text-brand-slate uppercase tracking-widest font-bold">White-Glove Delivery Globally</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-brand-onyx/5">
              <p className="text-[10px] text-brand-slate leading-relaxed text-center font-medium">
                *Zone J pieces are artisanally crafted to order. 
                Average fulfillment time: 10-14 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
