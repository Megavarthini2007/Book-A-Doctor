const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: String,
  size: String,
  type: String
}, { _id: false });

const timelineSchema = new mongoose.Schema({
  status: String,
  date: String
}, { _id: false });

const medicineSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  frequency: String,
  duration: String,
  instructions: String
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
  id: String,
  medicines: [medicineSchema],
  followUp: String
}, { _id: false });

const appointmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  patientEmail: { type: String },
  patientPhone: { type: String },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorSpecialization: { type: String },
  doctorClinic: { type: String },
  doctorLocation: { type: String },
  doctorImage: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  slotPeriod: { type: String },
  reason: { type: String },
  status: { type: String, default: 'Pending' },
  fee: { type: Number, default: 0 },
  paymentStatus: { type: String, default: 'Pending' },
  documents: [documentSchema],
  timeline: [timelineSchema],
  notes: { type: String, default: '' },
  prescription: prescriptionSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
