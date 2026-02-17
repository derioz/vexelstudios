"use client";

import { motion, useInView } from "framer-motion";
import { MessageCircle, Pencil, Code, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { ViewState } from "../App";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface ProcessProps {
  onNavigate?: (view: ViewState) => void;
}

const steps = [
  {
    id: "01",
    title: "Getting Started",
    category: "Discovery",
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

export function Process({ onNavigate }: ProcessProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="w-full bg-brand-black px-6 py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-brand-accent/[0.03] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:mb-24"
        >
          <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="secondary">
            How We Work
          </Badge>
          <h2 className="mb-6 text-4xl font-black tracking-tighter uppercase text-white md:text-6xl lg:text-7xl">
            Simple <span className="text-brand-accent">Process</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            From idea to launch in four simple steps. No complex jargon, just results.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-brand-accent via-brand-accent/50 to-brand-accent/0 md:left-1/2 md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    delay: index * 0.2,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 flex h-12 w-12 items-center justify-center md:left-1/2 md:-translate-x-1/2 translate-x-[-50%] md:translate-x-0 z-20">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-brand-black bg-brand-accent"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    >
                      <Icon className="h-5 w-5 text-black" />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full pl-20 md:pl-0 md:w-[calc(50%-3rem)] ${isEven ? "md:pr-0 md:mr-auto" : "md:pl-0 md:ml-auto"
                      }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="relative group"
                    >
                      {/* Card Arrow */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-surface rotate-45 border-l border-b border-white/10 ${isEven ? "-right-2 border-r-0 border-t-0" : "-left-2 border-l-0 border-b-0 border-r border-t bg-brand-surface"}`}></div>

                      {/* We need to adjust border logic for arrow but simple card is safer */}

                      <Card className="relative overflow-hidden border-white/10 bg-brand-surface p-8 transition-all hover:border-brand-accent/50 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-0 right-0 p-4 opacity-20 font-black text-6xl text-white select-none pointer-events-none group-hover:text-brand-accent/20 transition-colors">
                          {step.id}
                        </div>

                        <div className="relative z-10">
                          <Badge className="mb-4 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 border-none" variant="secondary">
                            {step.category}
                          </Badge>
                          <h3 className="mb-4 text-2xl font-black uppercase text-white">
                            {step.title}
                          </h3>
                          <p className="text-base text-white/60 leading-relaxed font-medium">
                            {step.description}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {onNavigate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: steps.length * 0.2 + 0.5 }}
            className="mt-24 text-center"
          >
            <button
              onClick={() => onNavigate('client-guide')}
              className="inline-flex items-center gap-4 bg-brand-accent text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-110 transition-all shadow-2xl shadow-brand-accent/20 group"
            >
              Start Your Project
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
