import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'btn-sm px-3 py-1',
    md: 'px-4 py-2',
    lg: 'btn-lg px-4 py-2.5 fs-6'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-${variant} ${sizeClasses[size] || ''} d-inline-flex align-items-center justify-content-center gap-2 ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="fs-5" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
