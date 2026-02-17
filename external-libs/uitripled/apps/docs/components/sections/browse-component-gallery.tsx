"use client";

import { cn } from "@uitripled/utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { DetailTaskCard } from "@/components/components/cards/shadcnui/detail-task";
import { EcommerceHighlightCard } from "@/components/components/cards/shadcnui/ecommerce-highlight-card";
import { HoverExpandCard } from "@/components/components/cards/shadcnui/hover-expand";
import { AIChatInterface } from "@/components/components/chat/ai-chat-interface";
import { AnimatedList } from "@/components/components/lists/animated-list";
import { CashFlowChart } from "@/components/data/charts/cash-flow-chart";
import { AnimatedDialog } from "@/components/modals/animated-dialog";
import { BottomModal } from "@/components/modals/bottom-modal";
import { AnimatedProfileMenu } from "@/components/navigation/animated-profile-menu";
import { BrowseFolder } from "@/components/sections/browse-folder";
import { CurrencyConverterCard } from "@/components/sections/currency-converter-card";
import { ProjectsBlock } from "@/components/sections/projects-block";
import { ImageSliderCard } from "@/components/components/cards/image-slider-card";
import { MultipleAccounts } from "@/components/components/account-switcher/multiple-accounts";

interface GalleryItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function GalleryItem({ children, className, delay = 0 }: GalleryItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/40 bg-background/50 p-1 backdrop-blur-sm transition-all duration-300 hover:border-border/80 hover:shadow-xl hover:bg-background/80",
        className
      )}
    >
      <div className="h-full w-full overflow-hidden rounded-lg">
        {children}
      </div>
    </motion.div>
  );
}

export function BrowseComponentGallery() {
  return (
    <section className="container-fluid mx-auto px-4 py-24 md:px-8 max-w-[95rem]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-left">
                Browse Components
            </h2>
            <p className="text-lg text-muted-foreground text-left max-w-2xl">
                A collection of carefully crafted components, ready to drop into your project.
            </p>
        </div>

        {/* Masonry-style Grid Implementation using CSS Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">

          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <GalleryItem delay={0.1}>
                 <AnimatedProfileMenu />
            </GalleryItem>
             <GalleryItem delay={0.2}>
               <CashFlowChart />
            </GalleryItem>
             <GalleryItem delay={0.3}>
               <AIChatInterface />
            </GalleryItem>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
             <GalleryItem delay={0.15}>
                <BrowseFolder />
            </GalleryItem>
             <GalleryItem delay={0.25}>
               <HoverExpandCard />
            </GalleryItem>
             <GalleryItem delay={0.35}>
              <AnimatedDialog />
            </GalleryItem>
             <GalleryItem delay={0.45}>
               <DetailTaskCard />
             </GalleryItem>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
             <GalleryItem delay={0.2}>
                <CurrencyConverterCard />
             </GalleryItem>
             <GalleryItem delay={0.3}>
                <MultipleAccounts />
             </GalleryItem>
             <GalleryItem delay={0.4}>
                <ImageSliderCard />
             </GalleryItem>
          </div>

           {/* Column 4 - on largest screens, or merged into others if needed.
               For now complying with 3 col strict requirement from original file,
               but using responsive grid classes to allow 4 cols on very large screens if desired
               or stick to 3 cols as requested in "enhance browse-component-gallery" which usually implies better layout.
               Let's stick to the structure of maintaining all items.
           */}
           <div className="flex flex-col gap-6">
              <GalleryItem delay={0.25}>
                 <BottomModal />
              </GalleryItem>
               <GalleryItem delay={0.35}>
                 <ProjectsBlock />
              </GalleryItem>
               <GalleryItem delay={0.45}>
                 <EcommerceHighlightCard />
              </GalleryItem>
               <GalleryItem delay={0.55}>
                 <AnimatedList />
              </GalleryItem>
           </div>
        </div>
      </div>
    </section>
  );
}
