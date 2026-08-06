const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

router.get('/', prescriptionController.getPrescriptions);
router.post('/', prescriptionController.createPrescription);

module.exports = router;
