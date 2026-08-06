import { mockDoctors } from '../data/doctors';
import { mockPatients } from '../data/patients';
import { mockAppointments } from '../data/appointments';
import { mockDashboardData } from '../data/dashboardData';

let doctorsList = [...mockDoctors];

export const adminService = {
  getDashboardStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, stats: mockDashboardData.admin };
  },

  getPendingDoctors: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const pending = doctorsList.filter((d) => d.status === 'Pending');
    return { success: true, count: pending.length, doctors: pending };
  },

  approveDoctor: async (doctorId) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const doc = doctorsList.find((d) => d.id === doctorId);
    if (doc) {
      doc.status = 'Approved';
      doc.verified = true;
    }
    return { success: true, message: 'Doctor approved successfully' };
  },

  rejectDoctor: async (doctorId, reason = 'Verification documents incomplete') => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const doc = doctorsList.find((d) => d.id === doctorId);
    if (doc) {
      doc.status = 'Rejected';
      doc.verified = false;
    }
    return { success: true, message: 'Doctor application rejected' };
  },

  getDoctors: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, doctors: doctorsList };
  },

  getPatients: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, patients: mockPatients };
  },

  getAppointments: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, appointments: mockAppointments };
  }
};
