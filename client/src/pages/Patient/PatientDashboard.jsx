import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarPlus, FaClock, FaCheckCircle, FaSearch, FaFileMedical, FaBell } from 'react-icons/fa';
import DashboardStatCard from '../../components/common/DashboardStatCard';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import { appointmentService } from '../../services/appointmentService';
import { doctorService } from '../../services/doctorService';
import { useAuth } from '../../hooks/useAuth';

export const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      appointmentService.getAppointments('patient', user?.id || 'pat-201'),
      doctorService.getDoctors()
    ]).then(([aptRes, docRes]) => {
      if (aptRes.success) setAppointments(aptRes.appointments);
      if (docRes.success) setRecommendedDoctors(docRes.doctors.slice(0, 2));
      setLoading(false);
    });
  }, [user]);

  if (loading) return <Spinner message="Loading patient dashboard metrics..." />;

  const upcomingApts = appointments.filter((a) => ['Confirmed', 'Scheduled', 'Pending'].includes(a.status));
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;
  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;

  const nextAppointment = upcomingApts[0];

  return (
    <div>
      {/* Welcome Banner (Attractive Light Shade Blue Style) */}
      <div
        className="card border p-4 p-md-5 mb-4 rounded-4 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #eef6ff 0%, #dbeafe 50%, #c7d2fe 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(147, 197, 253, 0.6)',
          boxShadow: '0 10px 30px -5px rgba(37, 99, 235, 0.12)'
        }}
      >
        <div
          className="position-absolute rounded-circle pointer-events-none"
          style={{
            top: '-50px',
            right: '-50px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(13, 110, 253, 0.25) 0%, rgba(255, 255, 255, 0) 70%)',
            zIndex: 0
          }}
        />
        <div className="position-relative z-1">
          <span className="badge bg-primary text-white mb-2.5 px-3 py-1.5 rounded-pill small fw-semibold shadow-xs">
            Patient Portal
          </span>
          <h3 className="fw-extrabold text-dark mb-1" style={{ letterSpacing: '-0.02em', fontSize: '1.7rem' }}>
            Welcome back, {user?.name || 'Patient'}!
          </h3>
          <p className="small mb-4 max-w-md" style={{ fontSize: '0.94rem', lineHeight: '1.5', color: '#334155' }}>
            Manage your doctor appointments, view digital prescriptions, and upload medical reports seamlessly.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Link to="/patient/book" className="btn btn-primary fw-semibold btn-sm px-4 py-2.5 rounded-3 d-inline-flex align-items-center gap-2 shadow-sm">
              <FaCalendarPlus /> Book New Appointment
            </Link>
            <Link to="/patient/doctors" className="btn btn-white text-primary fw-semibold border-primary border-opacity-25 btn-sm px-4 py-2.5 rounded-3 d-inline-flex align-items-center gap-2 shadow-xs" style={{ backgroundColor: '#ffffff' }}>
              <FaSearch /> Find Specialists
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardStatCard title="Upcoming Appointments" value={upcomingApts.length} icon={FaClock} color="primary" subtext="Scheduled consultations" />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardStatCard title="Pending Confirmations" value={pendingCount} icon={FaClock} color="warning" subtext="Awaiting doctor approval" />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardStatCard title="Completed Visits" value={completedCount} icon={FaCheckCircle} color="success" subtext="Prescriptions available" />
        </div>
      </div>

      {/* Next Appointment Alert */}
      {nextAppointment && (
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="fw-bold text-dark mb-0">Next Scheduled Appointment</h6>
            <Link to="/patient/appointments" className="small text-primary text-decoration-none">
              View All
            </Link>
          </div>
          <AppointmentCard
            appointment={nextAppointment}
            onViewDetails={(apt) => navigate(`/patient/appointments?id=${apt.id}`)}
          />
        </div>
      )}

      {/* Recommended Doctors Carousel/Grid */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="fw-bold text-dark mb-0">Recommended Specialists for You</h6>
          <Link to="/doctors" className="small text-primary text-decoration-none">
            Browse All Doctors →
          </Link>
        </div>
        <div className="row g-4">
          {recommendedDoctors.map((doc) => (
            <div key={doc.id} className="col-12 col-md-6">
              <DoctorCard doctor={doc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
