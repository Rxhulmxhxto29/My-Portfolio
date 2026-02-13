import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';

const RoleFit = () => {
    // If no roleFit data, don't render
    if (!portfolioData.roleFit) return null;

    return (
        <section className="section role-fit-section" id="role-fit">
            <div className="container" style={{ maxWidth: '1000px' }}>
                <motion.div
                    className="role-fit-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <span className="section-subtitle">Recruiter Guide</span>
                    <h2 className="section-title">Why I'm a <span className="text-gradient">Great Fit</span></h2>
                    <p className="section-desc" style={{ margin: '0 auto' }}>
                        A transparent self-assessment to help you map my skills to your open roles.
                    </p>
                </motion.div>

                <motion.div
                    className="role-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                        }
                    }}
                >
                    {portfolioData.roleFit.map((role, index) => (
                        <motion.div
                            key={index}
                            className="role-card glass-card"
                            variants={{
                                hidden: { opacity: 0, y: 30, scale: 0.95 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: { duration: 0.6, ease: "easeOut" }
                                }
                            }}
                            whileHover={{
                                y: -10,
                                borderColor: 'var(--accent-primary)',
                                boxShadow: '0 20px 40px rgba(46, 102, 255, 0.15)'
                            }}
                        >
                            <div className="role-header">
                                <h3 className="role-title">{role.role}</h3>
                                <span className={`match-badge ${role.match.includes('Very') ? 'very-strong' : 'strong'}`}>
                                    {role.match} Match
                                </span>
                            </div>
                            <div className="role-reasoning">
                                <p>"{role.reasoning}"</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style>{`
                .role-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .role-card {
                    padding: 2rem;
                    border-radius: 20px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .role-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .role-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin: 0;
                    color: #fff;
                }

                .match-badge {
                    font-size: 0.75rem;
                    padding: 0.4rem 0.8rem;
                    border-radius: 100px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .match-badge.very-strong {
                    background: rgba(0, 255, 163, 0.15);
                    color: #00ffa3;
                    border: 1px solid rgba(0, 255, 163, 0.3);
                    box-shadow: 0 0 15px rgba(0, 255, 163, 0.1);
                }

                .match-badge.strong {
                    background: rgba(46, 102, 255, 0.15);
                    color: var(--accent-primary);
                    border: 1px solid rgba(46, 102, 255, 0.3);
                }

                .role-reasoning p {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin: 0;
                    font-style: italic;
                    opacity: 0.9;
                }

                @media (max-width: 768px) {
                    .role-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
};

export default RoleFit;
