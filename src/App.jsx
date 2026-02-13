import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from './data';
import Hero from './components/Hero';
import About from './components/About';
import RoleFit from './components/RoleFit';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import AskRahulAI from './components/AskRahulAI';
import SocialSidebars from './components/SocialSidebars';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const navLinks = ['about', 'role-fit', 'education', 'skills', 'projects', 'experience', 'certifications', 'achievements', 'contact'];

  return (
    <div className="portfolio-app">
      <div className="bg-mesh">
        <div className="mesh-blob"></div>
        <div className="mesh-blob" style={{ bottom: 0, right: 0 }}></div>
      </div>

      <SocialSidebars />
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="container nav-container">
          <motion.div
            className="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="logo-dot"></span>
            <div className="logo-text-wrapper">
              <span className="logo-text">Rahul.dev</span>
              <span className="cursor"></span>
            </div>
          </motion.div>

          <div className="nav-links desktop-nav">
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.a>
            ))}
          </div>

          <button
            className={`hamburger ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="mobile-nav-links">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="mobile-link"
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </a>
              ))}

              <div className="mobile-socials">
                <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={portfolioData.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={`mailto:${portfolioData.email}`}>Email</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <Hero />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={sectionVariants}>
          <About />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={sectionVariants}>
          <RoleFit />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={sectionVariants}>
          <Education />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={sectionVariants}>
          <Skills />
        </motion.div>

        <Projects />

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={sectionVariants}>
          <Experience />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={sectionVariants}>
          <Certifications />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={sectionVariants}>
          <Achievements />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={sectionVariants}>
          <Contact />
        </motion.div>
      </main>

      <AskRahulAI />

      <style>{`
        .nav {
          position: fixed;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 95%; /* Use more screen width */
          max-width: 1400px; /* Allow wider nav on large screens */
          z-index: 100;
          padding: 1rem 2.5rem; /* Restore comfortable padding */
          transition: var(--transition-smooth);
          border-radius: 100px;
          background: rgba(2, 4, 10, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .nav-scrolled {
          top: 1rem;
          padding: 0.8rem 2.5rem;
          background: rgba(2, 4, 10, 0.85);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo {
          font-size: 1.5rem; /* Restore original logo size */
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: -0.03em;
          color: white;
          position: relative;
          font-family: 'Fira Code', monospace; 
          flex-shrink: 0;
          margin-right: 2rem; /* Add specific spacing after logo */
        }

        .logo-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-secondary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-secondary);
          animation: pulse-dot 2s infinite;
        }

        .logo-text-wrapper {
            display: flex;
            align-items: center;
          }

          .logo-text {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            margin: 0;
            background: linear-gradient(90deg, #fff, #a6c0fe);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'Fira Code', monospace;
            border-right: 2px solid var(--accent-primary);
            width: 0;
            animation: typing 3s steps(30, end) forwards, blink-caret 0.75s step-end infinite;
          }
          
          .cursor { display: none; } 

          @keyframes pulse-dot {
            0% { box-shadow: 0 0 0 0 rgba(0, 245, 255, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(0, 245, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 245, 255, 0); }
          }
          
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          
          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: var(--accent-primary) }
          }

        .nav-links {
          display: flex;
          gap: 2rem; /* Restored closer to original gap (was 2.5rem, now 2rem to fit items) */
          align-items: center;
          justify-content: flex-end;
          flex-wrap: nowrap;
          flex-grow: 1;
        }

        .nav-links a {
          font-size: 0.75rem; /* Restored original font size */
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.15em; /* Restored letter spacing */
          transition: all 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
          white-space: nowrap;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--accent-secondary);
          transform: translateX(-50%);
          transition: width 0.3s ease;
          box-shadow: 0 0 10px var(--accent-secondary);
        }

        .nav-links a:hover {
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        /* Hamburger Menu */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 1002;
          padding: 0;
        }

        .bar {
          width: 100%;
          height: 2px;
          background-color: white;
          border-radius: 2px;
          transition: all 0.3s ease-in-out;
          transform-origin: 1px;
        }

        .hamburger.open .bar:nth-child(1) {
          transform: rotate(45deg);
        }
        .hamburger.open .bar:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open .bar:nth-child(3) {
          transform: rotate(-45deg);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: var(--bg-primary); /* Deep background */
          z-index: 1001;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
        }

        .mobile-link {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
        }
        
        .mobile-link:active {
          color: var(--accent-primary);
        }

        .mobile-socials {
          margin-top: 3rem;
          display: flex;
          gap: 2rem;
        }
        
        .mobile-socials a {
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .mobile-socials a:hover {
          color: var(--accent-primary);
        }

        @media (max-width: 1024px) {
          .nav {
            width: 100%;
            top: 0;
            padding: 1rem 0;
          }
          .desktop-nav {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
