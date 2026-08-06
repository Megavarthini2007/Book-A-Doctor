import api from './api';
import { mockPatients } from '../data/patients';
import { mockDoctors } from '../data/doctors';

export const authService = {
  login: async (email, password, role = 'patient') => {
    try {
      const response = await api.post('/auth/login', { email, password, role });
      if (response.data && response.data.user) {
        const user = response.data.user;
        localStorage.setItem('auth_user', JSON.stringify(user));
        return { success: true, user };
      }
    } catch (err) {
      console.warn('Backend API connection warning, using fallback logic:', err.message);
    }

    // 1. If Doctor role selected, log in as Doctor
    if (role === 'doctor') {
      const username = email.split('@')[0];
      const formattedName = username
        ? username.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        : 'Doctor';
      const docName = formattedName.toLowerCase().startsWith('dr') ? formattedName : `Dr. ${formattedName}`;

      const doctor = mockDoctors.find((d) => d.id === 'doc-101' || d.name.toLowerCase().includes('arjun'));
      const user = {
        id: doctor ? doctor.id : `doc-${Date.now().toString().slice(-4)}`,
        name: docName,
        email: email,
        role: 'doctor',
        doctorInfo: doctor || {
          id: `doc-${Date.now().toString().slice(-4)}`,
          name: docName,
          title: 'Consultant Practitioner',
          specialization: 'General Medicine'
        }
      };

      localStorage.setItem('auth_user', JSON.stringify(user));
      return { success: true, user };
    }

    // 2. If Admin role selected
    if (role === 'admin') {
      const user = { id: 'admin-1', name: 'System Administrator', email, role: 'admin' };
      localStorage.setItem('auth_user', JSON.stringify(user));
      return { success: true, user };
    }

    // 3. Dynamic Patient User Creation for newly typed emails
    const username = email.split('@')[0];
    const formattedName = username
      ? username.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : 'Patient User';

    const newUser = {
      id: `pat-${Date.now().toString().slice(-4)}`,
      name: formattedName,
      email: email,
      role: 'patient',
      patientInfo: {
        id: `pat-${Date.now().toString().slice(-4)}`,
        name: formattedName,
        email: email,
        phone: '+91 98765 43210',
        dob: '1995-01-01',
        gender: 'Not Specified',
        bloodGroup: 'O+',
        address: 'Bengaluru, India',
        city: 'Bengaluru',
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        role: 'patient'
      }
    };

    localStorage.setItem('auth_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  registerPatient: async (patientData) => {
    try {
      const response = await api.post('/auth/register/patient', patientData);
      if (response.data && response.data.user) {
        const user = response.data.user;
        localStorage.setItem('auth_user', JSON.stringify(user));
        return { success: true, user };
      }
    } catch (err) {
      console.warn('Backend API connection warning, using fallback logic:', err.message);
    }

    const newUser = {
      id: `pat-${Date.now().toString().slice(-4)}`,
      name: patientData.fullName,
      email: patientData.email,
      phone: patientData.phone,
      role: 'patient'
    };

    localStorage.setItem('auth_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  registerDoctor: async (doctorData) => {
    try {
      const response = await api.post('/auth/register/doctor', doctorData);
      if (response.data && response.data.user) {
        const user = response.data.user;
        localStorage.setItem('auth_user', JSON.stringify(user));
        return { success: true, user };
      }
    } catch (err) {
      console.warn('Backend API connection warning, using fallback logic:', err.message);
    }

    const newDoctor = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      name: doctorData.name || 'Dr. Practitioner',
      email: doctorData.email,
      phone: doctorData.phone,
      role: 'doctor'
    };

    localStorage.setItem('auth_user', JSON.stringify(newDoctor));
    return {
      success: true,
      user: newDoctor,
      message: 'Your profile has been submitted for administrator approval.',
      status: 'PendingApproval'
    };
  },

  logout: async () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('token');
    return { success: true };
  },

  getCurrentUser: () => {
    const saved = localStorage.getItem('auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
};
