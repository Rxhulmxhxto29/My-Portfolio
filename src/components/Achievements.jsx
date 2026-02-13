import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';

const Achievements = () => {
  return (
    <section className="section achievements-section" id="achievements">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">Recognition</span>
          <h2 className="section-title">Awards & <span className="text-gradient">Achievements</span></h2>
        </motion.div>

        <div className="achievements-grid">
          {portfolioData.achievements.map((item, idx) => (
            <motion.div
              key={idx}
              className="achievement-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="achievement-header">
                <div className="achievement-icon-wrapper">
                  <motion.span
                    className="trophy-icon"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🏆
                  </motion.span>
                </div>
                <h3 className="achievement-title">{item.title}</h3>
              </div>
              <p className="achievement-desc">{item.description}</p>
              <div className="achievement-impact">
                <strong>Result:</strong> {item.impact}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .achievement-card {
          padding: 3rem;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.01);
          display: flex;
          flex-direction: column;
        }

        .achievement-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .achievement-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(46, 102, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .achievement-title {
          font-size: 1.25rem;
          line-height: 1.3;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .achievement-desc {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
          flex-grow: 1;
        }

        .achievement-impact {
          font-size: 0.9rem;
          color: var(--accent-secondary);
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .achievement-impact strong {
          color: var(--text-primary);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          margin-right: 8px;
        }
      `}</style>
    </section>
  );
};

export default Achievements;
