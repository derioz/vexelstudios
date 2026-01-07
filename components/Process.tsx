
import React from 'react';
import { MessageCircle, Pencil, Code, Rocket, ArrowRight } from 'lucide-react';
import { ViewState } from '../App';

interface ProcessProps {
  onNavigate?: (view: ViewState) => void;
}

export const Process: React.FC<ProcessProps> = ({ onNavigate }) => {
  const steps = [
    {
      id: "01",
      title: "Getting Started",
      category: "Talk",
      icon: MessageCircle,
      description: "First, we talk about your goals and what you need. We plan out the project together to make sure we're on the same page.",
    },
    {
      id: "02",
      title: "Visual Design",
      category: "The Look",
      icon: Pencil,
      description: "We show you exactly how the site will look. You'll see every page before we start building anything.",
    },
    {
      id: "03",
      title: "The Build",
      category: "Creating",
      icon: Code,
      description: "This is where the magic happens. We take the designs and turn them into a fast, working website.",
    },
    {
      id: "04",
      title: "Launch",
      category: "Go Live",
      icon: Rocket,
      description: "After testing everything, we go live! Your site is now ready for the world to see.",
    }
  ];

  return (
    <div className="bg-brand-surface py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-white">
            How we <span className="text-brand-accent">Work</span>
          </h2>
          <p className="text-brand-dim text-xl max-w-2xl mx-auto font-semibold">
            Our simple 4-step process to get your site online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-brand-card p-12 rounded-[3rem] border border-white/5 hover:border-brand-accent/50 transition-all group relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 text-8xl font-black text-white/5 group-hover:text-brand-accent/10 transition-colors select-none">
                {step.id}
              </div>
              <div className="w-16 h-16 flex items-center justify-center bg-brand-black border border-white/10 rounded-full mb-10 group-hover:bg-brand-accent group-hover:text-black transition-all">
                <step.icon className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent mb-4 block">{step.category}</span>
              <h3 className="text-2xl font-black mb-6 uppercase text-white tracking-tight">{step.title}</h3>
              <p className="text-brand-dim text-sm leading-relaxed font-medium">{step.description}</p>
            </div>
          ))}
        </div>

        {onNavigate && (
          <div className="mt-24 text-center">
            <button 
              onClick={() => onNavigate('client-guide')}
              className="inline-flex items-center gap-4 bg-brand-accent text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-110 transition-all shadow-2xl shadow-brand-accent/20"
            >
              Start Your Project
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
