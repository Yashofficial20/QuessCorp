import React, { useEffect } from 'react';
import '../index.css';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
    };

    return (
        <div className={`toast toast-${type}`}>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                {icons[type]}
            </span>
            <span style={{ flex: 1 }}>{message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    color: 'var(--neutral-500)',
                }}
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;
