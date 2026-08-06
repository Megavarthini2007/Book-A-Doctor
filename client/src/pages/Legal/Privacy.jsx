import React from 'react';
import Breadcrumb from '../../components/layout/Breadcrumb';

export const Privacy = () => {
  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
      <div className="bg-white p-4 p-md-5 rounded-4 border max-w-3xl mx-auto">
        <h2 className="fw-bold text-dark mb-4">Privacy Policy</h2>
        <p className="text-secondary small">
          At Book A Doctor, we prioritize medical data privacy and security. Patient reports, personal information, and clinical prescriptions are encrypted and stored adhering to international healthcare regulations.
        </p>
        <h5 className="fw-bold text-dark mt-4 mb-2">1. Information Collection</h5>
        <p className="text-secondary small">
          We collect user registration details, doctor licensing documents, and appointment history strictly for healthcare scheduling and consultation.
        </p>
        <h5 className="fw-bold text-dark mt-4 mb-2">2. Data Security</h5>
        <p className="text-secondary small">
          All data transmitted across our SaaS platform uses SSL/TLS 256-bit encryption.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
