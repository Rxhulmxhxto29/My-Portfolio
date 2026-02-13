import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Notification from './Notification';
import { portfolioData } from '../data';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const handleEmailClick = (e, email) => {
    // Copy to clipboard always as a background convenience
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Instead of relying on buggy 'mailto:', let's provide a direct Gmail link
    // which is more reliable for web users.
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-subtitle">Connect</span>
            <h2 className="section-title">Let's <span className="text-gradient">Collaborate</span></h2>
            <p className="contact-desc">
              Currently open to new opportunities and interesting research projects in AI/ML and Full-Stack Engineering.
            </p>

            <div className="contact-methods">
              {[
                { label: 'Email', value: portfolioData.email, icon: '✉️', href: `mailto:${portfolioData.email}` },
                { label: 'LinkedIn', value: 'in/rahul-mahato-0b1534254', icon: '🔗', href: portfolioData.linkedIn },
                { label: 'GitHub', value: '@Rxhulmxhxto29', icon: '🐙', href: portfolioData.github }
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label === 'Email' ? "_self" : "_blank"}
                  rel={item.label === 'Email' ? undefined : "noopener noreferrer"}
                  className="contact-item"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                  onClick={item.label === 'Email' ? (e) => {
                    e.preventDefault();
                    handleEmailClick(e, item.value);
                  } : undefined}
                >
                  <div className="icon-box">
                    {item.icon}
                  </div>
                  <div className="contact-text">
                    <label>{item.label}</label>
                    <p>{item.value}</p>
                    {item.label === 'Email' && (
                      <span className="copy-hint">
                        {copied ? '✓ Email Copied!' : '(Opens Gmail & Copies address)'}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div>
            <form
              className="contact-form glass-card"
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
                  } else {
                    setFormStatus('error');
                  }
                } catch (error) {
                  setFormStatus('error');
                }
              }}
            >
              <input type="hidden" name="_subject" value="New Portfolio Contact Message!" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="form-group">
                <input name="name" type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input name="email" type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          <AnimatePresence>
            {formStatus === 'success' && (
              <Notification
                message="Message sent successfully! I'll get back to you soon."
                type="success"
                onClose={() => setFormStatus(null)}
              />
            )}
            {formStatus === 'error' && (
              <Notification
                message="Something went wrong. Please try again or email directly."
                type="error"
                onClose={() => setFormStatus(null)}
              />
            )}
          </AnimatePresence>
        </div>

        <footer className="footer">
          <div className="motivational-quote">
            <p>"Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction and skillful execution."</p>
            <span className="quote-author">— William A. Foster</span>
          </div>
          <div className="footer-line"></div>
          <p>© 2025 {portfolioData.name}. Architecting the future with code.</p>
        </footer>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7rem;
          align-items: flex-start;
          margin-bottom: 7rem;
          position: relative;
          z-index: 5;
        }

        .contact-desc {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem; /* Reduced from 4rem to move items up */
          line-height: 1.7;
          max-width: 500px;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid transparent;
          transition: var(--transition-smooth);
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          position: relative;
          z-index: 10;
        }

        .contact-item:hover {
          border-color: var(--glass-border);
        }

        .icon-box {
          width: 55px;
          height: 55px;
          background: rgba(46, 102, 255, 0.1);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .contact-text {
          flex-grow: 1;
        }

        .contact-item label {
          display: block;
          font-size: 0.75rem;
          color: var(--accent-secondary);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .contact-item p {
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0;
        }

        .copy-hint {
          display: block;
          font-size: 0.7rem;
          color: var(--accent-primary);
          margin-top: 4px;
          opacity: 0.7;
          font-weight: 600;
        }

        .contact-form {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          border-radius: 32px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.01);
          position: relative;
          z-index: 10;
        }

        .form-group input, .form-group textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 14px;
          padding: 18px;
          color: white;
          font-family: inherit;
          outline: none;
          transition: var(--transition-smooth);
          font-size: 1rem;
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--accent-primary);
          background: rgba(46, 102, 255, 0.05);
        }

        .w-full {
          width: 100%;
        }

        .footer {
          text-align: center;
          padding-top: 6rem;
          color: var(--text-secondary);
          font-size: 0.95rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .motivational-quote {
          margin-bottom: 3rem;
          max-width: 600px;
          text-align: center;
          opacity: 0.8;
        }

        .motivational-quote p {
          font-family: 'Times New Roman', serif;
          font-style: italic;
          font-size: 1.2rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
        }

        .quote-author {
          font-size: 0.85rem;
          color: var(--accent-secondary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .footer-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--glass-border), transparent);
          margin-bottom: 3rem;
        }

        @media (max-width: 1100px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 5rem;
          }
          .contact-form { padding: 3rem 2rem; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
