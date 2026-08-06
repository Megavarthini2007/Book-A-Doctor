const Prescription = require('../models/Prescription');

exports.getPrescriptions = async (req, res) => {
  try {
    const { patientId, doctorId } = req.query;
    let query = {};
    if (patientId) query.patientId = patientId;
    if (doctorId) query.doctorId = doctorId;
    const prescriptions = await Prescription.find(query);
    res.status(200).json({ success: true, count: prescriptions.length, prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPrescription = async (req, res) => {
  try {
    const rxData = req.body;
    rxData.id = rxData.id || `RX-${Math.floor(100 + Math.random() * 900)}`;
    const prescription = await Prescription.create(rxData);
    console.log(`Saved new Prescription to MongoDB Atlas: ${prescription.id}`);
    res.status(201).json({ success: true, prescription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
