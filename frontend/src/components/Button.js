import React from 'react';
import '../index.css';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    type = 'button',
    icon = null
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
