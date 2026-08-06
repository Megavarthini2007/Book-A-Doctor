const mongoose = require('mongoose');

const medicalDocumentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  patientId: { type: String, required: true },
  patientEmail: { type: String },
  name: { type: String, required: true },
  category: { type: String, default: 'Medical Report' },
  size: { type: String, default: '1.0 MB' },
  fileUrl: { type: String, default: '' },
  uploadDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'Active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('MedicalDocument', medicalDocumentSchema);
