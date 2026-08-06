import React from 'react';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { FaShieldAlt, FaHeart, FaUserMd, FaAward } from 'react-icons/fa';

export const About = () => {
  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'About Us' }]} />

      <div className="row align-items-center g-5 mb-5 py-4">
        <div className="col-12 col-lg-6">
          <span className="text-primary font-monospace fw-bold text-uppercase small">Our Mission</span>
          <h2 className="display-5 fw-bold text-dark mb-3">Empowering Patients & Doctors Through Seamless SaaS Tech</h2>
          <p className="text-secondary leading-relaxed mb-4">
            Book A Doctor was founded to eliminate healthcare accessibility bottlenecks. Our platform bridges patients with verified specialist doctors through real-time booking, digital health record storage, and clinical prescription tools.
          </p>
          <div className="row g-3">
            <div className="col-6">
              <div className="p-3 bg-white rounded-3 border">
                <FaShieldAlt className="text-primary fs-3 mb-2" />
                <h6 className="fw-bold text-dark mb-1">Verified Doctors</h6>
                <p className="text-muted small mb-0">Rigorous 6-step medical verification.</p>
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 bg-white rounded-3 border">
                <FaHeart className="text-danger fs-3 mb-2" />
                <h6 className="fw-bold text-dark mb-1">Patient Trust</h6>
                <p className="text-muted small mb-0">Transparent ratings & instant booking.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"
            alt="Healthcare Team"
            className="img-fluid rounded-4 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
