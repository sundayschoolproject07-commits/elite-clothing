
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [businessType, setBusinessType] = useState('retail');
  const [designPreference, setDesignPreference] = useState('luxury');
  
  const inputClasses = "w-full bg-white border-b border-brand-slate/20 py-4 outline-none focus:border-brand-crimson text-brand-onyx placeholder:text-brand-slate/60 transition-colors text-sm font-medium";

  const businessOptions = [
    { label: 'Retail', value: 'retail' },
    { label: 'Service', value: 'service' },
    { label: 'Manufacturing', value: 'manufacturing' },
    { label: 'Education', value: 'education' },
    { label: 'Others', value: 'others' }
  ];

  const designOptions = [
    { label: 'Modern', value: 'modern' },
    { label: 'Minimal', value: 'minimal' },
    { label: 'Classic', value: 'classic' },
    { label: 'Luxury', value: 'luxury' },
    { label: 'Others', value: 'others' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      businessType,
      designPreference,
    };
    console.log('Form Submitted:', formData);
    alert('Thank you for your inquiry. Our concierge will reach out shortly.');
  };

  return (
    <div className="pt-48 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-brand-cream min-h-screen">
      <header className="text-center mb-24">
        <span className="text-[10px] uppercase tracking-[0.4em] text-brand-crimson font-bold mb-4 block">Concierge</span>
        <h1 className="text-5xl md:text-7xl font-serif text-brand-onyx mb-8 tracking-tighter">Personal Consultation</h1>
        <div className="w-24 h-px bg-brand-crimson mx-auto"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
        {/* Info Sidebar */}
        <div className="lg:col-span-4 space-y-16">
          <div className="bg-white p-10 shadow-sm border border-brand-onyx/5">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-8 text-brand-onyx">Visit Our Studio</h3>
            <div className="flex items-start space-x-4 text-brand-slate">
              <MapPin size={20} className="text-brand-crimson flex-shrink-0" />
              <p className="text-sm leading-relaxed">
                1/1334 4th cross street, Thiruvalluvar Salai, <br />
                opposite kailash hotel, bethal nagar, <br />
                Injambakkam, Chennai, Tamil Nadu 600115
              </p>
            </div>
          </div>

          <div className="bg-white p-10 shadow-sm border border-brand-onyx/5">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-8 text-brand-onyx">Direct Contact</h3>
            <div className="space-y-6">
              <a href="tel:+918939888593" className="flex items-center space-x-4 text-brand-slate hover:text-brand-crimson transition-colors group">
                <Phone size={20} className="text-brand-crimson" />
                <span className="text-sm font-bold tracking-tight">+91 89398 88593</span>
              </a>
              <a href="mailto:bespoke@zonej.com" className="flex items-center space-x-4 text-brand-slate hover:text-brand-crimson transition-colors group">
                <Mail size={20} className="text-brand-crimson" />
                <span className="text-sm font-bold tracking-tight">bespoke@zonej.com</span>
              </a>
            </div>
          </div>

          <div className="pt-4">
            <a 
                href="https://wa.me/918939888593" 
                className="flex items-center justify-between bg-brand-onyx text-white px-8 py-8 w-full group hover:bg-brand-crimson transition-all duration-500 shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <MessageCircle size={24} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black">Chat with a Stylist</span>
              </div>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-8 bg-white p-10 md:p-16 shadow-2xl border border-brand-onyx/5">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-slate">Full Name</label>
                <input type="text" placeholder="Your name" className={inputClasses} required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-slate">Email Address</label>
                <input type="email" placeholder="email@address.com" className={inputClasses} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6 bg-brand-cream/30 p-8 border border-brand-onyx/5">
                <label className="text-[10px] uppercase tracking-widest font-black text-brand-onyx block mb-2">Business Type</label>
                <div className="space-y-4">
                  {businessOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="radio" 
                          name="businessType" 
                          value={option.value} 
                          checked={businessType === option.value}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="peer appearance-none w-5 h-5 border-2 border-brand-slate/30 rounded-full checked:border-brand-crimson transition-all cursor-pointer bg-white"
                          required
                        />
                        <div className="absolute w-2.5 h-2.5 bg-brand-crimson rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span className={`text-[11px] uppercase tracking-[0.3em] transition-colors ${businessType === option.value ? 'text-brand-onyx font-black' : 'text-brand-slate group-hover:text-brand-onyx'}`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-6 bg-brand-cream/30 p-8 border border-brand-onyx/5">
                <label className="text-[10px] uppercase tracking-widest font-black text-brand-onyx block mb-2">Design Preference</label>
                <div className="space-y-4">
                  {designOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="radio" 
                          name="designPreference" 
                          value={option.value} 
                          checked={designPreference === option.value}
                          onChange={(e) => setDesignPreference(e.target.value)}
                          className="peer appearance-none w-5 h-5 border-2 border-brand-slate/30 rounded-full checked:border-brand-crimson transition-all cursor-pointer bg-white"
                          required
                        />
                        <div className="absolute w-2.5 h-2.5 bg-brand-crimson rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span className={`text-[11px] uppercase tracking-[0.3em] transition-colors ${designPreference === option.value ? 'text-brand-onyx font-black' : 'text-brand-slate group-hover:text-brand-onyx'}`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-slate">Nature of Inquiry</label>
              <div className="relative">
                <select className={`${inputClasses} appearance-none bg-transparent relative z-10 cursor-pointer`}>
                  <option>Custom Suit Consultation</option>
                  <option>Personal Styling</option>
                  <option>Corporate Orders</option>
                  <option>Other</option>
                </select>
                <div className="absolute right-0 bottom-4 pointer-events-none">
                    <ArrowRight size={14} className="rotate-90 text-brand-slate" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-slate">Your Message</label>
              <textarea rows={4} placeholder="How can we assist you?" className={`${inputClasses} resize-none`} required></textarea>
            </div>

            <button type="submit" className="bg-brand-crimson text-white px-20 py-6 text-[10px] uppercase tracking-[0.5em] font-black hover:bg-brand-onyx transition-all duration-500 shadow-xl">
              Request Appointment
            </button>
          </form>

          <div className="mt-24 h-[400px] bg-brand-cream grayscale flex items-center justify-center relative overflow-hidden group border border-brand-onyx/10">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" alt="Map pattern" className="w-full h-full object-cover" />
            </div>
            <div className="text-center z-10 px-6">
                <h4 className="text-3xl font-serif mb-4 text-brand-onyx font-bold tracking-tighter">Located in Chennai</h4>
                <p className="text-[10px] uppercase tracking-[0.5em] text-brand-slate mb-8 font-black">Zone J Tailoring Studio</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border-b-2 border-brand-crimson text-[10px] uppercase tracking-[0.4em] pb-2 text-brand-crimson font-black hover:text-brand-onyx hover:border-brand-onyx transition-all"
                >
                  Get Directions
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
