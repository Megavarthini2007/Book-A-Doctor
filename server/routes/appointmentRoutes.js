const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);
router.put('/:id/cancel', appointmentController.cancelAppointment);
router.put('/:id/status', appointmentController.updateAppointmentStatus);

module.exports = router;
