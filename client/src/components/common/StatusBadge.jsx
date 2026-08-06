import React from 'react';
import { FaClock, FaCheckCircle, FaTimesCircle, FaSyncAlt, FaCalendarCheck } from 'react-icons/fa';

export const StatusBadge = ({ status = 'Pending' }) => {
  const statusLower = status.toLowerCase();

  const getStatusConfig = () => {
    switch (statusLower) {
      case 'requested':
      case 'pending':
        return { class: 'badge-pending', icon: FaClock, label: status };
      case 'confirmed':
      case 'scheduled':
      case 'approved':
        return { class: 'badge-confirmed', icon: FaCalendarCheck, label: status };
      case 'completed':
        return { class: 'badge-completed', icon: FaCheckCircle, label: status };
      case 'cancelled':
      case 'rejected':
        return { class: 'badge-cancelled', icon: FaTimesCircle, label: status };
      case 'rescheduled':
        return { class: 'badge-rescheduled', icon: FaSyncAlt, label: status };
      default:
        return { class: 'badge-pending', icon: FaClock, label: status };
    }
  };

  const { class: badgeClass, icon: Icon, label } = getStatusConfig();

  return (
    <span className={`badge-status ${badgeClass}`}>
      <Icon size={12} />
      <span>{label}</span>
    </span>
  );
};

export default StatusBadge;
