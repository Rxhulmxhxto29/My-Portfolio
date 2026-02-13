import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';

const Skills = () => {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">Expertise</span>
          <h2 className="section-title">Technical <span className="text-gradient">Arsenal</span></h2>
          <p className="section-desc">A blend of core computer science foundations and cutting-edge technologies.</p>
        </motion.div>

        <div className="skills-container">
          {portfolioData.skills.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              className="skill-category glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: 'var(--accent-secondary)' }}
            >
              <h3 className="category-title">{skillGroup.category}</h3>
              <div className="skill-list">
                {skillGroup.items.map((skill, sIdx) => (
                  <motion.div
                    key={skill}
                    className="skill-item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (idx * 0.1) + (sIdx * 0.05) }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(46, 102, 255, 0.15)' }}
                  >
                    <div className="skill-dot"></div>
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="skills-cta glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="cta-icon">💡</div>
          <div className="cta-text">
            <h4>Engineering Mindset</h4>
            <p>I focus on <strong>system thinking</strong> and <strong>OOP principles</strong> to build scalable, maintainable products. My approach is research-oriented, ensuring every design decision is backed by technical depth.</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .skill-category {
          padding: 2.5rem;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.01);
        }

        .category-title {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          color: var(--accent-secondary);
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .category-title::after {
          content: '';
          flex-grow: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--accent-secondary), transparent);
          opacity: 0.3;
        }

        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.03);
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          border: 1px solid transparent;
          transition: border-color 0.3s ease;
        }

        .skill-item:hover {
          color: var(--text-primary);
          border-color: rgba(46, 102, 255, 0.3);
        }

        .skill-dot {
          width: 5px;
          height: 5px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-primary);
        }

        .skills-cta {
          display: flex;
          align-items: center;
          gap: 3rem;
          padding: 4rem;
          margin-top: 5rem;
          border-radius: 32px;
          border: 1px solid rgba(0, 245, 255, 0.15);
          background: linear-gradient(135deg, rgba(46, 102, 255, 0.03) 0%, rgba(0, 245, 255, 0.03) 100%);
          position: relative;
          overflow: hidden;
        }

        .skills-cta::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at 0% 0%, rgba(0, 245, 255, 0.1), transparent 50%);
          pointer-events: none;
        }

        .cta-icon {
          font-size: 3.5rem;
          filter: drop-shadow(0 0 20px rgba(0, 245, 255, 0.3));
        }

        .cta-text h4 {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .cta-text p {
          color: var(--text-secondary);
          font-size: 1.2rem;
          max-width: 850px;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .skills-cta {
            flex-direction: column;
            text-align: center;
            padding: 3rem 2rem;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
