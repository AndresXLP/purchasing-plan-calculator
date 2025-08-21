import React from 'react';
import './FloatingInput.css';

const FloatingInput = ({
                           id,
                           label,
                           value,
                           onChange,
                           type = "number",
                           min,
                           max,
                           className = ""
                       }) => {
    return (
        <div className={`floating-input-container ${className}`}>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                className="floating-input"
                placeholder=" " // Importante: placeholder vacío para el CSS
            />
            <label htmlFor={id} className="floating-label">
                {label}
            </label>
        </div>
    );
};

export default FloatingInput;