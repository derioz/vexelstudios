
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
import { Pricing } from './components/Pricing';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export type ViewState = 'landing' | 'client-guide' | 'pricing';

const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const toggleContact = () => setIsContactOpen(!isContactOpen);

  useEffect(() => {
    if (currentView !== 'landing') return;

    const handleScroll = () => {
      const sections = ['home', 'work', 'services', 'process', 'about'];
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
    <div className="min-h-screen bg-brand-black text-white font-sans overflow-x-hidden">
      <Navbar 
        activeSection={activeSection} 
        currentView={currentView}
        onContactClick={toggleContact} 
        onNavigate={handleNavigate}
      />
      
      <ThemeSwitcher />
      
      <main>
        {currentView === 'landing' ? (
          <>
            <section id="home">
              <Hero onContactClick={toggleContact} />
            </section>
            
            <section id="work" className="px-6 md:px-12">
              <Portfolio />
            </section>
            
            <section id="services">
              <Skills onNavigate={handleNavigate} />
            </section>

            <section id="process">
              <Process onNavigate={handleNavigate} />
            </section>
            
            <section id="faq">
              <FAQ />
            </section>

            <section id="about">
              <About />
            </section>
          </>
        ) : currentView === 'client-guide' ? (
          <ClientGuide onBack={() => handleNavigate('landing')} />
        ) : (
          <Pricing onBack={() => handleNavigate('landing')} onContact={toggleContact} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {isContactOpen && <ContactModal onClose={toggleContact} />}
    </div>
  );
};

export default App;
