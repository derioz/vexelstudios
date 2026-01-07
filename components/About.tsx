
import React from 'react';
import { User, Heart, Coffee, Pencil, CheckCircle, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-brand-surface py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-7">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-8">
                  <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em]">Nice to meet you</span>
               </div>
               
               <h2 className="text-6xl md:text-8xl font-black text-white mb-12 uppercase tracking-tighter leading-[0.85]">
                 Who's <br/><span className="text-brand-accent">Behind it?</span>
               </h2>
               
               <div className="space-y-8 text-xl text-brand-dim font-medium leading-relaxed mb-16 max-w-2xl">
                 <p>
                   My name is <span className="text-white font-black underline decoration-brand-accent decoration-4 underline-offset-8">David</span>, though most people online know me as <span className="text-brand-accent font-black uppercase">Space</span>.
                 </p>
                 <p>
                   I started Vexel Studios because I believe websites should be both beautiful and easy to use. I handle everything from the first design sketch to the final launch, making sure your project feels perfect.
                 </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Creative', icon: Pencil, detail: 'Beautiful Designs' },
                    { label: 'Built Well', icon: Coffee, detail: 'Solid Code' },
                    { label: 'Reliable', icon: Heart, detail: 'Always here' },
                  ].map((item) => (
                    <div key={item.label} className="p-8 bg-brand-black border border-white/5 rounded-3xl flex flex-col items-start group hover:border-brand-accent transition-all duration-500">
                      <div className="w-10 h-10 flex items-center justify-center bg-brand-surface rounded-xl mb-6 text-brand-accent group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-1">{item.label}</span>
                      <span className="text-[9px] font-bold text-brand-dim uppercase tracking-widest">{item.detail}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm">
                    <div className="bg-brand-card rounded-[3rem] border border-white/10 overflow-hidden relative group">
                        <div className="aspect-[4/5] bg-brand-black relative flex items-center justify-center overflow-hidden">
                            <User className="w-48 h-48 text-white/5 transform group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-10" />
                            
                            <div className="absolute bottom-10 left-10 right-10 z-20">
                                <div className="text-5xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                                    David
                                </div>
                                <div className="text-[10px] font-black text-brand-dim uppercase tracking-[0.3em]">
                                  Founder & Designer
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t border-white/5 flex justify-between bg-brand-surface/50">
                             <div className="text-center">
                                <div className="text-xs font-black text-white mb-1 uppercase tracking-widest">Space</div>
                                <div className="text-[8px] font-bold text-brand-dim uppercase tracking-[0.2em]">Nickname</div>
                             </div>
                             <div className="w-[1px] h-8 bg-white/5" />
                             <div className="text-center">
                                <CheckCircle className="w-4 h-4 text-brand-accent mx-auto" />
                                <div className="text-[8px] font-bold text-brand-dim uppercase tracking-[0.2em] mt-1">Available</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
