import React from 'react';
import '../index.css';

const Card = ({ children, className = '', onClick = null }) => {
    return (
        <div
            className={`card ${className}`}
            onClick={onClick}
            style={onClick ? { cursor: 'pointer' } : {}}
        >
            {children}
        </div>
    );
};

export default Card;
