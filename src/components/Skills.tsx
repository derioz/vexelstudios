"use client";

import { motion } from "framer-motion";
import { Check, Code, Layout, Settings, Sparkles, Terminal, Shield, Zap, Search } from "lucide-react";
import { ViewState } from "../App";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface SkillsProps {
  onNavigate: (view: ViewState) => void;
}

const services = [
  {
    id: "01",
    icon: Sparkles,
    title: "Design",
    subtitle: "The Look & Feel",
    description: "We create websites that look amazing on every device. No boring templates—just custom design that fits your brand.",
    features: ["Custom UI", "Mobile Friendly", "Easy to Use"],
    iconColor: "text-brand-accent",
    bgColor: "bg-brand-accent/10",
  },
  {
    id: "02",
    icon: Layout,
    title: "Building",
    subtitle: "The Working Site",
    description: "We turn designs into fast, working websites. Everything is built to be quick, secure, and ready to grow.",
    features: ["Fast Loading", "SEO Optimized", "Secure Code"],
    iconColor: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    id: "03",
    icon: Check,
    title: "Maintenance",
    subtitle: "Always Working",
    description: "We don't just build and leave. We offer monthly plans to keep your site updated and running smoothly 24/7.",
    features: ["Updates", "Support", "Daily Backups"],
    iconColor: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    id: "04",
    icon: Search,
    title: "SEO Strategy",
    subtitle: "Get Found",
    description: "Data-driven strategies to improve your visibility and rank higher on search engines.",
    features: ["Keyword Research", "On-Page SEO", "Analytics"],
    iconColor: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    id: "05",
    icon: Shield,
    title: "Security",
    subtitle: "Stay Safe",
    description: "Enterprise-grade security implementation to protect your data and your users.",
    features: ["SSL", "Firewall", "DDoS Protection"],
    iconColor: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    id: "06",
    icon: Zap,
    title: "Performance",
    subtitle: "Lightning Fast",
    description: "Optimization techniques to ensure your site loads instantly and keeps users engaged.",
    features: ["Caching", "cdn", "Code Splitting"],
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  }
];

export function Skills({ onNavigate }: SkillsProps) {
  return (
    <section className="w-full bg-brand-surface border-t border-white/5 px-6 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:mb-24"
        >
          <Badge className="mb-6 bg-brand-accent text-black hover:bg-white" variant="secondary">
            Our Expertise
          </Badge>
          <h2 className="mb-6 text-4xl font-black tracking-tighter uppercase text-white md:text-6xl lg:text-7xl">
            Everything your <br /><span className="text-brand-accent">brand needs</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            From initial concept to final deployment and beyond, we handle every aspect of your digital presence.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="group relative h-full overflow-hidden rounded-[2rem] border border-white/5 bg-brand-card p-8 transition-all hover:border-brand-accent/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  {/* Hover Gradient */}
                  <motion.div
                    className={`absolute inset-0 ${service.bgColor} opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none`}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 flex justify-between items-start">
                      <div className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-7 w-7 ${service.iconColor}`} />
                      </div>
                      <span className="text-4xl font-black text-white/5 select-none">{service.id}</span>
                    </div>

                    <h3 className="mb-2 text-2xl font-black uppercase text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm font-bold text-brand-dim uppercase tracking-widest mb-4">{service.subtitle}</p>

                    <p className="mb-8 text-white/60 leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    <ul className="mb-8 space-y-2">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={feature}
                          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50"
                        >
                          <div className={`h-1.5 w-1.5 rounded-full bg-brand-accent`} />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      variant="ghost"
                      className="group/btn w-full justify-between text-brand-accent hover:text-white hover:bg-white/5"
                      onClick={() => onNavigate('pricing')}
                    >
                      Learn More
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
