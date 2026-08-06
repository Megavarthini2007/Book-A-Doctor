import React from 'react';

export const DashboardStatCard = ({ title, value, icon: Icon, color = 'primary', subtext }) => {
  const iconBadgeMap = {
    warning: 'yellow',
    primary: 'blue',
    success: 'green',
    info: 'blue'
  };

  const badgeColorClass = iconBadgeMap[color] || 'blue';

  return (
    <div className="glass-stat-widget h-100 p-3.5 px-4 d-flex flex-column justify-content-between">
      <div className="d-flex align-items-start justify-content-between mb-2">
        <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.06em', color: '#64748b' }}>
          {title}
        </span>
        {Icon && (
          <div className={`stat-icon-badge ${badgeColorClass}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
      <div>
        <div className="fw-extrabold text-dark mb-0" style={{ fontSize: '2rem', lineHeight: '1.2' }}>
          {value}
        </div>
        {subtext && <p className="text-muted small mb-0 mt-1" style={{ fontSize: '0.8rem' }}>{subtext}</p>}
      </div>
    </div>
  );
};

export default DashboardStatCard;

