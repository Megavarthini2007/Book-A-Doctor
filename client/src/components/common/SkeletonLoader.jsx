import React from 'react';

export const SkeletonLoader = ({ count = 3, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="row g-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 p-4 shadow-sm">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="skeleton-box rounded-circle" style={{ width: 60, height: 60 }}></div>
                <div className="flex-grow-1">
                  <div className="skeleton-box mb-2" style={{ width: '70%', height: 18 }}></div>
                  <div className="skeleton-box" style={{ width: '50%', height: 14 }}></div>
                </div>
              </div>
              <div className="skeleton-box mb-2" style={{ width: '100%', height: 14 }}></div>
              <div className="skeleton-box mb-3" style={{ width: '80%', height: 14 }}></div>
              <div className="skeleton-box" style={{ width: '100%', height: 40, borderRadius: 8 }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="skeleton-box" style={{ width: '100%', height: 60, borderRadius: 8 }}></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
