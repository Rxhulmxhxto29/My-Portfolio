import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';

const Experience = () => {
  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">Career Path</span>
          <h2 className="section-title">Professional <span className="text-gradient">Timeline</span></h2>
        </motion.div>

        <div className="timeline">
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="timeline-dot-wrapper">
                <motion.div
                  className="timeline-dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx * 0.2) + 0.3 }}
                />
              </div>
              <motion.div
                className="timeline-content glass-card"
                whileHover={{ x: 10, borderColor: 'var(--accent-secondary)' }}
              >
                <div className="timeline-header">
                  <div>
                    <h3 className="role">{exp.role}</h3>
                    <h4 className="company">{exp.company}</h4>
                  </div>
                  <span className="period">{exp.period}</span>
                </div>
                <p className="description">{exp.description}</p>
                <div className="timeline-skills">
                  {exp.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, 
            transparent, 
            var(--accent-primary) 10%, 
            var(--accent-secondary) 90%, 
            transparent);
          opacity: 0.3;
        }

        .timeline-item {
          position: relative;
          padding-left: 3.5rem;
          margin-bottom: 4rem;
        }

        .timeline-dot-wrapper {
          position: absolute;
          left: -7px;
          top: 5px;
          width: 15px;
          height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .timeline-dot {
          width: 12px;
          height: 12px;
          background: var(--bg-primary);
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 15px var(--accent-primary);
        }

        .timeline-content {
          padding: 3rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--glass-border);
          transition: var(--transition-smooth);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .role {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .company {
          font-size: 1.1rem;
          color: var(--accent-secondary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .period {
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          padding: 6px 16px;
          border-radius: 100px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .description {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .timeline-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          border-top: 1px solid var(--glass-border);
          padding-top: 1.5rem;
        }

        .skill-tag {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 800;
          background: rgba(46, 102, 255, 0.05);
          padding: 4px 12px;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .timeline-header {
            flex-direction: column;
            gap: 1.5rem;
          }
          .timeline-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
