import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export const Profile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.patientInfo?.phone || user?.phone || '+91 98765 43210',
    dob: user?.patientInfo?.dob || '1995-01-01',
    gender: user?.patientInfo?.gender || 'Other',
    bloodGroup: user?.patientInfo?.bloodGroup || 'O+',
    address: user?.patientInfo?.address || 'Bengaluru, India'
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Profile details updated successfully!');
    }, 500);
  };

  return (
    <div className="max-w-2xl">
      <h4 className="fw-bold text-dark mb-1">Personal Profile</h4>
      <p className="text-secondary small mb-4">Manage your personal demographics and contact information</p>

      <div className="card border-0 shadow-sm p-4 mb-4">
        <div className="d-flex align-items-center gap-4 border-bottom pb-4 mb-4">
          <ProfileAvatar src={user?.avatar} name={formData.name} size="xl" />
          <div>
            <h5 className="fw-bold text-dark mb-1">{formData.name}</h5>
            <p className="text-secondary small mb-2">{formData.email}</p>
            <button className="btn btn-outline-primary btn-sm">Change Photo</button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="col-12 col-md-6">
              <Input label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="col-12 col-md-6">
              <Input label="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            </div>
            <div className="col-12 col-md-6">
              <Input label="Date of Birth" type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} required />
            </div>
            <div className="col-12 col-md-6">
              <Select
                label="Gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                  { label: 'Other', value: 'Other' }
                ]}
              />
            </div>
            <div className="col-12 col-md-6">
              <Select
                label="Blood Group"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                options={[
                  { label: 'O+', value: 'O+' },
                  { label: 'A+', value: 'A+' },
                  { label: 'B+', value: 'B+' },
                  { label: 'AB+', value: 'AB+' }
                ]}
              />
            </div>
            <div className="col-12">
              <Input label="Residential Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
            </div>
          </div>

          <div className="text-end mt-4">
            <Button type="submit" variant="primary" isLoading={loading}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
