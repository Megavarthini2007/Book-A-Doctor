import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { FaExclamationTriangle } from 'react-icons/fa';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  confirmVariant = 'danger',
  isLoading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center py-2">
        <div className="text-warning fs-1 mb-3">
          <FaExclamationTriangle />
        </div>
        <p className="text-secondary mb-4">{message}</p>
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="outline-secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
