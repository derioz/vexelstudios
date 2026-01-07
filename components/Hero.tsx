
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;

    // Helper to get current accent color from CSS variables
    const getAccentColor = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue('--brand-accent-rgb').trim() || '212, 255, 0';
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        const rgb = getAccentColor();
        ctx!.fillStyle = `rgba(${rgb}, ${this.opacity})`;
        ctx!.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = getAccentColor();
      ctx.strokeStyle = `rgba(${rgb}, 0.04)`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center overflow-hidden bg-brand-black">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.7 }} />
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-12 animate-in slide-in-from-left duration-700">
          <span className="text-xl md:text-2xl font-bold text-white flex items-center gap-4">
            <span className="w-16 h-[2px] bg-brand-accent shadow-[0_0_15px_var(--brand-accent)]"></span>
            Hi, we're Vexel Studios
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-12">
              <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black leading-[0.8] tracking-tighter text-white">
                Websites <br/>
                <span className="text-brand-accent">Look Great</span> <br/>
                <span className="italic drop-shadow-[0_0_30px_rgba(var(--brand-accent-rgb),0.2)]">Work Better</span>
              </h1>
           </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <button 
            onClick={onContactClick}
            className="group relative flex items-center gap-3 bg-brand-accent text-black px-12 py-6 rounded-full text-lg font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand-accent/20"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="max-w-xs border-l-4 border-brand-accent pl-8 py-2">
            <p className="text-brand-dim text-lg font-semibold leading-relaxed">
              We build high-performance websites for brands that want to stand out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
