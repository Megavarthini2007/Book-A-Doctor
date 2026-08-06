import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserInjured, FaClock, FaCalendarCheck, FaCalendarTimes, FaChevronRight } from 'react-icons/fa';
import DashboardStatCard from '../../components/common/DashboardStatCard';
import StatusBadge from '../../components/common/StatusBadge';
import Spinner from '../../components/common/Spinner';
import { appointmentService } from '../../services/appointmentService';
import { mockDashboardData } from '../../data/dashboardData';
import { useAuth } from '../../hooks/useAuth';

export const DoctorDashboard = () => {
  const { user } = useAuth();
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
  const confirmedApts = appointments.filter((a) => ['Confirmed', 'Scheduled'].includes(a.status));

  return (
    <div className="py-2">
      {/* Page Header (Matching Image 3 & 4) */}
      <div className="mb-4">
        <h3 className="fw-extrabold text-dark mb-1 d-flex align-items-center gap-2" style={{ letterSpacing: '-0.02em' }}>
          Doctor Portal - {user?.name || 'Dr. Arjun Kumar'} 🩺
        </h3>
        <p className="text-secondary small mb-0" style={{ fontSize: '0.92rem' }}>
          Manage daily patient schedules, appointment approvals, and clinical prescriptions.
        </p>
      </div>

      {/* Metrics Row (3 Columns matching Image 3 & 4) */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <DashboardStatCard
            title="PENDING REQUESTS"
            value={pendingRequests.length}
            icon={FaClock}
            color="warning"
          />
        </div>
        <div className="col-12 col-md-4">
          <DashboardStatCard
            title="CONFIRMED APPOINTMENTS"
            value={confirmedApts.length}
            icon={FaCalendarCheck}
            color="primary"
          />
        </div>
        <div className="col-12 col-md-4">
          <DashboardStatCard
            title="TOTAL CONSULTATIONS"
            value={stats.totalPatients || 0}
            icon={FaUserInjured}
            color="success"
          />
        </div>
      </div>

      {/* Manage Clinical Availability Banner Card (Matching Image 3 & 4) */}
      <div className="bg-white rounded-4 p-4 border mb-4 shadow-xs d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <h5 className="fw-bold text-dark mb-1" style={{ fontSize: '1.05rem' }}>
            Manage Clinical Availability
          </h5>
          <p className="text-secondary small mb-0">
            Configure active working days, consultation fees, and slot durations.
          </p>
        </div>
        <Link to="/doctor/availability" className="btn btn-primary fw-semibold btn-md px-4 rounded-3 text-nowrap shadow-xs">
          Update Availability
        </Link>
      </div>

      {/* Patient Appointment Schedule Section (Matching Image 3 & 4) */}
      <div className="bg-white rounded-4 p-4 border shadow-xs">
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
          <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '1.1rem' }}>
            Patient Appointment Schedule
          </h5>
          <Link to="/doctor/requests" className="small text-primary fw-semibold text-decoration-none d-flex align-items-center gap-1">
            View All Requests <FaChevronRight size={11} />
          </Link>
        </div>

        {appointments.length === 0 ? (
          /* Empty State matching Image 3 & 4 */
          <div className="text-center py-5">
            <div className="mx-auto mb-3 bg-primary bg-opacity-10 text-primary rounded-4 d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
              <FaCalendarTimes size={32} />
            </div>
            <h5 className="fw-bold text-dark mb-1">No Appointments Scheduled</h5>
            <p className="text-secondary small mb-0">You currently have no patient booking requests.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="small text-uppercase text-secondary" style={{ letterSpacing: '0.04em', fontSize: '0.75rem' }}>
                  <th className="py-3">Time</th>
                  <th className="py-3">Patient</th>
                  <th className="py-3">Reason</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((apt) => (
                  <tr key={apt.id}>
                    <td className="fw-bold text-primary py-3">{apt.time}</td>
                    <td className="py-3">
                      <div className="fw-bold text-dark">{apt.patientName}</div>
                      <small className="text-muted">{apt.patientPhone}</small>
                    </td>
                    <td className="small text-secondary py-3" style={{ maxWidth: 280 }}>
                      {apt.reason}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="text-end py-3">
                      <button
                        className="btn btn-primary btn-sm px-3 fw-semibold rounded-3 shadow-xs"
                        onClick={() => navigate(`/doctor/consultation?aptId=${apt.id}`)}
                      >
                        Start Consultation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;

