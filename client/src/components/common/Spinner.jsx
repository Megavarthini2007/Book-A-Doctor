import React from 'react';

export const Spinner = ({ fullPage = false, message = 'Loading healthcare services...' }) => {
  if (fullPage) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-secondary fw-semibold small">{message}</p>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
