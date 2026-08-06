import React from 'react';
import { FaBell, FaCheck } from 'react-icons/fa';

export const NotificationItem = ({ notification, onMarkAsRead }) => {
  return (
    <div
      className={`p-3 rounded-3 border d-flex justify-content-between align-items-center ${
        notification.read ? 'bg-light opacity-75' : 'bg-white border-primary border-opacity-50 shadow-xs'
      }`}
    >
      <div className="d-flex align-items-center gap-3">
        <div className={`p-2.5 rounded-circle ${notification.read ? 'bg-secondary-subtle text-muted' : 'bg-primary text-white'}`}>
          <FaBell />
        </div>
        <div>
          <h6 className="fw-bold text-dark mb-0">{notification.title}</h6>
          <p className="text-secondary small mb-0">{notification.message}</p>
          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
            {notification.timestamp}
          </small>
        </div>
      </div>
      {!notification.read && (
        <button className="btn btn-link text-primary p-0 small" onClick={() => onMarkAsRead(notification.id)}>
          Mark Read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
