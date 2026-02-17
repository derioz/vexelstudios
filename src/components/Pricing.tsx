"use client";

import { motion, useInView } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useRef } from "react";
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface PricingProps {
    onBack: () => void;
    onContact: () => void;
}

const plans = [
    {
        name: "Basic",
        price: "$375",
        period: "One-time",
        description: "Perfect for simple sites and personal portfolios.",
        features: [
            "Custom Design",
            "Mobile Ready",
            "Google Setup",
            "Fast Hosting",
        ],
        popular: false,
        buttonText: "Choose Basic",
    },
    {
        name: "Plus",
        price: "$875",
        period: "One-time",
        description: "For businesses that need more power and flexibility.",
        features: [
            "Easy Content Editing",
            "Customer Data Collection",
            "Payment Integration",
            "Priority Support",
            "SEO Optimization",
        ],
        popular: true,
        buttonText: "Choose Plus",
    },
    {
        name: "Care",
        price: "$75",
        period: "/month",
        description: "We handle the technical side so you don't have to.",
        features: [
            "Regular Health Checks",
            "Weekly Backups",
            "24/7 Uptime Monitoring",
            "Security Fixes",
        ],
        popular: false,
        buttonText: "Choose Care",
    },
];

export function Pricing({ onBack, onContact }: PricingProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            ref={ref}
            className="min-h-screen w-full bg-brand-black px-6 py-24 md:py-32 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="mx-auto max-w-7xl relative z-10">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-3 text-white/50 hover:text-white transition-all mb-12"
                >
                    <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-brand-accent transition-all">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-widest">Back</span>
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 md:mb-24 text-center"
                >
                    <Badge className="mb-6 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 border-none" variant="secondary">
                        Transparent Pricing
                    </Badge>
                    <h2 className="mb-6 text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
                        Simple <span className="text-brand-accent">Plans</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-white/60">
                        No hidden fees. Just clear plans to get your website built and launched perfectly.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex"
                        >
                            <Card
                                className={cn(
                                    "relative flex h-full w-full flex-col overflow-hidden border transition-all duration-300 rounded-[2.5rem]",
                                    plan.popular
                                        ? "border-brand-accent bg-brand-card shadow-[0_0_30px_rgba(var(--brand-accent-rgb),0.1)]"
                                        : "border-white/10 bg-brand-surface hover:border-brand-accent/30 hover:shadow-xl"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute right-6 top-6">
                                        <Badge
                                            className="bg-brand-accent text-black font-bold uppercase tracking-wider text-[10px] px-3 py-1"
                                        >
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="pb-8 pt-10 px-8">
                                    <CardTitle className="text-2xl font-black uppercase text-white mb-2">
                                        {plan.name}
                                    </CardTitle>
                                    <CardDescription className="text-white/60 font-medium text-sm">
                                        {plan.description}
                                    </CardDescription>
                                    <div className="mt-8 flex items-baseline gap-2">
                                        <span className="text-5xl font-black tracking-tight text-white">
                                            {plan.price}
                                        </span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-white/40">
                                            {plan.period}
                                        </span>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex flex-1 flex-col justify-between gap-10 px-8 pb-10">
                                    <ul className="space-y-4">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/70"
                                            >
                                                <div
                                                    className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                                                        plan.popular ? "bg-brand-accent text-black" : "bg-white/10 text-white"
                                                    )}
                                                >
                                                    <Check className="h-3 w-3" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        onClick={onContact}
                                        className={cn(
                                            "w-full py-6 rounded-full font-black uppercase tracking-widest transition-all text-sm",
                                            plan.popular
                                                ? "bg-brand-accent text-black hover:bg-white hover:text-black"
                                                : "bg-white text-black hover:bg-brand-accent hover:text-black"
                                        )}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
