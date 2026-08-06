import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserMd, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password, role);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        if (res.user.role === 'patient') navigate('/patient/dashboard');
        else if (res.user.role === 'doctor') navigate('/doctor/dashboard');
        else if (res.user.role === 'admin') navigate('/admin/dashboard');
      }
    } catch (err) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center min-vh-75">
      <div className="card border-0 shadow-lg p-4 p-md-5 w-100 max-w-md rounded-4">
        <div className="text-center mb-4">
          <div className="bg-primary text-white p-3 rounded-circle d-inline-flex mb-3">
            <FaUserMd className="fs-3" />
          </div>
          <h4 className="fw-bold text-dark mb-1">Account Login</h4>
          <p className="text-secondary small">Access your healthcare portal securely</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="btn-group w-100 mb-4" role="group">
          <button
            type="button"
            className={`btn btn-sm ${role === 'patient' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleRoleChange('patient')}
          >
            Patient
          </button>
          <button
            type="button"
            className={`btn btn-sm ${role === 'doctor' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleRoleChange('doctor')}
          >
            Doctor
          </button>
          <button
            type="button"
            className={`btn btn-sm ${role === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleRoleChange('admin')}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            icon={FaEnvelope}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />

          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold text-secondary small mb-1">Password *</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted border-end-0">
                <FaLock />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control border-start-0 border-end-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="btn btn-outline-light text-muted border border-start-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" defaultChecked />
              <label className="form-check-label small text-secondary" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="small text-primary text-decoration-none">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" isLoading={loading} className="w-100 py-2.5 mb-3">
            Sign In as {role.toUpperCase()}
          </Button>
        </form>

        <div className="text-center mt-3 pt-3 border-top">
          <span className="text-secondary small">Don't have a patient account? </span>
          <Link to="/register" className="fw-semibold text-primary text-decoration-none small">
            Register Here
          </Link>
          <div className="mt-2">
            <Link to="/register/doctor" className="small text-secondary text-decoration-underline">
              Are you a Doctor? Apply for Verification
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
