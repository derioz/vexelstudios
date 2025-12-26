import React from 'react';
import { ArrowLeft, Cpu, ShieldCheck, Database, CreditCard, Layers } from 'lucide-react';

interface ClientGuideProps {
  onBack: () => void;
}

export const ClientGuide: React.FC<ClientGuideProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-vexel-950 pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header / Navigation */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-vexel-dim hover:text-white mb-12 transition-colors font-tech text-sm tracking-widest uppercase"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="border border-vexel-border bg-vexel-900/50 p-8 md:p-12 relative overflow-hidden">
          
          {/* Title Section */}
          <div className="mb-16 border-b border-vexel-border pb-8 flex flex-col md:flex-row justify-between items-end">
            <div>
              <div className="inline-block px-2 py-1 mb-4 border border-vexel-lime bg-vexel-lime/10 text-vexel-lime font-tech text-xs tracking-widest uppercase">
                Client Guide
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase leading-none">
                Working <span className="text-vexel-dim">With Us</span>
              </h1>
            </div>
            <div className="mt-4 md:mt-0 font-tech text-right text-xs text-vexel-dim">
              <p>REF: VX_GUIDE_V1</p>
              <p>ACCESS LEVEL: PUBLIC</p>
            </div>
          </div>

          {/* 1. Overview */}
          <section className="mb-16">
            <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2 uppercase">
              <span className="text-vexel-lime">01 //</span> Overview
            </h2>
            <div className="p-6 border-l border-vexel-border">
              <p className="font-sans text-slate-400 leading-relaxed max-w-3xl">
                We operate on precision. This document serves as the operational manual for engagement with Vexel Studios. Adherence to this roadmap ensures optimal project velocity and deployment success.
              </p>
            </div>
          </section>

          {/* 2. Roadmap */}
          <section className="mb-16">
            <h2 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-2 uppercase">
              <span className="text-vexel-lime">02 //</span> Our Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "01", title: "DISCOVERY", desc: "Planning" },
                { step: "02", title: "DESIGN", desc: "UI/UX Design" },
                { step: "03", title: "BUILD", desc: "Development" },
                { step: "04", title: "DEPLOY", desc: "Launch" }
              ].map((phase, idx) => (
                <div key={phase.step} className="p-6 border border-vexel-border bg-vexel-950 hover:border-vexel-accent transition-colors group">
                  <span className="text-4xl font-display font-bold text-vexel-dim group-hover:text-white transition-colors mb-4 block">0{idx + 1}</span>
                  <h3 className="font-bold text-white font-tech tracking-wider mb-1">{phase.title}</h3>
                  <p className="text-xs text-slate-500 font-tech uppercase">{phase.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Specs */}
          <section className="mb-16">
            <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2 uppercase">
              <span className="text-vexel-lime">03 //</span> Technical Specs
            </h2>
            <div className="grid md:grid-cols-3 gap-px bg-vexel-border border border-vexel-border">
              <div className="p-8 bg-vexel-950">
                <Layers className="w-6 h-6 text-white mb-4" />
                <h3 className="font-tech font-bold text-white mb-2 uppercase">Custom Stack</h3>
                <p className="text-xs text-slate-500 font-sans">Bespoke solutions. No drag-and-drop builders.</p>
              </div>
              <div className="p-8 bg-vexel-950">
                <Cpu className="w-6 h-6 text-vexel-lime mb-4" />
                <h3 className="font-tech font-bold text-white mb-2 uppercase">High Performance</h3>
                <p className="text-xs text-slate-500 font-sans">Sub-second load times standard.</p>
              </div>
              <div className="p-8 bg-vexel-950">
                <Database className="w-6 h-6 text-vexel-accent mb-4" />
                <h3 className="font-tech font-bold text-white mb-2 uppercase">SEO Optimized</h3>
                <p className="text-xs text-slate-500 font-sans">Structured data and semantic HTML.</p>
              </div>
            </div>
          </section>

          {/* 4. Logistics */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2 uppercase">
                <span className="text-vexel-lime">04 //</span> Assurance
              </h2>
              <div className="bg-vexel-950 border border-vexel-border p-6 h-full flex flex-col justify-center">
                 <div className="flex items-center gap-4 mb-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="font-tech font-bold text-white uppercase">30-Day Debugging</span>
                 </div>
                 <p className="text-sm text-slate-500 pl-9">All critical errors resolved gratis post-launch.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2 uppercase">
                <span className="text-vexel-lime">05 //</span> Billing
              </h2>
              <div className="bg-vexel-950 border border-vexel-border p-6 h-full">
                <div className="flex justify-between items-center mb-2 font-tech text-sm">
                  <span className="text-slate-400 uppercase">Initialization</span>
                  <span className="text-white">50%</span>
                </div>
                <div className="w-full h-1 bg-vexel-800 mb-4">
                  <div className="w-1/2 h-full bg-vexel-lime"></div>
                </div>
                
                 <div className="flex justify-between items-center mb-2 font-tech text-sm">
                  <span className="text-slate-400 uppercase">Completion</span>
                  <span className="text-white">50%</span>
                </div>
                 <div className="w-full h-1 bg-vexel-800 mb-6">
                   <div className="w-full h-full bg-vexel-dim opacity-20"></div>
                </div>

                <div className="flex items-center gap-2 text-xs text-vexel-dim font-tech uppercase">
                  <CreditCard className="w-4 h-4" />
                  Stripe / Wise / Crypto
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};