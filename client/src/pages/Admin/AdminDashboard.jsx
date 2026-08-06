import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCheck, FaUserMd, FaUsers, FaCalendarAlt, FaChartLine, FaHistory } from 'react-icons/fa';
import DashboardStatCard from '../../components/common/DashboardStatCard';
import Spinner from '../../components/common/Spinner';
import { adminService } from '../../services/adminService';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboardStats().then((res) => {
      if (res.success) setStats(res.stats);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner message="Loading administrator metrics..." />;

  return (
    <div>
      {/* Banner (Glassmorphism Style) */}
      <div
        className="card border p-4 p-md-5 mb-4 rounded-4 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(240, 246, 255, 0.75) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(226, 232, 240, 0.8)',
          boxShadow: '0 8px 30px -5px rgba(37, 99, 235, 0.07)'
        }}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 position-relative z-1">
          <div>
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20 mb-2 px-3 py-1.5 rounded-pill small fw-semibold">
              Administrator Workspace
            </span>
            <h3 className="fw-extrabold text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>Healthcare Platform Overview</h3>
            <p className="text-secondary small mb-0">System performance, practitioner verifications, & platform statistics</p>
          </div>
          <Link to="/admin/doctors/pending" className="btn btn-primary btn-sm px-4 py-2.5 rounded-3 fw-semibold shadow-xs">
            Review Pending Doctor Approvals ({stats?.pendingDoctors || 0})
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <DashboardStatCard title="Total Registered Patients" value={stats.totalPatients} icon={FaUsers} color="primary" trend="+12% this month" />
        </div>
        <div className="col-6 col-lg-3">
          <DashboardStatCard title="Active Doctors" value={stats.totalDoctors} icon={FaUserMd} color="success" trend="+4 new this week" />
        </div>
        <div className="col-6 col-lg-3">
          <DashboardStatCard title="Pending Approvals" value={stats.pendingDoctors} icon={FaUserCheck} color="danger" subtext="Action required" />
        </div>
        <div className="col-6 col-lg-3">
          <DashboardStatCard title="Total Appointments" value={stats.totalAppointments} icon={FaCalendarAlt} color="info" subtext="All time platform bookings" />
        </div>
      </div>

      {/* Activity Log & Quick Links */}
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <FaHistory className="text-primary" /> Recent System Activity Stream
            </h6>
            <div className="d-flex flex-column gap-3">
              {stats.recentActivity.map((act) => (
                <div key={act.id} className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                  <span className="text-dark small fw-medium">{act.text}</span>
                  <span className="badge bg-white text-muted border">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h6 className="fw-bold text-dark mb-3">Quick Platform Actions</h6>
            <div className="d-flex flex-column gap-2">
              <Link to="/admin/doctors/pending" className="btn btn-outline-primary text-start px-3 py-2.5">
                Doctor Approvals ({stats.pendingDoctors})
              </Link>
              <Link to="/admin/doctors" className="btn btn-outline-secondary text-start px-3 py-2.5">
                Manage All Doctors ({stats.totalDoctors})
              </Link>
              <Link to="/admin/patients" className="btn btn-outline-secondary text-start px-3 py-2.5">
                Manage Patients Directory
              </Link>
              <Link to="/admin/appointments" className="btn btn-outline-secondary text-start px-3 py-2.5">
                Master Appointments Audit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
