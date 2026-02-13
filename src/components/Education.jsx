import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';

const Education = () => {
  return (
    <section className="section education-section" id="education">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">Academic Background</span>
          <h2 className="section-title">Formative <span className="text-gradient">Education</span></h2>
        </motion.div>

        <div className="education-grid">
          {portfolioData.education.map((edu, idx) => (
            <motion.div
              key={idx}
              className="edu-card glass-card"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, borderColor: 'var(--accent-primary)' }}
            >
              <div className="edu-header">
                <div>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <h4 className="edu-inst">{edu.institution} | {edu.location}</h4>
                </div>
                <span className="edu-period">{edu.period}</span>
              </div>
              <div className="edu-metrics">
                <span className="metric-tag">Performance: {edu.metrics}</span>
              </div>
              <div className="edu-courses">
                <p>Curriculum Highlights</p>
                <div className="course-list">
                  {edu.courses.map(c => (
                    <motion.span
                      key={c}
                      className="course-pill"
                      whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .education-grid {
          display: grid;
          gap: 2.5rem;
        }

        .edu-card {
          padding: 3.5rem;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.01);
          position: relative;
          overflow: hidden;
        }

        .edu-card::after {
          content: '';
          position: absolute;
          top: 0; right: 0; width: 150px; height: 150px;
          background: radial-gradient(circle at 100% 0%, rgba(46, 102, 255, 0.05), transparent 70%);
          pointer-events: none;
        }

        .edu-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .edu-degree {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          font-weight: 700;
        }

        .edu-inst {
          color: var(--accent-secondary);
          font-weight: 600;
          font-size: 1.1rem;
        }

        .edu-period {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: rgba(46, 102, 255, 0.1);
          padding: 8px 18px;
          border-radius: 100px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .edu-metrics {
          margin-bottom: 2.5rem;
        }

        .metric-tag {
          font-weight: 800;
          color: var(--accent-primary);
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .metric-tag::before {
          content: '';
          width: 20px;
          height: 2px;
          background: var(--accent-primary);
        }

        .edu-courses p {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          font-weight: 800;
        }

        .course-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .course-pill {
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          padding: 6px 16px;
          border-radius: 8px;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        @media (max-width: 768px) {
          .edu-header {
            flex-direction: column;
            gap: 1.5rem;
          }
          .edu-card { padding: 2.5rem; }
        }
      `}</style>
    </section>
  );
};

export default Education;
