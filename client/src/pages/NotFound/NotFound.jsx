import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaHome } from 'react-icons/fa';

export const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center px-3">
      <div className="bg-primary bg-opacity-10 text-primary p-4 rounded-circle mb-4">
        <FaUserMd className="display-1" />
      </div>
      <h1 className="display-3 fw-bold text-dark mb-2">404</h1>
      <h4 className="fw-bold text-dark mb-3">Page Not Found</h4>
      <p className="text-secondary mb-4 max-w-md">
        The healthcare page or resource you are looking for might have been moved or does not exist.
      </p>
      <Link to="/" className="btn btn-primary px-4 py-2.5 d-inline-flex align-items-center gap-2">
        <FaHome /> Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
