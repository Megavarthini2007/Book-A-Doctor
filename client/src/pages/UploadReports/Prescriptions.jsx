import React, { useState, useEffect } from 'react';
import { FaPrescription, FaDownload, FaUserMd } from 'react-icons/fa';
import { appointmentService } from '../../services/appointmentService';
import { formatDate } from '../../utils/dateFormatter';
import { toast } from 'react-toastify';

export const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    appointmentService.getAppointments('patient', 'pat-201').then((res) => {
      if (res.success) {
        const rxItems = res.appointments.filter((a) => a.prescription);
        setPrescriptions(rxItems);
      }
    });
  }, []);

  return (
    <div>
      <h4 className="fw-bold text-dark mb-1">Digital Prescriptions</h4>
      <p className="text-secondary small mb-4">View digital prescriptions issued by your attending doctors</p>

      {prescriptions.length === 0 ? (
        <div className="card p-5 text-center border-0 shadow-sm">
          <FaPrescription className="display-3 text-muted mx-auto mb-3" />
          <h5 className="fw-bold text-dark">No Active Prescriptions</h5>
          <p className="text-muted small">Prescriptions will appear here after consultation completion.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {prescriptions.map((apt) => (
            <div key={apt.id} className="card border-0 shadow-sm p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center border-bottom pb-3 mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 bg-primary-subtle text-primary rounded-circle">
                    <FaUserMd className="fs-4" />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{apt.doctorName}</h6>
                    <small className="text-muted">{apt.doctorSpecialization} — {apt.doctorClinic}</small>
                  </div>
                </div>
                <div className="mt-2 mt-md-0 text-md-end">
                  <span className="badge bg-light text-dark mb-1">Ref #{apt.prescription.id}</span>
                  <div className="small text-muted">Issued: {formatDate(apt.date)}</div>
                </div>
              </div>

              <h6 className="fw-bold text-dark mb-2">Prescribed Medicines</h6>
              <div className="table-responsive mb-3">
                <table className="table table-bordered small">
                  <thead className="table-light">
                    <tr>
                      <th>Medicine Name</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Duration</th>
                      <th>Special Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apt.prescription.medicines.map((m, idx) => (
                      <tr key={idx}>
                        <td className="fw-bold text-primary">{m.name}</td>
                        <td>{m.dosage}</td>
                        <td>{m.frequency}</td>
                        <td>{m.duration}</td>
                        <td>{m.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {apt.prescription.followUp && (
                <div className="p-2.5 bg-light rounded text-dark small mb-3">
                  <strong>Follow-up Instructions:</strong> {apt.prescription.followUp}
                </div>
              )}

              <div className="text-end">
                <button className="btn btn-outline-primary btn-sm" onClick={() => toast.info('Prescription PDF downloaded!')}>
                  <FaDownload /> Download PDF Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
