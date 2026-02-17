"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUp,
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from "lucide-react";

const footerLinks = [
    {
        title: "Services",
        links: ["Web Design", "Development", "SEO", "Branding"],
    },
    {
        title: "Company",
        links: ["About Us", "Process", "Careers", "Contact"],
    },
    {
        title: "Legal",
        links: ["Privacy Policy", "Terms of Service"],
    },
];

const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
];

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const shouldReduceMotion = useReducedMotion();

    return (
        <footer
            id="footer"
            aria-labelledby="footer-heading"
            className="relative w-full overflow-hidden border-t border-white/10 bg-black py-12"
        >
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute -top-[20%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-accent/5 blur-[120px]"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
                                Vexel Studios
                            </h3>
                            <p className="mb-6 max-w-md text-sm leading-relaxed text-white/60">
                                Crafting digital experiences that merge art with technology. We build premium, high-performance websites for forward-thinking brands.
                            </p>

                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <Button
                                        key={social.label}
                                        size="icon"
                                        variant="ghost"
                                        className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-brand-accent hover:text-black transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </Button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {footerLinks.map((section) => (
                            <div key={section.title}>
                                <h4 className="text-sm font-semibold text-white mb-4">{section.title}</h4>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-sm text-white/50 hover:text-brand-accent transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} Vexel Studios. All rights reserved.
                    </p>

                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white"
                        onClick={scrollToTop}
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}
