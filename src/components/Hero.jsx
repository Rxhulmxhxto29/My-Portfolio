import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Notification from './Notification';
import { portfolioData } from '../data';

const Hero = () => {
  const [showResumePopup, setShowResumePopup] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const handleResumeClick = (e) => {
    e.preventDefault();
    setShowResumePopup(true);
  };

  return (
    <section className="section hero-section" id="home">
      <div className="container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="badge">
              <span className="pulse-dot"></span>
              Available for full-time opportunities
            </span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            I'm {" "}
            <motion.span
              className="text-gradient"
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "circOut" }}
              style={{ display: 'inline-block' }}
            >
              {portfolioData.name}
            </motion.span>
          </motion.h1>

          <motion.h2
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            {portfolioData.role}
          </motion.h2>

          <motion.p
            className="hero-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
          >
            {portfolioData.objective}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.4 }
              }
            }}
          >
            {[
              { label: 'View Projects', href: '#projects', class: 'btn btn-primary' },
              { label: 'Get in Touch', href: '#contact', class: 'btn btn-secondary' }
            ].map((btn, i) => (
              <motion.a
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={btn.href}
                className={btn.class}
              >
                {btn.label}
              </motion.a>
            ))}
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleResumeClick}
              className="btn btn-outline"
            >
              Request Resume
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="hero-visual">
        <motion.div
          className="visual-circle"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="visual-blur"></div>
      </div>

      <AnimatePresence>
        {showResumePopup && (
          <motion.div
            className="resume-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResumePopup(false)}
          >
            <motion.div
              className="resume-popup glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Resume Access</h3>
              <p>Thank you for your interest! To maintain privacy, please enter your email and a brief message to request my resume.</p>
              <form
                className="resume-request-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus('sending');
                  const formData = new FormData(e.target);

                  try {
                    const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.email}`, {
                      method: 'POST',
                      body: formData,
                      headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                      setFormStatus('success');
                      e.target.reset();
                      setTimeout(() => setShowResumePopup(false), 500); // Close modal after short delay
                    } else {
                      setFormStatus('error');
                    }
                  } catch (error) {
                    setFormStatus('error');
                  }
                }}
              >
                <input type="hidden" name="_subject" value="RESUME REQUEST from Portfolio" />
                <input type="hidden" name="_captcha" value="false" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="popup-input"
                />

                <textarea
                  name="message"
                  placeholder="Add a note (e.g. Hi Rahul, I'd like to see your resume for a generic role...)"
                  rows="3"
                  required
                  className="popup-input"
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-primary popup-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Request'}
                </button>
              </form>
              <button className="popup-close" onClick={() => setShowResumePopup(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {formStatus === 'success' && (
          <Notification
            message="Request sent! I'll get back to you shortly."
            type="success"
            onClose={() => setFormStatus(null)}
          />
        )}
        {formStatus === 'error' && (
          <Notification
            message="Error sending request. Please email directly."
            type="error"
            onClose={() => setFormStatus(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 140px;
          position: relative;
          overflow: hidden;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          background: rgba(46, 102, 255, 0.1);
          border: 1px solid rgba(46, 102, 255, 0.2);
          border-radius: 100px;
          color: var(--accent-primary);
          font-size: 0.85rem;
          margin-bottom: 2.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
          position: relative;
        }

        .pulse-dot::after {
          content: '';
          position: absolute;
          top: -4px; left: -4px; right: -4px; bottom: -4px;
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          animation: badge-pulse 2s infinite;
        }

        @keyframes badge-pulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        .hero-title {
          font-size: clamp(3.5rem, 10vw, 6rem);
          line-height: 1.1; /* Increased slightly to prevent vertical clipping */
          margin-bottom: 1.5rem;
          letter-spacing: -0.04em;
        }

        .hero-title .text-gradient {
          display: inline-block;
          padding-right: 0.1em; /* Increased to 0.1em to be safe */
          margin-right: -0.1em;
          vertical-align: bottom;
        }
        
        .hero-role {
          font-size: 1.75rem;
          color: var(--accent-secondary);
          margin-bottom: 2rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        
        .hero-headline {
          font-size: 1.35rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin-bottom: 4rem;
          line-height: 1.7;
        }
        
        .hero-ctas {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 16px 32px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 1rem;
          transition: var(--transition-smooth);
          cursor: pointer;
          text-align: center;
          display: inline-block;
        }
        
        .btn-primary { background: var(--accent-primary); color: white; box-shadow: 0 10px 30px rgba(46, 102, 255, 0.4); border: none; }
        .btn-secondary { background: var(--glass-bg); border: 1px solid var(--glass-border); color: white; }
        .btn-outline { background: transparent; border: 1px solid var(--accent-primary); color: var(--accent-primary); }

        .hero-visual {
          position: absolute;
          right: -10%;
          top: 50%;
          transform: translateY(-50%);
          width: 50vw;
          height: 50vw;
          z-index: 1;
          pointer-events: none;
        }

        .visual-circle {
          width: 100%;
          height: 100%;
          border: 2px dashed rgba(46, 102, 255, 0.2);
          border-radius: 50%;
        }

        .visual-blur {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 60%; height: 60%;
          background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
          filter: blur(80px);
          opacity: 0.15;
        }

        /* Resume Popup Styles */
        .resume-popup-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 3000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .resume-popup {
          background: #0d1117;
          border: 1px solid var(--accent-primary);
          padding: 3rem;
          border-radius: 20px;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 0 50px rgba(46, 102, 255, 0.2);
        }

        .resume-popup h3 {
          color: white;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .resume-popup p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .popup-btn {
          display: block;
          width: 100%;
          margin-bottom: 1rem;
          text-decoration: none;
        }

        .popup-close {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: underline;
        }

        .resume-request-form {
          width: 100%;
          margin-bottom: 1rem;
        }

        .popup-input {
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 1rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: white;
          font-family: inherit;
          font-size: 1rem;
        }
        textarea.popup-input {
          resize: vertical;
          min-height: 80px;
        }
        .popup-input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        @media (max-width: 1024px) {
          .hero-visual { display: none; }
          .hero-section { 
            padding-top: 120px; 
            text-align: center; /* Center align on mobile since visual is gone */
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-title { font-size: 3rem; }
          .hero-headline { font-size: 1.2rem; margin-bottom: 3rem; }
          .hero-ctas { justify-content: center; }
          .badge { margin-bottom: 2rem; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 2.5rem; }
          .hero-role { font-size: 1.5rem; }
          .btn { width: 100%; } /* accessible touch targets */
        }
      `}</style>
    </section>
  );
};

export default Hero;
