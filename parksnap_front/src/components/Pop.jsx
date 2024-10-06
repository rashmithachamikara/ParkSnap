import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import axiosInstance from '../axiosInstance'; // Import your axios instance
import './Pop.css';

const Pop = ({ number, onClose }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [reservationData, setReservationData] = useState(null); // To store fetched reservation data

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

    const fetchReservationData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/reservation/getSlotDataById/${number}`);
        setReservationData(response.data[0]); // Assuming response is an array
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    };

    fetchVehicles();

    // Check if the user is an admin and fetch reservation data if the slot is reserved
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === "ROLE_ADMIN") {
      fetchReservationData();
    }
  }, [number]);

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

  const handleDelete = async () => {
    if (!reservationData) return;

    try {
      await axiosInstance.delete(`/api/v1/reservation/deleteReservation/${reservationData.reservation_id}`);
      alert('Reservation deleted successfully');
      setReservationData(null); // Clear the reservation data after deletion
      onClose();
      window.location.reload(); // Reload the page to update the slot status
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete the reservation. Please try again.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Slot {number}</h3>
        <hr />
        {reservationData ? (
          <div className='details'>
            <h4>Reservation Details:</h4>
            <p><strong>Username:</strong> {reservationData.username}</p>
            <p><strong>Name:</strong> {reservationData.name}</p>
            <p><strong>License Plate:</strong> {reservationData.license_plate}</p>
            <p><strong>Start Time:</strong> {new Date(reservationData.start_time).toLocaleString()}</p>
            <p><strong>Phone No:</strong> {reservationData.phone_no || 'N/A'}</p>
            <br />
            <div className='button'>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
              <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {vehicles.length > 0 ? (
                <>
                  <label htmlFor="vehicleNumber">Select Vehicle:</label>
                  <select
                    id="vehicleNumber"
                    className='custom-select form-select'
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
            {vehicles.length === 0 && (
              <div className='button'>
                <Button variant="secondary" onClick={onClose}>Close</Button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Pop;
