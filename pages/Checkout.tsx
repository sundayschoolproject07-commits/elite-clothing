
import React, { useState } from 'react';
import { CreditCard, Wallet, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get variations from location state if available (passed from Buy Now)
  const selection = location.state || {
    selectedSize: 'L',
    selectedColor: 'Black',
    product: PRODUCTS[0]
  };
  
  // Refined input classes - adjusted padding and font size for balance
  const inputClasses = "w-full bg-white border-2 border-brand-onyx/30 px-4 py-4 outline-none focus:border-brand-crimson focus:ring-2 focus:ring-brand-crimson/10 text-brand-onyx font-medium placeholder:text-brand-onyx/30 text-base transition-all rounded-none";
  
  // Refined label classes - smaller, sophisticated typography
  const labelClasses = "block text-[10px] uppercase tracking-[0.2em] font-black text-brand-onyx mb-2";

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: ''
  });

  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Allow only numbers and '+'
      const sanitized = value.replace(/[^\d+]/g, '');
      setFormData(prev => ({ ...prev, [name]: sanitized }));
      setPhoneError('');
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validatePhone = (phone: string) => {
    // Simple regex for India: Optional +91 followed by 10 digits
    // Or just 10 digits
    const indiaRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
    const generalRegex = /^\+?[\d\s\-]{10,}$/;
    
    if (!phone) return "Phone number is required";
    if (!generalRegex.test(phone)) return "Please enter a valid phone number";
    return "";
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validatePhone(formData.phone);
    if (error) {
      setPhoneError(error);
      return;
    }

    if (Object.values(formData).some(val => val === '')) {
      alert("Please fill in all shipping details.");
      return;
    }
    
    navigate('/order-confirmation', { 
      state: { 
        ...selection, 
        formData 
      } 
    });
  };

  const orderItem = selection.product;

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto bg-brand-cream min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Main Content */}
        <div className="lg:col-span-7 xl:col-span-8">
          <h1 className="text-4xl md:text-6xl font-serif mb-12 text-brand-onyx tracking-tight">Checkout</h1>
          
          <form onSubmit={handlePlaceOrder} className="space-y-10">
            
            {/* Step 1: Shipping */}
            <section className="bg-white p-8 md:p-12 shadow-lg border border-brand-onyx/5">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-10 h-10 rounded-full bg-brand-onyx text-white flex items-center justify-center text-sm font-bold">1</div>
                <h2 className="text-lg uppercase tracking-[0.2em] font-black text-brand-onyx">Shipping Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-1">
                  <label htmlFor="firstName" className={labelClasses}>First Name</label>
                  <input 
                    id="firstName"
                    name="firstName"
                    type="text" 
                    placeholder="e.g. Alexander" 
                    className={inputClasses} 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                  <input 
                    id="lastName"
                    name="lastName"
                    type="text" 
                    placeholder="e.g. Sterling" 
                    className={inputClasses} 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className={labelClasses}>Email Address</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="alexander@luxury.com" 
                    className={inputClasses} 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                  <input 
                    id="phone"
                    name="phone"
                    type="tel" 
                    placeholder="e.g. +91 98765 43210" 
                    className={`${inputClasses} ${phoneError ? 'border-brand-crimson' : ''}`} 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                  {phoneError && (
                    <div className="flex items-center space-x-1 mt-1 text-brand-crimson">
                      <AlertCircle size={10} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{phoneError}</span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label htmlFor="address" className={labelClasses}>Shipping Address</label>
                  <input 
                    id="address"
                    name="address"
                    type="text" 
                    placeholder="Street name and apartment number" 
                    className={inputClasses} 
                    value={formData.address}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="city" className={labelClasses}>City</label>
                  <input 
                    id="city"
                    name="city"
                    type="text" 
                    placeholder="London" 
                    className={inputClasses} 
                    value={formData.city}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="postcode" className={labelClasses}>Postcode</label>
                  <input 
                    id="postcode"
                    name="postcode"
                    type="text" 
                    placeholder="SW1A 1AA" 
                    className={inputClasses} 
                    value={formData.postcode}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Payment Method */}
            <section className="bg-white p-8 md:p-12 shadow-lg border border-brand-onyx/5">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-10 h-10 rounded-full bg-brand-onyx/10 text-brand-onyx flex items-center justify-center text-sm font-bold border border-brand-onyx/20">2</div>
                <h2 className="text-lg uppercase tracking-[0.2em] font-black text-brand-onyx">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-[3px] border-brand-crimson p-6 flex items-center justify-between cursor-pointer transition-all bg-brand-crimson/5 group shadow-md">
                  <div className="flex items-center space-x-4">
                    <CreditCard size={24} className="text-brand-crimson" />
                    <span className="text-base font-bold text-brand-onyx">Razorpay (Cards)</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-brand-crimson flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-brand-crimson"></div>
                  </div>
                </div>
                <div className="border-2 border-brand-onyx/10 p-6 flex items-center justify-between cursor-pointer hover:border-brand-onyx transition-all group opacity-60 grayscale hover:grayscale-0 hover:opacity-100">
                  <div className="flex items-center space-x-4">
                    <Wallet size={24} className="text-brand-slate group-hover:text-brand-onyx transition-colors" />
                    <span className="text-base font-bold text-brand-onyx">UPI / GPay</span>
                  </div>
                  <CheckCircle size={24} className="text-brand-onyx/10" />
                </div>
              </div>
            </section>

            <div className="pt-8">
              <button 
                type="submit" 
                className="w-full md:w-auto px-16 py-6 bg-brand-onyx text-white text-sm uppercase tracking-[0.4em] font-black hover:bg-brand-crimson active:scale-[0.98] transition-all duration-300 shadow-3xl flex items-center justify-center space-x-4"
              >
                <span>Place Secure Order</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-white p-10 md:p-12 sticky top-32 shadow-2xl border border-brand-onyx/5">
            <h2 className="text-xs uppercase tracking-[0.3em] font-black mb-10 text-brand-onyx border-b-2 border-brand-onyx/10 pb-6">Order Summary</h2>
            
            <div className="flex items-center space-x-8 mb-10">
              <div className="w-24 aspect-[3/4] bg-brand-cream overflow-hidden shadow-inner flex-shrink-0 border border-brand-onyx/5">
                <img src={orderItem.images[0]} alt={orderItem.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <p className="text-lg font-serif text-brand-onyx mb-2 leading-tight font-bold">{orderItem.name}</p>
                <div className="flex flex-col space-y-1 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-brand-slate uppercase tracking-widest font-black">Size:</span>
                    <span className="text-[10px] text-brand-onyx font-bold uppercase">{selection.selectedSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-brand-slate uppercase tracking-widest font-black">Color:</span>
                    <span className="text-[10px] text-brand-onyx font-bold uppercase">{selection.selectedColor}</span>
                  </div>
                </div>
                <p className="text-lg font-black text-brand-crimson">₹{orderItem.price.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="border-t-2 border-brand-onyx/5 pt-10 space-y-6">
              <div className="flex justify-between text-base">
                <span className="text-brand-slate font-bold">Subtotal</span>
                <span className="text-brand-onyx font-black">₹{orderItem.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-brand-slate font-bold">Shipping</span>
                <span className="text-brand-crimson font-black uppercase tracking-[0.2em] text-xs">Complimentary</span>
              </div>
              <div className="flex justify-between items-center pt-8 border-t-2 border-brand-onyx/10">
                <span className="text-base font-black uppercase tracking-[0.3em] text-brand-onyx">Total Due</span>
                <span className="text-4xl font-serif font-black text-brand-crimson">₹{orderItem.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-brand-cream/60 text-center border border-brand-onyx/5">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <CheckCircle size={14} className="text-brand-slate" />
                <p className="text-[10px] text-brand-onyx uppercase tracking-[0.3em] font-black">
                  Secure Checkout
                </p>
              </div>
              <p className="text-[10px] text-brand-slate leading-relaxed">
                *Inclusive of all taxes. Bespoke garments are crafted individually. Estimated delivery: 10-14 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
