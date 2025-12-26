import React from 'react';
import { Search, PenTool, Code2, Rocket, MonitorCheck, ChevronDown } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "Discovery",
      icon: Search,
      description: "We begin by decoding your vision. We analyze your target audience, competitors, and functional requirements to build a solid project architecture.",
      highlight: "text-vexel-lime"
    },
    {
      id: "02",
      title: "Design",
      icon: PenTool,
      description: "Visual identity takes shape. We create high-fidelity prototypes focusing on user experience, modern aesthetics, and interaction patterns.",
      highlight: "text-vexel-accent"
    },
    {
      id: "03",
      title: "Development",
      icon: Code2,
      description: "Our engineers build the core. We code custom solutions using clean, scalable architectures (React/Node) ensuring your site is fast and secure.",
      highlight: "text-white"
    },
    {
      id: "04",
      title: "Quality Assurance",
      icon: MonitorCheck,
      description: " rigorous testing phase. We stress-test responsiveness, validate forms, check SEO performance, and squash bugs for a zero-defect launch.",
      highlight: "text-purple-400"
    },
    {
      id: "05",
      title: "Deployment",
      icon: Rocket,
      description: "Launch day. We handle domain configuration, SSL setup, and provide you with a training session on how to manage your new digital asset.",
      highlight: "text-vexel-lime"
    }
  ];

  return (
    <div className="bg-vexel-950 py-24 relative border-b border-vexel-border">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-20 max-w-2xl">
           <span className="font-tech text-vexel-lime text-sm tracking-widest mb-2 block">TRANSPARENCY PROTOCOLS</span>
           <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">
             Execution <span className="text-vexel-dim">Roadmap</span>
           </h2>
        </div>

        <div className="flex flex-col">
           {steps.map((step, index) => (
             <div key={step.id} className="group flex gap-4 md:gap-12 relative">
                
                {/* Left Column: Number (Desktop) */}
                <div className="hidden md:flex flex-col justify-start items-end w-24 pt-4">
                   <span className={`font-display font-bold text-4xl transition-colors duration-300 ${index === 0 ? 'text-vexel-lime' : 'text-vexel-border group-hover:text-white'}`}>
                     {step.id}
                   </span>
                </div>

                {/* Middle Column: Timeline Track */}
                <div className="flex flex-col items-center w-12 flex-shrink-0">
                   {/* Top Line Segment */}
                   <div className={`w-px flex-1 ${index === 0 ? 'bg-transparent' : 'bg-vexel-border group-hover:bg-vexel-lime/50'} transition-colors duration-500`}></div>
                   
                   {/* Node Marker */}
                   <div className={`w-12 h-12 flex items-center justify-center bg-vexel-950 border border-vexel-border z-10 my-2 transition-all duration-300 group-hover:border-vexel-lime group-hover:scale-110 shadow-lg`}>
                      <step.icon className={`w-5 h-5 ${step.highlight}`} strokeWidth={1.5} />
                   </div>

                   {/* Bottom Line Segment */}
                   <div className={`w-px flex-1 ${index === steps.length - 1 ? 'bg-transparent' : 'bg-vexel-border group-hover:bg-vexel-lime/50'} transition-colors duration-500`}></div>
                </div>

                {/* Right Column: Content Card */}
                <div className="flex-1 pb-12 pt-2">
                   <div className="bg-vexel-900/40 border border-vexel-border p-8 hover:bg-vexel-900/60 hover:border-vexel-lime/30 transition-all duration-300 relative overflow-hidden">
                      
                      {/* Mobile Number Display */}
                      <span className="md:hidden font-display font-bold text-2xl text-vexel-lime mb-2 block">
                        {step.id} //
                      </span>

                      <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-wide">
                        {step.title}
                      </h3>
                      <p className="font-sans text-slate-400 leading-relaxed max-w-3xl">
                        {step.description}
                      </p>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-8 h-8">
                         <div className="absolute top-0 right-0 w-full h-full border-t border-r border-vexel-dim opacity-20 group-hover:opacity-100 group-hover:border-vexel-lime transition-all"></div>
                      </div>
                   </div>
                </div>

             </div>
           ))}
           
           {/* End Node */}
           <div className="flex gap-4 md:gap-12">
              <div className="hidden md:block w-24"></div>
              <div className="w-12 flex justify-center">
                 <div className="w-2 h-2 bg-vexel-border rounded-full"></div>
              </div>
              <div className="flex-1"></div>
           </div>

        </div>

      </div>
    </div>
  );
};