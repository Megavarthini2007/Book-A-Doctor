import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserInjured, FaClock, FaCheckCircle, FaInbox, FaStethoscope } from 'react-icons/fa';
import DashboardStatCard from '../../components/common/DashboardStatCard';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import { appointmentService } from '../../services/appointmentService';
import { mockDashboardData } from '../../data/dashboardData';

export const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appointmentService.getAppointments('doctor', 'doc-101').then((res) => {
      if (res.success) setAppointments(res.appointments);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner message="Loading doctor clinical workspace..." />;

  const stats = mockDashboardData.doctor;
  const pendingRequests = appointments.filter((a) => a.status === 'Pending');

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
              Doctor Portal
            </span>
            <h3 className="fw-extrabold text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>Welcome, Dr. Arjun Kumar!</h3>
            <p className="text-secondary small mb-0">Senior Cardiologist — Apex Heart & Vascular Care</p>
          </div>
          <Link to="/doctor/availability" className="btn btn-primary btn-sm px-4 py-2.5 rounded-3 fw-semibold shadow-xs">
            Manage Working Hours
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <DashboardStatCard title="Today's Schedule" value={stats.todayCount} icon={FaClock} color="primary" />
        </div>
        <div className="col-6 col-lg-3">
          <DashboardStatCard title="Pending Requests" value={pendingRequests.length} icon={FaInbox} color="warning" />
        </div>
        <div className="col-6 col-lg-3">
          <DashboardStatCard title="Total Patients" value={stats.totalPatients} icon={FaUserInjured} color="info" />
        </div>
        <div className="col-6 col-lg-3">
          <DashboardStatCard title="Completed Visits" value={stats.completedCount} icon={FaCheckCircle} color="success" />
        </div>
      </div>

      {/* Pending Requests Alert Box */}
      {pendingRequests.length > 0 && (
        <div className="alert alert-warning border-warning d-flex align-items-center justify-content-between mb-4 rounded-3 p-3">
          <div className="d-flex align-items-center gap-2">
            <FaInbox className="fs-4 text-warning" />
            <div>
              <strong className="d-block">Pending Patient Requests ({pendingRequests.length})</strong>
              <span className="small text-secondary">Review patient reasons and accept or reschedule requested time slots.</span>
            </div>
          </div>
          <Link to="/doctor/requests" className="btn btn-warning btn-sm fw-bold">
            Review Requests
          </Link>
        </div>
      )}

      {/* Today's Schedule Table */}
      <div className="card border-0 shadow-sm p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="fw-bold text-dark mb-0">Today's Appointment Schedule</h6>
          <Link to="/doctor/appointments" className="small text-primary text-decoration-none">
            Full Calendar
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr className="small text-uppercase text-secondary">
                <th>Time</th>
                <th>Patient</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 4).map((apt) => (
                <tr key={apt.id}>
                  <td className="fw-bold text-primary">{apt.time}</td>
                  <td>
                    <div className="fw-semibold text-dark">{apt.patientName}</div>
                    <small className="text-muted">{apt.patientPhone}</small>
                  </td>
                  <td className="small text-secondary">{apt.reason}</td>
                  <td><StatusBadge status={apt.status} /></td>
                  <td className="text-end">
                    <button
                      className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1"
                      onClick={() => navigate(`/doctor/consultation?aptId=${apt.id}`)}
                    >
                      <FaStethoscope /> Start Consultation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
