import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaUserInjured, FaPlus, FaTrash, FaCheckCircle, FaFilePdf, FaStethoscope } from 'react-icons/fa';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import { appointmentService } from '../../services/appointmentService';
import { toast } from 'react-toastify';

export const Consultation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const aptId = searchParams.get('aptId') || 'APT-8041';

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Clinical Input States
  const [summary, setSummary] = useState('');
  const [notes, setNotes] = useState('');

  // Prescription Builder Medicines Array
  const [medicines, setMedicines] = useState([
    { name: 'Telmisartan', dosage: '40mg', frequency: 'Once daily in morning', duration: '30 Days', instructions: 'After breakfast' }
  ]);

  const [followUp, setFollowUp] = useState('Follow up after 1 month with lipid profile report.');

  useEffect(() => {
    appointmentService.getAppointmentById(aptId).then((res) => {
      if (res.success) setAppointment(res.appointment);
      setLoading(false);
    });
  }, [aptId]);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: 'Once daily', duration: '7 Days', instructions: 'After meals' }]);
  };

  const handleRemoveMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleCompleteConsultation = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const prescriptionData = {
      id: `RX-${Math.floor(100 + Math.random() * 900)}`,
      medicines: medicines.filter((m) => m.name.trim() !== ''),
      followUp
    };

    try {
      const res = await appointmentService.updateAppointmentStatus(aptId, 'Completed', notes || summary, prescriptionData);
      if (res.success) {
        toast.success(`Consultation completed! Prescription generated.`);
        setTimeout(() => navigate('/doctor/dashboard'), 1000);
      }
    } catch (err) {
      toast.error('Failed to complete consultation.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner message="Loading clinical consultation environment..." />;
  if (!appointment) return <div className="p-4 text-center">Appointment not found</div>;

  return (
    <div className="container py-3">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Clinical Consultation Screen</h4>
          <p className="text-secondary small mb-0">Appointment ID: #{appointment.id} — Patient: {appointment.patientName}</p>
        </div>
        <span className="badge bg-primary px-3 py-2">Active Consultation</span>
      </div>

      <div className="row g-4">
        {/* Left Column: Patient Info & Documents */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <FaUserInjured className="text-primary" /> Patient Details
            </h6>
            <div className="small">
              <div className="mb-2"><strong>Name:</strong> {appointment.patientName}</div>
              <div className="mb-2"><strong>Contact:</strong> {appointment.patientPhone}</div>
              <div className="mb-2"><strong>Email:</strong> {appointment.patientEmail}</div>
              <div className="p-3 bg-light rounded mt-3">
                <span className="text-muted d-block mb-1">Chief Complaint / Reason:</span>
                <span className="fw-semibold text-dark">{appointment.reason}</span>
              </div>
            </div>
          </div>

          {appointment.documents && appointment.documents.length > 0 && (
            <div className="card border-0 shadow-sm p-4">
              <h6 className="fw-bold text-dark mb-3">Submitted Patient Documents</h6>
              <div className="d-flex flex-column gap-2">
                {appointment.documents.map((doc, idx) => (
                  <div key={idx} className="p-2 border rounded d-flex align-items-center justify-content-between small">
                    <span className="d-flex align-items-center gap-2">
                      <FaFilePdf className="text-danger" /> {doc.name}
                    </span>
                    <span className="badge bg-light text-dark">{doc.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Consultation Summary & Dynamic Prescription Builder */}
        <div className="col-12 col-lg-8">
          <form onSubmit={handleCompleteConsultation}>
            {/* Clinical Notes Card */}
            <div className="card border-0 shadow-sm p-4 mb-4">
              <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                <FaStethoscope className="text-primary" /> Clinical Summary & Diagnostics
              </h6>
              <Textarea
                label="Consultation Summary / Diagnostic Notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter clinical examination findings, vitals, and diagnostic notes..."
              />
            </div>

            {/* Dynamic Prescription Builder Card */}
            <div className="card border-0 shadow-sm p-4 mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold text-dark mb-0">Dynamic Prescription Builder</h6>
                <button type="button" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" onClick={handleAddMedicine}>
                  <FaPlus /> Add Medicine
                </button>
              </div>

              {medicines.map((med, idx) => (
                <div key={idx} className="p-3 border rounded-3 bg-light mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold small text-primary">Medicine #{idx + 1}</span>
                    {medicines.length > 1 && (
                      <button type="button" className="btn btn-link text-danger p-0 small" onClick={() => handleRemoveMedicine(idx)}>
                        <FaTrash /> Remove
                      </button>
                    )}
                  </div>
                  <div className="row g-2">
                    <div className="col-12 col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Medicine Name (e.g. Paracetamol)"
                        value={med.name}
                        onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-6 col-md-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Dosage (500mg)"
                        value={med.dosage}
                        onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                      />
                    </div>
                    <div className="col-6 col-md-3">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Frequency (1-0-1)"
                        value={med.frequency}
                        onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                      />
                    </div>
                    <div className="col-6 col-md-3">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Duration (5 Days)"
                        value={med.duration}
                        onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Special Instructions (e.g. After meals with warm water)"
                        value={med.instructions}
                        onChange={(e) => handleMedicineChange(idx, 'instructions', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Input
                label="Follow-up Instructions"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                placeholder="Follow up in 2 weeks..."
              />
            </div>

            {/* Complete Consultation Trigger */}
            <div className="text-end">
              <Button type="submit" variant="success" size="lg" isLoading={submitting}>
                <FaCheckCircle className="me-1" /> Complete Consultation & Send Prescription
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
