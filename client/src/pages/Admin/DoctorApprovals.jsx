import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaCheck, FaTimes, FaFileAlt } from 'react-icons/fa';
import Button from '../../components/common/Button';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import EmptyState from '../../components/common/EmptyState';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';

export const DoctorApprovals = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState('approve'); // 'approve' | 'reject'
  const [processing, setProcessing] = useState(false);

  const fetchPending = async () => {
    setLoading(true);
    const res = await adminService.getPendingDoctors();
    if (res.success) setPendingDoctors(res.doctors);
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleActionClick = (doctor, type) => {
    setSelectedDoctor(doctor);
    setActionType(type);
    setConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedDoctor) return;
    setProcessing(true);
    try {
      if (actionType === 'approve') {
        await adminService.approveDoctor(selectedDoctor.id);
        toast.success(`Dr. ${selectedDoctor.name} has been approved and listed publicly!`);
      } else {
        await adminService.rejectDoctor(selectedDoctor.id);
        toast.info(`Application for Dr. ${selectedDoctor.name} rejected.`);
      }
      setConfirmModalOpen(false);
      fetchPending();
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">Doctor Verification Approvals</h4>
      <p className="text-secondary small mb-4">Review medical registration credentials and approve or reject doctor applications</p>

      {loading ? (
        <SkeletonLoader count={2} type="card" />
      ) : pendingDoctors.length === 0 ? (
        <EmptyState
          icon={FaUserCheck}
          title="No Pending Verification Applications"
          description="All medical doctor applications have been processed."
        />
      ) : (
        <div className="d-flex flex-column gap-3">
          {pendingDoctors.map((doc) => (
            <div key={doc.id} className="card border-0 shadow-sm p-4">
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3 border-bottom pb-3">
                <div className="d-flex align-items-center gap-3">
                  <ProfileAvatar src={doc.image} name={doc.name} size="lg" />
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{doc.name}</h6>
                    <span className="text-primary small fw-semibold">{doc.specialization} — {doc.experience} Yrs Exp</span>
                    <div className="text-muted small">{doc.qualification}</div>
                  </div>
                </div>
                <span className="badge bg-warning-subtle text-warning fs-7">Pending Verification</span>
              </div>

              <div className="row g-3 small mb-3">
                <div className="col-12 col-md-4">
                  <span className="text-muted">Medical Reg No:</span>
                  <div className="fw-bold text-dark">{doc.regNumber}</div>
                </div>
                <div className="col-12 col-md-4">
                  <span className="text-muted">Clinic Name & Location:</span>
                  <div className="fw-bold text-dark">{doc.clinicName}, {doc.location}</div>
                </div>
                <div className="col-12 col-md-4">
                  <span className="text-muted">Consultation Fee:</span>
                  <div className="fw-bold text-dark">₹{doc.consultationFee}</div>
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <Button variant="outline-danger" size="sm" onClick={() => handleActionClick(doc, 'reject')}>
                  <FaTimes /> Reject Application
                </Button>
                <Button variant="success" size="sm" onClick={() => handleActionClick(doc, 'approve')}>
                  <FaCheck /> Approve Practitioner
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmAction}
        title={actionType === 'approve' ? 'Approve Practitioner' : 'Reject Practitioner'}
        message={`Are you sure you want to ${actionType} ${selectedDoctor?.name}?`}
        confirmText={actionType === 'approve' ? 'Approve' : 'Reject'}
        confirmVariant={actionType === 'approve' ? 'success' : 'danger'}
        isLoading={processing}
      />
    </div>
  );
};

export default DoctorApprovals;
