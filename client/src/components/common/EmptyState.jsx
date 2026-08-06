import React from 'react';
import { FaInbox } from 'react-icons/fa';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = FaInbox,
  title = 'No Data Found',
  description = 'There are no items to display at this time.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="text-center py-5 px-3 card border-dashed shadow-none my-3">
      <div className="d-inline-flex p-3 rounded-circle bg-light text-muted mb-3 mx-auto">
        <Icon className="fs-1" />
      </div>
      <h5 className="fw-bold text-dark mb-1">{title}</h5>
      <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '400px' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <div>
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
