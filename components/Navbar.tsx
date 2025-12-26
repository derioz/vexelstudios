import React, { useState } from 'react';
import { Menu, X, Hexagon, Crosshair } from 'lucide-react';
import type { ViewState } from '../App';

interface NavbarProps {
  activeSection: string;
  currentView: ViewState;
  onContactClick: () => void;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, currentView, onContactClick, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Reordered links to match page layout
  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home', action: () => handleLinkClick('#home') },
    { name: 'WORK', href: '#work', id: 'work', action: () => handleLinkClick('#work') },
    { name: 'SKILLS', href: '#skills', id: 'skills', action: () => handleLinkClick('#skills') },
    { name: 'PRICING', href: '#', id: 'pricing', action: () => onNavigate('pricing') },
    { name: 'PROCESS', href: '#process', id: 'process', action: () => handleLinkClick('#process') },
    { name: 'FAQ', href: '#faq', id: 'faq', action: () => handleLinkClick('#faq') },
    { name: 'ABOUT', href: '#about', id: 'about', action: () => handleLinkClick('#about') },
  ];

  const handleLinkClick = (href: string) => {
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, action: () => void) => {
    e.preventDefault();
    action();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-vexel-950/90 backdrop-blur-md border-b border-vexel-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* Brand */}
            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={() => onNavigate('landing')}
            >
              <div className="relative w-10 h-10 flex items-center justify-center bg-vexel-900 border border-vexel-border group-hover:border-vexel-lime transition-colors">
                 <Hexagon className="w-6 h-6 text-white" strokeWidth={1.5} />
                 <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-vexel-dim"></div>
                 <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-vexel-dim"></div>
              </div>
              <div>
                <span className="block font-display font-bold text-xl tracking-wide text-white leading-none">VEXEL</span>
                <span className="block font-tech text-xs tracking-[0.2em] text-vexel-dim group-hover:text-vexel-lime transition-colors">STUDIOS</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center h-full">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => handleClick(e, link.action)}
                  className={`h-full flex items-center px-6 border-l border-vexel-border font-tech text-sm tracking-widest font-semibold transition-all hover:bg-white/5 relative group ${
                    (currentView === 'landing' && activeSection === link.id) || (currentView === 'pricing' && link.id === 'pricing') 
                    ? 'text-white bg-white/5' 
                    : 'text-vexel-dim hover:text-white'
                  }`}
                >
                  {link.name}
                  {((currentView === 'landing' && activeSection === link.id) || (currentView === 'pricing' && link.id === 'pricing')) && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-vexel-lime"></div>
                  )}
                </button>
              ))}

              {/* Client Guide Link */}
              <button
                onClick={() => onNavigate('client-guide')}
                className={`h-full flex items-center px-6 border-l border-vexel-border font-tech text-sm tracking-widest font-semibold transition-all hover:bg-white/5 relative group ${
                  currentView === 'client-guide' ? 'text-white bg-white/5' : 'text-vexel-dim hover:text-white'
                }`}
              >
                CLIENT GUIDE
                {currentView === 'client-guide' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-vexel-lime"></div>
                )}
              </button>
              
              <div className="h-full border-l border-vexel-border pl-8 flex items-center">
                 <button 
                  onClick={onContactClick}
                  className="bg-vexel-lime text-black font-tech font-bold text-sm px-6 py-2 tracking-widest hover:bg-white transition-colors uppercase"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-white border border-vexel-border"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-vexel-950 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-20 flex justify-between items-center px-6 border-b border-vexel-border">
           <span className="font-display font-bold text-xl text-white">MENU</span>
           <button onClick={() => setIsOpen(false)} className="text-white hover:text-vexel-lime">
             <X className="w-8 h-8" />
           </button>
        </div>
        
        <div className="flex-1 flex flex-col p-6 gap-2">
          {navLinks.map((link, idx) => (
             <button
              key={link.name}
              onClick={(e) => handleClick(e, link.action)}
              className="flex items-center justify-between p-4 border border-vexel-border hover:border-vexel-lime hover:bg-white/5 transition-all group w-full text-left"
            >
              <span className="font-display text-2xl font-bold text-white group-hover:text-vexel-lime">{link.name}</span>
              <Crosshair className="w-5 h-5 text-vexel-dim group-hover:text-vexel-lime group-hover:rotate-90 transition-all" />
            </button>
          ))}
          <button 
            onClick={() => {
              onNavigate('client-guide');
              setIsOpen(false);
            }}
            className="flex items-center justify-between p-4 border border-vexel-border hover:border-vexel-accent hover:bg-white/5 transition-all group mt-4 w-full text-left"
          >
             <span className="font-display text-xl text-slate-400 group-hover:text-vexel-accent">CLIENT GUIDE</span>
          </button>
        </div>
      </div>
    </>
  );
};