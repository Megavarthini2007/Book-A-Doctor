import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaFilePdf, FaUser } from 'react-icons/fa';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { appointmentService } from '../../services/appointmentService';
import { formatDate } from '../../utils/dateFormatter';
import { toast } from 'react-toastify';

export const AppointmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await appointmentService.getAppointments('doctor', 'doc-101');
    if (res.success) {
      setRequests(res.appointments.filter((a) => ['Pending', 'Requested'].includes(a.status)));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    const res = await appointmentService.updateAppointmentStatus(id, 'Confirmed');
    if (res.success) {
      toast.success(`Appointment #${id} confirmed!`);
      fetchRequests();
    }
  };

  const handleReject = async (id) => {
    const res = await appointmentService.updateAppointmentStatus(id, 'Rejected');
    if (res.success) {
      toast.info(`Appointment #${id} rejected.`);
      fetchRequests();
    }
  };

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">Appointment Requests</h4>
      <p className="text-secondary small mb-4">Review patient booking requests and confirm slot availability</p>

      {loading ? (
        <SkeletonLoader count={2} type="card" />
      ) : requests.length === 0 ? (
        <EmptyState title="No Pending Requests" description="You have responded to all incoming patient requests." />
      ) : (
        <div className="d-flex flex-column gap-3">
          {requests.map((apt) => (
            <div key={apt.id} className="card border-0 shadow-sm p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center border-bottom pb-3 mb-3">
                <div>
                  <h6 className="fw-bold text-dark mb-0">{apt.patientName}</h6>
                  <span className="text-muted small">{apt.patientEmail} — {apt.patientPhone}</span>
                </div>
                <div className="mt-2 mt-md-0 text-md-end">
                  <span className="text-primary fw-bold">{formatDate(apt.date)}</span> at <span className="fw-bold">{apt.time}</span>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-muted small d-block mb-1">Reason for Visit:</span>
                <div className="p-3 bg-light rounded text-dark small">{apt.reason || 'General Health Consultation'}</div>
              </div>

              {apt.documents && apt.documents.length > 0 && (
                <div className="mb-3">
                  <span className="text-muted small d-block mb-1">Attached Patient Records:</span>
                  <div className="d-flex gap-2">
                    {apt.documents.map((d, i) => (
                      <span key={i} className="badge bg-light text-dark border p-2 d-flex align-items-center gap-1">
                        <FaFilePdf className="text-danger" /> {d.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="d-flex gap-2 justify-content-end pt-2">
                <Button variant="outline-danger" size="sm" onClick={() => handleReject(apt.id)}>
                  <FaTimes /> Reject Request
                </Button>
                <Button variant="success" size="sm" onClick={() => handleAccept(apt.id)}>
                  <FaCheck /> Accept & Confirm
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentRequests;
