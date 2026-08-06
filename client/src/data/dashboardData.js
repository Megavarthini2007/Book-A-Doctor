export const mockDashboardData = {
  admin: {
    totalPatients: 1420,
    totalDoctors: 86,
    pendingDoctors: 4,
    totalAppointments: 3250,
    todayAppointments: 42,
    completedAppointments: 2980,
    cancelledAppointments: 180,
    revenueMonth: "₹ 4,85,000",
    recentActivity: [
      { id: "act-1", text: "Dr. Sunita Patel submitted verification documents", time: "15 mins ago" },
      { id: "act-2", text: "New appointment APT-8042 booked by Sneha Reddy", time: "1 hour ago" },
      { id: "act-3", text: "Dr. Arjun Kumar completed appointment APT-8039", time: "3 hours ago" }
    ]
  },
  doctor: {
    todayCount: 8,
    pendingRequests: 3,
    upcomingCount: 14,
    completedCount: 312,
    totalPatients: 240,
    rating: 4.9,
    scheduleToday: [
      { time: "09:00 AM", patient: "Rahul Gupta", status: "Completed", type: "Follow-up" },
      { time: "10:00 AM", patient: "Rohan Verma", status: "Confirmed", type: "General Consultation" },
      { time: "11:30 AM", patient: "Kavita Rao", status: "Confirmed", type: "ECG Review" },
      { time: "02:00 PM", patient: "Deepak Mehta", status: "Scheduled", type: "New Patient" }
    ]
  },
  patient: {
    upcomingCount: 1,
    pendingCount: 1,
    completedCount: 5,
    medicalReportsCount: 4,
    prescriptionsCount: 3
  }
};
