
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "Do I own the code?",
    answer: "Absolutely. Once the final payment is settled, you possess 100% intellectual property rights to the design and code."
  },
  {
    question: "What is your revision policy?",
    answer: "We include 2 rounds of major revisions during the Design phase and 2 rounds of minor tweaks during Development."
  },
  {
    question: "Do you provide hosting?",
    answer: "We help set up hosting on your preferred platform (Vercel, AWS, Netlify) or can manage it for you on a retainer."
  },
  {
    question: "Can you rush a deadline?",
    answer: "Yes, 'Priority Deployment' is available for an additional fee involving weekend hours and extra resources."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-32 px-6 md:px-12 bg-brand-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-24 text-center text-white">
          Common <span className="text-brand-accent">Questions</span>
        </h2>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`border border-white/5 rounded-3xl p-4 transition-all duration-500 bg-brand-card/50 ${openIndex === index ? 'bg-brand-card ring-1 ring-brand-accent/30' : 'hover:bg-brand-card/80'}`}
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-xl font-black uppercase tracking-tight transition-colors ${openIndex === index ? 'text-brand-accent' : 'text-white'}`}>
                    {item.question}
                </span>
                <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${openIndex === index ? 'bg-brand-accent text-black rotate-180' : 'bg-brand-surface text-brand-dim'}`}>
                   {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-6 mt-2">
                    <p className="text-brand-dim text-lg font-medium leading-relaxed max-w-2xl border-l-2 border-brand-accent/30 pl-6">
                    {item.answer}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
