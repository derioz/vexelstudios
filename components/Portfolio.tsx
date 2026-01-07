
import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "BINX PRODUCTIONS",
    category: "Photography & Creative",
    image: "https://r2.fivemanage.com/image/xNeWte0tVCny.png",
    description: "Visual storytelling platform for digital automotive photography.",
    techStack: ["React", "Motion"],
    link: "http://binx.productions"
  },
  {
    id: 2,
    title: "VITAL RP",
    category: "Gaming Infrastructure",
    image: "https://r2.fivemanage.com/image/6EDQyZDiJkQX.png",
    description: "Immersive community dashboard and server portal.",
    techStack: ["Node", "Full-Stack"],
    link: "http://vitalrp.net"
  }
];

export const Portfolio: React.FC = () => {
  return (
    <div className="py-24 bg-brand-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">Portfolio</h2>
          <span className="w-14 h-14 flex items-center justify-center bg-brand-accent rounded-full font-black text-black text-xl">02</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative aspect-[4/3] bg-brand-card rounded-[3rem] overflow-hidden mb-8 border border-white/5 p-1">
                <div className="w-full h-full overflow-hidden rounded-[2.8rem]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-colors duration-500" />
                <div className="absolute inset-0 border-[8px] border-brand-black rounded-[3rem] pointer-events-none" />
              </div>
              
              <div className="flex justify-between items-start px-4">
                <div>
                  <h3 className="text-3xl font-black mb-3 group-hover:text-brand-accent transition-colors text-white uppercase">{project.title}</h3>
                  <div className="flex gap-4">
                    <p className="text-brand-accent font-bold uppercase tracking-widest text-[10px] bg-brand-accent/10 px-3 py-1 rounded-full">
                      {project.category}
                    </p>
                  </div>
                </div>
                <div className="w-16 h-16 flex items-center justify-center bg-brand-card border border-white/10 rounded-full group-hover:bg-brand-accent group-hover:text-black group-hover:rotate-45 transition-all duration-500">
                  <ArrowUpRight className="w-7 h-7" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 text-center">
          <button className="text-2xl font-black border-b-4 border-brand-accent pb-2 text-white hover:text-brand-accent transition-all group inline-flex items-center gap-4">
            View all projects
            <span className="w-2 h-2 bg-brand-accent rounded-full group-hover:animate-ping"></span>
          </button>
        </div>

      </div>
    </div>
  );
};
