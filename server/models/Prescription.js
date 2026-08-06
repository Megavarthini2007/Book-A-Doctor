const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, default: '1 tablet' },
  frequency: { type: String, default: 'Once daily' },
  duration: { type: String, default: '7 Days' },
  instructions: { type: String, default: 'After meals' }
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  appointmentId: { type: String },
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  patientEmail: { type: String },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorSpecialization: { type: String, default: '' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  medicines: [medicineSchema],
  diagnosis: { type: String, default: '' },
  followUp: { type: String, default: '' },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
