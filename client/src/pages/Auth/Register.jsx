import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCheckCircle } from 'react-icons/fa';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { validateEmail, validatePasswordStrength } from '../../utils/validation';
import { authService } from '../../services/authService';
import { toast } from 'react-toastify';

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.phone) newErrors.phone = 'Phone number is required';

    const pwCheck = validatePasswordStrength(formData.password);
    if (!pwCheck.isValid) newErrors.password = pwCheck.message;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await authService.registerPatient(formData);
      if (res.success) {
        toast.success('Registration successful! Redirecting to Patient Dashboard...');
        setTimeout(() => navigate('/patient/dashboard'), 1000);
      }
    } catch (err) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center min-vh-75">
      <div className="card border-0 shadow-lg p-4 p-md-5 w-100 max-w-lg rounded-4">
        <div className="text-center mb-4">
          <h4 className="fw-bold text-dark mb-1">Create Patient Account</h4>
          <p className="text-secondary small">Register to book doctors, access prescriptions & manage records</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            icon={FaUser}
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="John Doe"
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            icon={FaEnvelope}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="name@example.com"
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            icon={FaPhone}
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="+91 98765 43210"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            icon={FaLock}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Minimum 6 characters with numbers"
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            icon={FaLock}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Re-enter password"
            required
          />

          <div className="form-check mb-4">
            <input
              type="checkbox"
              className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label className="form-check-label small text-secondary" htmlFor="agreeTerms">
              I agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>.
            </label>
            {errors.agreeTerms && <div className="invalid-feedback d-block">{errors.agreeTerms}</div>}
          </div>

          <Button type="submit" variant="primary" isLoading={loading} className="w-100 py-2.5 mb-3">
            Register Account
          </Button>
        </form>

        <div className="text-center mt-3 pt-3 border-top">
          <span className="text-secondary small">Already have an account? </span>
          <Link to="/login" className="fw-semibold text-primary text-decoration-none small">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
