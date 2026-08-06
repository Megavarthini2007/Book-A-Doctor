import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaUserShield } from 'react-icons/fa';

export const Sidebar = ({ links = [], title = 'Dashboard' }) => {
  const { user } = useAuth();

  // Group links into sections (Main Navigation, Clinical Practice / Patient Care, Account & Settings)
  const renderLinksGroup = (linkItems) => (
    <ul className="nav nav-pills flex-column gap-1.5 mb-2">
      {linkItems.map((link, idx) => {
        const Icon = link.icon;
        return (
          <li key={idx} className="nav-item">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium nav-link-pill ${
                  isActive ? 'active' : ''
                }`
              }
            >
              {Icon && <Icon className="fs-5 opacity-75" />}
              <span className="small fw-semibold">{link.label}</span>
              {link.badge && (
                <span className={`badge ms-auto rounded-pill px-2 py-1 ${link.badgeClass || 'bg-danger'}`}>
                  {link.badge}
                </span>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  // Group links if section property exists, otherwise slice intelligently
  const mainLinks = links.filter((l) => l.section === 'main' || ['Dashboard', 'Find Doctors', 'Book Appointment'].includes(l.label));
  const practiceLinks = links.filter((l) => l.section === 'practice' || ['Appointment Requests', 'Schedule & Appointments', 'My Patients', 'Manage Availability', 'My Appointments', 'Medical Records', 'Prescriptions'].includes(l.label));
  const accountLinks = links.filter((l) => l.section === 'account' || ['Notifications', 'Doctor Profile', 'Profile', 'Settings'].includes(l.label));

  const fallbackLinks = links.filter((l) => !mainLinks.includes(l) && !practiceLinks.includes(l) && !accountLinks.includes(l));

  return (
    <div className="floating-sidebar-card p-3.5 d-flex flex-column h-100" style={{ width: 270, minHeight: 'calc(100vh - 100px)' }}>
      {/* Sleek User Profile Widget */}
      <div className="p-3 mb-4 rounded-3 sidebar-user-card shadow-xs">
        <div className="d-flex align-items-center gap-2.5">
          <div className="flex-shrink-0">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-xs" style={{ width: 42, height: 42, fontSize: '1rem' }}>
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
          </div>
          <div className="overflow-hidden min-w-0">
            <div className="fw-bold text-dark text-truncate small" style={{ fontSize: '0.9rem' }}>
              {user?.name || 'User'}
            </div>
            <div className="text-secondary text-capitalize small" style={{ fontSize: '0.75rem' }}>
              {user?.role || 'Patient'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Section */}
      {mainLinks.length > 0 && (
        <div className="mb-3">
          <div className="px-2 pb-1.5 mb-1 border-bottom border-light">
            <span className="nav-section-title">Main Navigation</span>
          </div>
          {renderLinksGroup(mainLinks)}
        </div>
      )}

      {/* Practice / Services Section */}
      {practiceLinks.length > 0 && (
        <div className="mb-3">
          <div className="px-2 pb-1.5 mb-1 border-bottom border-light">
            <span className="nav-section-title">{user?.role === 'doctor' ? 'Clinical Practice' : 'Patient Care'}</span>
          </div>
          {renderLinksGroup(practiceLinks)}
        </div>
      )}

      {/* Account & Settings Section */}
      {accountLinks.length > 0 && (
        <div className="mb-3">
          <div className="px-2 pb-1.5 mb-1 border-bottom border-light">
            <span className="nav-section-title">Account & Settings</span>
          </div>
          {renderLinksGroup(accountLinks)}
        </div>
      )}

      {/* Fallback Unclassified Links */}
      {fallbackLinks.length > 0 && (
        <div>
          <div className="px-2 pb-1.5 mb-1 border-bottom border-light">
            <span className="nav-section-title">Other</span>
          </div>
          {renderLinksGroup(fallbackLinks)}
        </div>
      )}
    </div>
  );
};

export default Sidebar;

