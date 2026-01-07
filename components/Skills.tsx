
import React from 'react';
import { Layout, Check, Sparkles, ArrowRight } from 'lucide-react';
import { ViewState } from '../App';

interface SkillsProps {
  onNavigate: (view: ViewState) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onNavigate }) => {
  const services = [
    {
      id: "01",
      title: "Design",
      subtitle: "The Look & Feel",
      icon: Sparkles,
      description: "We create websites that look amazing on every device. No boring templates—just custom design that fits your brand.",
      features: ["Custom UI", "Mobile Friendly", "Easy to Use"],
    },
    {
      id: "02",
      title: "Building",
      subtitle: "The Working Site",
      icon: Layout,
      description: "We turn designs into fast, working websites. Everything is built to be quick, secure, and ready to grow.",
      features: ["Fast Loading", "SEO Optimized", "Secure Code"],
    },
    {
      id: "03",
      title: "Maintenance",
      subtitle: "Always Working",
      icon: Check,
      description: "We don't just build and leave. We offer monthly plans to keep your site updated and running smoothly 24/7.",
      features: ["Updates", "Support", "Daily Backups"],
    }
  ];

  return (
    <div className="bg-brand-black py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 pb-12 border-b border-white/10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6 text-white">
            What we <span className="text-brand-accent">Do</span>
          </h2>
          <p className="text-xl text-brand-dim font-semibold">Everything you need for a modern website.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group p-10 rounded-[2.5rem] bg-brand-surface border border-white/5 hover:border-brand-accent/30 transition-all duration-500">
              <div className="mb-10 flex justify-between items-start">
                <span className="text-7xl font-black text-white/5 group-hover:text-brand-accent/20 transition-colors select-none leading-none">
                  {service.id}
                </span>
                <div className="w-12 h-12 flex items-center justify-center bg-brand-card rounded-full text-brand-accent">
                    <service.icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-6 uppercase text-white leading-tight">{service.title}</h3>
              <p className="text-brand-dim text-lg mb-10 leading-relaxed font-medium">
                {service.description}
              </p>
              <ul className="space-y-4 mb-12">
                {service.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/80">
                    <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onNavigate('pricing')}
                className="flex items-center gap-3 text-brand-accent font-black uppercase tracking-widest text-sm hover:gap-5 transition-all group"
              >
                Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
