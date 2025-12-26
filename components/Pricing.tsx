import React from 'react';
import { ArrowLeft, Check, Zap, Server, Shield, Hexagon, Cpu, Globe, Database, Layers, Clock, Activity, Code2, Lock } from 'lucide-react';

interface PricingProps {
  onBack: () => void;
  onContact: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onBack, onContact }) => {
  return (
    <div className="min-h-screen bg-vexel-950 pt-12 pb-24 px-4 md:px-8 font-sans selection:bg-vexel-lime selection:text-black">
      <div className="max-w-7xl mx-auto">

        {/* Navigation */}
        <button
             onClick={onBack}
             className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors mb-12"
           >
             <ArrowLeft className="w-5 h-5 text-vexel-lime group-hover:-translate-x-1 transition-transform" />
             <span className="font-display font-bold text-sm tracking-wide uppercase">Return to Main</span>
        </button>

        {/* Header */}
        <div className="mb-16 text-center max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700 fade-in">
            
            {/* Holiday Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-900/20 border border-red-500/50 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-tech text-red-500 text-xs tracking-[0.2em] uppercase font-bold">Holiday Protocol Active // 50% Off Systems</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 uppercase">
                System <span className="text-transparent text-stroke" style={{ WebkitTextStroke: '1px #fff' }}>Configuration</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Select your infrastructure tier. All builds include our proprietary optimization framework, SEO hardening, and 30-day post-launch support.
            </p>
        </div>

        {/* Main Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            
            {/* Tier 1: Frontend */}
            <div className="flex flex-col h-full bg-vexel-900/20 border border-vexel-border hover:border-vexel-lime transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-vexel-border group-hover:bg-vexel-lime transition-colors"></div>
                
                {/* Card Header */}
                <div className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-vexel-950 border border-vexel-border group-hover:border-vexel-lime transition-colors">
                            <Zap className="w-6 h-6 text-vexel-lime" />
                        </div>
                        <div className="text-right">
                             <span className="block font-tech text-xs text-slate-500 uppercase tracking-widest line-through decoration-red-500 decoration-2">$749</span>
                             <span className="block font-display font-bold text-3xl text-white">$375</span>
                        </div>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white uppercase tracking-wide mb-2">Interface Unit</h3>
                    <p className="text-sm text-slate-400 h-10">High-performance static architecture for portfolios and brand identity.</p>
                </div>

                {/* Specs */}
                <div className="p-8 space-y-6 flex-grow">
                    
                    {/* Utility Section */}
                    <div>
                        <span className="font-tech text-xs text-vexel-dim uppercase tracking-widest block mb-2 border-b border-vexel-border pb-1">Ideal Utility</span>
                        <div className="flex flex-wrap gap-2">
                            {['Portfolio', 'Landing Page', 'Marketing', 'Blog'].map(tag => (
                                <span key={tag} className="text-xs font-bold bg-vexel-900 text-slate-300 px-2 py-1 border border-vexel-border">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center justify-between text-sm text-slate-300">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-vexel-lime" /> Deployment Time</span>
                        <span className="font-display font-bold text-white">1 - 2 Weeks</span>
                    </div>

                    {/* Tech Stack */}
                     <div>
                        <span className="font-tech text-xs text-vexel-dim uppercase tracking-widest block mb-2 border-b border-vexel-border pb-1">Tech Stack</span>
                        <div className="flex gap-3 text-slate-400">
                            <div title="Next.js"><Globe className="w-5 h-5 hover:text-white transition-colors" /></div>
                            <div title="React"><Code2 className="w-5 h-5 hover:text-white transition-colors" /></div>
                            <div title="Tailwind"><Layers className="w-5 h-5 hover:text-white transition-colors" /></div>
                        </div>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-3">
                        {[
                            "Custom UI/UX Design",
                            "Responsive Mobile Layout",
                            "Basic SEO Configuration",
                            "Contact Form Integration",
                            "Fast Global CDN Hosting"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                <Check className="w-4 h-4 text-vexel-lime mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action */}
                <div className="p-8 pt-0 mt-auto">
                    <button onClick={onContact} className="w-full py-4 border border-vexel-lime text-vexel-lime font-tech font-bold uppercase tracking-widest hover:bg-vexel-lime hover:text-black transition-all">
                        Initialize Build
                    </button>
                </div>
            </div>

            {/* Tier 2: Backend */}
            <div className="flex flex-col h-full bg-vexel-900/40 border border-vexel-accent relative group transform lg:-translate-y-4 shadow-2xl shadow-black/50">
                <div className="absolute top-0 left-0 w-full h-1 bg-vexel-accent"></div>
                <div className="absolute top-4 right-4 bg-red-600 text-white font-tech text-xs font-bold px-3 py-1 uppercase tracking-widest animate-pulse">
                    Holiday Special
                </div>
                
                {/* Card Header */}
                <div className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-vexel-950 border border-vexel-accent">
                            <Server className="w-6 h-6 text-vexel-accent" />
                        </div>
                        <div className="text-right">
                             <span className="block font-tech text-xs text-slate-500 uppercase tracking-widest line-through decoration-red-500 decoration-2">$1,749</span>
                             <span className="block font-display font-bold text-3xl text-white text-shadow-glow">$875</span>
                        </div>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white uppercase tracking-wide mb-2">System Core</h3>
                    <p className="text-sm text-slate-400 h-10">Full-stack application architecture with database and dynamic content.</p>
                </div>

                {/* Specs */}
                <div className="p-8 space-y-6 flex-grow">
                    
                    {/* Utility Section */}
                    <div>
                        <span className="font-tech text-xs text-vexel-dim uppercase tracking-widest block mb-2 border-b border-vexel-border pb-1">Ideal Utility</span>
                        <div className="flex flex-wrap gap-2">
                            {['E-Commerce', 'SaaS', 'User Portal', 'Dashboard'].map(tag => (
                                <span key={tag} className="text-xs font-bold bg-vexel-800 text-white px-2 py-1 border border-vexel-accent/30">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center justify-between text-sm text-slate-300">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-vexel-accent" /> Deployment Time</span>
                        <span className="font-display font-bold text-white">3 - 5 Weeks</span>
                    </div>

                    {/* Tech Stack */}
                     <div>
                        <span className="font-tech text-xs text-vexel-dim uppercase tracking-widest block mb-2 border-b border-vexel-border pb-1">Tech Stack</span>
                        <div className="flex gap-3 text-slate-400">
                            <div title="Node.js"><Cpu className="w-5 h-5 hover:text-white transition-colors" /></div>
                            <div title="PostgreSQL"><Database className="w-5 h-5 hover:text-white transition-colors" /></div>
                            <div title="Auth"><Lock className="w-5 h-5 hover:text-white transition-colors" /></div>
                            <div title="Stripe"><Activity className="w-5 h-5 hover:text-white transition-colors" /></div>
                        </div>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-3">
                        {[
                            "Advanced Database Architecture",
                            "User Authentication (Login/Signup)",
                            "CMS Integration (Manage Content)",
                            "Payment Gateway Processing",
                            "Server-Side Rendering (SSR)"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-white">
                                <Check className="w-4 h-4 text-vexel-accent mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action */}
                <div className="p-8 pt-0 mt-auto">
                    <button onClick={onContact} className="w-full py-4 bg-vexel-accent text-black font-tech font-bold uppercase tracking-widest hover:bg-white transition-all">
                        Initialize System
                    </button>
                </div>
            </div>

            {/* Tier 3: Retainer */}
            <div className="flex flex-col h-full bg-vexel-900/20 border border-vexel-border hover:border-purple-400 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-vexel-border group-hover:bg-purple-400 transition-colors"></div>
                
                {/* Card Header */}
                <div className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-vexel-950 border border-vexel-border group-hover:border-purple-400 transition-colors">
                            <Shield className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="text-right">
                             <span className="block font-tech text-xs text-slate-500 uppercase tracking-widest line-through decoration-red-500 decoration-2">$149</span>
                             <span className="block font-display font-bold text-3xl text-white">$75</span>
                             <span className="font-tech text-xs text-slate-500 uppercase tracking-widest">/ Month</span>
                        </div>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white uppercase tracking-wide mb-2">Active Ops</h3>
                    <p className="text-sm text-slate-400 h-10">Dedicated maintenance protocol to ensure system longevity and security.</p>
                </div>

                {/* Specs */}
                <div className="p-8 space-y-6 flex-grow">
                    
                    {/* Utility Section */}
                    <div>
                        <span className="font-tech text-xs text-vexel-dim uppercase tracking-widest block mb-2 border-b border-vexel-border pb-1">Ideal Utility</span>
                        <div className="flex flex-wrap gap-2">
                            {['Maintenance', 'Security', 'Content Updates', 'Scaling'].map(tag => (
                                <span key={tag} className="text-xs font-bold bg-vexel-900 text-slate-300 px-2 py-1 border border-vexel-border">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center justify-between text-sm text-slate-300">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-purple-400" /> Response Time</span>
                        <span className="font-display font-bold text-white">&lt; 24 Hours</span>
                    </div>

                    {/* Tech Stack */}
                     <div>
                        <span className="font-tech text-xs text-vexel-dim uppercase tracking-widest block mb-2 border-b border-vexel-border pb-1">Protocols</span>
                        <div className="flex gap-3 text-slate-400">
                            <div title="Security"><Shield className="w-5 h-5 hover:text-white transition-colors" /></div>
                            <div title="Monitoring"><Activity className="w-5 h-5 hover:text-white transition-colors" /></div>
                            <div title="Backups"><Server className="w-5 h-5 hover:text-white transition-colors" /></div>
                        </div>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-3">
                        {[
                            "5 Hours Dev Time / Month",
                            "Priority Content Updates",
                            "Security Patches & Monitoring",
                            "Monthly Performance Reports",
                            "Server/Hosting Management"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action */}
                <div className="p-8 pt-0 mt-auto">
                    <button onClick={onContact} className="w-full py-4 border border-purple-400 text-purple-400 font-tech font-bold uppercase tracking-widest hover:bg-purple-400 hover:text-black transition-all">
                        Secure Retainer
                    </button>
                </div>
            </div>

        </div>

        {/* Detailed Comparison Matrix */}
        <div className="max-w-5xl mx-auto mb-24">
            <div className="flex items-center gap-4 mb-8">
                 <div className="w-1 h-8 bg-vexel-lime"></div>
                 <h2 className="text-2xl font-display font-bold text-white uppercase">Technical Specifications Comparison</h2>
            </div>
            
            <div className="bg-vexel-900/20 border border-vexel-border overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-vexel-border bg-vexel-900/50">
                            <th className="p-6 font-tech text-sm text-vexel-dim uppercase tracking-widest w-1/3">Feature / Spec</th>
                            <th className="p-6 font-tech text-sm text-vexel-lime uppercase tracking-widest w-1/3 border-l border-vexel-border">Interface Unit</th>
                            <th className="p-6 font-tech text-sm text-vexel-accent uppercase tracking-widest w-1/3 border-l border-vexel-border">System Core</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-vexel-border/50">
                        {[
                            { name: "Code Architecture", t1: "Next.js / Static", t2: "Next.js / SSR / Node" },
                            { name: "CMS Integration", t1: "Hardcoded / Basic MDX", t2: "Headless CMS (Sanity)" },
                            { name: "Database Access", t1: "N/A", t2: "PostgreSQL / Firebase" },
                            { name: "User Accounts", t1: "N/A", t2: "Included (Auth.js)" },
                            { name: "E-Commerce", t1: "External Links Only", t2: "Full Cart & Checkout" },
                            { name: "Design Revisions", t1: "2 Major Rounds", t2: "Unlimited during Design" },
                            { name: "API Integrations", t1: "Basic (Forms)", t2: "Advanced (REST/GraphQL)" },
                            { name: "SEO Optimization", t1: "Standard Technical SEO", t2: "Advanced Schema & Dynamic" },
                            { name: "Analytics", t1: "Google Analytics 4", t2: "Custom Events + GA4" },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 px-6 font-bold text-slate-300 font-display text-sm uppercase">{row.name}</td>
                                <td className="p-4 px-6 text-slate-400 font-mono text-xs border-l border-vexel-border">{row.t1}</td>
                                <td className="p-4 px-6 text-white font-mono text-xs border-l border-vexel-border">{row.t2}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Custom Quote Section */}
        <div className="bg-vexel-900 border border-vexel-border p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-6">
                <div className="hidden md:flex w-16 h-16 bg-vexel-950 border border-vexel-border items-center justify-center">
                    <Hexagon className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-display font-bold text-white uppercase mb-2">Enterprise / Custom Config?</h3>
                    <p className="text-slate-400 max-w-xl">
                        Large scale platforms, 3D experiences, and legacy migrations require bespoke architecture. We can build a custom scope of work tailored to your specific requirements.
                    </p>
                </div>
            </div>
            <button 
                onClick={onContact}
                className="whitespace-nowrap px-8 py-4 bg-white text-black font-tech font-bold uppercase tracking-widest hover:bg-vexel-lime transition-colors"
            >
                Request Custom Quote
            </button>
        </div>

      </div>
    </div>
  );
};