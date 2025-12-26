import React, { useState } from 'react';
import { Plus, Minus, MessageSquare } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "Do I own the code?",
    answer: "Absolutely. Once the final payment is settled, you possess 100% intellectual property rights to the design and code. We do not hold your digital assets hostage."
  },
  {
    question: "What is your revision policy?",
    answer: "We include 2 rounds of major revisions during the Design phase and 2 rounds of minor tweaks during Development. This ensures we stay on track without scope creep."
  },
  {
    question: "Do you provide hosting?",
    answer: "We help set up hosting on your preferred platform (Vercel, AWS, Netlify) or can manage it for you on a retainer. You retain full administrative access."
  },
  {
    question: "Can you rush a deadline?",
    answer: "Yes, 'Priority Deployment' is available for an additional fee. This involves allocating weekend hours and extra resources to meet aggressive timelines."
  },
  {
    question: "Do you work with existing sites?",
    answer: "Generally, no. We specialize in building high-performance custom architectures from the ground up. However, we can migrate your data to a new system."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-24 bg-vexel-950 px-6 border-b border-vexel-border relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-16 border-b border-vexel-border pb-6">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-vexel-900 border border-vexel-border">
               <MessageSquare className="w-5 h-5 text-vexel-lime" />
             </div>
             <div>
               <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide leading-none">
                 System FAQ
               </h2>
               <span className="font-tech text-xs text-vexel-dim tracking-widest uppercase">Common Protocols</span>
             </div>
           </div>
           <div className="hidden md:block font-tech text-xs text-vexel-dim tracking-widest border border-vexel-dim/30 px-2 py-1">
             DB_ACCESS: PUBLIC
           </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`border transition-all duration-300 ${
                openIndex === index 
                  ? 'border-vexel-lime bg-vexel-900/40' 
                  : 'border-vexel-border bg-vexel-950 hover:border-vexel-dim hover:bg-vexel-900/20'
              }`}
            >
              <button
                className="w-full flex items-center p-6 text-left focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {/* Index Number */}
                <span className={`font-tech text-sm mr-6 tracking-widest transition-colors w-8 ${openIndex === index ? 'text-vexel-lime' : 'text-vexel-dim group-hover:text-white'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                {/* Question */}
                <span className={`flex-1 font-display font-bold text-lg tracking-wide transition-colors uppercase ${openIndex === index ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {item.question}
                </span>
                
                {/* Toggle Icon */}
                <div className={`relative w-6 h-6 flex items-center justify-center transition-colors ${openIndex === index ? 'text-vexel-lime' : 'text-vexel-dim group-hover:text-white'}`}>
                   {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              {/* Answer Pane */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-8 md:pl-[4.5rem] pr-12">
                  <div className="border-l-2 border-vexel-lime/20 pl-4 py-1">
                    <p className="font-sans text-slate-400 leading-relaxed text-sm">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};