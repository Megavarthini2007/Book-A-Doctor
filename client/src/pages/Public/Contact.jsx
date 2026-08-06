import React, { useState } from 'react';
import Breadcrumb from '../../components/layout/Breadcrumb';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Your message has been sent to our healthcare support team!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div className="row g-5 my-2">
        <div className="col-12 col-lg-6">
          <h2 className="fw-bold text-dark mb-3">Get in Touch with Our Healthcare Support</h2>
          <p className="text-secondary mb-4">
            Have questions regarding doctor registration, appointment bookings, or technical support? Fill out the form or reach out directly.
          </p>
          <div className="bg-white p-4 rounded-4 border">
            <h6 className="fw-bold text-dark mb-2">Book A Doctor HQ</h6>
            <p className="text-muted small mb-1">Healthcare Tech Park, Outer Ring Road, Bengaluru</p>
            <p className="text-muted small mb-1">Email: support@bookadoctor.com</p>
            <p className="text-muted small mb-0">Toll-Free Support: +91 1800-456-7890</p>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold text-dark mb-3">Send Us a Message</h5>
            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
              <Textarea
                label="Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <Button type="submit" variant="primary" isLoading={loading} className="w-100 py-2.5">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
