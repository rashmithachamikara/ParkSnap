import React, { useState } from 'react';
import './Pop.css';

const Pop = ({ number, onClose }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the times
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      alert('End time must be after start time.');
      return;
    }

    const duration = (end - start) / (1000 * 60 * 60); // Duration in hours
    if (duration > 24) {
      alert('Reservation cannot exceed 24 hours.');
      return;
    }

    // Process the reservation
    alert(`Successfully reserved Slot ${number} for vehicle ${vehicleNumber} from ${startTime} to ${endTime}`);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Reserve Slot {number}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vehicleNumber">Vehicle Number:</label>
            <input
              type="text"
              id="vehicleNumber"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className='button'>
          <button type="submit">Reserve</button>
          <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pop;
