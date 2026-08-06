import { mockPatients } from '../data/patients';

let currentPatient = { ...mockPatients[0] };

export const patientService = {
  getPatientProfile: async (patientId = 'pat-201') => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, patient: currentPatient };
  },

  updatePatientProfile: async (updatedData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    currentPatient = { ...currentPatient, ...updatedData };
    return { success: true, patient: currentPatient };
  },

  getMedicalDocuments: async (patientId = 'pat-201') => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      documents: [
        { id: 'doc-1', name: 'Cardiac_ECG_Report.pdf', category: 'Medical Report', date: '2026-06-12', size: '1.8 MB' },
        { id: 'doc-2', name: 'Blood_Sugar_Panel.pdf', category: 'Lab Report', date: '2026-05-20', size: '920 KB' },
        { id: 'doc-3', name: 'Prescription_RX901.pdf', category: 'Prescription', date: '2026-08-02', size: '450 KB' }
      ]
    };
  }
};
