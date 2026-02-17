import { Hero } from "@/components/home/hero";
import { createMetadata, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "UI Components, Blocks & Pages",
  description: siteConfig.description,
  path: "/",
  keywords: [
    "UI components",
    "baseui components",
    "shadcn components",
    "tailwind css",
    "motion components",
    "React components",
    "Next.js components",
    "Framer Motion",
    "shadcn/ui",
    "Tailwind CSS",
    "landing page templates",
    "UI library",
    "interactive UI",
    "UI TripleD",
    "tripled",
    "UI components",
    "motion components",
  ],
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-neutral-50/50 dark:bg-neutral-950">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)] pointer-events-none" />

      <main className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Hero />
      </main>
    </div>
  );
}
