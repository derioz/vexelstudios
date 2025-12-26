import React from 'react';
import { Hexagon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-vexel-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
           <div className="max-w-md">
              <div className="flex items-center gap-2 mb-6">
                <Hexagon className="w-8 h-8 text-white fill-white/10" />
                <span className="font-display font-bold text-2xl text-white">VEXEL</span>
              </div>
              <h2 className="font-display text-4xl font-bold text-white mb-6 uppercase leading-tight">
                Ready to <span className="text-vexel-lime">Upgrade?</span>
              </h2>
              <a 
                href="mailto:hello@vexelstudios.com" 
                className="inline-block border border-vexel-lime text-vexel-lime px-6 py-3 font-tech font-bold tracking-widest hover:bg-vexel-lime hover:text-black transition-colors"
              >
                GET IN TOUCH
              </a>
           </div>

           <div className="grid grid-cols-2 gap-12">
              <div>
                 <h3 className="font-tech text-xs text-vexel-dim mb-4 tracking-widest uppercase">Menu</h3>
                 <ul className="space-y-2 font-tech text-sm">
                    <li><a href="#work" className="text-slate-400 hover:text-white transition-colors">[WORK]</a></li>
                    <li><a href="#skills" className="text-slate-400 hover:text-white transition-colors">[SERVICES]</a></li>
                    <li><a href="#protocols" className="text-slate-400 hover:text-white transition-colors">[FAQ]</a></li>
                 </ul>
              </div>
              <div>
                 <h3 className="font-tech text-xs text-vexel-dim mb-4 tracking-widest uppercase">Socials</h3>
                 <ul className="space-y-2 font-tech text-sm">
                    <li><a href="#" className="text-slate-400 hover:text-white transition-colors">TWITTER / X</a></li>
                    <li><a href="#" className="text-slate-400 hover:text-white transition-colors">LINKEDIN</a></li>
                    <li><a href="#" className="text-slate-400 hover:text-white transition-colors">GITHUB</a></li>
                 </ul>
              </div>
           </div>
        </div>
        
        <div className="border-t border-vexel-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-tech text-xs text-vexel-dim">
            VEXEL STUDIOS © {new Date().getFullYear()} | SYSTEM_ID: VX_2024
          </p>
          <div className="flex gap-6 font-tech text-xs text-vexel-dim">
            <a href="#" className="hover:text-white">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};