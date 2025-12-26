import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Folder } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "NEON_NEXUS",
    category: "E-COMMERCE",
    image: "https://picsum.photos/1200/800?random=10",
    description: "Headless commerce architecture with WebGL product visualization.",
    techStack: ["NEXT.JS", "SHOPIFY", "WEBGL"]
  },
  {
    id: 2,
    title: "APEX_LOGISTICS",
    category: "DASHBOARD",
    image: "https://picsum.photos/800/1000?random=20",
    description: "Real-time fleet tracking and data visualization suite.",
    techStack: ["REACT", "D3.JS", "NODE"]
  },
  {
    id: 3,
    title: "SYNTH_FM",
    category: "AUDIO",
    image: "https://picsum.photos/1200/800?random=30",
    description: "Immersive audio streaming platform with frequency reactivity.",
    techStack: ["VUE", "WEBAUDIO", "FIREBASE"]
  },
  {
    id: 4,
    title: "CYBER_VAULT",
    category: "SECURITY",
    image: "https://picsum.photos/800/1000?random=40",
    description: "Zero-trust architecture marketing interface for SaaS.",
    techStack: ["ASTRO", "TAILWIND", "MOTION"]
  }
];

export const Portfolio: React.FC = () => {
  return (
    <div className="bg-vexel-950 py-24 relative border-b border-vexel-border">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center gap-4 mb-16">
          <Folder className="w-6 h-6 text-vexel-lime" />
          <h2 className="text-3xl font-display font-bold text-white tracking-wide">
            SELECTED WORK
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="group relative border border-vexel-border bg-vexel-900/50 hover:border-vexel-lime transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                 
                 {/* Image Side */}
                 <div className="relative h-64 md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-vexel-border">
                    <div className="absolute inset-0 bg-vexel-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-black border border-vexel-lime px-2 py-1">
                       <span className="font-tech text-xs text-vexel-lime">IMG_0{index + 1}</span>
                    </div>
                 </div>

                 {/* Content Side */}
                 <div className="p-8 flex flex-col justify-between">
                    <div>
                       <div className="flex justify-between items-start mb-4">
                          <span className="font-tech text-vexel-accent text-sm tracking-widest border border-vexel-accent/20 px-2 py-1 bg-vexel-accent/5">
                            {project.category}
                          </span>
                          <ArrowUpRight className="w-6 h-6 text-vexel-dim group-hover:text-white transition-colors" />
                       </div>
                       
                       <h3 className="text-4xl font-display font-bold text-white mb-4 group-hover:text-vexel-lime transition-colors uppercase">
                         {project.title}
                       </h3>
                       
                       <p className="font-sans text-slate-400 leading-relaxed mb-8">
                         {project.description}
                       </p>
                    </div>

                    <div className="border-t border-vexel-border pt-4">
                       <span className="block font-tech text-xs text-vexel-dim mb-2 uppercase">Tech Stack</span>
                       <div className="flex flex-wrap gap-2">
                          {project.techStack.map(tech => (
                            <span key={tech} className="font-tech font-bold text-sm text-white">
                              [{tech}]
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
           <button className="font-tech text-lg text-vexel-dim hover:text-white tracking-widest border-b border-transparent hover:border-vexel-lime transition-all pb-1 uppercase">
             View All Projects
           </button>
        </div>

      </div>
    </div>
  );
};