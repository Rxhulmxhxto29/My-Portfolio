import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';

const Certifications = () => {
  return (
    <section className="section certifications-section" id="certifications">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">Credentials</span>
          <h2 className="section-title">Verified <span className="text-gradient">Certifications</span></h2>
        </motion.div>

        <div className="certs-grid">
          {portfolioData.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              className="cert-item glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: 'var(--accent-secondary)' }}
            >
              <div className="cert-badge-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div>
                <h4 className="cert-title">{cert.title}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .cert-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--glass-border);
          transition: var(--transition-smooth);
        }

        .cert-badge-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          background: rgba(0, 245, 255, 0.1);
          color: var(--accent-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cert-title {
          font-size: 1.05rem;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .cert-issuer {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      `}</style>
    </section>
  );
};

export default Certifications;
