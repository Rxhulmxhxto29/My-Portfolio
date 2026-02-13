import React, { useState, useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { portfolioData } from '../data';

const StatNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Extract number and suffix (e.g., "3" and "+", or "1" and "st")
  const numericMatch = value.match(/\d+/);
  const numericValue = numericMatch ? parseInt(numericMatch[0]) : 0;
  const suffix = value.replace(/\d+/, '');

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.1,
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="stat-number">
      {displayValue}{suffix}
    </span>
  );
};

const About = () => {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-subtitle">Biography</span>
            <h2 className="section-title">Solving Complex Problems with <span className="text-gradient">Precision</span></h2>
            <p className="about-text">{portfolioData.about}</p>

            <motion.div
              className="stats-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.3 }
                }
              }}
            >
              {[
                { label: 'Core Internships', value: '3+' },
                { label: 'Industry Projects', value: '5+' },
                { label: 'Hackathon Wins', value: '1st' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="stat-item"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.05, color: 'var(--text-primary)' }}
                >
                  <StatNumber value={stat.value} />
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="about-visual glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: [0, -10, 0]
            }}
            viewport={{ once: true }}
            transition={{
              opacity: { duration: 0.8 },
              x: { duration: 0.8 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="location-card">
              <span className="loc-label">📍 Based in</span>
              <h4 className="loc-value">{portfolioData.location}</h4>
            </div>

            <div className="visual-core">
              <motion.div
                className="pulse-circle"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="core-icon">👨‍💻</div>
            </div>

            <div className="experience-tag">
              <span>Industry Focus</span>
              <strong>AI & Full Stack</strong>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 6rem;
          align-items: center;
        }

        .about-text {
          font-size: 1.35rem;
          color: var(--text-secondary);
          margin-bottom: 4rem;
          line-height: 1.8;
          max-width: 800px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }

        .stat-number {
          display: block;
          font-size: 3rem;
          font-weight: 800;
          color: var(--accent-primary);
          letter-spacing: -0.05em;
          margin-bottom: 0.5rem;
          font-variant-numeric: tabular-nums;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .about-visual {
          height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 4rem;
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          border-radius: 40px;
          border: 1px solid var(--glass-border);
        }

        .location-card {
          text-align: center;
        }

        .loc-label {
          color: var(--accent-secondary);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          font-weight: 800;
          display: block;
          margin-bottom: 0.5rem;
        }

        .loc-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .visual-core {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pulse-circle {
          position: absolute;
          width: 120px;
          height: 120px;
          background: var(--accent-primary);
          border-radius: 50%;
          filter: blur(40px);
        }

        .core-icon {
          font-size: 4rem;
          z-index: 1;
        }

        .experience-tag {
          text-align: center;
        }

        .experience-tag span {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .experience-tag strong {
          font-size: 1.5rem;
          color: var(--accent-primary);
          font-weight: 800;
        }

        @media (max-width: 1100px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .about-visual { height: auto; gap: 3rem; }
        }

        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
