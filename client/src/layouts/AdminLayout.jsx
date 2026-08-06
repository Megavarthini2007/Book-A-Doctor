import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { FaChartBar, FaUserCheck, FaUserMd, FaUsers, FaCalendarAlt, FaFileAlt, FaHistory, FaCog } from 'react-icons/fa';

export const AdminLayout = () => {
  const links = [
    { label: 'Admin Dashboard', path: '/admin/dashboard', icon: FaChartBar },
    { label: 'Doctor Approvals', path: '/admin/doctors/pending', icon: FaUserCheck, badge: '1', badgeClass: 'bg-danger' },
    { label: 'Manage Doctors', path: '/admin/doctors', icon: FaUserMd },
    { label: 'Manage Patients', path: '/admin/patients', icon: FaUsers },
    { label: 'Master Appointments', path: '/admin/appointments', icon: FaCalendarAlt },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: FaFileAlt },
    { label: 'Platform Activity', path: '/admin/activity', icon: FaHistory },
    { label: 'Settings', path: '/admin/settings', icon: FaCog }
  ];

  return (
    <div className="d-flex flex-column min-vh-100 bg-dashboard-mesh">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <div className="d-none d-md-block">
          <Sidebar links={links} title="Administration" />
        </div>
        <div className="flex-grow-1 p-3 p-md-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
