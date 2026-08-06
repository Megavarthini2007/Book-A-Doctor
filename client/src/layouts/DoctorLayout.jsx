import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { FaChartLine, FaInbox, FaCalendarCheck, FaUserInjured, FaClock, FaBell, FaUserMd, FaCog } from 'react-icons/fa';

export const DoctorLayout = () => {
  const links = [
    { label: 'Dashboard', path: '/doctor/dashboard', icon: FaChartLine },
    { label: 'Appointment Requests', path: '/doctor/requests', icon: FaInbox, badge: '3', badgeClass: 'bg-warning text-dark' },
    { label: 'Schedule & Appointments', path: '/doctor/appointments', icon: FaCalendarCheck },
    { label: 'My Patients', path: '/doctor/patients', icon: FaUserInjured },
    { label: 'Manage Availability', path: '/doctor/availability', icon: FaClock },
    { label: 'Notifications', path: '/doctor/notifications', icon: FaBell },
    { label: 'Doctor Profile', path: '/doctor/profile', icon: FaUserMd },
    { label: 'Settings', path: '/doctor/settings', icon: FaCog }
  ];

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8fafc' }}>
      <Navbar />
      <div className="container-fluid px-3 px-md-4 py-3 flex-grow-1 d-flex gap-4">
        <div className="d-none d-md-block flex-shrink-0">
          <Sidebar links={links} title="Doctor Portal" />
        </div>
        <div className="flex-grow-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;
