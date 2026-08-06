const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  id: String,
  time: String,
  period: String,
  available: { type: Boolean, default: true }
}, { _id: false });

const doctorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String, default: '' },
  specialization: { type: String, required: true },
  qualification: { type: String, default: '' },
  experience: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  clinicName: { type: String, default: '' },
  location: { type: String, default: '' },
  city: { type: String, default: '' },
  consultationFee: { type: Number, default: 500 },
  about: { type: String, default: '' },
  verified: { type: Boolean, default: true },
  availableDays: [{ type: String }],
  availableSlots: [slotSchema],
  image: { type: String, default: '' },
  status: { type: String, default: 'Approved' },
  regNumber: { type: String, default: '' },
  registrationYear: { type: Number }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
