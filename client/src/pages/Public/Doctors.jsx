import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import FilterPanel from '../../components/common/FilterPanel';
import SearchBar from '../../components/common/SearchBar';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/common/Pagination';
import Breadcrumb from '../../components/layout/Breadcrumb';
import Sidebar from '../../components/layout/Sidebar';
import { doctorService } from '../../services/doctorService';
import { usePagination } from '../../hooks/usePagination';
import { useAuth } from '../../hooks/useAuth';
import { FaChartPie, FaSearch, FaCalendarAlt, FaHistory, FaFileMedical, FaPrescription, FaBell, FaUser, FaCog } from 'react-icons/fa';

export const Doctors = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSpec, setSelectedSpec] = useState(searchParams.get('spec') || 'All');
  const [selectedLoc, setSelectedLoc] = useState(searchParams.get('loc') || 'All');

  const [filters, setFilters] = useState({
    sortBy: 'recommended',
    maxFee: 2000
  });

  const sidebarLinks = [
    { label: 'Dashboard', path: '/patient/dashboard', icon: FaChartPie },
    { label: 'Find Doctors', path: '/patient/doctors', icon: FaSearch },
    { label: 'Book Appointment', path: '/patient/book', icon: FaCalendarAlt },
    { label: 'My Appointments', path: '/patient/appointments', icon: FaHistory },
    { label: 'Medical Records', path: '/patient/documents', icon: FaFileMedical },
    { label: 'Prescriptions', path: '/patient/prescriptions', icon: FaPrescription },
    { label: 'Notifications', path: '/patient/notifications', icon: FaBell, badge: '2' },
    { label: 'Profile', path: '/patient/profile', icon: FaUser },
    { label: 'Settings', path: '/patient/settings', icon: FaCog }
  ];

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await doctorService.getDoctors({
        searchQuery,
        specialization: selectedSpec,
        location: selectedLoc,
        maxFee: filters.maxFee,
        sortBy: filters.sortBy
      });
      if (res.success) {
        setDoctors(res.doctors);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [searchQuery, selectedSpec, selectedLoc, filters]);

  const { currentPage, totalPages, currentItems, goToPage } = usePagination(doctors, 6);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpec('All');
    setSelectedLoc('All');
    setFilters({ sortBy: 'recommended', maxFee: 2000 });
  };

  const isInsidePatientLayout = location.pathname.startsWith('/patient');

  const mainPageContent = (
    <div className="py-2">
      <Breadcrumb items={[{ label: 'Find Doctors' }]} />

      <div className="mb-4">
        <h2 className="fw-bold text-dark">Find & Book Doctors</h2>
        <p className="text-secondary small mb-0">Browse verified medical practitioners and book consultations instant online.</p>
      </div>

      <div className="mb-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSpec={selectedSpec}
          setSelectedSpec={setSelectedSpec}
          selectedLoc={selectedLoc}
          setSelectedLoc={setSelectedLoc}
          onSearch={fetchDoctors}
        />
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-3 col-lg-4">
          <FilterPanel filters={filters} setFilters={setFilters} onReset={handleResetFilters} />
        </div>

        <div className="col-12 col-xl-9 col-lg-8">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="text-secondary small">
              Showing <strong>{doctors.length}</strong> doctors available
            </span>
          </div>

          {loading ? (
            <SkeletonLoader count={3} type="card" />
          ) : doctors.length === 0 ? (
            <EmptyState
              title="No Doctors Found"
              description="No medical practitioners match your search criteria. Try expanding your search or adjusting filters."
              actionLabel="Reset Search Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <>
              <div className="row g-4">
                {currentItems.map((doctor) => (
                  <div key={doctor.id} className="col-12 col-md-6">
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (isInsidePatientLayout) {
    return mainPageContent;
  }

  return (
    <div className="container-fluid px-3 px-md-4 py-3 flex-grow-1 d-flex gap-4">
      <div className="d-none d-md-block flex-shrink-0">
        <Sidebar links={sidebarLinks} title="Patient Portal" />
      </div>
      <div className="flex-grow-1 min-w-0">
        {mainPageContent}
      </div>
    </div>
  );
};

export default Doctors;
