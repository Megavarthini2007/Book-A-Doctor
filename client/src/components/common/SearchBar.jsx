import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaStethoscope } from 'react-icons/fa';
import Button from './Button';

export const SearchBar = ({ searchQuery, setSearchQuery, selectedSpec, setSelectedSpec, selectedLoc, setSelectedLoc, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="search-widget-card p-3 p-md-4">
      <div className="row g-3 align-items-center">
        <div className="col-12 col-md-4">
          <div className="input-group search-input-box overflow-hidden">
            <span className="input-group-text bg-transparent border-0 text-primary ps-3 pe-2">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control border-0 bg-transparent ps-0 shadow-none"
              placeholder="Search doctor name, specialty, clinic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="input-group search-input-box overflow-hidden">
            <span className="input-group-text bg-transparent border-0 text-primary ps-3 pe-2">
              <FaStethoscope />
            </span>
            <select className="form-select border-0 bg-transparent ps-0 shadow-none cursor-pointer" value={selectedSpec} onChange={(e) => setSelectedSpec(e.target.value)}>
              <option value="All">All Specializations</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
              <option value="General Physician">General Physician</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="input-group search-input-box overflow-hidden">
            <span className="input-group-text bg-transparent border-0 text-primary ps-3 pe-2">
              <FaMapMarkerAlt />
            </span>
            <select className="form-select border-0 bg-transparent ps-0 shadow-none cursor-pointer" value={selectedLoc} onChange={(e) => setSelectedLoc(e.target.value)}>
              <option value="All">All Locations</option>
              <option value="Koramangala">Koramangala</option>
              <option value="Indiranagar">Indiranagar</option>
              <option value="Jayanagar">Jayanagar</option>
              <option value="HSR Layout">HSR Layout</option>
              <option value="Whitefield">Whitefield</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-md-2">
          <Button type="submit" variant="primary" className="w-100 py-2.5 d-flex align-items-center justify-content-center gap-2">
            <FaSearch size={14} /> Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
