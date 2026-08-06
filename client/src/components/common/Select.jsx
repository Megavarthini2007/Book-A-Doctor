import React from 'react';

export const Select = ({ label, name, value, onChange, options = [], error, required = false, className = '', ...props }) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label fw-semibold text-secondary small mb-1">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-select ${error ? 'is-invalid' : ''}`}
        {...props}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Select;
