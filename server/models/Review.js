const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  doctorId: { type: String, required: true },
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
