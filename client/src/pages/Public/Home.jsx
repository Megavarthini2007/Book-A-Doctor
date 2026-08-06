import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserMd,
  FaSearch,
  FaCalendarCheck,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaAward,
  FaUserInjured,
  FaChevronRight,
  FaHeartbeat,
  FaQuestionCircle
} from 'react-icons/fa';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import { doctorService } from '../../services/doctorService';
import { specializationsList } from '../../data/doctors';

export const Home = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [selectedLoc, setSelectedLoc] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    doctorService.getDoctors().then((res) => {
      if (res.success) {
        setFeaturedDoctors(res.doctors.slice(0, 3));
      }
    });
  }, []);

  const handleSearchSubmit = () => {
    navigate(`/doctors?search=${encodeURIComponent(searchQuery)}&spec=${selectedSpec}&loc=${selectedLoc}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-primary-light py-5 py-lg-6 position-relative overflow-hidden border-bottom">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-2 rounded-pill mb-3 d-inline-flex align-items-center gap-1.5">
                <FaShieldAlt /> Certified Healthcare Network
              </span>
              <h1 className="display-4 fw-extrabold text-dark mb-3 lh-sm">
                Find the Right Doctor. <br />
                <span className="text-gradient-primary">Book the Right Care.</span>
              </h1>
              <p className="lead text-secondary mb-4 pe-lg-4">
                Access verified specialist doctors, instant appointment slots, digital health records, and seamless consultations—all in one secure SaaS platform.
              </p>

              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4">
                <Button variant="primary" size="lg" onClick={() => navigate('/doctors')}>
                  Find a Doctor
                </Button>
                <Button variant="outline-primary" size="lg" onClick={() => navigate('/patient/book')}>
                  Book Appointment
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-4 pt-3 border-top text-secondary small">
                <div className="d-flex align-items-center gap-2">
                  <FaCheckCircle className="text-success fs-5" />
                  <span>100% Verified Doctors</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaClock className="text-primary fs-5" />
                  <span>24/7 Appointment Booking</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 text-center">
              <div className="position-relative d-inline-block">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
                  alt="Senior Medical Specialist"
                  className="img-fluid rounded-4 shadow-lg border border-white border-4"
                  style={{ maxHeight: 450, objectFit: 'cover' }}
                />
                {/* Floating Rating Pill */}
                <div className="position-absolute bottom-0 start-0 translate-middle-y bg-white p-3 rounded-3 shadow-lg d-flex align-items-center gap-3 ms-4 border">
                  <div className="bg-warning bg-opacity-10 text-warning p-2.5 rounded-circle">
                    <FaStar className="fs-4" />
                  </div>
                  <div className="text-start">
                    <div className="fw-bold text-dark fs-5">4.9 / 5.0</div>
                    <small className="text-muted">Over 10,000+ Patient Reviews</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Search Widget Container */}
      <section className="container mt-n5 position-relative z-3">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSpec={selectedSpec}
          setSelectedSpec={setSelectedSpec}
          selectedLoc={selectedLoc}
          setSelectedLoc={setSelectedLoc}
          onSearch={handleSearchSubmit}
        />
      </section>

      {/* Specializations Grid */}
      <section className="section-padding container">
        <div className="text-center mb-5">
          <span className="text-primary font-monospace fw-bold text-uppercase small">Specialized Care</span>
          <h2 className="fw-bold text-dark display-6">Explore Top Medical Specializations</h2>
          <p className="text-secondary max-w-xl mx-auto">Find expert healthcare practitioners tailored to your health requirements.</p>
        </div>

        <div className="row g-4">
          {specializationsList.map((spec) => (
            <div key={spec.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card card-hover h-100 border-0 p-3.5 text-center cursor-pointer"
                onClick={() => navigate(`/doctors?spec=${encodeURIComponent(spec.name)}`)}
              >
                <div className="p-3 bg-primary-light text-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
                  <FaHeartbeat className="fs-3" />
                </div>
                <h6 className="fw-bold text-dark mb-1">{spec.name}</h6>
                <p className="text-muted small mb-3">{spec.description}</p>
                <span className="text-primary small fw-semibold d-inline-flex align-items-center gap-1">
                  Explore Doctors <FaChevronRight size={10} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white section-padding border-top border-bottom">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-primary font-monospace fw-bold text-uppercase small">Simple & Fast Process</span>
            <h2 className="fw-bold text-dark display-6">How Book A Doctor Works</h2>
            <p className="text-secondary">4 simple steps to connect with certified healthcare practitioners.</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-12 col-md-3">
              <div className="p-4 rounded-4 bg-light h-100">
                <div className="bg-primary text-white rounded-circle fs-4 fw-bold mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  1
                </div>
                <h6 className="fw-bold text-dark mb-2">Search Specialist</h6>
                <p className="text-muted small mb-0">Search doctors by name, specialization, city, or clinic location.</p>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="p-4 rounded-4 bg-light h-100">
                <div className="bg-primary text-white rounded-circle fs-4 fw-bold mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  2
                </div>
                <h6 className="fw-bold text-dark mb-2">Select Date & Time</h6>
                <p className="text-muted small mb-0">Browse real-time availability slots and pick a convenient time.</p>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="p-4 rounded-4 bg-light h-100">
                <div className="bg-primary text-white rounded-circle fs-4 fw-bold mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  3
                </div>
                <h6 className="fw-bold text-dark mb-2">Provide Details</h6>
                <p className="text-muted small mb-0">Describe symptoms and upload previous medical reports securely.</p>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="p-4 rounded-4 bg-light h-100">
                <div className="bg-primary text-white rounded-circle fs-4 fw-bold mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  4
                </div>
                <h6 className="fw-bold text-dark mb-2">Instant Confirmation</h6>
                <p className="text-muted small mb-0">Receive instant booking ID, notifications, and prescription updates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="section-padding container">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5">
          <div>
            <span className="text-primary font-monospace fw-bold text-uppercase small">Top Verified Specialists</span>
            <h2 className="fw-bold text-dark display-6 mb-0">Featured Doctors</h2>
          </div>
          <Link to="/doctors" className="btn btn-outline-primary mt-3 mt-md-0 fw-semibold">
            View All Doctors
          </Link>
        </div>

        <div className="row g-4">
          {featuredDoctors.map((doctor) => (
            <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="bg-primary text-white py-5">
        <div className="container py-3">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold mb-1">500+</h2>
              <p className="text-white-50 mb-0">Verified Doctors</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold mb-1">25,000+</h2>
              <p className="text-white-50 mb-0">Appointments Completed</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold mb-1">98.5%</h2>
              <p className="text-white-50 mb-0">Patient Satisfaction</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="display-5 fw-bold mb-1">45+</h2>
              <p className="text-white-50 mb-0">Medical Specializations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding container text-center">
        <div className="bg-light p-5 rounded-4 border">
          <h2 className="fw-bold text-dark mb-3">Ready to Book Your Doctor Consultation?</h2>
          <p className="text-secondary max-w-xl mx-auto mb-4">
            Connect with top certified doctors in under 2 minutes. Simple, fast, and transparent healthcare.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/doctors" className="btn btn-primary btn-lg px-4">
              Book Appointment Now
            </Link>
            <Link to="/register/doctor" className="btn btn-outline-primary btn-lg px-4">
              Join as a Doctor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
