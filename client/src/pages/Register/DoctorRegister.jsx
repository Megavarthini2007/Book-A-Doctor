import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import FileUploader from '../../components/common/FileUploader';
import { authService } from '../../services/authService';

export const DoctorRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [doctorForm, setDoctorForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    qualification: '',
    regNumber: '',
    registrationYear: '2015',
    specialization: 'Cardiology',
    experience: '8',
    consultationFee: '800',
    clinicName: '',
    location: '',
    city: 'Bengaluru',
    about: '',
    documents: []
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.registerDoctor(doctorForm);
      if (res.success) {
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container py-5 d-flex justify-content-center align-items-center min-vh-75">
        <div className="card border-0 shadow-lg p-5 max-w-md text-center rounded-4">
          <div className="bg-success bg-opacity-10 text-success p-4 rounded-circle d-inline-flex mx-auto mb-4">
            <FaCheckCircle className="display-3" />
          </div>
          <h4 className="fw-bold text-dark mb-2">Application Submitted!</h4>
          <p className="text-secondary small mb-4">
            Your medical profile has been submitted for administrator approval. Our verification team will review your credentials shortly.
          </p>
          <div className="alert alert-info small mb-4">
            Status: <strong>Pending Administrator Verification</strong>
          </div>
          <Link to="/" className="btn btn-primary w-100">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark">Join as a Medical Practitioner</h3>
          <p className="text-secondary small">Complete the multi-step verification form to list your practice on Book A Doctor</p>
        </div>

        {/* Step Indicator */}
        <div className="d-flex justify-content-between mb-4 px-2">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`d-flex align-items-center justify-content-center rounded-circle fw-bold small ${
                step === currentStep
                  ? 'bg-primary text-white shadow'
                  : step < currentStep
                  ? 'bg-success text-white'
                  : 'bg-light text-muted border'
              }`}
              style={{ width: 36, height: 36 }}
            >
              {step < currentStep ? '✓' : step}
            </div>
          ))}
        </div>

        <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4">
          {currentStep === 1 && (
            <div>
              <h5 className="fw-bold text-dark mb-3">Step 1: Account Information</h5>
              <Input
                label="Full Name (with title)"
                value={doctorForm.name}
                onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                placeholder="Dr. Arjun Kumar"
                required
              />
              <Input
                label="Professional Email"
                type="email"
                value={doctorForm.email}
                onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                placeholder="arjun.k@apexhealth.com"
                required
              />
              <Input
                label="Phone Number"
                value={doctorForm.phone}
                onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                placeholder="+91 98765 43210"
                required
              />
              <Input
                label="Account Password"
                type="password"
                value={doctorForm.password}
                onChange={(e) => setDoctorForm({ ...doctorForm, password: e.target.value })}
                placeholder="••••••••"
                required
              />
              <div className="d-flex justify-content-end mt-4">
                <Button onClick={nextStep}>Next: Professional Info →</Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h5 className="fw-bold text-dark mb-3">Step 2: Professional Information</h5>
              <Input
                label="Medical Qualifications"
                value={doctorForm.qualification}
                onChange={(e) => setDoctorForm({ ...doctorForm, qualification: e.target.value })}
                placeholder="MBBS, MD (General Medicine), DM"
                required
              />
              <Input
                label="Medical Registration Number"
                value={doctorForm.regNumber}
                onChange={(e) => setDoctorForm({ ...doctorForm, regNumber: e.target.value })}
                placeholder="KMC-45920"
                required
              />
              <Input
                label="Registration Council & Year"
                value={doctorForm.registrationYear}
                onChange={(e) => setDoctorForm({ ...doctorForm, registrationYear: e.target.value })}
                placeholder="2012"
                required
              />
              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" onClick={prevStep}>
                  ← Back
                </Button>
                <Button onClick={nextStep}>Next: Specialization →</Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h5 className="fw-bold text-dark mb-3">Step 3: Specialization & Experience</h5>
              <Select
                label="Primary Specialization"
                value={doctorForm.specialization}
                onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                options={[
                  { label: 'Cardiology', value: 'Cardiology' },
                  { label: 'Dermatology', value: 'Dermatology' },
                  { label: 'Pediatrics', value: 'Pediatrics' },
                  { label: 'Orthopedics', value: 'Orthopedics' },
                  { label: 'Neurology', value: 'Neurology' },
                  { label: 'General Physician', value: 'General Physician' }
                ]}
              />
              <Input
                label="Years of Clinical Experience"
                type="number"
                value={doctorForm.experience}
                onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                required
              />
              <Input
                label="Consultation Fee (₹)"
                type="number"
                value={doctorForm.consultationFee}
                onChange={(e) => setDoctorForm({ ...doctorForm, consultationFee: e.target.value })}
                required
              />
              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" onClick={prevStep}>
                  ← Back
                </Button>
                <Button onClick={nextStep}>Next: Clinic Info →</Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h5 className="fw-bold text-dark mb-3">Step 4: Clinic Information</h5>
              <Input
                label="Clinic / Hospital Name"
                value={doctorForm.clinicName}
                onChange={(e) => setDoctorForm({ ...doctorForm, clinicName: e.target.value })}
                placeholder="Apex Heart Care"
                required
              />
              <Input
                label="Locality / Area"
                value={doctorForm.location}
                onChange={(e) => setDoctorForm({ ...doctorForm, location: e.target.value })}
                placeholder="Koramangala"
                required
              />
              <Input
                label="City"
                value={doctorForm.city}
                onChange={(e) => setDoctorForm({ ...doctorForm, city: e.target.value })}
                placeholder="Bengaluru"
                required
              />
              <Textarea
                label="Professional Biography"
                rows={3}
                value={doctorForm.about}
                onChange={(e) => setDoctorForm({ ...doctorForm, about: e.target.value })}
                placeholder="Brief summary of clinical expertise..."
              />
              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" onClick={prevStep}>
                  ← Back
                </Button>
                <Button onClick={nextStep}>Next: Upload Documents →</Button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h5 className="fw-bold text-dark mb-3">Step 5: Upload Verification Documents</h5>
              <p className="text-secondary small mb-3">
                Please upload copies of your Medical Council Registration Certificate and Government ID for verification.
              </p>
              <FileUploader onFilesSelected={(files) => setDoctorForm({ ...doctorForm, documents: files })} />
              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" onClick={prevStep}>
                  ← Back
                </Button>
                <Button onClick={nextStep}>Next: Review & Submit →</Button>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div>
              <h5 className="fw-bold text-dark mb-3">Step 6: Review Application</h5>
              <div className="p-3 bg-light rounded-3 mb-4 text-secondary small">
                <div><strong>Doctor:</strong> {doctorForm.name || 'Dr. Arjun Kumar'}</div>
                <div><strong>Specialization:</strong> {doctorForm.specialization} ({doctorForm.experience} Yrs Exp)</div>
                <div><strong>Qualifications:</strong> {doctorForm.qualification || 'MBBS, MD'}</div>
                <div><strong>Registration No:</strong> {doctorForm.regNumber || 'KMC-45920'}</div>
                <div><strong>Clinic:</strong> {doctorForm.clinicName || 'Apex Clinic'}, {doctorForm.location || 'Koramangala'}</div>
                <div><strong>Consultation Fee:</strong> ₹{doctorForm.consultationFee}</div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" onClick={prevStep}>
                  ← Back
                </Button>
                <Button variant="success" onClick={handleSubmit} isLoading={loading}>
                  Submit Application for Admin Approval
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;
