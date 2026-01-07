
import React from 'react';
import { ArrowLeft, CheckCircle2, DollarSign, Heart, Rocket, Monitor, MessageCircle } from 'lucide-react';

interface ClientGuideProps {
  onBack: () => void;
}

export const ClientGuide: React.FC<ClientGuideProps> = ({ onBack }) => {
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

        <div className="mb-32">
            <h1 className="text-6xl md:text-[10rem] font-black text-white mb-10 uppercase tracking-tighter leading-[0.85]">
                Our <br/><span className="text-brand-accent">Guide</span>
            </h1>
            <p className="text-xl text-brand-dim max-w-2xl font-semibold leading-relaxed">
                Everything you need to know about working with us. No complicated terms, just a simple way to build your site.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-24">
                {[
                  { phase: '01', icon: MessageCircle, title: 'Chatting', desc: 'We talk about your business and what you want to achieve. We create a simple plan for the site.' },
                  { phase: '02', icon: Monitor, title: 'Designing', desc: 'We create the look and feel. You will see a full design of the site and approve it before we build.' },
                  { phase: '03', icon: Rocket, title: 'Building', desc: 'We write the code and set everything up. Your site goes live on a fast, secure host.' }
                ].map((item) => (
                  <div key={item.phase} className="flex flex-col md:flex-row gap-12 group">
                    <div className="text-8xl font-black text-white/5 group-hover:text-brand-accent/20 transition-all select-none leading-none">
                      {item.phase}
                    </div>
                    <div className="pt-4">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 flex items-center justify-center bg-brand-accent/10 rounded-full border border-brand-accent/20">
                           <item.icon className="w-5 h-5 text-brand-accent" />
                        </div>
                        <h3 className="text-4xl font-black uppercase text-white tracking-tight">{item.title}</h3>
                      </div>
                      <p className="text-xl text-brand-dim font-medium leading-relaxed max-w-xl">{item.desc}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="lg:col-span-4 space-y-10">
                <div className="bg-brand-surface p-12 rounded-[3.5rem] border border-white/5">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-xl font-black uppercase text-white">Payment</h3>
                    </div>
                    <div className="space-y-8">
                      <div className="flex justify-between font-black uppercase text-[10px] tracking-[0.4em] text-brand-dim">
                        <span>To Start</span>
                        <span className="text-brand-accent">50% Deposit</span>
                      </div>
                      <div className="w-full h-3 bg-brand-black rounded-full overflow-hidden p-1 border border-white/5">
                        <div className="w-1/2 h-full bg-brand-accent rounded-full shadow-[0_0_15px_#D4FF00]"></div>
                      </div>
                      <p className="text-sm font-semibold text-brand-dim leading-relaxed italic">
                        "We start working as soon as the first deposit is paid."
                      </p>
                    </div>
                </div>

                <div className="bg-white text-black p-12 rounded-[3.5rem] shadow-2xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black uppercase">Our Promise</h3>
                    </div>
                    <ul className="space-y-8">
                        <li className="flex items-start gap-5">
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-sm font-black uppercase tracking-wider leading-relaxed">30 days of free support after launch.</p>
                        </li>
                        <li className="flex items-start gap-5">
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-sm font-black uppercase tracking-wider leading-relaxed">You own 100% of the site and code.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
