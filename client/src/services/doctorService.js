import { mockDoctors } from '../data/doctors';

export const doctorService = {
  getDoctors: async (filters = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let doctors = [...mockDoctors].filter(d => d.status === 'Approved');

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      doctors = doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.clinicName.toLowerCase().includes(q)
      );
    }

    if (filters.specialization && filters.specialization !== 'All') {
      doctors = doctors.filter((d) => d.specialization.toLowerCase() === filters.specialization.toLowerCase());
    }

    if (filters.location && filters.location !== 'All') {
      doctors = doctors.filter((d) => d.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (filters.maxFee) {
      doctors = doctors.filter((d) => d.consultationFee <= Number(filters.maxFee));
    }

    if (filters.sortBy) {
      if (filters.sortBy === 'rating') {
        doctors.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === 'experience') {
        doctors.sort((a, b) => b.experience - a.experience);
      } else if (filters.sortBy === 'feeAsc') {
        doctors.sort((a, b) => a.consultationFee - b.consultationFee);
      } else if (filters.sortBy === 'feeDesc') {
        doctors.sort((a, b) => b.consultationFee - a.consultationFee);
      }
    }

    return { success: true, count: doctors.length, doctors };
  },

  getDoctorById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const doctor = mockDoctors.find((d) => d.id === id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return { success: true, doctor };
  },

  getAvailability: async (doctorId, date) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const doctor = mockDoctors.find((d) => d.id === doctorId) || mockDoctors[0];
    return { success: true, slots: doctor.availableSlots || [] };
  }
};
