"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, DollarSign, Heart, Rocket, Monitor, MessageCircle } from "lucide-react";
import { ViewState } from "../App";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface ClientGuideProps {
  onBack: () => void;
}

const phases = [
  {
    phase: '01',
    icon: MessageCircle,
    title: 'Chatting',
    desc: 'We talk about your business and what you want to achieve. We create a simple plan for the site.'
  },
  {
    phase: '02',
    icon: Monitor,
    title: 'Designing',
    desc: 'We create the look and feel. You will see a full design of the site and approve it before we build.'
  },
  {
    phase: '03',
    icon: Rocket,
    title: 'Building',
    desc: 'We write the code and set everything up. Your site goes live on a fast, secure host.'
  }
];

export function ClientGuide({ onBack }: ClientGuideProps) {
  return (
    <section className="min-h-screen bg-brand-black px-6 py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="group flex items-center gap-3 text-white/50 hover:text-white transition-all mb-20"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-brand-accent transition-all">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-bold text-xs uppercase tracking-widest">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Badge className="mb-6 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 border-none" variant="secondary">
            Transparency
          </Badge>
          <h1 className="text-6xl md:text-[10rem] font-black text-white mb-10 uppercase tracking-tighter leading-[0.85]">
            Our <br /><span className="text-brand-accent">Guide</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl font-light leading-relaxed">
            Everything you need to know about working with us. No complicated terms, just a simple way to build your site.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Phases List */}
          <div className="lg:col-span-8 space-y-24">
            {phases.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.phase}
                  className="flex flex-col md:flex-row gap-12 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-8xl font-black text-white/5 group-hover:text-brand-accent/20 transition-all select-none leading-none">
                    {item.phase}
                  </div>
                  <div className="pt-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-brand-accent/10 rounded-full border border-brand-accent/20 text-brand-accent">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-4xl font-black uppercase text-white tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-xl text-white/60 font-medium leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar Cards */}
          <div className="lg:col-span-4 space-y-8">
            {/* Payment Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-brand-surface border-white/10 p-10 rounded-[2.5rem]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black uppercase text-white">Payment</h3>
                </div>
                <div className="space-y-8">
                  <div className="flex justify-between font-black uppercase text-xs tracking-[0.2em] text-white/50">
                    <span>To Start</span>
                    <span className="text-brand-accent">50% Deposit</span>
                  </div>
                  <div className="w-full h-3 bg-brand-black rounded-full overflow-hidden p-1 border border-white/5">
                    <div className="w-1/2 h-full bg-brand-accent rounded-full shadow-[0_0_15px_var(--brand-accent)] animate-pulse"></div>
                  </div>
                  <p className="text-sm font-medium text-white/40 leading-relaxed italic">
                    "We start working as soon as the first deposit is paid."
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Promise Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-white text-black border-none p-10 rounded-[2.5rem] shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black uppercase">Our Promise</h3>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wider leading-relaxed">30 days of free support after launch.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wider leading-relaxed">You own 100% of the site and code.</p>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
