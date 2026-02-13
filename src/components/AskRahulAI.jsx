import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data';

const AskRahulAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: portfolioData.aiKnowledge.intro }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    if (!text) setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let response = portfolioData.aiKnowledge.responses.default;
      const lowerText = userText.toLowerCase();

      // Better keyword matching logic
      const knowledgeKeys = [
        { keys: ['unique', 'stand out', 'why hire'], responseKey: 'unique' },
        { keys: ['ieee', 'research', 'paper', 'publication'], responseKey: 'ieee' },
        { keys: ['cyber', 'security', 'hacking', 'nasscom', 'suprment'], responseKey: 'cyber' },
        { keys: ['forensics', 'digital forensics', 'infosys', 'springboard', 'scanner'], responseKey: 'forensics' },
        { keys: ['challenging', 'hardest', 'complex', 'project'], responseKey: 'challenging' },
        { keys: ['mindset', 'philosophy', 'thinking', 'approach'], responseKey: 'mindset' },
        { keys: ['full stack', 'web', 'mern', 'app', 'flutter'], responseKey: 'full stack' },
        { keys: ['strengths', 'good at', 'skills'], responseKey: 'strengths' },
        { keys: ['weakness', 'improve'], responseKey: 'weakness' },
        { keys: ['goals', 'future', 'career', 'objectives'], responseKey: 'goals' },
        { keys: ['education', 'college', 'cgpa', 'degree'], responseKey: 'education' },
        { keys: ['ibm', 'internship', 'experience'], responseKey: 'ibm' }
      ];

      for (const item of knowledgeKeys) {
        if (item.keys.some(k => lowerText.includes(k))) {
          response = portfolioData.aiKnowledge.responses[item.responseKey];
          break;
        }
      }

      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="ai-assistant">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="ai-toggle"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="ai-icon">✨</span>
            <span className="ai-label">Ask Rahul AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-window glass-card"
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="ai-header">
              <div className="header-info">
                <div className="ai-avatar">R</div>
                <div>
                  <h3>Rahul's Agent</h3>
                  <div className="status"><span className="status-dot"></span> Candidate Proxy</div>
                </div>
              </div>
              <button className="ai-close" onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="ai-messages">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.type === 'bot' ? -10 : 10, y: 5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  className={`message ${m.type}`}
                >
                  <div className="message-bubble">
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div className="message bot">
                  <div className="message-bubble typing">
                    <span></span><span></span><span></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="ai-footer-container">
              <button
                className="suggestion-toggle"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                <span className="toggle-text">✨ Suggested Questions</span>
                <motion.span
                  animate={{ rotate: showSuggestions ? 180 : 0 }}
                  className="toggle-icon"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    className="ai-suggestions-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="suggestion-scroll">
                      {portfolioData.aiKnowledge.suggestedQuestions.map(q => (
                        <button
                          key={q}
                          className="suggestion-btn"
                          onClick={() => {
                            handleSend(q);
                            setShowSuggestions(false);
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="ai-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                <input
                  type="text"
                  placeholder="Ask a technical question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="send-btn"
                  disabled={!input.trim()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" /></svg>
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .ai-assistant {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 9999;
        }

        .ai-toggle {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          border-radius: 100px;
          background: rgba(2, 4, 10, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(46, 102, 255, 0.4);
          color: white;
          font-family: var(--font-main);
          font-weight: 600;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
                      0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          cursor: pointer;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .ai-toggle:hover {
          transform: translateY(-4px) scale(1.02);
          background: rgba(46, 102, 255, 0.15);
          border-color: var(--accent-primary);
          box-shadow: 0 15px 40px rgba(46, 102, 255, 0.25),
                      0 0 20px rgba(46, 102, 255, 0.1) inset;
        }

        .ai-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          filter: drop-shadow(0 0 5px rgba(46, 102, 255, 0.8));
        }

        .ai-label {
          background: linear-gradient(90deg, #fff, #e0e0e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .ai-chat-window {
          width: 360px;
          height: 520px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          background: rgba(10, 15, 30, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
        }

        .ai-header {
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-info {
           display: flex;
           align-items: center;
           gap: 0.75rem;
        }

        .ai-avatar {
          width: 32px;
          height: 32px;
          background: var(--accent-primary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          font-size: 1rem;
        }

        .header-info h3 {
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.2;
        }

        .status {
          font-size: 0.65rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 5px;
          opacity: 0.8;
        }

        .status-dot {
          width: 5px;
          height: 5px;
          background: #00ff88;
          border-radius: 50%;
        }

        .ai-close {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.5rem;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }
        .ai-close:hover { color: white; }

        .ai-messages {
          flex-grow: 1;
          padding: 1.25rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .ai-messages::-webkit-scrollbar { width: 4px; }
        .ai-messages::-webkit-scrollbar-track { background: transparent; }
        .ai-messages::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 2px; }
        .ai-messages::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

        .message-bubble {
          max-width: 88%;
          padding: 10px 16px;
          border-radius: 16px;
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .message.bot .message-bubble {
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }

        .message.user .message-bubble {
          background: var(--accent-primary);
          color: white;
          border-bottom-right-radius: 4px;
          margin-left: auto;
        }

        .ai-footer-container {
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .suggestion-toggle {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 1.25rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--accent-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .suggestion-toggle:hover { opacity: 1; }
        
        .toggle-icon { font-size: 0.7rem; }

        .ai-suggestions-panel {
          overflow: hidden;
          background: rgba(0,0,0,0.1);
        }

        .suggestion-scroll {
          padding: 0 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 150px;
          overflow-y: auto;
        }
        .suggestion-scroll::-webkit-scrollbar { width: 4px; }
        .suggestion-scroll::-webkit-scrollbar-track { background: transparent; }
        .suggestion-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 2px; }
        .suggestion-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

        .suggestion-btn {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          text-align: left;
          border: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: background 0.2s;
        }
        .suggestion-btn:hover {
          background: rgba(46, 102, 255, 0.15);
          border-color: rgba(46, 102, 255, 0.2);
        }

        .ai-input-area {
          padding: 0.75rem 1.25rem 1.25rem;
          display: flex;
          gap: 0.75rem;
        }

        .ai-input-area input {
          flex-grow: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 10px 14px;
          color: white;
          outline: none;
          font-size: 0.85rem;
        }
        .ai-input-area input:focus { border-color: var(--accent-primary); background: rgba(255,255,255,0.05); }

        .send-btn {
          background: var(--accent-primary);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
        }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .typing span {
          width: 5px; height: 5px;
          background: var(--text-secondary);
          border-radius: 50%;
          display: inline-block;
          margin: 0 2px;
          animation: typing 1s infinite alternate;
        }
        .typing span:nth-child(2) { animation-delay: 0.2s; }
        .typing span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          from { opacity: 0.3; transform: translateY(0); }
          to { opacity: 1; transform: translateY(-4px); }
        }

        @media (max-width: 480px) {
          .ai-chat-window {
            width: calc(100vw - 2rem);
            height: 60vh;
            bottom: 4rem;
            right: 1rem;
          }
           .ai-assistant { bottom: 1rem; right: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default AskRahulAI;
