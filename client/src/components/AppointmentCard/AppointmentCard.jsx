import React from 'react';
import { FaCalendarDay, FaClock, FaMapMarkerAlt, FaFileMedical, FaTimes, FaRedo } from 'react-icons/fa';
import StatusBadge from '../common/StatusBadge';
import ProfileAvatar from '../common/ProfileAvatar';
import Button from '../common/Button';
import { formatDate } from '../../utils/dateFormatter';

export const AppointmentCard = ({ appointment, onCancel, onReschedule, onViewDetails }) => {
  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body p-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 pb-3 border-bottom mb-3">
          <div className="d-flex align-items-center gap-3">
            <ProfileAvatar src={appointment.doctorImage} name={appointment.doctorName} size="md" />
            <div>
              <h6 className="fw-bold text-dark mb-0">{appointment.doctorName}</h6>
              <span className="text-primary small fw-semibold">{appointment.doctorSpecialization}</span>
              <div className="text-muted small d-flex align-items-center gap-1 mt-0.5">
                <FaMapMarkerAlt size={12} /> {appointment.doctorClinic}, {appointment.doctorLocation}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-2">
            <span className="text-muted small">ID: #{appointment.id}</span>
            <StatusBadge status={appointment.status} />
          </div>
        </div>

        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-3 info-strip-glass p-2.5">
              <div className="d-flex align-items-center gap-1.5 text-secondary small fw-medium">
                <FaCalendarDay className="text-primary" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="border-start ps-3 d-flex align-items-center gap-1.5 text-secondary small fw-medium">
                <FaClock className="text-primary" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 text-md-end d-flex gap-2 justify-content-md-end">
            <Button variant="outline-primary" size="sm" onClick={() => onViewDetails(appointment)}>
              View Details
            </Button>

            {['Confirmed', 'Pending', 'Scheduled'].includes(appointment.status) && (
              <>
                {onReschedule && (
                  <Button variant="outline-secondary" size="sm" onClick={() => onReschedule(appointment)}>
                    <FaRedo size={12} /> Reschedule
                  </Button>
                )}
                {onCancel && (
                  <Button variant="outline-danger" size="sm" onClick={() => onCancel(appointment)}>
                    <FaTimes size={12} /> Cancel
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
