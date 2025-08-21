// HelpModal.jsx
import React from 'react';
import { X, HelpCircle } from 'lucide-react';
import './HelpModal.css';

const HelpModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-container">
                <div className="modal-header">
                    <div className="flex items-center gap-3">
                        <HelpCircle className="w-6 h-6 text-blue-600" />
                        <h3 className="modal-title">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="modal-close-btn"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="modal-content">
                    {content}
                </div>

                <div className="modal-footer">
                    <button
                        onClick={onClose}
                        className="btn-close"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente del botón de ayuda
const HelpButton = ({ onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`help-button ${className}`}
            type="button"
        >
            <HelpCircle className="w-4 h-4" />
        </button>
    );
};

export { HelpModal, HelpButton };