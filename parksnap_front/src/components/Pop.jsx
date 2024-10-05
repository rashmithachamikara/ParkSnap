import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import axiosInstance from '../axiosInstance'; // Import your axios instance
import './Pop.css';

const Pop = ({ number, onClose }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axiosInstance.get(`/api/v1/vehicle/getVehiclesByUserId?userId=${user.userId}`);
        setVehicles(response.data.content);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get the selected vehicle
    const selectedVehicle = vehicles.find(vehicle => vehicle.licensePlate === vehicleNumber);
  
    if (!selectedVehicle || vehicleNumber === "") {
      alert('Please select a vehicle.');
      return;
    }
  
    // Get the user
    const user = JSON.parse(localStorage.getItem('user'));
  
    // Prepare the reservation data
    const reservationData = {
      reservationId: 0,
      slotId: number,
      userId: user.userId,
      vehicleId: selectedVehicle.vehicleId,
      startTime: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString()
    };
  
    try {
      // Save the reservation
      console.log('Saving reservation:', reservationData);
      const response = await axiosInstance.post('/api/v1/reservation/saveReservation', reservationData);
  
      // Process the reservation
      alert(`Successfully reserved Slot ${number} for vehicle ${selectedVehicle.licensePlate} for today.`);
      onClose();
    } catch (error) {
      console.error('Error saving reservation:', error);
      alert('Failed to reserve slot. Please try again.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Reserve Slot {number}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {vehicles.length > 0 ? (
              <>
                <label htmlFor="vehicleNumber">Select Vehicle:</label>
                <select
                  id="vehicleNumber"
                  className=' custom-select form-select'
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  required
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.vehicleId} value={vehicle.licensePlate}>
                      {vehicle.licensePlate}
                    </option>
                  ))}
                </select>
                <div className='button'>
                  <Button type="submit">Reserve</Button>
                  <Button variant="secondary" onClick={onClose}>Close</Button>
                </div>
              </>
            ) : (
              <p>No vehicles added. <br /><Button className='btn-sm' href="/profile">Add vehicles</Button></p>
            )}
          </div>
          {vehicles.length === 0 &&
            <div className='button'>
              <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>
          }
        </form>
      </div>
    </div>
  );
};

export default Pop;