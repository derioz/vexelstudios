
import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import type { ViewState } from '../App';

interface NavbarProps {
  activeSection: string;
  currentView: ViewState;
  onContactClick: () => void;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, currentView, onContactClick, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Work', id: 'work' },
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'About', id: 'about' },
  ];

  const handleLinkClick = (id: string) => {
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 flex justify-between items-center bg-brand-black/40 backdrop-blur-xl border-b border-white/5">
        <div 
          className="text-xl font-black tracking-tighter cursor-pointer flex items-center gap-1" 
          onClick={() => onNavigate('landing')}
        >
          vexelstudios<span className="text-brand-accent text-3xl">.</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-brand-surface border border-white/5 rounded-full px-2 py-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                  activeSection === link.id && currentView === 'landing'
                  ? 'bg-brand-accent text-black shadow-lg shadow-brand-accent/20' 
                  : 'text-brand-dim hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <button 
            onClick={onContactClick}
            className="ml-4 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-brand-accent transition-all group"
          >
            Let's Talk
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>
        </div>

        <button 
          className="md:hidden w-12 h-12 flex items-center justify-center bg-brand-surface border border-white/10 rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-brand-black transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="text-xl font-black">Menu</span>
            <button onClick={() => setIsOpen(false)} className="w-12 h-12 flex items-center justify-center bg-brand-surface rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-5xl font-black text-left hover:text-brand-accent transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="mt-auto">
             <button 
               onClick={() => { onContactClick(); setIsOpen(false); }}
               className="w-full bg-brand-accent text-black py-6 rounded-3xl text-xl font-black uppercase tracking-widest"
             >
               Start Project
             </button>
          </div>
        </div>
      </div>
    </>
  );
};
