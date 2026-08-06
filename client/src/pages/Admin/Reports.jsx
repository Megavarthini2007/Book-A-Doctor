import React from 'react';
import { FaChartBar, FaFileDownload } from 'react-icons/fa';
import DashboardStatCard from '../../components/common/DashboardStatCard';

export const Reports = () => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Reports & Analytics</h4>
          <p className="text-secondary small mb-0">System performance metrics and healthcare statistics</p>
        </div>
        <button className="btn btn-outline-primary btn-sm">
          <FaFileDownload /> Export Monthly Analytics
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <DashboardStatCard title="Monthly Revenue" value="₹ 4,85,000" color="success" />
        </div>
        <div className="col-6 col-md-3">
          <DashboardStatCard title="Avg Rating" value="4.85" color="warning" />
        </div>
        <div className="col-6 col-md-3">
          <DashboardStatCard title="Booking Conversion" value="94.2%" color="primary" />
        </div>
        <div className="col-6 col-md-3">
          <DashboardStatCard title="Cancellation Rate" value="3.1%" color="danger" />
        </div>
      </div>

      <div className="card border-0 shadow-sm p-4 text-center">
        <FaChartBar className="display-3 text-primary mx-auto mb-3" />
        <h5 className="fw-bold text-dark">Analytics Visualization Dashboard</h5>
        <p className="text-muted small max-w-md mx-auto">
          Detailed metrics graph for consultation volume, specialization popularity, and regional booking trends.
        </p>
      </div>
    </div>
  );
};

export default Reports;
