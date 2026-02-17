
import React from 'react';
import { X, Send } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-brand-black/80 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-brand-surface rounded-[4rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] p-12 md:p-20 animate-in zoom-in-95 duration-500 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-accent" />
        
        <button 
          onClick={onClose}
          className="absolute top-12 right-12 w-14 h-14 flex items-center justify-center bg-brand-card border border-white/5 rounded-full hover:bg-brand-accent hover:text-black transition-all group"
        >
          <X className="w-8 h-8 transition-transform group-hover:rotate-90" />
        </button>

        <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-12">
          Let's get <br/><span className="text-brand-accent">Started</span>
        </h3>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-dim ml-2">Your Name</label>
                <input 
                type="text" 
                className="w-full bg-brand-black border border-white/5 rounded-3xl p-6 text-white font-bold focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all outline-none"
                placeholder="What's your name?"
                />
            </div>
            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-dim ml-2">Your Email</label>
                <input 
                type="email" 
                className="w-full bg-brand-black border border-white/5 rounded-3xl p-6 text-white font-bold focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all outline-none"
                placeholder="Where can we reach you?"
                />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-dim ml-2">About Your Project</label>
            <textarea 
              rows={4}
              className="w-full bg-brand-black border border-white/5 rounded-3xl p-6 text-white font-bold focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all outline-none resize-none"
              placeholder="Tell us a little bit about what you need..."
            />
          </div>

          <button 
            type="submit"
            className="w-full py-7 bg-brand-accent text-black rounded-full text-xl font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-6 shadow-xl shadow-brand-accent/20"
          >
            Send Message
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
