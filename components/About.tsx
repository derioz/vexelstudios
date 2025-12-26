import React from 'react';
import { User, Cpu, Gamepad2, Code } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-vexel-950 py-24 border-b border-vexel-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="order-2 lg:order-1">
               <div className="flex items-center gap-2 mb-6">
                 <div className="h-px w-8 bg-vexel-lime"></div>
                 <span className="font-tech text-vexel-lime tracking-widest text-sm uppercase">The Creator</span>
               </div>
               
               <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
                 Meet <span className="text-vexel-dim">Space</span>
               </h2>
               
               <div className="space-y-6 font-sans text-slate-400 text-lg leading-relaxed mb-12">
                 <p>
                   I'm the founder and lead developer behind Vexel Studios. Known online as <span className="text-white font-bold">Space</span>, I bridge the gap between high-performance hardware and creative digital design.
                 </p>
                 <p>
                   My background isn't just in code—it's in the culture of technology. From building custom PC rigs to competitive gaming, I understand that performance is an art form. I bring that same obsession with speed, optimization, and aesthetics to every website I build.
                 </p>
               </div>

                {/* Interest Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 border border-vexel-border bg-vexel-900 hover:border-vexel-lime transition-colors group">
                    <Cpu className="w-8 h-8 text-vexel-dim group-hover:text-vexel-lime mb-4 transition-colors" />
                    <h4 className="font-display font-bold text-white uppercase text-sm tracking-wide mb-1">Hardware</h4>
                    <span className="text-xs font-tech text-slate-500 uppercase tracking-wider">Enthusiast</span>
                  </div>
                  
                  <div className="p-6 border border-vexel-border bg-vexel-900 hover:border-vexel-accent transition-colors group">
                    <Gamepad2 className="w-8 h-8 text-vexel-dim group-hover:text-vexel-accent mb-4 transition-colors" />
                    <h4 className="font-display font-bold text-white uppercase text-sm tracking-wide mb-1">Gaming</h4>
                    <span className="text-xs font-tech text-slate-500 uppercase tracking-wider">Veteran</span>
                  </div>
                  
                  <div className="p-6 border border-vexel-border bg-vexel-900 hover:border-white transition-colors group">
                    <Code className="w-8 h-8 text-vexel-dim group-hover:text-white mb-4 transition-colors" />
                    <h4 className="font-display font-bold text-white uppercase text-sm tracking-wide mb-1">Design</h4>
                    <span className="text-xs font-tech text-slate-500 uppercase tracking-wider">Architect</span>
                  </div>
               </div>
            </div>

            {/* Visual Side */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md aspect-square bg-vexel-900 border border-vexel-border flex items-center justify-center overflow-hidden group hover:border-vexel-lime transition-colors duration-500">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                    
                    {/* Avatar */}
                    <div className="relative z-10 w-48 h-48 rounded-full border-2 border-vexel-border flex items-center justify-center bg-vexel-950 group-hover:border-vexel-lime transition-colors duration-500 shadow-2xl">
                        <User className="w-20 h-20 text-vexel-dim group-hover:text-white transition-colors" />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-6 right-6 text-right">
                        <div className="font-display font-bold text-2xl text-white tracking-widest uppercase leading-none mb-1">VEXEL</div>
                        <div className="font-tech text-xs text-vexel-lime tracking-widest uppercase">Studios HQ</div>
                    </div>
                     <div className="absolute top-6 left-6 font-tech text-xs text-vexel-dim tracking-widest uppercase border border-vexel-dim/30 px-2 py-1">
                        Owner /// Space
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};