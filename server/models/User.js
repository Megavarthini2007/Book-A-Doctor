const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: '$2a$10$e1.hashedpasswordplaceholder' },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  dob: { type: String, default: '' },
  gender: { type: String, default: '' },
  bloodGroup: { type: String, default: '' },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  avatar: { type: String, default: '' },
  joinedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'Active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
