
import React, { useState, useEffect } from 'react';
import { Palette, X, Check } from 'lucide-react';

const colors = [
  { name: 'Lime', hex: '#D4FF00', rgb: '212, 255, 0' },
  { name: 'Cyan', hex: '#00FFFF', rgb: '0, 255, 255' },
  { name: 'Pink', hex: '#FF0090', rgb: '255, 0, 144' },
  { name: 'Volt', hex: '#FFBF00', rgb: '255, 191, 0' },
  { name: 'Royal', hex: '#4D4DFF', rgb: '77, 77, 255' },
];

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState(colors[0].hex);

  useEffect(() => {
    const savedColor = localStorage.getItem('brand-accent-hex');
    const savedRgb = localStorage.getItem('brand-accent-rgb');
    
    if (savedColor && savedRgb) {
      document.documentElement.style.setProperty('--brand-accent', savedColor);
      document.documentElement.style.setProperty('--brand-accent-rgb', savedRgb);
      setActiveColor(savedColor);
    }
  }, []);

  const changeColor = (hex: string, rgb: string) => {
    document.documentElement.style.setProperty('--brand-accent', hex);
    document.documentElement.style.setProperty('--brand-accent-rgb', rgb);
    localStorage.setItem('brand-accent-hex', hex);
    localStorage.setItem('brand-accent-rgb', rgb);
    setActiveColor(hex);
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex items-center">
      {/* Slide-out Menu */}
      <div 
        className={`bg-brand-surface border-r border-y border-white/10 p-6 rounded-r-[2.5rem] shadow-[20px_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out flex flex-col items-center gap-8 ${
          isOpen ? 'translate-x-0' : '-translate-x-full absolute'
        }`}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 flex items-center justify-center bg-brand-black border border-white/5 rounded-full text-brand-dim hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-4">
          {colors.map((color) => (
            <button
              key={color.hex}
              onClick={() => changeColor(color.hex, color.rgb)}
              className="relative w-10 h-10 rounded-full transition-transform hover:scale-110 active:scale-90"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {activeColor === color.hex && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full animate-in zoom-in-50 duration-300">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
              {activeColor === color.hex && (
                <div className="absolute -inset-1 border border-white/40 rounded-full animate-ping opacity-20" />
              )}
            </button>
          ))}
        </div>

        <div className="[writing-mode:vertical-lr] text-[9px] font-black uppercase tracking-[0.5em] text-white/20 select-none">
          Accent Control
        </div>
      </div>

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-brand-card border border-white/10 p-3 rounded-r-2xl shadow-2xl transition-all duration-300 flex flex-col items-center gap-2 group ${
          isOpen ? 'opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
        }`}
        title="Change Accent Color"
      >
        <Palette className="w-5 h-5 text-brand-accent group-hover:scale-125 transition-transform" />
        <span className="[writing-mode:vertical-lr] text-[8px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-brand-accent transition-colors">Theme</span>
      </button>
    </div>
  );
};
