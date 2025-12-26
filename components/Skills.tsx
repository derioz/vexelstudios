import React from 'react';
import { Layout, Server, Clock, ArrowRight } from 'lucide-react';
import { ViewState } from '../App';

interface SkillsProps {
  onNavigate: (view: ViewState) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-vexel-950 py-24 border-b border-vexel-border relative">
       
       <div className="max-w-7xl mx-auto px-6">
          {/* Header - Simplified */}
          <div className="mb-16 border-b border-vexel-border pb-8">
             <span className="font-tech text-vexel-lime text-sm tracking-widest mb-2 block">OUR SERVICES</span>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">
                What We <span className="text-vexel-dim">Offer</span>
             </h2>
          </div>

          {/* Main Grid - Simplified Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
             
             {/* Frontend */}
             <div className="bg-vexel-900/20 border border-vexel-border p-8 hover:border-vexel-lime transition-all group flex flex-col justify-between">
                <div>
                  <Layout className="w-10 h-10 text-vexel-lime mb-6" />
                  <h3 className="font-display text-2xl font-bold text-white mb-4 uppercase">Frontend & Static Pages</h3>
                  <p className="font-sans text-slate-400 mb-6 leading-relaxed">
                     We build the visual side of your site. Whether you need a lightning-fast static page to showcase your work or a complex interactive interface.
                  </p>
                  <ul className="space-y-2 font-tech text-sm text-slate-300 uppercase tracking-wide mb-8">
                     <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-vexel-lime"></div>
                        High-Performance Static Sites
                     </li>
                     <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-vexel-lime"></div>
                        Mobile Responsive Design
                     </li>
                     <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-vexel-lime"></div>
                        Smooth Animations
                     </li>
                  </ul>
                </div>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="w-full py-3 border border-vexel-dim text-white font-tech tracking-widest uppercase hover:bg-vexel-lime hover:text-black hover:border-vexel-lime transition-all flex items-center justify-center gap-2"
                >
                  View Options <ArrowRight className="w-4 h-4" />
                </button>
             </div>

             {/* Backend */}
             <div className="bg-vexel-900/20 border border-vexel-border p-8 hover:border-vexel-accent transition-all group flex flex-col justify-between">
                <div>
                  <Server className="w-10 h-10 text-vexel-accent mb-6" />
                  <h3 className="font-display text-2xl font-bold text-white mb-4 uppercase">Backend Development</h3>
                  <p className="font-sans text-slate-400 mb-6 leading-relaxed">
                     The engine under the hood. We create secure custom systems to handle your data, users, and complex business logic.
                  </p>
                  <ul className="space-y-2 font-tech text-sm text-slate-300 uppercase tracking-wide mb-8">
                     <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-vexel-accent"></div>
                        Database Management
                     </li>
                     <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-vexel-accent"></div>
                        Secure API Integration
                     </li>
                     <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-vexel-accent"></div>
                        User Accounts & Auth
                     </li>
                  </ul>
                </div>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="w-full py-3 border border-vexel-dim text-white font-tech tracking-widest uppercase hover:bg-vexel-accent hover:text-black hover:border-vexel-accent transition-all flex items-center justify-center gap-2"
                >
                  View Options <ArrowRight className="w-4 h-4" />
                </button>
             </div>

             {/* Retainer */}
             <div className="bg-vexel-900/20 border border-vexel-border p-8 hover:border-purple-400 transition-all group flex flex-col justify-between">
                <div>
                  <Clock className="w-10 h-10 text-purple-400 mb-6" />
                  <h3 className="font-display text-2xl font-bold text-white mb-4 uppercase">Retainer & Updates</h3>
                  <p className="font-sans text-slate-400 mb-6 leading-relaxed">
                     We don't just launch and leave. We offer monthly retainer packages to handle custom edits, new features, and design tweaks as you grow.
                  </p>
                  <ul className="space-y-2 font-tech text-sm text-slate-300 uppercase tracking-wide mb-8">
                     <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400"></div>
                        Priority Custom Edits
                     </li>
                     <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400"></div>
                        Content Updates
                     </li>
                     <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400"></div>
                        Continuous Improvement
                     </li>
                  </ul>
                </div>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="w-full py-3 border border-vexel-dim text-white font-tech tracking-widest uppercase hover:bg-purple-400 hover:text-black hover:border-purple-400 transition-all flex items-center justify-center gap-2"
                >
                  View Options <ArrowRight className="w-4 h-4" />
                </button>
             </div>

          </div>

          {/* Minimal Tech Stack Strip */}
          <div className="border-t border-vexel-border pt-10">
             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <span className="font-tech text-vexel-dim text-xs uppercase tracking-widest whitespace-nowrap">Core Technologies:</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                   {['React', 'Next.js', 'Node.js', 'TypeScript', 'Shopify', 'AWS', 'PostgreSQL'].map(tech => (
                      <span key={tech} className="font-display font-bold text-slate-500 hover:text-white transition-colors uppercase text-sm">
                         {tech}
                      </span>
                   ))}
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};