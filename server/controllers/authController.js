const User = require('../models/User');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');

// @desc    Register a new patient into MongoDB
// @route   POST /api/auth/register/patient
exports.registerPatient = async (req, res) => {
  try {
    const { fullName, email, phone, password, dob, gender, bloodGroup, address, city } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({ success: false, message: 'Please provide full name and email address' });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      user.name = fullName || user.name;
      user.phone = phone || user.phone;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
      await user.save();
      return res.status(200).json({ success: true, message: 'Patient account updated successfully in MongoDB', user });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = password ? await bcrypt.hash(password, salt) : '$2a$10$e1.hashedpasswordplaceholder';

    user = await User.create({
      id: `pat-${Date.now().toString().slice(-4)}`,
      name: fullName,
      email: email.toLowerCase(),
      phone: phone || '',
      password: hashedPassword,
      role: 'patient',
      dob: dob || '',
      gender: gender || '',
      bloodGroup: bloodGroup || '',
      address: address || '',
      city: city || 'Bengaluru',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });

    console.log(`Saved new patient to MongoDB Atlas: ${user.email} (${user.name})`);

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully in MongoDB database',
      user
    });
  } catch (error) {
    console.error('Register Patient Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Register a new doctor into MongoDB
// @route   POST /api/auth/register/doctor
exports.registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      qualification,
      regNumber,
      registrationYear,
      specialization,
      experience,
      consultationFee,
      clinicName,
      location,
      city,
      about
    } = req.body;

    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Please provide doctor name and email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = password ? await bcrypt.hash(password, salt) : '$2a$10$e1.hashedpasswordplaceholder';

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await User.create({
        id: `doc-${Date.now().toString().slice(-4)}`,
        name,
        email: email.toLowerCase(),
        phone: phone || '',
        password: hashedPassword,
        role: 'doctor',
        city: city || 'Bengaluru',
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'Approved'
      });
    } else {
      user.role = 'doctor';
      await user.save();
    }

    let doctor = await Doctor.findOne({ id: user.id });
    if (!doctor) {
      doctor = await Doctor.create({
        id: user.id,
        name: user.name,
        title: qualification || 'Senior Practitioner',
        specialization: specialization || 'General Medicine',
        qualification: qualification || '',
        experience: Number(experience) || 5,
        rating: 5.0,
        reviewCount: 0,
        clinicName: clinicName || 'Specialty Care Clinic',
        location: location || 'Central Area',
        city: city || 'Bengaluru',
        consultationFee: Number(consultationFee) || 700,
        about: about || '',
        verified: true,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        availableSlots: [
          { id: 's1', time: '09:00 AM', period: 'Morning', available: true },
          { id: 's2', time: '11:00 AM', period: 'Morning', available: true },
          { id: 's3', time: '03:00 PM', period: 'Afternoon', available: true }
        ],
        status: 'Approved',
        regNumber: regNumber || '',
        registrationYear: Number(registrationYear) || 2018
      });
    }

    console.log(`Saved new doctor to MongoDB Atlas: ${user.email} (${user.name})`);

    res.status(201).json({
      success: true,
      message: 'Doctor registered successfully in MongoDB database',
      user,
      doctor
    });
  } catch (error) {
    console.error('Register Doctor Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user and save/query MongoDB
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide email address' });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Save new user dynamically to MongoDB on login
      const username = email.split('@')[0];
      const formattedName = username
        ? username.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        : 'User';
      const displayName = role === 'doctor' && !formattedName.toLowerCase().startsWith('dr') ? `Dr. ${formattedName}` : formattedName;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = password ? await bcrypt.hash(password, salt) : '$2a$10$e1.hashedpasswordplaceholder';

      user = await User.create({
        id: `${role === 'doctor' ? 'doc' : role === 'admin' ? 'admin' : 'pat'}-${Date.now().toString().slice(-4)}`,
        name: displayName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || 'patient',
        city: 'Bengaluru',
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      });

      console.log(`Created & saved new ${user.role} to MongoDB Atlas: ${user.email}`);
    } else if (role && user.role !== role) {
      user.role = role;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile from MongoDB
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

