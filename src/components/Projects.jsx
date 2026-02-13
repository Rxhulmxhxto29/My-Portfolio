import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">Selected <span className="text-gradient">Case Studies</span></h2>
          <p className="section-desc">Practical solutions to real-world engineering problems.</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
        >
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card glass-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                borderColor: 'var(--accent-primary)',
                boxShadow: '0 20px 40px rgba(46, 102, 255, 0.1)'
              }}
            >
              <div className="project-content">
                <div className="project-tech-stack">
                  {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-summary">{project.description}</p>
                <div className="project-metrics">
                  <div className="metric">
                    <span className="metric-label">Key Outcome:</span>
                    <span className="metric-value">{project.metrics}</span>
                  </div>
                </div>
                <motion.button
                  className="btn-link"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ x: 5 }}
                >
                  View Case Study →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedProject(null); setShowScrollTop(false); }}
            >
              <motion.div
                className="modal-content"
                ref={modalRef}
                onScroll={(e) => setShowScrollTop(e.target.scrollTop > 500)}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={e => e.stopPropagation()}
              >
                <button className="modal-close" onClick={() => { setSelectedProject(null); setShowScrollTop(false); }}>×</button>
                <div className="case-study">
                  <div className="modal-header">
                    <span className="tech-tag-large">{selectedProject.tech.join(" • ")}</span>
                    <h2>{selectedProject.title}</h2>
                  </div>

                  {/* Dynamic Architecture Diagram */}
                  {selectedProject.architectureDiagram && (
                    <div className="architecture-grid">
                      {selectedProject.architectureDiagram.length > 0 && (
                        <div className="arch-card-wrap">
                          <h4 className="arch-header">System Architecture Flow</h4>
                          <div className="arch-visual-flow">
                            {selectedProject.architectureDiagram.map((step, idx) => (
                              <React.Fragment key={idx}>
                                <motion.div
                                  className="arch-step glass-card"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.08 }}
                                >
                                  <div className="step-icon">{step.icon}</div>
                                  <div className="step-content">
                                    <span className="step-title">{step.label}</span>
                                    <p className="step-desc">{step.desc}</p>
                                  </div>
                                </motion.div>
                                {idx < selectedProject.architectureDiagram.length - 1 && (
                                  <motion.div
                                    className="flow-arrow"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.15 + 0.1 }}
                                  >
                                    →
                                  </motion.div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="case-study-sections">
                    {selectedProject.caseStudy && (
                      <div className="detailed-case-study">
                        {selectedProject.caseStudy.map((section, idx) => (
                          <div className="cs-section" key={idx}>
                            <h4 className="cs-title">{section.title}</h4>
                            {Array.isArray(section.content) ? (
                              <ul className="cs-list">
                                {section.content.map((item, i) => (
                                  <li key={i}>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="cs-content">
                                <p>{section.content}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Engineering Decisions */}
                    {selectedProject.engineeringDecisions && (
                      <div className="cs-section engineering-decisions">
                        <h4 className="cs-title">⚡ Engineering Decisions</h4>
                        <div className="decisions-grid">
                          {selectedProject.engineeringDecisions.map((d, i) => (
                            <div key={i} className="decision-card">
                              <div className="decision-header">{d.decision}</div>
                              <div className="decision-rationale">{d.rationale}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Future Improvements */}
                    {selectedProject.futureImprovements && (
                      <div className="cs-section future-improvements">
                        <h4 className="cs-title">🚀 If I Had 2 More Weeks</h4>
                        <ul className="cs-list">
                          {selectedProject.futureImprovements.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Debug Story */}
                    {selectedProject.debugStory && (
                      <div className="cs-section debug-story">
                        <h4 className="cs-title">🔥 Problems I Broke & Fixed</h4>
                        <div className="debug-card">
                          <div className="debug-header-bar">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                          </div>
                          <div className="debug-content-area">
                            <h5 className="debug-title">"{selectedProject.debugStory.title}"</h5>
                            <div className="debug-grid">
                              <div className="debug-item">
                                <span className="debug-label failure">The Failure</span>
                                <p>{selectedProject.debugStory.problem}</p>
                              </div>
                              <div className="debug-item">
                                <span className="debug-label">Diagnosis</span>
                                <p>{selectedProject.debugStory.diagnosis}</p>
                              </div>
                              <div className="debug-item fix">
                                <span className="debug-label success">The Fix</span>
                                <p>{selectedProject.debugStory.fix}</p>
                              </div>
                              <div className="debug-item result">
                                <span className="debug-label">Outcome</span>
                                <p>{selectedProject.debugStory.result}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {showScrollTop && (
                      <motion.button
                        className="scroll-to-top-btn"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => modalRef.current.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        ↑
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        /* --- General Section Styles --- */
        .section-header { margin-bottom: 4rem; }
        .section-subtitle {
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-weight: 700;
          font-size: 0.8rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        .section-title { font-size: 3rem; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .section-desc { color: var(--text-secondary); max-width: 600px; font-size: 1.1rem; }

        /* --- Projects Grid --- */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2.5rem;
        }
        .project-card {
          padding: 3rem;
          height: 100%;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.02);
        }
        .project-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }
        .tech-tag {
          font-size: 0.7rem;
          padding: 6px 14px;
          background: rgba(46, 102, 255, 0.1);
          border: 1px solid rgba(46, 102, 255, 0.1);
          border-radius: 100px;
          color: var(--accent-primary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .project-title { font-size: 1.75rem; margin-bottom: 1.25rem; font-weight: 700; }
        .project-summary { color: var(--text-secondary); margin-bottom: 2.5rem; font-size: 1.05rem; line-height: 1.6; }
        
        .project-metrics {
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
          margin-bottom: 2rem;
        }
        .metric-label { font-size: 0.85rem; color: var(--text-secondary); margin-right: 0.75rem; text-transform: uppercase; opacity: 0.7; }
        .metric-value { font-weight: 700; color: var(--accent-secondary); }
        .btn-link {
          background: none;
          color: var(--accent-primary);
          font-weight: 700;
          padding: 0;
          text-align: left;
          font-size: 1.1rem;
          cursor: pointer;
        }

        /* --- Premium Modal UI --- */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(2, 4, 10, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 2000;
          display: flex; justify-content: center; align-items: center;
          padding: 2rem;
        }
        .modal-content {
          max-width: 1000px; width: 100%; max-height: 90vh;
          overflow-y: auto; position: relative;
          padding: 0;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(13, 17, 23, 0.95);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
        }
        .case-study { padding: 4rem 5rem; }

        /* Modal Header */
        .modal-header {
          margin-bottom: 4rem;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 2.5rem;
        }
        .modal-close {
          position: absolute; top: 1.5rem; right: 2rem;
          font-size: 1.5rem; color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
          cursor: pointer; border: 1px solid transparent;
        }
        .modal-close:hover { 
          background: rgba(255, 59, 48, 0.1); 
          color: #ff3b30; 
          border-color: rgba(255, 59, 48, 0.3);
          transform: rotate(90deg); 
        }

        .scroll-to-top-btn {
          position: fixed;
          bottom: 2rem;
          right: auto;
          left: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: #fff;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
          border: none;
          cursor: pointer;
          z-index: 2010;
          transition: all 0.3s;
        }
        .scroll-to-top-btn:hover {
          background: var(--accent-secondary);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(46, 102, 255, 0.4);
        }

        .case-study h2 {
          font-size: 3.5rem; margin: 1.5rem 0 1rem;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #fff;
        }
        .tech-tag-large {
          color: var(--accent-primary); 
          font-weight: 700;
          letter-spacing: 0.1em; 
          text-transform: uppercase;
          font-size: 0.75rem; 
          background: linear-gradient(90deg, rgba(46, 102, 255, 0.1) 0%, rgba(46, 102, 255, 0.02) 100%);
          border: 1px solid rgba(46, 102, 255, 0.2);
          padding: 0.6rem 1.2rem; 
          border-radius: 100px;
          display: inline-block; 
        }

        /* --- Architecture Flow (Restored) --- */
        .architecture-grid { margin-bottom: 4rem; width: 100%; }
        .arch-card-wrap {
          background: #0d1117;
          border: 1px solid rgba(46, 102, 255, 0.2);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: inset 0 0 40px rgba(46, 102, 255, 0.03);
          margin-bottom: 4rem;
        }
        .arch-header {
           color: #fff;
           text-align: center;
           margin-bottom: 3rem;
           text-transform: uppercase;
           letter-spacing: 0.15em;
           font-weight: 700;
           font-size: 0.9rem;
        }
        .arch-visual-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .arch-step {
          background: rgba(30, 30, 40, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 16px;
          min-width: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          transition: transform 0.3s ease;
        }
        .arch-step:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
        }
        .step-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          background: rgba(255, 255, 255, 0.05);
          width: 60px; height: 60px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
        }
        .step-title {
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.4rem;
          display: block;
        }
        .step-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.3;
          max-width: 140px;
        }
        .flow-arrow {
          font-size: 1.5rem;
          color: var(--accent-primary);
          opacity: 0.6;
          font-weight: 300;
        }

        /* --- Case Study Details --- */
        .case-study-sections {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }
        .detailed-case-study { display: grid; gap: 2.5rem; }
        .cs-section {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2.5rem;
          position: relative;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .cs-section:hover {
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        .cs-title {
          color: var(--accent-secondary);
          text-transform: uppercase; letter-spacing: 0.12em;
          margin-bottom: 1.5rem; font-size: 0.85rem; font-weight: 800;
          display: flex; align-items: center; gap: 0.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .cs-content p {
          color: #cfd9e6; line-height: 1.7; font-size: 1.05rem;
          margin-bottom: 0; white-space: pre-line;
        }
        .cs-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; }
        .cs-list li {
          position: relative; padding-left: 1.5rem;
          color: #cfd9e6; line-height: 1.6;
          font-size: 1.05rem;
        }
        .cs-list li::before {
          content: ""; position: absolute; left: 0; top: 10px;
          width: 6px; height: 6px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-primary);
        }

        /* --- Engineering Decisions --- */
        .decisions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .decision-card {
          background: rgba(46, 102, 255, 0.02);
          border: 1px solid rgba(46, 102, 255, 0.1);
          padding: 1.5rem;
          border-radius: 16px;
          transition: all 0.2s;
        }
        .decision-card:hover {
          background: rgba(46, 102, 255, 0.05);
          border-color: rgba(46, 102, 255, 0.25);
        }
        .decision-header {
          color: var(--accent-primary); font-weight: 700;
          margin-bottom: 0.75rem; font-size: 1.05rem;
        }
        .decision-rationale {
          color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;
        }

        /* --- Debug Story (Terminal Style) --- */
        .debug-card {
           background: #0d1117;
           border: 1px solid #30363d;
           border-radius: 12px;
           padding: 0;
           overflow: hidden;
           font-family: 'JetBrains Mono', monospace;
        }
        .debug-header-bar {
           background: #161b22;
           padding: 8px 16px;
           border-bottom: 1px solid #30363d;
           display: flex; gap: 6px;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; background: #30363d; }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }
        
        .debug-content-area { padding: 2rem; }
        .debug-title {
          font-size: 1.1rem;
          color: #f85149;
          margin-bottom: 2rem;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
        }
        .debug-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .debug-item p {
          margin: 0; color: #8b949e;
          font-size: 0.9rem; line-height: 1.6;
          font-family: 'JetBrains Mono', monospace;
        }
        .debug-label {
          display: block; text-transform: uppercase;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
          margin-bottom: 0.5rem; color: #c9d1d9;
        }
        .debug-label.failure { color: #ff7b72; }
        .debug-label.success { color: #7ee787; }
        .debug-item.fix { 
           grid-column: 1 / -1; 
           border-top: 1px solid #30363d; 
           padding-top: 1.5rem; 
        }
        .debug-item.result { grid-column: 1 / -1; }

        /* --- Responsive Queries --- */
        @media (max-width: 768px) {
          .arch-visual-flow { flex-direction: column; gap: 1rem; }
          .flow-arrow { transform: rotate(90deg); margin: 0.5rem 0; }
          .arch-step { width: 100%; flex-direction: row; text-align: left; padding: 1rem; }
          .step-icon { margin-bottom: 0; margin-right: 1rem; width: 40px; height: 40px; font-size: 1.2rem; }
          .step-desc { max-width: 100%; }

          .projects-grid { grid-template-columns: 1fr; }
          .modal-content { max-height: 100vh; border-radius: 0; }
          .case-study { padding: 3rem 1.5rem; }
          .case-study-sections { gap: 3rem; }
          .case-study h2 { font-size: 2.2rem; }
          .cs-section { padding: 1.5rem; }
          .decisions-grid, .debug-grid { grid-template-columns: 1fr; }
          
          .debug-content-area { padding: 1.5rem; }
          
          .scroll-to-top-btn {
            bottom: 1.5rem;
            left: 1.5rem;
            width: 44px;
            height: 44px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
