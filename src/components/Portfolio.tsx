"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Code, Sparkles, Terminal } from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Portfolio() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-24">

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-brand-accent/5 blur-[120px] rounded-full" />
        <div className="absolute left-0 bottom-0 h-[500px] w-[500px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <motion.header
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center gap-6 text-center mb-16"
        >
          <Badge
            variant="outline"
            className="inline-flex items-center gap-2 rounded-full border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur"
          >
            Selected Works
            <span className="h-2 w-2 rounded-full bg-brand-accent shadow-[0_0_10px_var(--brand-accent)]" aria-hidden="true" />
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
            Featured <span className="text-brand-accent">Projects</span>
          </h2>
          <p className="max-w-2xl text-lg text-white/50 font-light">
            A selection of our most recent digital experiences, crafted with precision and passion.
          </p>
        </motion.header>

        <motion.div
          className="grid auto-rows-[minmax(200px,auto)] gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.08,
                delayChildren: 0.12,
              },
            },
          }}
        >
          {/* BINX PRODUCTIONS - Large Card */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="group relative col-span-1 lg:col-span-2 row-span-2 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-all hover:border-brand-accent/50 hover:shadow-[0_0_30px_rgba(var(--brand-accent-rgb),0.1)]"
          >
            <div className="absolute inset-0">
              <img
                src="https://r2.fivemanage.com/image/xNeWte0tVCny.png"
                alt="BINX Productions"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex justify-between items-start">
                <Badge className="bg-brand-accent text-black font-bold uppercase tracking-wider">Featured</Badge>
                <ArrowUpRight className="text-white w-8 h-8 group-hover:text-brand-accent transition-colors" />
              </div>

              <div className="space-y-4">
                <h3 className="text-4xl font-black text-white uppercase">BINX Productions</h3>
                <p className="text-white/70 max-w-md">
                  Visual storytelling platform for digital automotive photography. Built with React and Motion for a seamless, cinematic experience.
                </p>
                <div className="flex gap-2">
                  {["React", "Motion", "UX/UI"].map(tag => (
                    <span key={tag} className="text-xs font-bold uppercase tracking-wider border border-white/20 text-white/60 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a href="http://binx.productions" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label="View Project"></a>
          </motion.article>

          {/* VITAL RP - Tall Card */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="group relative col-span-1 row-span-2 flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-all hover:border-brand-accent/50"
          >
            <div className="absolute inset-0">
              <img
                src="https://r2.fivemanage.com/image/6EDQyZDiJkQX.png"
                alt="Vital RP"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center mb-4 text-black">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase leading-none">Vital RP <br /> Dashboard</h3>
              <p className="text-white/60 text-sm">
                Immersive community dashboard and server portal gaming infrastructure.
              </p>

              <div className="flex gap-2 pt-2">
                <Badge variant="outline" className="border-white/20 text-white/60">Node.js</Badge>
                <Badge variant="outline" className="border-white/20 text-white/60">Full-Stack</Badge>
              </div>
            </div>
            <a href="http://vitalrp.net" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label="View Project"></a>
          </motion.article>

          {/* Metrics / Tech Stack - Small Card */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="col-span-1 lg:col-span-1 rounded-[2rem] border border-white/10 bg-white/5 p-8 flex flex-col justify-center gap-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3 text-brand-accent mb-2">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-widest">Performance</span>
            </div>
            <div>
              <div className="text-4xl font-black text-white">98%</div>
              <div className="text-white/50 text-sm">Client Satisfaction Score</div>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-brand-accent w-[98%]" />
            </div>
          </motion.article>

          {/* More Projects CTA - Small Card */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="col-span-1 lg:col-span-2 rounded-[2rem] border border-white/10 bg-brand-accent p-8 flex items-center justify-between group cursor-pointer"
          >
            <div>
              <h3 className="text-2xl font-black text-black uppercase">View All Projects</h3>
              <p className="text-black/70 font-medium">Explore our full archive of digital works.</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-8 h-8" />
            </div>
          </motion.article>

        </motion.div>
      </div>
    </section>
  );
}
