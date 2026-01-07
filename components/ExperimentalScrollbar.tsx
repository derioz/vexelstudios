
import React, { useEffect, useState, useRef } from 'react';

interface Section {
  id: string;
  label: string;
  code: string;
}

const sections: Section[] = [
  { id: 'home', label: 'Intro', code: 'HI-01' },
  { id: 'work', label: 'Work', code: 'WK-02' },
  { id: 'services', label: 'Capabilities', code: 'SV-03' },
  { id: 'process', label: 'Workflow', code: 'PR-04' },
  { id: 'faq', label: 'Support', code: 'FQ-05' },
  { id: 'about', label: 'Identity', code: 'AB-06' },
];

export const ExperimentalScrollbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState('home');
  const [sectionPositions, setSectionPositions] = useState<number[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  // Calculate where each section lives on the scroll track
  const updateSectionPositions = () => {
    const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScrollableHeight <= 0) return;

    const newPositions = sections.map((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        return Math.min(100, Math.max(0, (element.offsetTop / totalScrollableHeight) * 100));
      }
      return 0;
    });
    setSectionPositions(newPositions);
  };

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      // Simple active section detection based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveId(section.id);
          }
        }
      }

      // Track scroll state for visual feedback
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSectionPositions);
    
    // Initial sync
    updateSectionPositions();
    handleScroll();

    // Secondary sync to catch late-loading elements
    const timer = setTimeout(updateSectionPositions, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionPositions);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[95] hidden xl:flex flex-col items-end gap-4 select-none pointer-events-none">
      
      {/* Current Section Status */}
      <div className={`mb-6 transition-all duration-500 ${isScrolling ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-2'}`}>
        <div className="text-[10px] font-black text-brand-accent uppercase tracking-[0.4em] text-right mb-1">
          Active Index
        </div>
        <div className="text-2xl font-black text-white uppercase tracking-tighter text-right">
          {sections.find(s => s.id === activeId)?.label}
        </div>
      </div>

      <div className="relative flex items-center h-[400px]">
        {/* Main Vertical Axis */}
        <div className="w-[2px] h-full bg-white/10 relative rounded-full">
          {/* Active Fill Segment */}
          <div 
            className="absolute top-0 left-0 w-full bg-brand-accent shadow-[0_0_20px_var(--brand-accent)] transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />

          {/* Precision Nodes */}
          {sections.map((section, i) => {
            const pos = sectionPositions[i] ?? (i / (sections.length - 1)) * 100;
            const isActive = section.id === activeId;
            
            return (
              <div 
                key={section.id}
                className="absolute left-1/2 flex items-center group pointer-events-auto cursor-pointer"
                style={{ top: `${pos}%`, transform: 'translateY(-50%)' }}
                onClick={() => scrollToSection(section.id)}
              >
                {/* Node Dot */}
                <div 
                  className={`relative z-20 w-4 h-4 rounded-sm border-2 transition-all duration-300 -translate-x-1/2 ${
                    isActive 
                      ? 'bg-brand-accent border-brand-accent rotate-45 scale-125 shadow-[0_0_15px_var(--brand-accent)]' 
                      : 'bg-brand-black border-white/20 group-hover:border-brand-accent rotate-0 group-hover:rotate-90'
                  }`}
                />

                {/* Section Info Card (Shows on hover or when active) */}
                <div className={`absolute right-8 flex flex-col items-end transition-all duration-300 ${
                  isActive 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                }`}>
                  <span className={`text-[8px] font-black tracking-[0.3em] uppercase mb-0.5 ${isActive ? 'text-brand-accent' : 'text-white/40'}`}>
                    {section.code}
                  </span>
                  <span className={`text-xs font-black uppercase tracking-widest whitespace-nowrap ${isActive ? 'text-white' : 'text-white/20'}`}>
                    {section.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Real-time Percentage Marker */}
          <div 
            className={`absolute left-0 w-12 h-[1px] bg-brand-accent transition-opacity duration-300 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}
            style={{ top: `${scrollProgress}%` }}
          >
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-brand-accent text-black text-[9px] font-black px-1.5 py-0.5 rounded leading-none">
              {Math.round(scrollProgress)}%
            </div>
          </div>
        </div>
      </div>

      {/* Navigator Metadata */}
      <div className="mt-8 flex flex-col items-end gap-1 opacity-20">
        <div className="text-[8px] font-black uppercase tracking-[0.5em] text-white">
          VS-Index v3.0
        </div>
        <div className="w-12 h-[1px] bg-white" />
      </div>
      
    </div>
  );
};
