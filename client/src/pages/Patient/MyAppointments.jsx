import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { appointmentService } from '../../services/appointmentService';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/dateFormatter';
import { toast } from 'react-toastify';

export const MyAppointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  // Modal States
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedApt, setSelectedApt] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await appointmentService.getAppointments('patient', user?.id || 'pat-201', activeTab);
      if (res.success) {
        setAppointments(res.appointments);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user, activeTab]);

  const handleCancelClick = (apt) => {
    setSelectedApt(apt);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedApt) return;
    setCancelling(true);
    try {
      const res = await appointmentService.cancelAppointment(selectedApt.id);
      if (res.success) {
        toast.success(`Appointment #${selectedApt.id} cancelled successfully.`);
        setCancelModalOpen(false);
        fetchAppointments();
      }
    } finally {
      setCancelling(false);
    }
  };

  const handleViewDetails = (apt) => {
    setSelectedApt(apt);
    setDetailsModalOpen(true);
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">My Appointments</h4>
          <p className="text-secondary small mb-0">View, track, cancel, or reschedule your doctor appointments</p>
        </div>
        <Button variant="primary" className="mt-3 mt-md-0" onClick={() => navigate('/patient/book')}>
          + Book New Appointment
        </Button>
      </div>

      {/* Category Tabs */}
      <ul className="nav nav-pills gap-2 mb-4 bg-white p-2 rounded-3 border">
        {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((tab) => (
          <li key={tab} className="nav-item">
            <button
              type="button"
              className={`nav-link sm px-3 py-1.5 fw-semibold ${activeTab === tab ? 'bg-primary text-white' : 'text-secondary'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {loading ? (
        <SkeletonLoader count={3} type="card" />
      ) : appointments.length === 0 ? (
        <EmptyState
          title="No Appointments Found"
          description={`There are no ${activeTab.toLowerCase()} appointments registered.`}
          actionLabel="Book Appointment"
          onAction={() => navigate('/patient/book')}
        />
      ) : (
        <div>
          {appointments.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onCancel={handleCancelClick}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Cancellation Modal */}
      <ConfirmationModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Appointment"
        message={`Are you sure you want to cancel appointment #${selectedApt?.id} with ${selectedApt?.doctorName}?`}
        confirmText="Confirm Cancel"
        confirmVariant="danger"
        isLoading={cancelling}
      />

      {/* Appointment Details Modal */}
      <Modal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} title={`Appointment Details #${selectedApt?.id}`} size="lg">
        {selectedApt && (
          <div>
            <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-3">
              <div>
                <h6 className="fw-bold text-dark mb-0">{selectedApt.doctorName}</h6>
                <span className="text-primary small">{selectedApt.doctorSpecialization}</span>
              </div>
              <StatusBadge status={selectedApt.status} />
            </div>

            <div className="row g-3 mb-4 small">
              <div className="col-6">
                <span className="text-muted">Date & Time:</span>
                <div className="fw-bold text-dark">{formatDate(selectedApt.date)} at {selectedApt.time}</div>
              </div>
              <div className="col-6">
                <span className="text-muted">Clinic:</span>
                <div className="fw-bold text-dark">{selectedApt.doctorClinic}</div>
              </div>
              <div className="col-12">
                <span className="text-muted">Reason for Visit:</span>
                <div className="p-2.5 bg-light rounded text-dark mt-1">{selectedApt.reason || 'General Checkup'}</div>
              </div>
            </div>

            {selectedApt.prescription && (
              <div className="p-3 bg-primary-subtle rounded-3 mb-3 border border-primary border-opacity-25">
                <h6 className="fw-bold text-primary mb-2">Doctor Prescription</h6>
                <ul className="mb-2 ps-3 small">
                  {selectedApt.prescription.medicines.map((m, idx) => (
                    <li key={idx}>
                      <strong>{m.name}</strong> ({m.dosage}) — {m.frequency} [{m.instructions}]
                    </li>
                  ))}
                </ul>
                <div className="small text-muted"><strong>Follow up:</strong> {selectedApt.prescription.followUp}</div>
              </div>
            )}

            <div className="text-end">
              <Button variant="secondary" onClick={() => setDetailsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyAppointments;
