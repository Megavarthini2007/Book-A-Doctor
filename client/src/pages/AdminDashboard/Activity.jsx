import React from 'react';
import { FaHistory } from 'react-icons/fa';
import { mockDashboardData } from '../../data/dashboardData';

export const Activity = () => {
  const activities = mockDashboardData.admin.recentActivity;

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">Platform Activity Audit Log</h4>
      <p className="text-secondary small mb-4">Real-time audit log of system events, registration attempts, and booking operations</p>

      <div className="card border-0 shadow-sm p-4">
        <div className="d-flex flex-column gap-3">
          {activities.map((act) => (
            <div key={act.id} className="p-3 border rounded bg-white d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-primary-subtle text-primary rounded-circle">
                  <FaHistory />
                </div>
                <span className="fw-semibold text-dark small">{act.text}</span>
              </div>
              <span className="text-muted small">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
