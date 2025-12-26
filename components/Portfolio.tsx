import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Folder } from 'lucide-react';

const projects: Project[] = [
  {
    id: 6,
    title: "BINX_PRODUCTIONS",
    category: "PHOTOGRAPHY",
    image: "https://r2.fivemanage.com/image/xNeWte0tVCny.png",
    description: "In-game photography business for FiveM. A high-fidelity booking and gallery platform showcasing automotive and lifestyle visual storytelling.",
    techStack: ["REACT", "TAILWIND", "FIVEM"],
    link: "http://binx.productions"
  },
  {
    id: 2,
    title: "VITAL_RP",
    category: "GAMING",
    image: "https://r2.fivemanage.com/image/6EDQyZDiJkQX.png",
    description: "Designed the official gaming portal from scratch. Features a custom character dashboard, real-time server statistics, and immersive community forums.",
    techStack: ["REACT", "TAILWIND", "NODE.JS"],
    link: "http://vitalrp.net"
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
                    {/* Link overlay for image */}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 cursor-pointer">
                        <span className="sr-only">Visit {project.title}</span>
                      </a>
                    )}
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    />
                 </div>

                 {/* Content Side */}
                 <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                       <div className="flex justify-between items-start mb-4">
                          <span className="font-tech text-vexel-accent text-sm tracking-widest border border-vexel-accent/20 px-2 py-1 bg-vexel-accent/5">
                            {project.category}
                          </span>
                          
                          {project.link ? (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group/icon"
                              title="Visit Live Site"
                            >
                               <ArrowUpRight className="w-6 h-6 text-vexel-dim group-hover/icon:text-vexel-lime transition-colors" />
                            </a>
                          ) : (
                             <ArrowUpRight className="w-6 h-6 text-vexel-dim group-hover:text-white transition-colors" />
                          )}
                       </div>
                       
                       <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-vexel-lime transition-colors uppercase break-words">
                         {project.link ? (
                           <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
                         ) : (
                           project.title
                         )}
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