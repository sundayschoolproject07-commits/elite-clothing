
import React, { useState } from 'react';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { POLICIES } from '../constants';

interface PolicyProps {
  type: keyof typeof POLICIES;
}

const AccordionItem: React.FC<{ 
  heading: string; 
  text: string; 
  isOpen: boolean; 
  onClick: () => void 
}> = ({ heading, text, isOpen, onClick }) => {
  return (
    <div className="border-b border-brand-slate/20">
      <button
        onClick={onClick}
        className="w-full py-8 flex justify-between items-center text-left group transition-colors"
      >
        <h3 className={`text-xl font-serif transition-colors ${isOpen ? 'text-brand-crimson' : 'text-brand-dark'}`}>
          {heading}
        </h3>
        <div className={`p-1 rounded-full border transition-all duration-300 ${isOpen ? 'bg-brand-crimson border-brand-crimson text-white rotate-180' : 'border-brand-slate/30 text-brand-slate group-hover:border-brand-crimson group-hover:text-brand-crimson'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-brand-slate leading-relaxed text-lg pl-2 border-l-2 border-brand-crimson/20">
          {text}
        </p>
      </div>
    </div>
  );
};

const Policy: React.FC<PolicyProps> = ({ type }) => {
  const policy = POLICIES[type];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-48 pb-32 px-6 md:px-12 bg-brand-light min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        <header className="text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-crimson font-bold mb-4 block">Client Services</span>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-dark mb-8 tracking-tighter">
            {policy.title}
          </h1>
          <div className="w-24 h-px bg-brand-crimson mx-auto"></div>
        </header>

        <div className="bg-white p-6 md:p-12 shadow-sm border border-brand-slate/5">
          {policy.items.map((item, idx) => (
            <AccordionItem 
              key={idx}
              heading={item.heading}
              text={item.text}
              isOpen={openIndex === idx}
              onClick={() => toggleAccordion(idx)}
            />
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-brand-slate/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-brand-slate space-y-4 md:space-y-0">
          <p>Effective Date: January 2024</p>
          <p>Zone J Luxury Tailoring | Be Like Billionaire</p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
