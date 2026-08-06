import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ size = 'md', showText = true, textClass = 'text-dark', linkTo = '/' }) => {
  const sizeMap = {
    sm: { box: 32, icon: 18, fontSize: '1rem' },
    md: { box: 40, icon: 22, fontSize: '1.25rem' },
    lg: { box: 50, icon: 28, fontSize: '1.5rem' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const logoMark = (
    <div className="d-inline-flex align-items-center gap-2.5 text-decoration-none">
      {/* Premium Gradient Logo Icon Mark */}
      <div
        className="d-flex align-items-center justify-content-center rounded-3 shadow-sm flex-shrink-0"
        style={{
          width: currentSize.box,
          height: currentSize.box,
          background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
        }}
      >
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Medical Cross + Heartbeat Pulse Path */}
          <path
            d="M19 10.5H14.5V6C14.5 4.89543 13.6046 4 12.5 4C11.3954 4 10.5 4.89543 10.5 6V10.5H6C4.89543 10.5 4 11.3954 4 12.5C4 13.6046 4.89543 14.5 6 14.5H10.5V19C10.5 20.1046 11.3954 21 12.5 21C13.6046 21 14.5 20.1046 14.5 19V14.5H19C20.1046 14.5 21 13.6046 21 12.5C21 11.3954 20.1046 10.5 19 10.5Z"
            fill="white"
            fillOpacity="0.25"
          />
          <path
            d="M3 12.5H7.5L9.5 7.5L12.5 17.5L15 10.5L16.5 12.5H21"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <span className={`fw-extrabold tracking-tight ${textClass} text-nowrap`} style={{ fontSize: currentSize.fontSize, letterSpacing: '-0.02em' }}>
          BOOK A <span className="text-primary">DOCTOR</span>
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="text-decoration-none">{logoMark}</Link>;
  }

  return logoMark;
};

export default BrandLogo;
