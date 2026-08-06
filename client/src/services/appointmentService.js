import { mockAppointments } from '../data/appointments';

let localAppointments = [...mockAppointments];

export const appointmentService = {
  getAppointments: async (role = 'patient', userId = 'pat-201', filterStatus = 'All') => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let filtered = localAppointments;

    if (role === 'patient') {
      filtered = filtered.filter((apt) => apt.patientId === userId || userId === 'pat-201');
    } else if (role === 'doctor') {
      filtered = filtered.filter((apt) => apt.doctorId === userId || userId === 'doc-101');
    }

    if (filterStatus && filterStatus !== 'All') {
      filtered = filtered.filter((apt) => apt.status.toLowerCase() === filterStatus.toLowerCase());
    }

    return { success: true, count: filtered.length, appointments: filtered };
  },

  getAppointmentById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const appointment = localAppointments.find((apt) => apt.id === id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    return { success: true, appointment };
  },

  createAppointment: async (bookingData) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const newApt = {
      id: `APT-${Math.floor(8000 + Math.random() * 1000)}`,
      patientId: bookingData.patientId || 'pat-201',
      patientName: bookingData.patientName || 'Rohan Verma',
      patientEmail: bookingData.patientEmail || 'rohan.verma@example.com',
      patientPhone: bookingData.patientPhone || '+91 98765 43210',
      doctorId: bookingData.doctorId,
      doctorName: bookingData.doctorName,
      doctorSpecialization: bookingData.doctorSpecialization,
      doctorClinic: bookingData.doctorClinic,
      doctorLocation: bookingData.doctorLocation,
      doctorImage: bookingData.doctorImage,
      date: bookingData.date,
      time: bookingData.time,
      slotPeriod: bookingData.slotPeriod || 'Morning',
      reason: bookingData.reason,
      status: 'Confirmed',
      fee: bookingData.fee || 800,
      paymentStatus: 'Paid',
      documents: bookingData.documents || [],
      timeline: [
        { status: 'Requested', date: new Date().toLocaleString() },
        { status: 'Confirmed', date: new Date().toLocaleString() }
      ],
      notes: '',
      prescription: null
    };

    localAppointments.unshift(newApt);
    return { success: true, appointment: newApt };
  },

  cancelAppointment: async (id, reason = 'Cancelled by user') => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const apt = localAppointments.find((a) => a.id === id);
    if (apt) {
      apt.status = 'Cancelled';
      apt.timeline.push({ status: 'Cancelled', date: new Date().toLocaleString() });
    }
    return { success: true, message: 'Appointment cancelled successfully' };
  },

  updateAppointmentStatus: async (id, status, notes = '', prescription = null) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const apt = localAppointments.find((a) => a.id === id);
    if (apt) {
      apt.status = status;
      if (notes) apt.notes = notes;
      if (prescription) apt.prescription = prescription;
      apt.timeline.push({ status, date: new Date().toLocaleString() });
    }
    return { success: true, appointment: apt };
  }
};
