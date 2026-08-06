import React, { useState, useEffect } from 'react';
import { FaBell, FaCheck } from 'react-icons/fa';
import { notificationService } from '../../services/notificationService';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifs = async () => {
    const res = await notificationService.getNotifications(user?.role || 'patient', user?.id || 'pat-201');
    if (res.success) setNotifications(res.notifications);
  };

  useEffect(() => {
    fetchNotifs();
  }, [user]);

  const handleMarkAsRead = async (id) => {
    await notificationService.markAsRead(id);
    fetchNotifs();
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead(user?.role || 'patient');
    toast.success('All notifications marked as read');
    fetchNotifs();
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Notification Center</h4>
          <p className="text-secondary small mb-0">System updates, appointment alerts & prescription notifications</p>
        </div>
        <button className="btn btn-outline-primary btn-sm" onClick={handleMarkAllRead}>
          <FaCheck /> Mark All Read
        </button>
      </div>

      <div className="card border-0 shadow-sm p-4">
        {notifications.length === 0 ? (
          <p className="text-muted text-center my-4">No notifications present.</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-3 border d-flex justify-content-between align-items-center ${
                  n.read ? 'bg-light opacity-75' : 'bg-white border-primary border-opacity-50 shadow-xs'
                }`}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className={`p-2.5 rounded-circle ${n.read ? 'bg-secondary-subtle text-muted' : 'bg-primary text-white'}`}>
                    <FaBell />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{n.title}</h6>
                    <p className="text-secondary small mb-0">{n.message}</p>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {n.timestamp}
                    </small>
                  </div>
                </div>
                {!n.read && (
                  <button className="btn btn-link text-primary p-0 small" onClick={() => handleMarkAsRead(n.id)}>
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
