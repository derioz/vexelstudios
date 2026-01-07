
import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface PricingProps {
  onBack: () => void;
  onContact: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onBack, onContact }) => {
  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <button
             onClick={onBack}
             className="group flex items-center gap-3 text-brand-dim hover:text-white transition-all mb-20"
           >
             <div className="w-10 h-10 flex items-center justify-center bg-brand-card rounded-full border border-white/10 group-hover:border-brand-accent transition-all">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
             </div>
             <span className="font-black text-xs uppercase tracking-widest">Back</span>
        </button>

        <div className="mb-24 text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-9xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
                Simple <br/><span className="text-brand-accent">Pricing</span>
            </h1>
            <p className="text-xl text-brand-dim font-semibold max-w-2xl mx-auto">
                No hidden fees. Just clear plans to get your website built and launched perfectly.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 items-stretch">
            {/* Essential */}
            <div className="bg-brand-surface p-12 rounded-[3.5rem] flex flex-col border border-white/5 hover:border-brand-accent/20 transition-all group">
                <div className="mb-12">
                    <h3 className="text-3xl font-black uppercase mb-3 text-white">Basic</h3>
                    <p className="text-brand-dim font-bold text-sm tracking-wide">Perfect for simple sites.</p>
                </div>
                <div className="mb-12">
                    <span className="text-7xl font-black text-white">$375</span>
                    <span className="text-brand-accent font-black block mt-3 uppercase text-[10px] tracking-[0.3em]">One-time</span>
                </div>
                <ul className="space-y-5 mb-12 flex-grow">
                     {["Design", "Mobile Ready", "Google Setup", "Fast Hosting"].map((feat, i) => (
                         <li key={i} className="flex items-center gap-4 font-black uppercase text-[10px] tracking-[0.2em] text-white/70">
                             <div className="w-4 h-4 flex items-center justify-center bg-brand-accent/10 rounded-full">
                                <Check className="w-3 h-3 text-brand-accent" />
                             </div> 
                             {feat}
                         </li>
                     ))}
                </ul>
                <button onClick={onContact} className="w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-brand-accent transition-all">
                    Choose Basic
                </button>
            </div>

            {/* Professional */}
            <div className="bg-white text-black p-12 rounded-[3.5rem] flex flex-col transform lg:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden group">
                <div className="mb-12 relative z-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-3xl font-black uppercase">Plus</h3>
                        <span className="px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest rounded-full">Best Value</span>
                    </div>
                    <p className="text-black/60 font-bold text-sm tracking-wide">For businesses that need more.</p>
                </div>
                <div className="mb-12 relative z-10">
                    <span className="text-7xl font-black">$875</span>
                    <span className="text-black font-black block mt-3 uppercase text-[10px] tracking-[0.3em] opacity-40">One-time</span>
                </div>
                <ul className="space-y-5 mb-12 flex-grow relative z-10">
                     {["Easy Editing", "Customer Data", "Payments", "Priority Help"].map((feat, i) => (
                         <li key={i} className="flex items-center gap-4 font-black uppercase text-[10px] tracking-[0.2em]">
                             <div className="w-4 h-4 flex items-center justify-center bg-black rounded-full">
                                <Check className="w-3 h-3 text-white" />
                             </div>
                             {feat}
                         </li>
                     ))}
                </ul>
                <button onClick={onContact} className="w-full py-7 bg-black text-white rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all relative z-10">
                    Choose Plus
                </button>
            </div>

            {/* Retainer */}
            <div className="bg-brand-surface p-12 rounded-[3.5rem] flex flex-col border border-white/5 hover:border-brand-accent/20 transition-all">
                <div className="mb-12">
                    <h3 className="text-3xl font-black uppercase mb-3 text-white">Care</h3>
                    <p className="text-brand-dim font-bold text-sm tracking-wide">We keep it running.</p>
                </div>
                <div className="mb-12">
                    <span className="text-7xl font-black text-white">$75</span>
                    <span className="text-brand-accent font-black block mt-3 uppercase text-[10px] tracking-[0.3em]">Per Month</span>
                </div>
                <ul className="space-y-5 mb-12 flex-grow">
                     {["Regular Checks", "Weekly Backups", "Always Online", "Fixes"].map((feat, i) => (
                         <li key={i} className="flex items-center gap-4 font-black uppercase text-[10px] tracking-[0.2em] text-white/70">
                             <div className="w-4 h-4 flex items-center justify-center bg-brand-accent/10 rounded-full">
                                <Check className="w-3 h-3 text-brand-accent" />
                             </div>
                             {feat}
                         </li>
                     ))}
                </ul>
                <button onClick={onContact} className="w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-brand-accent transition-all">
                    Choose Care
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
