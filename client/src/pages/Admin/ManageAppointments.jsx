import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import StatusBadge from '../../components/common/StatusBadge';
import { adminService } from '../../services/adminService';
import { formatDate } from '../../utils/dateFormatter';

export const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    adminService.getAppointments().then((res) => {
      if (res.success) setAppointments(res.appointments);
    });
  }, []);

  const filtered = appointments.filter((a) => {
    const matchesQuery = a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesQuery && matchesStatus;
  });

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">Master Appointments Audit</h4>
      <p className="text-secondary small mb-4">View and track all appointment records platform-wide</p>

      <div className="card border-0 shadow-sm p-4">
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white"><FaSearch className="text-muted" /></span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by ID, patient, or doctor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr className="small text-uppercase text-secondary">
                <th>Apt ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td className="fw-bold">#{a.id}</td>
                  <td className="fw-semibold text-dark">{a.patientName}</td>
                  <td className="text-primary small">{a.doctorName}</td>
                  <td className="small">{formatDate(a.date)} at {a.time}</td>
                  <td className="fw-bold">₹{a.fee}</td>
                  <td><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;
