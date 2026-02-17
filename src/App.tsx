
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { ContactModal } from './components/ContactModal';
import { ClientGuide } from './components/ClientGuide';
import { Pricing } from './components/Pricing';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ExperimentalScrollbar } from './components/ExperimentalScrollbar';

export type ViewState = 'landing' | 'client-guide' | 'pricing';

const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const toggleContact = () => setIsContactOpen(!isContactOpen);

  const handleNavigate = (view: ViewState) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  return (
    <Layout>
      <ThemeSwitcher />
      {currentView === 'landing' && <ExperimentalScrollbar />}

      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        ) : currentView === 'client-guide' ? (
          <motion.div
            key="client-guide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ClientGuide onBack={() => handleNavigate('landing')} />
          </motion.div>
        ) : (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Pricing onBack={() => handleNavigate('landing')} onContact={toggleContact} />
          </motion.div>
        )}
      </AnimatePresence>

      {isContactOpen && <ContactModal onClose={toggleContact} />}
    </Layout>
  );
};

export default App;
