import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaKey } from 'react-icons/fa';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Password reset link sent to your email address!');
      setEmail('');
    }, 600);
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center min-vh-75">
      <div className="card border-0 shadow-lg p-4 p-md-5 w-100 max-w-md rounded-4">
        <div className="text-center mb-4">
          <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle d-inline-flex mb-3">
            <FaKey className="fs-3" />
          </div>
          <h4 className="fw-bold text-dark mb-1">Reset Password</h4>
          <p className="text-secondary small">Enter your email address to receive password reset instructions</p>
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

          <Button type="submit" variant="primary" isLoading={loading} className="w-100 py-2.5 mb-3">
            Send Reset Link
          </Button>
        </form>

        <div className="text-center mt-3 pt-3 border-top">
          <Link to="/login" className="small text-primary text-decoration-none fw-semibold">
            ← Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
