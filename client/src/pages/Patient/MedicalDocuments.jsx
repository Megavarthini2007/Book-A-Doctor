import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaCloudUploadAlt, FaDownload, FaTrash } from 'react-icons/fa';
import FileUploader from '../../components/common/FileUploader';
import { patientService } from '../../services/patientService';
import { toast } from 'react-toastify';

export const MedicalDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    patientService.getMedicalDocuments().then((res) => {
      if (res.success) setDocuments(res.documents);
    });
  }, []);

  const handleDownload = (docName) => {
    toast.info(`Simulated download for ${docName}`);
  };

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">Medical Reports & Documents</h4>
      <p className="text-secondary small mb-4">Securely upload and access your lab reports, scans, and past records</p>

      <div className="card border-0 shadow-sm p-4 mb-4">
        <h6 className="fw-bold text-dark mb-3">Upload New Record</h6>
        <FileUploader
          onFilesSelected={(newFiles) => {
            if (newFiles.length > 0) toast.success('Documents added to your health library.');
          }}
        />
      </div>

      <div className="card border-0 shadow-sm p-4">
        <h6 className="fw-bold text-dark mb-3">Your Saved Medical Documents</h6>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr className="small text-uppercase text-secondary">
                <th>Document Name</th>
                <th>Category</th>
                <th>Upload Date</th>
                <th>Size</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="fw-semibold text-dark">
                    <FaFilePdf className="text-danger me-2" /> {doc.name}
                  </td>
                  <td><span className="badge bg-light text-dark">{doc.category}</span></td>
                  <td className="small text-muted">{doc.date}</td>
                  <td className="small text-muted">{doc.size}</td>
                  <td className="text-end">
                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleDownload(doc.name)}>
                      <FaDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalDocuments;
