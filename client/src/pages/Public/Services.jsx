import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/layout/Breadcrumb';
import { specializationsList } from '../../data/doctors';

export const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Services & Specializations' }]} />

      <div className="text-center max-w-xl mx-auto mb-5">
        <h2 className="fw-bold text-dark display-6">Comprehensive Healthcare Services</h2>
        <p className="text-secondary">Explore expert medical specializations available on Book A Doctor.</p>
      </div>

      <div className="row g-4 mb-5">
        {specializationsList.map((spec) => (
          <div key={spec.id} className="col-12 col-md-6 col-lg-4">
            <div className="card card-hover h-100 border-0 p-4">
              <h5 className="fw-bold text-dark mb-2">{spec.name}</h5>
              <p className="text-secondary small mb-4">{spec.description}</p>
              <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                <span className="badge bg-primary-subtle text-primary">{spec.count}+ Specialists</span>
                <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/doctors?spec=${encodeURIComponent(spec.name)}`)}>
                  Book Doctor
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
