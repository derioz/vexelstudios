import React from 'react';
import { Terminal, Database, Layout, Cpu } from 'lucide-react';

export const Skills: React.FC = () => {
  return (
    <div className="bg-vexel-950 py-24 border-b border-vexel-border relative">
       
       <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-vexel-border pb-8">
             <div>
                <span className="font-tech text-vexel-lime text-sm tracking-widest mb-2 block">OUR CAPABILITIES</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">
                   Design & <span className="text-vexel-dim">Development</span>
                </h2>
             </div>
             <div className="mt-4 md:mt-0 font-tech text-right text-slate-500 text-sm">
                <p>VISUAL IDENTITY</p>
                <p>DIGITAL INFRASTRUCTURE</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-vexel-border">
             
             {/* Card 1 */}
             <div className="bg-vexel-950 p-8 group hover:bg-vexel-900 transition-colors">
                <Layout className="w-8 h-8 text-vexel-dim group-hover:text-vexel-accent mb-6 transition-colors" />
                <h3 className="font-display text-xl font-bold text-white mb-4 uppercase">UI/UX & Web Design</h3>
                <ul className="space-y-2 font-tech text-slate-400 text-sm tracking-wide">
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-accent"></div> Figma Prototyping</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-accent"></div> Visual Identity & Branding</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-accent"></div> Responsive Layouts</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-accent"></div> Design Systems</li>
                </ul>
             </div>

             {/* Card 2 */}
             <div className="bg-vexel-950 p-8 group hover:bg-vexel-900 transition-colors">
                <Terminal className="w-8 h-8 text-vexel-dim group-hover:text-vexel-lime mb-6 transition-colors" />
                <h3 className="font-display text-xl font-bold text-white mb-4 uppercase">Full Stack Dev</h3>
                <ul className="space-y-2 font-tech text-slate-400 text-sm tracking-wide">
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> React 19 / Next.js</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> Node.js & Serverless</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> Custom Animations (GSAP)</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> Performance Optimization</li>
                </ul>
             </div>

             {/* Card 3 */}
             <div className="bg-vexel-950 p-8 group hover:bg-vexel-900 transition-colors">
                <Database className="w-8 h-8 text-vexel-dim group-hover:text-white mb-6 transition-colors" />
                <h3 className="font-display text-xl font-bold text-white mb-4 uppercase">Data & Intelligence</h3>
                <ul className="space-y-2 font-tech text-slate-400 text-sm tracking-wide">
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white"></div> Gemini AI Integration</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white"></div> SQL & NoSQL Databases</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white"></div> Custom API Development</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white"></div> CMS Integration (Sanity)</li>
                </ul>
             </div>

             {/* Card 4 */}
             <div className="bg-vexel-950 p-8 group hover:bg-vexel-900 transition-colors">
                <Cpu className="w-8 h-8 text-vexel-dim group-hover:text-purple-400 mb-6 transition-colors" />
                <h3 className="font-display text-xl font-bold text-white mb-4 uppercase">E-Commerce & Ops</h3>
                <ul className="space-y-2 font-tech text-slate-400 text-sm tracking-wide">
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400"></div> Shopify Headless</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400"></div> Stripe Integration</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400"></div> Hosting (AWS/Vercel)</li>
                   <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400"></div> SEO & Analytics</li>
                </ul>
             </div>

          </div>
       </div>
    </div>
  );
};