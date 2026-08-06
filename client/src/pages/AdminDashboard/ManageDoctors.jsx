import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import StatusBadge from '../../components/common/StatusBadge';
import { adminService } from '../../services/adminService';

export const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminService.getDoctors().then((res) => {
      if (res.success) setDoctors(res.doctors);
    });
  }, []);

  const filtered = doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">Doctors Directory & Management</h4>
      <p className="text-secondary small mb-4">View practitioner list, status, and verification details</p>

      <div className="card border-0 shadow-sm p-4">
        <div className="input-group max-w-md mb-3">
          <span className="input-group-text bg-white"><FaSearch className="text-muted" /></span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search by doctor name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr className="small text-uppercase text-secondary">
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Location</th>
                <th>Fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td className="fw-bold text-dark">{d.name}</td>
                  <td className="text-primary small fw-semibold">{d.specialization}</td>
                  <td className="small">{d.experience} Yrs</td>
                  <td className="small text-muted">{d.location}</td>
                  <td className="fw-bold text-dark">₹{d.consultationFee}</td>
                  <td><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageDoctors;
