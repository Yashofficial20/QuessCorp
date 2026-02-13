import React from 'react';
import '../index.css';

const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    error = null,
    required = false,
    name = ''
}) => {
    return (
        <div className="form-group">
            {label && (
                <label className="label">
                    {label}
                    {required && <span style={{ color: 'var(--danger)' }}> *</span>}
                </label>
            )}
            <input
                type={type}
                className={`input ${error ? 'error' : ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                name={name}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Input;
