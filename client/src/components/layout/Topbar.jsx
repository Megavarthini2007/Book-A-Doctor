import React from 'react';
import { FaBell, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import ProfileAvatar from '../common/ProfileAvatar';
import { useNavigate } from 'react-router-dom';

export const Topbar = ({ pageTitle = 'Dashboard' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="glass-nav-bar py-3 px-4 d-flex align-items-center justify-content-between sticky-top shadow-xs">
      <div>
        <h5 className="fw-bold text-dark mb-0">{pageTitle}</h5>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="position-relative cursor-pointer p-2 rounded-circle hover-bg-light">
          <FaBell className="text-secondary fs-5" />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New notifications</span>
          </span>
        </div>

        <div className="border-start ps-3 d-flex align-items-center gap-2">
          <ProfileAvatar src={user?.avatar} name={user?.name || 'User'} size="sm" />
          <div className="d-none d-sm-block text-start ms-1">
            <div className="fw-semibold small text-dark lh-1">{user?.name}</div>
            <small className="text-muted text-capitalize" style={{ fontSize: '0.75rem' }}>
              {user?.role}
            </small>
          </div>

          <button onClick={handleLogout} className="btn btn-link text-danger p-1 ms-2" title="Logout">
            <FaSignOutAlt className="fs-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
