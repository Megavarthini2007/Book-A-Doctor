import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaAward, FaHospital, FaClock } from 'react-icons/fa';
import Button from '../../components/common/Button';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import Spinner from '../../components/common/Spinner';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { doctorService } from '../../services/doctorService';
import { formatCurrency } from '../../utils/helpers';

export const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorService
      .getDoctorById(id || 'doc-101')
      .then((res) => {
        if (res.success) setDoctor(res.doctor);
      })
      .catch(() => {
        navigate('/doctors');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner fullPage message="Loading doctor profile details..." />;
  if (!doctor) return null;

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Doctors', path: '/doctors' }, { label: doctor.name }]} />

      {/* Header Profile Card */}
      <div className="card border-0 shadow-sm p-4 mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
          <ProfileAvatar src={doctor.image} name={doctor.name} size="xl" className="shadow" />
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-1">
              <h3 className="fw-bold text-dark mb-0">{doctor.name}</h3>
              {doctor.verified && <FaCheckCircle className="text-primary fs-5" title="Verified Practitioner" />}
            </div>
            <p className="text-primary fw-semibold fs-6 mb-2">{doctor.title || doctor.specialization}</p>
            <p className="text-secondary small mb-3">{doctor.qualification}</p>

            <div className="d-flex flex-wrap gap-3 text-secondary small">
              <span className="d-flex align-items-center gap-1.5 bg-light px-3 py-1.5 rounded-pill">
                <FaBriefcase className="text-primary" /> {doctor.experience} Years Experience
              </span>
              <span className="d-flex align-items-center gap-1.5 bg-light px-3 py-1.5 rounded-pill">
                <FaHospital className="text-primary" /> {doctor.clinicName}
              </span>
              <span className="d-flex align-items-center gap-1.5 bg-light px-3 py-1.5 rounded-pill">
                <FaMapMarkerAlt className="text-primary" /> {doctor.location}
              </span>
              <span className="d-flex align-items-center gap-1.5 bg-warning-subtle text-dark px-3 py-1.5 rounded-pill fw-bold">
                <FaStar className="text-warning" /> {doctor.rating} ({doctor.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="border-top border-md-start pt-3 pt-md-0 ps-md-4 text-md-end min-w-200">
            <span className="text-muted small d-block mb-1">Consultation Fee</span>
            <h3 className="fw-bold text-dark mb-3">{formatCurrency(doctor.consultationFee)}</h3>
            <Link to={`/patient/book?doctorId=${doctor.id}`} className="btn btn-primary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2">
              <FaCalendarAlt /> Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Bio & Info */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold text-dark mb-3">About Practitioner</h5>
            <p className="text-secondary mb-0">{doctor.about}</p>
          </div>

          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold text-dark mb-3">Professional Credentials</h5>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="p-3 bg-light rounded-3">
                  <div className="text-muted small">Medical Registration No</div>
                  <div className="fw-bold text-dark">{doctor.regNumber}</div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="p-3 bg-light rounded-3">
                  <div className="text-muted small">Registration Year</div>
                  <div className="fw-bold text-dark">{doctor.registrationYear}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Availability Preview */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <FaClock className="text-primary" /> Practice Schedule
            </h6>
            <div className="d-flex flex-column gap-2 mb-4">
              {doctor.availableDays?.map((day, idx) => (
                <div key={idx} className="d-flex justify-content-between text-secondary small p-2 bg-light rounded">
                  <span>{day}</span>
                  <span className="fw-semibold text-success">09:00 AM - 07:00 PM</span>
                </div>
              ))}
            </div>
            <Link to={`/patient/book?doctorId=${doctor.id}`} className="btn btn-outline-primary w-100">
              Select Time Slot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
