
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, MessageCircle, ArrowRight, Phone } from 'lucide-react';
import { PRODUCTS, BRAND_PLACEHOLDER } from '../constants';
import AutoImage from '../components/AutoImage';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderId = "ZJ-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Default values if state is missing
  const selection = location.state || {
    selectedSize: 'Custom',
    selectedColor: 'Midnight',
    product: PRODUCTS[0],
    formData: {
      firstName: 'Alexander',
      lastName: 'Sterling',
      email: 'alexander@luxury.com',
      phone: '+44 20 7946 0958',
      address: '12 Mayfair Gardens',
      city: 'London',
      postcode: 'SW1A 1AA'
    }
  };

  const { product: orderItem, formData, selectedSize, selectedColor } = selection;

  return (
    <div className="pt-48 pb-32 px-6 md:px-12 bg-brand-cream min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-xl shadow-brand-crimson/5 border border-brand-crimson/10 mb-8">
            <CheckCircle size={40} className="text-brand-crimson" strokeWidth={1.5} />
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-crimson font-bold mb-4">Transaction Successful</p>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-onyx mb-6 tracking-tighter">Thank You for Your Order</h1>
          <p className="text-brand-slate text-lg max-w-2xl mx-auto leading-relaxed">
            Your bespoke garment is now in the hands of our master tailors. We have sent a detailed confirmation to <span className="text-brand-onyx font-bold">{formData.email}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Order Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-10 shadow-sm border border-brand-slate/5">
              <div className="flex justify-between items-center border-b border-brand-cream pb-6 mb-8">
                <h2 className="text-xs uppercase tracking-widest font-bold text-brand-onyx">Order Details</h2>
                <span className="text-[10px] font-mono text-brand-slate">ID: {orderId}</span>
              </div>
              
              <div className="flex space-x-8">
                <div className="w-24 aspect-[3/4] bg-brand-cream overflow-hidden flex-shrink-0">
                  <AutoImage 
                    productId={orderItem.id}
                    productName={orderItem.name}
                    category={orderItem.category}
                    color={selectedColor}
                    src={orderItem.images[0]} 
                    alt={orderItem.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-serif text-brand-onyx mb-2">{orderItem.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-brand-slate mb-4">
                    Size: {selectedSize} / Color: {selectedColor}
                  </p>
                  <p className="text-lg font-black text-brand-crimson">₹{orderItem.price.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-brand-cream space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-slate">Subtotal (Incl. Taxes)</span>
                  <span className="text-brand-onyx font-bold">₹{orderItem.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-slate">Premium Shipping</span>
                  <span className="text-brand-crimson font-bold uppercase tracking-widest text-[10px]">Complimentary</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4 border-t border-brand-cream">
                  <span className="text-brand-onyx font-serif">Total</span>
                  <span className="text-brand-crimson">₹{orderItem.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 shadow-sm border border-brand-slate/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Truck size={18} className="text-brand-crimson" />
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-onyx">Shipping To</h4>
                </div>
                <div className="text-sm text-brand-slate leading-relaxed space-y-1">
                  <p className="font-bold text-brand-onyx">{formData.firstName} {formData.lastName}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.postcode}</p>
                  <div className="flex items-center space-x-2 pt-2 text-brand-onyx font-bold">
                    <Phone size={12} />
                    <span>{formData.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar size={18} className="text-brand-crimson" />
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-onyx">Estimated Arrival</h4>
                </div>
                <p className="text-sm text-brand-onyx font-medium">October 24 – October 28</p>
                <p className="text-[10px] text-brand-slate mt-2 leading-relaxed font-medium">
                  *Bespoke tailoring requires 10-14 days for precision crafting.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-brand-onyx text-white p-10 shadow-xl">
              <h3 className="text-xl font-serif mb-6">What happens next?</h3>
              <ul className="space-y-8">
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full border border-brand-crimson flex items-center justify-center text-[10px] flex-shrink-0 mt-1">1</div>
                  <p className="text-sm text-brand-slate leading-relaxed">Our head tailor reviews your measurements for geometric consistency.</p>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full border border-brand-crimson flex items-center justify-center text-[10px] flex-shrink-0 mt-1">2</div>
                  <p className="text-sm text-brand-slate leading-relaxed">Fabric selection and laser cutting begin within 24 hours.</p>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full border border-brand-crimson flex items-center justify-center text-[10px] flex-shrink-0 mt-1">3</div>
                  <p className="text-sm text-brand-slate leading-relaxed">You will receive a notification once your piece moves to hand-finishing.</p>
                </li>
              </ul>
            </div>

            <div className="border border-brand-slate/20 p-10 text-center">
              <p className="text-sm text-brand-onyx mb-6 font-medium">Need to modify your measurements?</p>
              <Link to="/contact" className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-brand-crimson hover:opacity-70 transition-opacity">
                Contact Concierge <MessageCircle className="ml-2" size={14} />
              </Link>
            </div>

            <Link 
              to="/shop" 
              className="w-full flex items-center justify-center space-x-4 bg-white border border-brand-onyx py-6 text-xs uppercase tracking-widest font-bold hover:bg-brand-onyx hover:text-white transition-all duration-500"
            >
              <span>Back to Wardrobe</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
