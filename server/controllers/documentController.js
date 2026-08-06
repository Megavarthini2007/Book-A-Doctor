const MedicalDocument = require('../models/MedicalDocument');

exports.getDocuments = async (req, res) => {
  try {
    const { patientId } = req.query;
    let query = {};
    if (patientId) query.patientId = patientId;
    const documents = await MedicalDocument.find(query);
    res.status(200).json({ success: true, count: documents.length, documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    const docData = req.body;
    docData.id = docData.id || `doc-${Date.now()}`;
    const document = await MedicalDocument.create(docData);
    console.log(`Saved new Medical Document to MongoDB Atlas: ${document.name}`);
    res.status(201).json({ success: true, document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    await MedicalDocument.findOneAndDelete({ id: req.params.id });
    res.status(200).json({ success: true, message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
