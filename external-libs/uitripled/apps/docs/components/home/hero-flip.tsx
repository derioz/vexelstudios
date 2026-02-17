"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const libraries = [
  {
    name: "Shadcn UI",
    logoLight: "/logos/shadcnui_dark.svg",
    logoDark: "/logos/shadcnui_white.svg",
  },
  {
    name: "Base UI",
    logoLight: "/logos/baseui_white.svg",
    logoDark: "/logos/baseui_dark.svg",
  },
];

export function HeroFlip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % libraries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-[1.5em] overflow-hidden relative w-[110px] inline-flex align-bottom">
      <AnimatePresence mode="wait">
        <motion.div
          key={libraries[index].name}
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute flex items-center gap-2"
        >
          <div className="relative h-5 w-5">
            <Image
              src={libraries[index].logoLight}
              alt={libraries[index].name}
              fill
              className="object-contain block dark:hidden"
            />
            <Image
              src={libraries[index].logoDark}
              alt={libraries[index].name}
              fill
              className="object-contain hidden dark:block"
            />
          </div>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400">
            {libraries[index].name}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
