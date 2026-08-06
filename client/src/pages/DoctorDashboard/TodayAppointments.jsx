import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStethoscope } from 'react-icons/fa';
import StatusBadge from '../../components/common/StatusBadge';
import { appointmentService } from '../../services/appointmentService';

export const TodayAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    appointmentService.getAppointments('doctor', 'doc-101').then((res) => {
      if (res.success) setAppointments(res.appointments);
    });
  }, []);

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">Today's Appointments & Schedule</h4>
      <p className="text-secondary small mb-4">View your daily clinical timetable and start consultations</p>

      <div className="card border-0 shadow-sm p-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr className="small text-uppercase text-secondary">
                <th>Appointment ID</th>
                <th>Time</th>
                <th>Patient Name</th>
                <th>Contact</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id}>
                  <td className="fw-bold">#{apt.id}</td>
                  <td className="fw-bold text-primary">{apt.time}</td>
                  <td className="fw-semibold text-dark">{apt.patientName}</td>
                  <td className="small text-muted">{apt.patientPhone}</td>
                  <td><StatusBadge status={apt.status} /></td>
                  <td className="text-end">
                    <button
                      className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1"
                      onClick={() => navigate(`/doctor/consultation?aptId=${apt.id}`)}
                    >
                      <FaStethoscope /> Consultation
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

export default TodayAppointments;
