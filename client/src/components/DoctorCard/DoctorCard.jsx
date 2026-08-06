import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import ProfileAvatar from '../common/ProfileAvatar';
import { formatCurrency } from '../../utils/helpers';

export const DoctorCard = ({ doctor }) => {
  return (
    <div className="card card-hover h-100 border-0 shadow-sm overflow-hidden rounded-4">
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex align-items-start gap-3 mb-3">
          <ProfileAvatar src={doctor.image} name={doctor.name} size="lg" className="shadow-sm flex-shrink-0" />
          <div className="flex-grow-1 min-w-0">
            <div className="d-flex align-items-center gap-1 flex-wrap mb-0.5">
              <h5 className="fw-bold text-dark mb-0 text-truncate">{doctor.name}</h5>
              {doctor.verified && <FaCheckCircle className="text-primary fs-6 flex-shrink-0" title="Verified Medical Practitioner" />}
            </div>
            <p className="text-primary fw-semibold small mb-0.5 text-truncate">{doctor.title || doctor.specialization}</p>
            <p className="text-muted small mb-0 text-truncate">{doctor.qualification}</p>
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2 text-secondary small mb-3 info-strip-glass p-2.5">
          <div className="d-flex align-items-center gap-1">
            <FaBriefcase className="text-primary" />
            <span>{doctor.experience} Yrs Exp</span>
          </div>
          <span className="text-muted">•</span>
          <div className="d-flex align-items-center gap-1">
            <FaMapMarkerAlt className="text-primary" />
            <span className="text-truncate" style={{ maxWidth: 120 }}>{doctor.location}</span>
          </div>
          <div className="d-flex align-items-center gap-1 ms-auto text-warning fw-bold bg-white px-2 py-0.5 rounded-pill border">
            <FaStar />
            <span>{doctor.rating}</span>
            <span className="text-muted fw-normal">({doctor.reviewCount})</span>
          </div>
        </div>

        <p className="card-text text-secondary small mb-4 flex-grow-1 line-clamp-2">
          {doctor.about || `Experienced specialist at ${doctor.clinicName}.`}
        </p>

        <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
          <div>
            <span className="text-muted small d-block" style={{ fontSize: '0.75rem' }}>Consultation Fee</span>
            <span className="fw-bold text-dark fs-5">{formatCurrency(doctor.consultationFee)}</span>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/doctors/${doctor.id}`} className="btn btn-outline-primary btn-sm px-3 fw-semibold">
              Profile
            </Link>
            <Link to={`/patient/book?doctorId=${doctor.id}`} className="btn btn-primary btn-sm px-3 fw-semibold d-flex align-items-center gap-1">
              <FaCalendarAlt size={12} /> Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
