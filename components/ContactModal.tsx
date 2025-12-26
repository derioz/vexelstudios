import React from 'react';
import { X, Send, Zap } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-vexel-950/90 backdrop-blur-sm" 
        onClick={onClose}
      >
        {/* Grid overlay for the modal background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>
      
      <div className="relative w-full max-w-lg bg-vexel-950 border border-vexel-border shadow-2xl shadow-black animate-in zoom-in-95 duration-300">
        
        {/* Decorative Corner Markers */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-vexel-lime"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-vexel-lime"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-vexel-border bg-vexel-900/50">
          <div className="flex items-center gap-2">
             <Zap className="w-4 h-4 text-vexel-lime" />
             <h3 className="text-xl font-display font-bold text-white tracking-wide uppercase">
               Start a Project
             </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-vexel-dim hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="group">
              <label className="block text-xs font-tech text-vexel-dim mb-2 uppercase tracking-widest group-focus-within:text-vexel-lime transition-colors">Name / Company</label>
              <input 
                type="text" 
                className="w-full bg-vexel-900 border border-vexel-border p-4 text-white font-sans focus:outline-none focus:border-vexel-lime focus:bg-vexel-800 transition-all placeholder:text-vexel-dim/50"
                placeholder="YOUR NAME"
              />
            </div>
            
            <div className="group">
              <label className="block text-xs font-tech text-vexel-dim mb-2 uppercase tracking-widest group-focus-within:text-vexel-lime transition-colors">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-vexel-900 border border-vexel-border p-4 text-white font-sans focus:outline-none focus:border-vexel-lime focus:bg-vexel-800 transition-all placeholder:text-vexel-dim/50"
                placeholder="NAME@EXAMPLE.COM"
              />
            </div>

            <div className="group">
              <label className="block text-xs font-tech text-vexel-dim mb-2 uppercase tracking-widest group-focus-within:text-vexel-lime transition-colors">Project Details</label>
              <textarea 
                rows={4}
                className="w-full bg-vexel-900 border border-vexel-border p-4 text-white font-sans focus:outline-none focus:border-vexel-lime focus:bg-vexel-800 transition-all placeholder:text-vexel-dim/50 resize-none"
                placeholder="TELL US ABOUT YOUR PROJECT..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-white text-black font-display font-bold tracking-widest hover:bg-vexel-lime transition-colors flex items-center justify-center gap-3 uppercase border border-transparent hover:border-white"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
        
        {/* Footer decoration */}
        <div className="px-8 pb-6">
           <p className="font-tech text-[10px] text-vexel-dim text-center uppercase tracking-[0.2em]">
             Secure Form V.1.0
           </p>
        </div>
      </div>
    </div>
  );
};