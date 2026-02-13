import React from 'react';
import { motion } from 'framer-motion';

const ArchitectureDiagram = ({ steps }) => {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="architecture-diagram-container">
            <h4 className="arch-title">System Data Flow</h4>
            <div className="arch-flow">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <motion.div
                            className="arch-node glass-card"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="arch-icon">{step.icon}</div>
                            <div className="arch-label">{step.label}</div>
                            {step.desc && <div className="arch-desc">{step.desc}</div>}
                        </motion.div>

                        {index < steps.length - 1 && (
                            <motion.div
                                className="arch-arrow"
                                initial={{ opacity: 0, scaleX: 0 }}
                                whileInView={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: index * 0.1 + 0.05 }}
                            >
                                →
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <style jsx>{`
        .architecture-diagram-container {
          margin: 3rem 0;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .arch-title {
          color: var(--accent-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.9rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .arch-flow {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .arch-node {
          padding: 1.5rem;
          min-width: 140px;
          text-align: center;
          background: rgba(30, 30, 40, 0.6);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }

        .arch-icon {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .arch-label {
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.9rem;
        }

        .arch-desc {
          color: var(--text-secondary);
          font-size: 0.75rem;
          line-height: 1.3;
        }

        .arch-arrow {
          color: var(--accent-primary);
          font-size: 1.5rem;
          align-self: center;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .arch-flow {
            flex-direction: column;
            align-items: center;
          }
          .arch-arrow {
            transform: rotate(90deg);
            margin: 0.5rem 0;
          }
        }
      `}</style>
        </div>
    );
};

export default ArchitectureDiagram;
