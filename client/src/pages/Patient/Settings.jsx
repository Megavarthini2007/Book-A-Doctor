import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [pwData, setPwData] = useState({ current: '', new: '', confirm: '' });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (pwData.new !== pwData.confirm) {
      toast.error('New passwords do not match!');
      return;
    }
    toast.success('Security settings updated successfully!');
    setPwData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="max-w-2xl">
      <h4 className="fw-bold text-dark mb-1">Portal Settings</h4>
      <p className="text-secondary small mb-4">Manage security preferences, password, and notification settings</p>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'account' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('account')}>
            Account & Security
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'notifications' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('notifications')}>
            Notifications
          </button>
        </li>
      </ul>

      {activeTab === 'account' && (
        <div className="card border-0 shadow-sm p-4">
          <h6 className="fw-bold text-dark mb-3">Change Password</h6>
          <form onSubmit={handlePasswordSubmit}>
            <Input
              label="Current Password"
              type="password"
              value={pwData.current}
              onChange={(e) => setPwData({ ...pwData, current: e.target.value })}
              required
            />
            <Input
              label="New Password"
              type="password"
              value={pwData.new}
              onChange={(e) => setPwData({ ...pwData, new: e.target.value })}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={pwData.confirm}
              onChange={(e) => setPwData({ ...pwData, confirm: e.target.value })}
              required
            />
            <div className="text-end">
              <Button type="submit" variant="primary">
                Update Password
              </Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="card border-0 shadow-sm p-4">
          <h6 className="fw-bold text-dark mb-3">Notification Preferences</h6>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="emailNotif" defaultChecked />
            <label className="form-check-label text-dark fw-semibold" htmlFor="emailNotif">
              Email Appointment Confirmations
            </label>
          </div>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="smsNotif" defaultChecked />
            <label className="form-check-label text-dark fw-semibold" htmlFor="smsNotif">
              SMS Reminders (1 hour prior to appointment)
            </label>
          </div>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="rxNotif" defaultChecked />
            <label className="form-check-label text-dark fw-semibold" htmlFor="rxNotif">
              Prescription Availability Alerts
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
