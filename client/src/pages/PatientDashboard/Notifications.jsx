import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import NotificationItem from '../../components/common/NotificationItem';
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
              <NotificationItem key={n.id} notification={n} onMarkAsRead={handleMarkAsRead} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
