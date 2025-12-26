import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ClientGuide } from './components/ClientGuide';

export type ViewState = 'landing' | 'client-guide';

const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const toggleContact = () => setIsContactOpen(!isContactOpen);

  // Simple scroll spy to update active section in navbar
  useEffect(() => {
    if (currentView !== 'landing') return;

    const handleScroll = () => {
      // Updated order to match the layout
      const sections = ['home', 'work', 'skills', 'process', 'faq', 'about'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavigate = (view: ViewState) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-vexel-900 text-slate-300 font-sans selection:bg-vexel-accent selection:text-black overflow-x-hidden">
      <Navbar 
        activeSection={activeSection} 
        currentView={currentView}
        onContactClick={toggleContact} 
        onNavigate={handleNavigate}
      />
      
      <main>
        {currentView === 'landing' ? (
          <>
            <section id="home">
              <Hero onContactClick={toggleContact} />
            </section>
            
            <section id="work">
              <Portfolio />
            </section>
            
            <section id="skills">
              <Skills />
            </section>

            <section id="process">
              <Process />
            </section>
            
            <section id="faq">
              <FAQ />
            </section>

            <section id="about">
              <About />
            </section>
          </>
        ) : (
          <ClientGuide onBack={() => handleNavigate('landing')} />
        )}
      </main>

      <Footer />

      {isContactOpen && <ContactModal onClose={toggleContact} />}
    </div>
  );
};

export default App;