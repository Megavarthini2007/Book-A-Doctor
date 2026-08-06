import React from 'react';
import { FaTimes } from 'react-icons/fa';

export const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
  if (!isOpen) return null;

  const modalSizes = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl'
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}>
      <div className={`modal-dialog modal-dialog-centered ${modalSizes[size]}`}>
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: 'var(--border-radius)' }}>
          <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
            <h5 className="modal-title fw-bold text-dark">{title}</h5>
            <button type="button" className="btn-close shadow-none" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">{children}</div>
          {footer && <div className="modal-footer border-top-0 pt-0 pb-4 px-4">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
