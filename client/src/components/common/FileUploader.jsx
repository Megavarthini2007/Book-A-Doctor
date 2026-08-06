import React, { useState } from 'react';
import { FaCloudUploadAlt, FaFilePdf, FaFileImage, FaTrash, FaCheckCircle } from 'react-icons/fa';

export const FileUploader = ({ onFilesSelected, maxFiles = 3, allowedTypes = ['pdf', 'jpg', 'png'] }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    setError('');
    const newFiles = selectedFiles.map((file) => ({
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type.includes('pdf') ? 'PDF' : 'Image',
      progress: 100
    }));

    const updated = [...files, ...newFiles];
    setFiles(updated);
    if (onFilesSelected) onFilesSelected(updated);
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onFilesSelected) onFilesSelected(updated);
  };

  return (
    <div className="mb-4">
      <div className="border-2 border-dashed border-primary-subtle rounded-3 p-4 text-center bg-light bg-opacity-50">
        <FaCloudUploadAlt className="display-4 text-primary mb-2" />
        <h6 className="fw-bold text-dark mb-1">Upload Medical Reports & Documents</h6>
        <p className="text-muted small mb-3">Supported formats: PDF, JPG, PNG (Max 5MB each)</p>
        <label className="btn btn-outline-primary btn-sm px-4">
          Browse Files
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} hidden />
        </label>
      </div>

      {error && <div className="text-danger small mt-2">{error}</div>}

      {files.length > 0 && (
        <div className="mt-3 d-flex flex-column gap-2">
          {files.map((fileItem, idx) => (
            <div key={idx} className="d-flex align-items-center justify-content-between p-2.5 border rounded bg-white">
              <div className="d-flex align-items-center gap-2">
                {fileItem.type === 'PDF' ? <FaFilePdf className="text-danger fs-5" /> : <FaFileImage className="text-primary fs-5" />}
                <div>
                  <div className="fw-semibold small text-dark">{fileItem.name}</div>
                  <div className="text-muted small">{fileItem.size}</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-success-subtle text-success small d-flex align-items-center gap-1">
                  <FaCheckCircle size={12} /> Ready
                </span>
                <button type="button" className="btn btn-link text-danger p-0" onClick={() => removeFile(idx)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
