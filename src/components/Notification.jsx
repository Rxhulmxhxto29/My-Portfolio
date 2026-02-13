import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Notification = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`notification ${type}`}
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
                padding: '1rem 2rem',
                borderRadius: '12px',
                background: 'rgba(10, 25, 47, 0.95)',
                border: '1px solid var(--accent-primary)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backdropFilter: 'blur(10px)',
                minWidth: '300px'
            }}
        >
            <div
                style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: type === 'success' ? '#00ffa3' : '#ff4d4d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                    flexShrink: 0
                }}
            >
                {type === 'success' ? '✓' : '!'}
            </div>
            <div>
                <h4 style={{ margin: 0, color: '#fff', fontSize: '0.95rem' }}>
                    {type === 'success' ? 'Success!' : 'Error'}
                </h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {message}
                </p>
            </div>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    marginLeft: 'auto',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                }}
            >
                ×
            </button>
        </motion.div>
    );
};

export default Notification;
