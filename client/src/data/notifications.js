export const mockNotifications = [
  {
    id: "notif-1",
    userId: "pat-201",
    userRole: "patient",
    title: "Appointment Confirmed",
    message: "Dr. Arjun Kumar has confirmed your appointment for Aug 06, 2026 at 10:00 AM.",
    timestamp: "10 minutes ago",
    read: false,
    type: "appointment"
  },
  {
    id: "notif-2",
    userId: "pat-201",
    userRole: "patient",
    title: "Prescription Available",
    message: "Prescription RX-901 for your visit with Dr. Arjun Kumar is ready for view & download.",
    timestamp: "2 hours ago",
    read: true,
    type: "prescription"
  },
  {
    id: "notif-3",
    userId: "doc-101",
    userRole: "doctor",
    title: "New Appointment Request",
    message: "Patient Rohan Verma requested an appointment on Aug 06, 2026 at 10:00 AM.",
    timestamp: "1 day ago",
    read: false,
    type: "request"
  },
  {
    id: "notif-4",
    userId: "admin-1",
    userRole: "admin",
    title: "Doctor Approval Required",
    message: "Dr. Sunita Patel (Gynecology) submitted credentials for verification.",
    timestamp: "3 hours ago",
    read: false,
    type: "admin"
  }
];
