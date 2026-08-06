import React from 'react';

export const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label fw-semibold text-secondary small mb-1">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="input-group">
        {Icon && (
          <span className="input-group-text bg-light text-muted border-end-0">
            <Icon />
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-control ${Icon ? 'border-start-0' : ''} ${error ? 'is-invalid' : ''}`}
          {...props}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
