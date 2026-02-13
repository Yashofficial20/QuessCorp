import React from 'react';
import '../index.css';

const Select = ({
    label,
    value,
    onChange,
    options = [],
    error = null,
    required = false,
    name = '',
    placeholder = 'Select an option'
}) => {
    return (
        <div className="form-group">
            {label && (
                <label className="label">
                    {label}
                    {required && <span style={{ color: 'var(--danger)' }}> *</span>}
                </label>
            )}
            <select
                className="select"
                value={value}
                onChange={onChange}
                required={required}
                name={name}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Select;
