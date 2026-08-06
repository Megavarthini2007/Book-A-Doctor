import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { FaChartPie, FaSearch, FaCalendarAlt, FaHistory, FaFileMedical, FaPrescription, FaBell, FaUser, FaCog } from 'react-icons/fa';

export const PatientLayout = () => {
  const links = [
    { label: 'Dashboard', path: '/patient/dashboard', icon: FaChartPie },
    { label: 'Find Doctors', path: '/patient/doctors', icon: FaSearch },
    { label: 'Book Appointment', path: '/patient/book', icon: FaCalendarAlt },
    { label: 'My Appointments', path: '/patient/appointments', icon: FaHistory },
    { label: 'Medical Records', path: '/patient/documents', icon: FaFileMedical },
    { label: 'Prescriptions', path: '/patient/prescriptions', icon: FaPrescription },
    { label: 'Notifications', path: '/patient/notifications', icon: FaBell, badge: '2' },
    { label: 'Profile', path: '/patient/profile', icon: FaUser },
    { label: 'Settings', path: '/patient/settings', icon: FaCog }
  ];

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8fafc' }}>
      <Navbar />
      <div className="container-fluid px-3 px-md-4 py-3 flex-grow-1 d-flex gap-4">
        <div className="d-none d-md-block flex-shrink-0">
          <Sidebar links={links} title="Patient Portal" />
        </div>
        <div className="flex-grow-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientLayout;
