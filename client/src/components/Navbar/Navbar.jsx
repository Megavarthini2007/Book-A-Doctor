import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaUser, FaSignOutAlt, FaChevronDown, FaCog } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import BrandLogo from '../common/BrandLogo';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-xl glass-nav-bar sticky-top py-2.5 shadow-xs">
      <div className="container-fluid px-lg-4">
        {/* Brand Logo */}
        <div className="me-4">
          <BrandLogo size="md" />
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-expanded={mobileNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${mobileNavOpen ? 'show' : ''}`} id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-xl-0 fw-semibold text-nowrap">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link text-nowrap px-2.5 ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`} onClick={() => setMobileNavOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={user?.role === 'patient' || user ? '/patient/doctors' : '/doctors'} className={({ isActive }) => `nav-link text-nowrap px-2.5 ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`} onClick={() => setMobileNavOpen(false)}>
                Find Doctors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className={({ isActive }) => `nav-link text-nowrap px-2.5 ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`} onClick={() => setMobileNavOpen(false)}>
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => `nav-link text-nowrap px-2.5 ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`} onClick={() => setMobileNavOpen(false)}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => `nav-link text-nowrap px-2.5 ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`} onClick={() => setMobileNavOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>



          {/* Actions & Profile Dropdown */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-xl-0 text-nowrap">
            {isAuthenticated ? (
              <div className="position-relative" ref={dropdownRef}>
                <button
                  className="btn bg-light border-0 d-flex align-items-center gap-2 py-1.5 px-3 rounded-pill hover-bg-light shadow-xs"
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  style={{ backgroundColor: '#e2e8f0' }}
                >
                  <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{ width: 28, height: 28, fontSize: '0.8rem' }}>
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                  <span className="fw-semibold text-dark small me-1">{user?.name || 'User'}</span>
                  <FaChevronDown className="text-secondary" size={10} />
                </button>

                {dropdownOpen && (
                  <ul className="dropdown-menu dropdown-menu-end glass-dropdown-menu show mt-2 position-absolute border-0 shadow-lg p-2" style={{ right: 0, minWidth: 200, zIndex: 1050, borderRadius: '16px' }}>
                    <li>
                      <Link to={user?.role === 'doctor' ? '/doctor/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/patient/dashboard'} className="dropdown-item py-2 px-3 rounded-3 d-flex align-items-center gap-2.5 small fw-medium" onClick={() => setDropdownOpen(false)}>
                        <FaUser className="text-secondary opacity-75" size={14} /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to={user?.role === 'doctor' ? '/doctor/profile' : user?.role === 'admin' ? '/admin/settings' : '/patient/profile'} className="dropdown-item py-2 px-3 rounded-3 d-flex align-items-center gap-2.5 small fw-medium" onClick={() => setDropdownOpen(false)}>
                        <FaUser className="text-secondary opacity-75" size={14} /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to={user?.role === 'doctor' ? '/doctor/notifications' : '/patient/notifications'} className="dropdown-item py-2 px-3 rounded-3 d-flex align-items-center gap-2.5 small fw-medium" onClick={() => setDropdownOpen(false)}>
                        <FaChevronDown className="text-secondary opacity-75" size={14} /> Notifications
                      </Link>
                    </li>
                    <li>
                      <Link to={user?.role === 'doctor' ? '/doctor/settings' : '/patient/settings'} className="dropdown-item py-2 px-3 rounded-3 d-flex align-items-center gap-2.5 small fw-medium" onClick={() => setDropdownOpen(false)}>
                        <FaCog className="text-secondary opacity-75" size={14} /> Settings
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider my-1 opacity-25" /></li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item py-2 px-3 rounded-3 text-danger fw-semibold d-flex align-items-center gap-2.5 small">
                        <FaSignOutAlt size={14} /> Sign Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary btn-sm px-3 fw-semibold">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm px-3.5 fw-semibold d-flex align-items-center gap-1">
                  <FaCalendarAlt size={12} /> Book Appointment
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
