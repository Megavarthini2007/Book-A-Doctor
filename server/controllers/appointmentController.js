const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const aptData = req.body;
    aptData.id = aptData.id || `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const appointment = await Appointment.create(aptData);
    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { role, userId } = req.query;
    let query = {};
    if (role === 'patient' && userId) query.patientId = userId;
    if (role === 'doctor' && userId) query.doctorId = userId;
    const appointments = await Appointment.find(query);
    res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { id: req.params.id },
      { status: 'Cancelled' },
      { new: true }
    );
    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes, prescription } = req.body;
    const updateFields = { status };
    if (notes) updateFields.notes = notes;
    if (prescription) updateFields.prescription = prescription;

    const appointment = await Appointment.findOneAndUpdate(
      { id: req.params.id },
      updateFields,
      { new: true }
    );
    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
