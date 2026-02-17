
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ViewState } from '../App';

interface FooterProps {
  onNavigate?: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-black pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-brand-accent shadow-[0_0_50px_#D4FF00]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-32">
           <div className="max-w-md">
              <div className="text-4xl font-black tracking-tighter mb-10 text-white">
                vexelstudios<span className="text-brand-accent">.</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-16 text-white">
                Ready to make <br/>it <span className="text-brand-accent">happen?</span>
              </h2>
              <a 
                href="mailto:hello@vexelstudios.com" 
                className="inline-flex items-center gap-4 text-3xl font-black border-b-4 border-brand-accent pb-2 text-white hover:text-brand-accent transition-all group"
              >
                HELLO@VEXELSTUDIOS.COM <ArrowUpRight className="w-10 h-10 group-hover:rotate-45 transition-transform" />
              </a>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
              <div>
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-dim mb-8">Links</h3>
                 <ul className="space-y-6 font-black uppercase text-xs tracking-widest text-white">
                    <li><a href="#work" className="hover:text-brand-accent transition-colors">Our Work</a></li>
                    <li><a href="#services" className="hover:text-brand-accent transition-colors">What we do</a></li>
                    <li><a href="#process" className="hover:text-brand-accent transition-colors">How we work</a></li>
                 </ul>
              </div>
              <div>
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-dim mb-8">Help</h3>
                 <ul className="space-y-6 font-black uppercase text-xs tracking-widest text-white">
                    {onNavigate && (
                      <li><button onClick={() => onNavigate('pricing')} className="hover:text-brand-accent transition-colors">Pricing</button></li>
                    )}
                    {onNavigate && (
                      <li><button onClick={() => onNavigate('client-guide')} className="hover:text-brand-accent transition-colors">Guide</button></li>
                    )}
                 </ul>
              </div>
              <div className="hidden md:block">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-dim mb-8">Social</h3>
                 <ul className="space-y-6 font-black uppercase text-xs tracking-widest text-white">
                    <li><a href="#" className="hover:text-brand-accent transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-brand-accent transition-colors">Behance</a></li>
                 </ul>
              </div>
           </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-brand-dim uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} Vexel Studios
          </p>
          <div className="flex gap-12 text-[10px] font-black text-brand-dim uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
