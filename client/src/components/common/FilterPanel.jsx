import React from 'react';
import { FaFilter, FaUndo } from 'react-icons/fa';

export const FilterPanel = ({ filters, setFilters, onReset }) => {
  return (
    <div className="filter-panel-card p-3 p-md-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
        <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
          <FaFilter className="text-primary" /> Filter Doctors
        </h6>
        <button type="button" className="btn btn-link text-muted p-0 text-decoration-none small d-flex align-items-center gap-1" onClick={onReset}>
          <FaUndo size={12} /> Reset
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label small fw-semibold text-secondary">Sort By</label>
        <select className="form-select form-select-sm" value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
          <option value="recommended">Recommended</option>
          <option value="rating">Rating: High to Low</option>
          <option value="experience">Experience: High to Low</option>
          <option value="feeAsc">Fee: Low to High</option>
          <option value="feeDesc">Fee: High to Low</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label small fw-semibold text-secondary">Max Consultation Fee (₹)</label>
        <input
          type="range"
          className="form-range"
          min="300"
          max="2000"
          step="100"
          value={filters.maxFee || 2000}
          onChange={(e) => setFilters({ ...filters, maxFee: e.target.value })}
        />
        <div className="d-flex justify-content-between small text-muted">
          <span>₹300</span>
          <span className="fw-bold text-primary">₹{filters.maxFee || 2000}</span>
          <span>₹2000</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
