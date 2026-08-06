import React from 'react';

export const Textarea = ({ label, name, value, onChange, placeholder, rows = 4, error, required = false, className = '', ...props }) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label fw-semibold text-secondary small mb-1">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Textarea;
