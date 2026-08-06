import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaUserMd, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import TimeSlotSelector from '../../components/common/TimeSlotSelector';
import FileUploader from '../../components/common/FileUploader';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import Spinner from '../../components/common/Spinner';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { formatCurrency } from '../../utils/helpers';
import { formatDate } from '../../utils/dateFormatter';
import { toast } from 'react-toastify';

export const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doctorIdParam = searchParams.get('doctorId');

  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2026-08-06');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedApt, setConfirmedApt] = useState(null);

  useEffect(() => {
    doctorService.getDoctors().then((res) => {
      if (res.success) {
        setDoctors(res.doctors);
        if (doctorIdParam) {
          const doc = res.doctors.find((d) => d.id === doctorIdParam);
          if (doc) setSelectedDoctor(doc);
        } else if (res.doctors.length > 0) {
          setSelectedDoctor(res.doctors[0]);
        }
      }
      setLoading(false);
    });
  }, [doctorIdParam]);

  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      toast.error('Please select an available time slot');
      return;
    }

    setSubmitting(true);
    try {
      const bookingData = {
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorSpecialization: selectedDoctor.specialization,
        doctorClinic: selectedDoctor.clinicName,
        doctorLocation: selectedDoctor.location,
        doctorImage: selectedDoctor.image,
        date: selectedDate,
        time: selectedSlot.time,
        slotPeriod: selectedSlot.period,
        reason: reason || 'Routine Health Consultation',
        fee: selectedDoctor.consultationFee,
        documents: uploadedFiles
      };

      const res = await appointmentService.createAppointment(bookingData);
      if (res.success) {
        setConfirmedApt(res.appointment);
        setStep(4); // Confirmation step
        toast.success('Appointment booked successfully!');
      }
    } catch (err) {
      toast.error('Failed to complete booking.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner message="Loading booking interface..." />;

  // STEP 4: CONFIRMATION VIEW
  if (step === 4 && confirmedApt) {
    return (
      <div className="container py-5 d-flex justify-content-center">
        <div className="card border-0 shadow-lg p-5 max-w-lg rounded-4 text-center">
          <div className="bg-success bg-opacity-10 text-success p-4 rounded-circle d-inline-flex mx-auto mb-3">
            <FaCheckCircle className="display-3" />
          </div>
          <h3 className="fw-bold text-dark mb-1">Booking Confirmed!</h3>
          <p className="text-secondary small mb-4">Your appointment request has been scheduled successfully.</p>

          <div className="bg-light p-4 rounded-3 text-start mb-4 small">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Appointment ID:</span>
              <strong className="text-dark">#{confirmedApt.id}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Doctor:</span>
              <strong className="text-dark">{confirmedApt.doctorName}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Date & Time:</span>
              <strong className="text-primary">{formatDate(confirmedApt.date)} at {confirmedApt.time}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Clinic Location:</span>
              <span className="text-dark">{confirmedApt.doctorClinic}, {confirmedApt.doctorLocation}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Status:</span>
              <span className="badge bg-success-subtle text-success">Confirmed</span>
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-center">
            <Link to="/patient/appointments" className="btn btn-primary px-4">
              My Appointments
            </Link>
            <Link to="/patient/dashboard" className="btn btn-outline-secondary px-4">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 max-w-3xl">
      <div className="text-center mb-4">
        <h3 className="fw-bold text-dark">Book an Appointment</h3>
        <p className="text-secondary small">Follow the steps to select doctor, date, time slot, and medical details</p>
      </div>

      {/* Visible Step Indicator */}
      <div className="d-flex justify-content-between mb-4 border-bottom pb-3">
        <div className={`fw-semibold small ${step === 1 ? 'text-primary' : 'text-muted'}`}>1. Select Doctor</div>
        <div className={`fw-semibold small ${step === 2 ? 'text-primary' : 'text-muted'}`}>2. Date & Time</div>
        <div className={`fw-semibold small ${step === 3 ? 'text-primary' : 'text-muted'}`}>3. Visit Reason & Review</div>
      </div>

      <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4">
        {/* STEP 1: Select Doctor */}
        {step === 1 && (
          <div>
            <h5 className="fw-bold text-dark mb-3">Choose Practitioner</h5>
            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary">Doctor</label>
              <select
                className="form-select"
                value={selectedDoctor?.id || ''}
                onChange={(e) => {
                  const doc = doctors.find((d) => d.id === e.target.value);
                  setSelectedDoctor(doc);
                }}
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.specialization} ({formatCurrency(d.consultationFee)})
                  </option>
                ))}
              </select>
            </div>

            {selectedDoctor && (
              <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3 mb-4">
                <ProfileAvatar src={selectedDoctor.image} name={selectedDoctor.name} size="lg" />
                <div>
                  <h6 className="fw-bold text-dark mb-0">{selectedDoctor.name}</h6>
                  <p className="text-primary small fw-semibold mb-0">{selectedDoctor.specialization}</p>
                  <p className="text-muted small mb-0">{selectedDoctor.clinicName}, {selectedDoctor.location}</p>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end">
              <Button onClick={() => setStep(2)}>Next: Pick Date & Slot →</Button>
            </div>
          </div>
        )}

        {/* STEP 2: Date & Slot Selection */}
        {step === 2 && (
          <div>
            <h5 className="fw-bold text-dark mb-3">Select Date & Time Slot</h5>

            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary">Appointment Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <TimeSlotSelector
              slots={selectedDoctor?.availableSlots || []}
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
            />

            <div className="d-flex justify-content-between mt-4">
              <Button variant="outline-secondary" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!selectedSlot}>
                Next: Medical Details →
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Reason & Review */}
        {step === 3 && (
          <div>
            <h5 className="fw-bold text-dark mb-3">Visit Reason & Document Upload</h5>

            <Textarea
              label="Reason for Visit / Symptoms"
              placeholder="Describe your health symptoms or reason for consulting the doctor..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              required
            />

            <FileUploader onFilesSelected={(files) => setUploadedFiles(files)} />

            {/* Summary Box */}
            <div className="p-3 bg-light rounded-3 mb-4 small border">
              <h6 className="fw-bold text-dark mb-2">Booking Summary</h6>
              <div className="d-flex justify-content-between">
                <span>Doctor:</span>
                <strong>{selectedDoctor?.name} ({selectedDoctor?.specialization})</strong>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <span>Date & Time:</span>
                <strong>{formatDate(selectedDate)} at {selectedSlot?.time}</strong>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <span>Consultation Fee:</span>
                <strong className="text-primary">{formatCurrency(selectedDoctor?.consultationFee || 800)}</strong>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <Button variant="outline-secondary" onClick={() => setStep(2)}>
                ← Back
              </Button>
              <Button variant="success" onClick={handleConfirmBooking} isLoading={submitting}>
                Confirm & Book Appointment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
