import React from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck, Layers, Rocket, Monitor, Search } from 'lucide-react';

interface ClientGuideProps {
  onBack: () => void;
}

export const ClientGuide: React.FC<ClientGuideProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-vexel-950 pt-12 pb-24 px-4 md:px-8 font-sans selection:bg-vexel-lime selection:text-black">
      <div className="max-w-6xl mx-auto">

        {/* Navigation */}
        <button
             onClick={onBack}
             className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors mb-16"
           >
             <ArrowLeft className="w-5 h-5 text-vexel-lime group-hover:-translate-x-1 transition-transform" />
             <span className="font-display font-bold text-sm tracking-wide uppercase">Return to Main</span>
        </button>

        {/* Header */}
        <div className="mb-20 animate-in slide-in-from-bottom-4 duration-700 fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                The Partnership <br/>
                <span className="text-vexel-lime">Blueprint</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed border-l-2 border-vexel-lime/50 pl-6">
                We believe in absolute transparency. Here is exactly how we take your project from concept to code, including how payments work and what you receive at the finish line.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content: Roadmap */}
            <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-8">
                    <Layers className="w-6 h-6 text-vexel-lime" />
                    <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wide">Project Roadmap</h2>
                </div>

                <div className="space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-8 bottom-8 w-px bg-vexel-border"></div>

                    {/* Step 1 */}
                    <div className="relative bg-vexel-900/30 border border-vexel-border p-8 rounded-sm hover:border-vexel-lime/50 transition-colors group">
                        <div className="flex items-start gap-6">
                            <div className="relative z-10 w-16 h-16 bg-vexel-950 border border-vexel-border flex items-center justify-center flex-shrink-0 group-hover:border-vexel-lime transition-colors">
                                <Search className="w-6 h-6 text-slate-400 group-hover:text-vexel-lime transition-colors" />
                            </div>
                            <div>
                                <span className="font-tech text-xs text-vexel-lime tracking-widest uppercase mb-1 block">Phase 01</span>
                                <h3 className="font-display font-bold text-xl text-white mb-3">Discovery & Blueprint</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    Before we design, we define. We analyze your competitors, map out your site's architecture, and lock in the technical requirements so there are no surprises later.
                                </p>
                                <ul className="text-xs font-tech text-vexel-dim uppercase tracking-wide space-y-1">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> Deliverable: Site Map & Strategy</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> Deliverable: Project Scope PDF</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative bg-vexel-900/30 border border-vexel-border p-8 rounded-sm hover:border-vexel-lime/50 transition-colors group">
                        <div className="flex items-start gap-6">
                            <div className="relative z-10 w-16 h-16 bg-vexel-950 border border-vexel-border flex items-center justify-center flex-shrink-0 group-hover:border-vexel-lime transition-colors">
                                <Monitor className="w-6 h-6 text-slate-400 group-hover:text-vexel-lime transition-colors" />
                            </div>
                            <div>
                                <span className="font-tech text-xs text-vexel-lime tracking-widest uppercase mb-1 block">Phase 02</span>
                                <h3 className="font-display font-bold text-xl text-white mb-3">Design & Prototype</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    We create a high-fidelity visual model of your website. You'll see exactly how it looks and feels—desktop and mobile—before we write a single line of code.
                                </p>
                                <ul className="text-xs font-tech text-vexel-dim uppercase tracking-wide space-y-1">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> Deliverable: Interactive Prototype</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> Deliverable: Visual Asset Library</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative bg-vexel-900/30 border border-vexel-border p-8 rounded-sm hover:border-vexel-lime/50 transition-colors group">
                        <div className="flex items-start gap-6">
                            <div className="relative z-10 w-16 h-16 bg-vexel-950 border border-vexel-border flex items-center justify-center flex-shrink-0 group-hover:border-vexel-lime transition-colors">
                                <Rocket className="w-6 h-6 text-slate-400 group-hover:text-vexel-lime transition-colors" />
                            </div>
                            <div>
                                <span className="font-tech text-xs text-vexel-lime tracking-widest uppercase mb-1 block">Phase 03</span>
                                <h3 className="font-display font-bold text-xl text-white mb-3">Build & Launch</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    We custom code your site using modern technology for maximum speed and security. Once tested, we handle the technical setup to put you online.
                                </p>
                                <ul className="text-xs font-tech text-vexel-dim uppercase tracking-wide space-y-1">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> Deliverable: Live High-Performance Website</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-vexel-lime"></div> Deliverable: Admin Access & Training</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Information Cards */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Billing Card */}
                <div className="bg-vexel-950 border border-vexel-border p-6 hover:border-white/30 transition-colors">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-vexel-border">
                        <CreditCard className="w-5 h-5 text-white" />
                        <h3 className="font-display font-bold text-white uppercase">Payments</h3>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-tech text-sm text-slate-400 uppercase">Start</span>
                        <span className="font-tech text-sm text-slate-400 uppercase">Finish</span>
                    </div>
                    <div className="h-4 w-full bg-vexel-900 border border-vexel-border flex mb-4 relative">
                        {/* Grid lines on the bar */}
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_1px,#000_1px)] bg-[size:4px_100%] opacity-20 z-10"></div>
                        <div className="w-1/2 bg-vexel-lime/80 h-full border-r border-vexel-950"></div>
                        <div className="w-1/2 bg-vexel-900 h-full"></div>
                    </div>
                    <div className="flex justify-between items-start text-xs text-slate-500 mb-6">
                        <span className="w-1/2 pr-2">50% deposit to secure your slot and begin design.</span>
                        <span className="w-1/2 pl-2 text-right">50% due only when the site is finished and approved.</span>
                    </div>
                    <div className="bg-vexel-900/50 p-3 text-xs text-slate-400 border-l-2 border-vexel-dim font-tech tracking-wide">
                        Methods: Bank Transfer, Stripe, Crypto.
                    </div>
                </div>

                {/* Tech Simple Card */}
                <div className="bg-vexel-950 border border-vexel-border p-6 hover:border-white/30 transition-colors">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-vexel-border">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                        <h3 className="font-display font-bold text-white uppercase">The Guarantee</h3>
                    </div>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-vexel-lime mt-0.5 flex-shrink-0" />
                            <div>
                                <strong className="block text-white text-sm font-bold mb-1 font-display uppercase tracking-wide">30-Day Support</strong>
                                <p className="text-xs text-slate-400 leading-relaxed">If anything breaks or looks wrong in the first month, we fix it for free. No questions asked.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Monitor className="w-5 h-5 text-vexel-lime mt-0.5 flex-shrink-0" />
                            <div>
                                <strong className="block text-white text-sm font-bold mb-1 font-display uppercase tracking-wide">Full Ownership</strong>
                                <p className="text-xs text-slate-400 leading-relaxed">You own the code, the domain, and the design. We don't lock you into monthly subscriptions.</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};