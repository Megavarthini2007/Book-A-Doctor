import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { mockPatients } from '../../data/patients';

export const PatientsList = () => {
  const [patients] = useState(mockPatients);
  const [search, setSearch] = useState('');

  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">My Patient Directory</h4>
      <p className="text-secondary small mb-4">View patient profiles, consultation history, and medical records</p>

      <div className="card border-0 shadow-sm p-4 mb-4">
        <div className="input-group max-w-md mb-3">
          <span className="input-group-text bg-white"><FaSearch className="text-muted" /></span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search patient by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr className="small text-uppercase text-secondary">
                <th>Patient</th>
                <th>Contact</th>
                <th>Gender / DOB</th>
                <th>Blood Group</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="fw-bold text-dark">{p.name}</td>
                  <td className="small text-muted">{p.email}<br />{p.phone}</td>
                  <td className="small">{p.gender} ({p.dob})</td>
                  <td><span className="badge bg-danger-subtle text-danger">{p.bloodGroup}</span></td>
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

export default PatientsList;
