import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserMd,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaChevronRight,
  FaHeartbeat,
  FaCalendarCheck,
  FaCalendarAlt,
  FaLock,
  FaVideo,
  FaPhoneAlt,
  FaQuoteLeft,
  FaAward,
  FaSearch,
  FaUserShield,
  FaFileMedicalAlt,
  FaArrowRight
} from 'react-icons/fa';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import { doctorService } from '../../services/doctorService';
import { specializationsList } from '../../data/doctors';
import heroDoctorImg from '../../assets/images/doctor-hero.png';


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

  const coreFeatures = [
    {
      icon: <FaCalendarCheck className="text-primary" />,
      bg: '#eff6ff',
      title: 'Instant Online Booking',
      desc: 'Lock in your consultation slot in under 30 seconds without standing in clinic queues.'
    },
    {
      icon: <FaUserShield className="text-indigo" style={{ color: '#4f46e5' }} />,
      bg: '#eef2ff',
      title: '100% Vetted Specialists',
      desc: 'Rigorous background check and state council verification for every healthcare practitioner.'
    },
    {
      icon: <FaFileMedicalAlt className="text-info" style={{ color: '#06b6d4' }} />,
      bg: '#ecfeff',
      title: 'Digital Health Vault',
      desc: 'Access your encrypted medical records, lab reports, and e-prescriptions anytime anywhere.'
    },
    {
      icon: <FaVideo className="text-emerald" style={{ color: '#10b981' }} />,
      bg: '#ecfdf5',
      title: 'In-Clinic & Telehealth',
      desc: 'Choose between in-person physical visits or instant HD video consultation from home.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Search & Compare',
      desc: 'Find verified doctors by specialization, experience, location, or consultation fee.'
    },
    {
      num: '02',
      title: 'Choose Preferred Slot',
      desc: 'Pick your suitable date & time slot with instant real-time booking confirmation.'
    },
    {
      num: '03',
      title: 'Receive Quality Care',
      desc: 'Visit the clinic or join your video call, get digital prescriptions & follow-up care.'
    }
  ];

  const testimonials = [
    {
      name: 'Ananya Roy',
      role: 'Verified Patient',
      location: 'Bengaluru',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      comment: 'Booking a specialist was seamless! I got a same-day appointment with top cardiologist Dr. Arjun. The digital prescription feature is super convenient.',
      rating: 5
    },
    {
      name: 'Rajesh Verma',
      role: 'Verified Patient',
      location: 'Koramangala',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      comment: 'Extremely clean UI and fast booking! No hidden fees, clear consultation charges, and prompt reminders before the appointment.',
      rating: 5
    },
    {
      name: 'Dr. Meera Nambiar',
      role: 'Senior Pediatrician',
      location: 'Indiranagar',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150',
      comment: 'As a healthcare provider, Book A Doctor simplified my appointment schedule and patient management tremendously. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-hero-mesh py-5 py-lg-6 position-relative overflow-hidden border-bottom">
        <div className="glow-orb-1" />
        <div className="glow-orb-2" />

        <div className="container py-lg-4 position-relative z-1">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              {/* Verified Badge */}
              <div className="mb-4">
                <div className="hero-verified-badge">
                  <FaShieldAlt size={14} className="text-primary" />
                  <span>Verified Medical Specialists</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="hero-title mb-4">
                Your Health, Our Priority.{' '}
                <span className="hero-title-blue">
                  Book Top Doctors Online.
                </span>
              </h1>

              {/* Paragraph Description */}
              <p className="lead text-secondary mb-4 pe-lg-4 fs-6" style={{ color: '#475569', maxWidth: 580 }}>
                Connect with verified healthcare professionals, schedule in-person or video consultations, manage digital prescriptions, and access medical records anytime.
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-5">
                <button className="hero-btn-primary" onClick={() => navigate('/doctors')}>
                  Find a Doctor <FaArrowRight size={14} />
                </button>
                <button className="hero-btn-outline" onClick={() => navigate('/doctors')}>
                  Explore Specialties
                </button>
              </div>

              {/* Stats Row */}
              <div className="row g-4 pt-3 border-top text-start">
                <div className="col-4">
                  <div className="hero-stat-num">500+</div>
                  <div className="hero-stat-label">Verified Doctors</div>
                </div>
                <div className="col-4">
                  <div className="hero-stat-num">50k+</div>
                  <div className="hero-stat-label">Happy Patients</div>
                </div>
                <div className="col-4">
                  <div className="hero-stat-num">4.9/5</div>
                  <div className="hero-stat-label">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Doctor Image Column */}
            <div className="col-12 col-lg-6 text-center">
              <div className="hero-img-container">
                <img
                  src={heroDoctorImg}
                  alt="Verified Doctor Specialist"
                  className="hero-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=650';
                  }}
                />

                {/* Floating Instant Booking Badge */}
                <div className="hero-floating-badge">
                  <div className="p-2.5 bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                    <FaCalendarAlt className="fs-5 text-primary" />
                  </div>
                  <div className="text-start">
                    <div className="fw-bold text-dark fs-6 mb-0">Instant Booking</div>
                    <small className="text-muted fw-medium" style={{ fontSize: '0.8rem' }}>24/7 Availability</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Doctor Search Bar */}
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

      {/* Why Choose Us / Core Values */}
      <section className="py-5 my-4 container">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-1.5 rounded-pill uppercase mb-2">Why Choose Us</span>
          <h2 className="fw-extrabold text-dark display-6">Healthcare Built Around You</h2>
          <p className="text-secondary max-w-xl mx-auto fs-6">Experience modern medical booking designed for speed, safety, and patient comfort.</p>
        </div>

        <div className="row g-4">
          {coreFeatures.map((feat, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-3">
              <div className="feature-card">
                <div className="icon-glow-wrapper mb-3" style={{ backgroundColor: feat.bg }}>
                  {feat.icon}
                </div>
                <h5 className="fw-bold text-dark mb-2">{feat.title}</h5>
                <p className="text-secondary small mb-0 lh-base">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container py-lg-3">
          <div className="text-center mb-5">
            <span className="badge bg-indigo bg-opacity-10 text-primary fw-semibold px-3 py-1.5 rounded-pill mb-2">Simple Process</span>
            <h2 className="fw-extrabold text-dark display-6">How Book A Doctor Works</h2>
            <p className="text-secondary max-w-xl mx-auto fs-6">Get connected with top medical care in 3 effortless steps.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {steps.map((step, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4 position-relative bg-light">
                  <div className="step-number-badge mx-auto mb-4">{step.num}</div>
                  <h5 className="fw-bold text-dark mb-2">{step.title}</h5>
                  <p className="text-secondary small mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Specializations Grid */}
      <section className="py-5 my-4 container">
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-5">
          <div>
            <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-1.5 rounded-pill mb-2">Specialized Healthcare</span>
            <h2 className="fw-extrabold text-dark display-6 mb-0">Explore Top Specializations</h2>
          </div>
          <Link to="/doctors" className="btn btn-link text-primary fw-bold text-decoration-none p-0 mt-3 mt-md-0 d-flex align-items-center gap-1">
            Browse All Specializations <FaChevronRight size={12} />
          </Link>
        </div>

        <div className="row g-4">
          {specializationsList.map((spec) => (
            <div key={spec.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card card-hover h-100 border-0 p-4 text-center cursor-pointer shadow-xs rounded-4 bg-white"
                onClick={() => navigate(`/doctors?spec=${encodeURIComponent(spec.name)}`)}
              >
                <div
                  className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ width: 64, height: 64 }}
                >
                  <FaHeartbeat className="fs-3" />
                </div>
                <h6 className="fw-bold text-dark mb-1 fs-5">{spec.name}</h6>
                <p className="text-muted small mb-3">{spec.description}</p>
                <span className="text-primary small fw-bold d-inline-flex align-items-center gap-1 mt-auto">
                  View Doctors <FaChevronRight size={10} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container py-lg-3">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5">
            <div>
              <span className="badge bg-success bg-opacity-10 text-success fw-semibold px-3 py-1.5 rounded-pill mb-2">Top Rated Doctors</span>
              <h2 className="fw-extrabold text-dark display-6 mb-0">Featured Specialists</h2>
            </div>
            <Link to="/doctors" className="btn btn-outline-primary mt-3 mt-md-0 fw-semibold px-4 py-2.5 rounded-pill">
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
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="py-5 my-4 container">
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-15 text-warning fw-semibold px-3 py-1.5 rounded-pill mb-2">Patient Stories</span>
          <h2 className="fw-extrabold text-dark display-6">Trusted by 10,000+ Patients</h2>
          <p className="text-secondary max-w-xl mx-auto">Read real experiences from patients who found quality care through our network.</p>
        </div>

        <div className="row g-4">
          {testimonials.map((t, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="card border-0 shadow-sm p-4 h-100 rounded-4 bg-white d-flex flex-column">
                <div className="d-flex align-items-center gap-1 text-warning mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} size={16} />
                  ))}
                </div>
                <p className="text-secondary small mb-4 flex-grow-1 fst-italic">"{t.comment}"</p>
                <div className="d-flex align-items-center gap-3 pt-3 border-top mt-auto">
                  <img src={t.image} alt={t.name} className="rounded-circle" style={{ width: 44, height: 44, objectFit: 'cover' }} />
                  <div>
                    <h6 className="fw-bold text-dark mb-0 small">{t.name}</h6>
                    <span className="text-muted small" style={{ fontSize: '0.78rem' }}>{t.role} • {t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency & Quick Consultation CTA Banner */}
      <section className="container pb-5 mb-4">
        <div className="emergency-cta-card p-4 p-md-5 text-white shadow-lg">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-8">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-danger bg-opacity-25 text-white small fw-bold mb-3 border border-danger border-opacity-50">
                <FaPhoneAlt size={12} className="text-danger" /> 24/7 Emergency Assistance Hotline
              </div>
              <h2 className="fw-extrabold display-6 mb-3 text-white">Need Urgent Consultation or Medical Help?</h2>
              <p className="text-white-50 mb-0 lead fs-6">
                Connect with emergency doctors on-demand or locate nearest hospital casualty wards instantly.
              </p>
            </div>
            <div className="col-12 col-lg-4 text-lg-end">
              <div className="d-flex flex-column flex-sm-row flex-lg-column gap-3 justify-content-lg-end">
                <Button variant="primary" size="lg" onClick={() => navigate('/doctors')} className="px-4 py-3 fw-bold">
                  Book Instant Visit
                </Button>
                <a href="tel:108" className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold d-inline-flex align-items-center justify-content-center gap-2">
                  <FaPhoneAlt size={14} /> Call 108 / 1800-456-7890
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

