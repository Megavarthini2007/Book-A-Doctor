import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import { appointmentService } from '../../services/appointmentService';
import { formatDate } from '../../utils/dateFormatter';

export const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appointmentService.getAppointmentById(id || 'APT-8041').then((res) => {
      if (res.success) setAppointment(res.appointment);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Spinner message="Loading appointment details..." />;
  if (!appointment) return <div className="p-4 text-center">Appointment not found</div>;

  return (
    <div className="container py-4 max-w-2xl">
      <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4">
        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
          <div>
            <h4 className="fw-bold text-dark mb-0">Appointment #{appointment.id}</h4>
            <span className="text-muted small">Booked on {appointment.timeline[0]?.date || 'Recently'}</span>
          </div>
          <StatusBadge status={appointment.status} />
        </div>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <span className="text-muted small">Doctor:</span>
            <div className="fw-bold text-dark fs-6">{appointment.doctorName}</div>
            <div className="text-primary small fw-semibold">{appointment.doctorSpecialization}</div>
          </div>
          <div className="col-12 col-md-6">
            <span className="text-muted small">Date & Time:</span>
            <div className="fw-bold text-dark fs-6">{formatDate(appointment.date)} at {appointment.time}</div>
          </div>
          <div className="col-12">
            <span className="text-muted small">Clinic Address:</span>
            <div className="fw-semibold text-dark">{appointment.doctorClinic}, {appointment.doctorLocation}</div>
          </div>
          <div className="col-12">
            <span className="text-muted small">Reason for Visit:</span>
            <div className="p-3 bg-light rounded text-dark mt-1">{appointment.reason || 'Routine Checkup'}</div>
          </div>
        </div>

        {appointment.prescription && (
          <div className="p-4 bg-primary-subtle rounded-3 mb-4 border border-primary border-opacity-25">
            <h6 className="fw-bold text-primary mb-2">Doctor Prescription</h6>
            <ul className="mb-2 ps-3 small">
              {appointment.prescription.medicines.map((m, idx) => (
                <li key={idx}>
                  <strong>{m.name}</strong> ({m.dosage}) — {m.frequency} [{m.instructions}]
                </li>
              ))}
            </ul>
            <div className="small text-muted"><strong>Follow-up:</strong> {appointment.prescription.followUp}</div>
          </div>
        )}

        <div className="d-flex justify-content-end">
          <Link to="/patient/appointments" className="btn btn-outline-primary">
            ← Back to Appointments List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
