import React, { useState, useEffect } from 'react';
import { FaSearch, FaUsers } from 'react-icons/fa';
import { adminService } from '../../services/adminService';

export const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminService.getPatients().then((res) => {
      if (res.success) setPatients(res.patients);
    });
  }, []);

  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">Patient Directory</h4>
      <p className="text-secondary small mb-4">Manage registered patients across the platform</p>

      <div className="card border-0 shadow-sm p-4">
        <div className="input-group max-w-md mb-3">
          <span className="input-group-text bg-white"><FaSearch className="text-muted" /></span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search by patient name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr className="small text-uppercase text-secondary">
                <th>Patient Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="fw-bold text-dark">{p.name}</td>
                  <td className="small text-muted">{p.email}</td>
                  <td className="small">{p.phone}</td>
                  <td className="small">{p.city}</td>
                  <td><span className="badge bg-success-subtle text-success">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePatients;
