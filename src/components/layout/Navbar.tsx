"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

const navItems = [
    { name: "Home", id: "home" },
    { name: "Work", id: "work" },
    { name: "Services", id: "services" },
    { name: "Process", id: "process" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" }
];

interface AnimatedNavbarProps {
    onNavigate?: (id: string) => void;
    className?: string;
}

export function AnimatedNavbar({ onNavigate, className }: AnimatedNavbarProps) {
    const [activeId, setActiveId] = useState("home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (id: string) => {
        setActiveId(id);
        if (onNavigate) {
            onNavigate(id);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            } else if (id === 'contact') {
                // Handle contact modal if needed, or scroll to contact section
                const contactSection = document.getElementById('contact') || document.getElementById('footer');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className={cn("fixed top-4 left-0 right-0 z-50 flex justify-center px-4", className)}>
            <nav
                className={cn(
                    "rounded-full border border-white/10 p-1.5 transition-all duration-300 backdrop-blur-md",
                    scrolled ? "bg-black/80 shadow-2xl shadow-brand-accent/5" : "bg-black/40"
                )}
            >
                <ul className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <li key={item.id} className="relative">
                            <button
                                onClick={() => handleClick(item.id)}
                                className={cn(
                                    "relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none",
                                    activeId === item.id ? "text-black" : "text-white/70 hover:text-white"
                                )}
                            >
                                {item.name}
                            </button>
                            {activeId === item.id && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute inset-0 rounded-full bg-brand-accent"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
