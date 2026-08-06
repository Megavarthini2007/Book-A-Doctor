import React from 'react';
import { FaSun, FaCloudSun, FaMoon } from 'react-icons/fa';

export const TimeSlotSelector = ({ slots = [], selectedSlot, onSelectSlot }) => {
  const periods = [
    { title: 'Morning', icon: FaSun, color: 'text-warning' },
    { title: 'Afternoon', icon: FaCloudSun, color: 'text-primary' },
    { title: 'Evening', icon: FaMoon, color: 'text-indigo' }
  ];

  return (
    <div className="mb-4">
      <h6 className="fw-bold text-dark mb-3">Available Time Slots</h6>
      {periods.map((period) => {
        const periodSlots = slots.filter((s) => s.period === period.title);
        if (periodSlots.length === 0) return null;
        const Icon = period.icon;

        return (
          <div key={period.title} className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-2 text-secondary small fw-semibold">
              <Icon className={period.color} />
              <span>{period.title}</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {periodSlots.map((slot) => {
                const isSelected = selectedSlot && selectedSlot.id === slot.id;
                const isAvailable = slot.available;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => onSelectSlot(slot)}
                    className={`btn btn-sm ${
                      isSelected
                        ? 'btn-primary shadow-sm'
                        : isAvailable
                        ? 'btn-outline-primary bg-white'
                        : 'btn-light text-muted border-0 opacity-50 cursor-not-allowed'
                    } rounded-pill px-3 py-1.5 fw-medium`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeSlotSelector;
