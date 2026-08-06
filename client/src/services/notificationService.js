import { mockNotifications } from '../data/notifications';

let localNotifications = [...mockNotifications];

export const notificationService = {
  getNotifications: async (userRole = 'patient', userId = 'pat-201') => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const items = localNotifications.filter((n) => n.userRole === userRole || n.userId === userId);
    return { success: true, notifications: items, unreadCount: items.filter((n) => !n.read).length };
  },

  markAsRead: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const notif = localNotifications.find((n) => n.id === id);
    if (notif) notif.read = true;
    return { success: true };
  },

  markAllAsRead: async (userRole = 'patient') => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    localNotifications.forEach((n) => {
      if (n.userRole === userRole) n.read = true;
    });
    return { success: true };
  }
};
