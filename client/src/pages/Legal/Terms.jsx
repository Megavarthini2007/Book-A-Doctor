import React from 'react';
import Breadcrumb from '../../components/layout/Breadcrumb';

export const Terms = () => {
  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />
      <div className="bg-white p-4 p-md-5 rounded-4 border max-w-3xl mx-auto">
        <h2 className="fw-bold text-dark mb-4">Terms & Conditions</h2>
        <p className="text-secondary small">
          Welcome to Book A Doctor. By accessing or using our healthcare discovery and booking SaaS platform, you agree to comply with our terms.
        </p>
        <h5 className="fw-bold text-dark mt-4 mb-2">1. Medical Services Disclaimer</h5>
        <p className="text-secondary small">
          Book A Doctor is an appointment scheduling platform and does not replace emergency medical response services.
        </p>
      </div>
    </div>
  );
};

export default Terms;
