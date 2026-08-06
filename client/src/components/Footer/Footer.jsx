import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import BrandLogo from '../common/BrandLogo';

export const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 border-top border-secondary border-opacity-25">
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-12 col-lg-4">
            <div className="mb-3">
              <BrandLogo size="md" textClass="text-white" />
            </div>
            <p className="text-secondary small mb-4 pe-lg-3">
              Book A Doctor is a trusted healthcare platform providing easy access to top-rated verified doctors, instant appointments, digital prescriptions, and clinical management.
            </p>
            <div className="d-flex align-items-center gap-2 text-muted small">
              <FaShieldAlt className="text-primary" />
              <span>HIPAA Compliant & ISO 27001 Certified Infrastructure</span>
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
              <li><Link to="/doctors" className="text-secondary text-decoration-none hover-white">Find Doctors</Link></li>
              <li><Link to="/services" className="text-secondary text-decoration-none hover-white">Specializations</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none hover-white">About Us</Link></li>
              <li><Link to="/contact" className="text-secondary text-decoration-none hover-white">Contact Us</Link></li>
              <li><Link to="/faq" className="text-secondary text-decoration-none hover-white">FAQs</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-white mb-3">For Healthcare</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
              <li><Link to="/register/doctor" className="text-secondary text-decoration-none hover-white">Join as a Doctor</Link></li>
              <li><Link to="/login" className="text-secondary text-decoration-none hover-white">Doctor Portal Login</Link></li>
              <li><Link to="/login" className="text-secondary text-decoration-none hover-white">Patient Portal</Link></li>
              <li><Link to="/terms" className="text-secondary text-decoration-none hover-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-secondary text-decoration-none hover-white">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <h6 className="fw-bold text-white mb-3">Contact Support</h6>
            <ul className="list-unstyled d-flex flex-column gap-2.5 small text-secondary mb-4">
              <li className="d-flex align-items-center gap-2">
                <FaPhoneAlt className="text-primary" /> <span>+91 1800-456-7890 (Toll Free)</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaEnvelope className="text-primary" /> <span>support@bookadoctor.com</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="text-primary" /> <span>Healthcare Tech Park, Outer Ring Road, Bengaluru, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top border-secondary border-opacity-25 pt-4 d-flex flex-column flex-md-row align-items-center justify-content-between text-secondary small">
          <p className="mb-2 mb-md-0">© {new Date().getFullYear()} Book A Doctor Inc. All rights reserved.</p>
          <div className="d-flex align-items-center gap-1">
            <span>Built with</span>
            <FaHeart className="text-danger" />
            <span>for better healthcare accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
