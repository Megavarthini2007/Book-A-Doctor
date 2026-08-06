import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

export const Availability = () => {
  const [schedule, setSchedule] = useState({
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    startTime: '09:00',
    endTime: '17:00',
    slotDuration: '30',
    breakTime: '13:00 - 14:00',
    leaveDates: ''
  });

  const [saving, setSaving] = useState(false);

  const handleDayToggle = (day) => {
    if (schedule.workingDays.includes(day)) {
      setSchedule({ ...schedule, workingDays: schedule.workingDays.filter((d) => d !== day) });
    } else {
      setSchedule({ ...schedule, workingDays: [...schedule.workingDays, day] });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Availability settings saved successfully!');
    }, 600);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-2xl">
      <h4 className="fw-bold text-dark mb-1">Manage Clinical Availability</h4>
      <p className="text-secondary small mb-4">Configure working days, consultation duration, break times, and leave dates</p>

      <div className="card border-0 shadow-sm p-4">
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary small">Working Days</label>
            <div className="d-flex flex-wrap gap-2">
              {daysOfWeek.map((day) => {
                const isActive = schedule.workingDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => handleDayToggle(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-6">
              <Input
                label="Start Time"
                type="time"
                value={schedule.startTime}
                onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
              />
            </div>
            <div className="col-6">
              <Input
                label="End Time"
                type="time"
                value={schedule.endTime}
                onChange={(e) => setSchedule({ ...schedule, endTime: e.target.value })}
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-6">
              <Select
                label="Slot Duration"
                value={schedule.slotDuration}
                onChange={(e) => setSchedule({ ...schedule, slotDuration: e.target.value })}
                options={[
                  { label: '15 Minutes', value: '15' },
                  { label: '30 Minutes', value: '30' },
                  { label: '45 Minutes', value: '45' },
                  { label: '60 Minutes', value: '60' }
                ]}
              />
            </div>
            <div className="col-6">
              <Input
                label="Break Hours"
                value={schedule.breakTime}
                onChange={(e) => setSchedule({ ...schedule, breakTime: e.target.value })}
                placeholder="13:00 - 14:00"
              />
            </div>
          </div>

          <Input
            label="Blackout / Leave Dates"
            type="date"
            value={schedule.leaveDates}
            onChange={(e) => setSchedule({ ...schedule, leaveDates: e.target.value })}
          />

          <div className="text-end mt-4">
            <Button type="submit" variant="primary" isLoading={saving}>
              Save Availability Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Availability;
