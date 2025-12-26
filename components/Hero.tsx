import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, Zap } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  // Optimized Scroll Handler using Ref to prevent re-renders
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas Animation & Mouse Parallax
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Grid State
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    
    // Configuration
    const gridSize = 40;
    const gridColor = '#1a1a1a';
    const activeBlockColor = '#ccff00'; // Lime
    const activeBlockColor2 = '#00f0ff'; // Cyan
    
    // Active Blocks (Data Packets)
    interface Block {
      x: number;
      y: number;
      life: number;
      maxLife: number;
      color: string;
    }
    let blocks: Block[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.05;
      const currentScroll = scrollRef.current;
      
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Clear
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, width, height);

      // Calculate Parallax Offset
      // The grid moves opposite to mouse to create depth
      const parallaxX = (width / 2 - mouseX) * 0.02;
      const parallaxY = (height / 2 - mouseY) * 0.02;

      // Draw Grid
      ctx.lineWidth = 1;
      
      // Vertical Lines
      for (let x = 0; x <= width + gridSize; x += gridSize) {
        const xPos = (x + parallaxX) % width; // Infinite wrap
        const drawX = xPos < 0 ? width + xPos : xPos;
        
        ctx.strokeStyle = gridColor;
        ctx.beginPath();
        ctx.moveTo(drawX, 0);
        ctx.lineTo(drawX, height);
        ctx.stroke();
      }

      // Horizontal Lines (Scanning effect)
      // They move down slowly + scroll parallax
      const scrollOffset = currentScroll * 0.5; // Scroll parallax factor
      const moveOffset = (time * 10) % gridSize;
      
      for (let y = 0; y <= height + gridSize; y += gridSize) {
        const yPos = (y + moveOffset + parallaxY - (scrollOffset % gridSize));
        
        ctx.strokeStyle = gridColor;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();
      }

      // Spawn Random Active Blocks
      if (Math.random() > 0.92) {
        const gridCols = Math.ceil(width / gridSize);
        const gridRows = Math.ceil(height / gridSize);
        const col = Math.floor(Math.random() * gridCols);
        const row = Math.floor(Math.random() * gridRows);
        
        blocks.push({
          x: col * gridSize,
          y: row * gridSize,
          life: 0,
          maxLife: Math.random() * 50 + 20,
          color: Math.random() > 0.5 ? activeBlockColor : activeBlockColor2
        });
      }

      // Draw Active Blocks
      blocks.forEach((block, index) => {
        block.life++;
        
        // Calculate position with parallax
        const xPos = (block.x + parallaxX) % width;
        const drawX = xPos < 0 ? width + xPos : xPos;
        const yPos = (block.y + moveOffset + parallaxY - (scrollOffset % gridSize)); // Matches horizontal lines

        const opacity = Math.sin((block.life / block.maxLife) * Math.PI); // Fade in/out
        
        ctx.fillStyle = block.color;
        ctx.globalAlpha = opacity * 0.3; // Glow intensity
        ctx.fillRect(drawX, yPos, gridSize, gridSize);
        
        // Technical border around block
        ctx.strokeStyle = block.color;
        ctx.globalAlpha = opacity * 0.8;
        ctx.strokeRect(drawX + 2, yPos + 2, gridSize - 4, gridSize - 4);
        
        if (block.life >= block.maxLife) {
          blocks.splice(index, 1);
        }
      });
      ctx.globalAlpha = 1;

      // Vignette / Gradient Overlay for depth
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width * 0.8);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, '#030303');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  return (
    <div className="relative min-h-screen pt-20 flex flex-col justify-center overflow-hidden border-b border-vexel-border">
      
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-80"
      />
      
      {/* Grid Overlay Texture (Scanlines) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,3px_100%]"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Status Bar */}
        <div className="flex items-center gap-4 mb-12 animate-in fade-in slide-in-from-left duration-700">
           <div className="flex items-center gap-2 px-3 py-1 bg-vexel-900/80 backdrop-blur-md border border-vexel-border">
              <div className="w-2 h-2 bg-vexel-lime animate-pulse-fast"></div>
              <span className="font-tech text-xs tracking-widest text-vexel-lime uppercase">System Online</span>
           </div>
           <div className="h-px w-12 bg-vexel-border"></div>
           <span className="font-tech text-xs tracking-widest text-vexel-dim backdrop-blur-sm bg-black/30 px-2">EST. 2024</span>
        </div>

        {/* Main Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
           <div className="lg:col-span-9">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-[0.85] tracking-tight uppercase relative">
                {/* Glitch Effect Duplicate Layer */}
                <span className="absolute inset-0 text-vexel-lime opacity-0 mix-blend-overlay hover:opacity-100 transition-opacity duration-100 select-none pointer-events-none" style={{clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px, 0)'}}>
                   Elite <br/>
                   <span className="text-transparent text-stroke">Web Design</span> <br/>
                   & Systems
                </span>

                Elite <br/>
                <span className="text-transparent text-stroke hover:text-vexel-accent transition-colors duration-500" style={{ WebkitTextStroke: '2px #fff' }}>Web Design</span> <br/>
                & Systems
              </h1>
           </div>
           
           <div className="lg:col-span-3 flex flex-col justify-end pb-4">
              <p className="font-tech text-lg text-slate-400 leading-relaxed mb-8 border-l-2 border-vexel-accent pl-4 backdrop-blur-sm bg-black/20 p-2">
                We design and build high-performance websites for brands that demand the best. Custom coded. No bloat. Pure precision.
              </p>
              <div className="flex flex-col gap-3">
                 <button 
                   onClick={onContactClick}
                   className="group flex items-center justify-between w-full bg-white px-6 py-4 hover:bg-vexel-lime transition-colors"
                 >
                   <span className="font-display font-bold text-black tracking-wider">START PROJECT</span>
                   <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button 
                   onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                   className="group flex items-center justify-between w-full border border-vexel-border bg-black/40 backdrop-blur-sm px-6 py-4 hover:border-white transition-colors"
                 >
                   <span className="font-display font-bold text-white tracking-wider">VIEW PORTFOLIO</span>
                   <ChevronRight className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
                 </button>
              </div>
           </div>
        </div>

        {/* Tech Specs Decoration */}
        <div className="border-t border-vexel-border pt-6 flex justify-between items-end backdrop-blur-sm bg-black/20 p-4 -mx-4">
           <div className="hidden md:flex gap-12">
              <div>
                 <span className="block font-tech text-xs text-vexel-dim mb-1">CURRENT VERSION</span>
                 <span className="block font-display text-xl text-white">V.1.0.4</span>
              </div>
              <div>
                 <span className="block font-tech text-xs text-vexel-dim mb-1">LOCATION</span>
                 <span className="block font-display text-xl text-white">GLOBAL</span>
              </div>
           </div>
           
           <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-vexel-accent" />
              <span className="font-tech text-sm text-vexel-accent tracking-widest">OPEN FOR NEW PROJECTS</span>
           </div>
        </div>

      </div>
    </div>
  );
};