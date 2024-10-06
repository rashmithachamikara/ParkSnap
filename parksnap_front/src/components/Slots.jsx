import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './Slots.css';
import Weather from './Weather';
import Pop from './Pop';
import NavigationBar from './Navbar';
import Footer from './Footer';

const Slots = () => {
  const [availableSlots, setAvailableSlots] = useState(0);
  const [occupiedSlots, setOccupiedSlots] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
  const [visibleLot, setVisibleLot] = useState('Lot1');
  const [popupSlot, setPopupSlot] = useState(null);
  const [slotStatus, setSlotStatus] = useState([]);

  const lotId = visibleLot === 'Lot1' ? 1 : 2;

  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        const totalResponse = await axiosInstance.get(`/api/v1/slots/lot/${lotId}/totalCount`);
        setTotalSlots(totalResponse.data);

        const remainingResponse = await axiosInstance.get(`/api/v1/slots/lot/${lotId}/remaining`);
        setAvailableSlots(remainingResponse.data);

        const occupiedResponse = await axiosInstance.get(`/api/v1/slots/lot/${lotId}/occupiedCount`);
        setOccupiedSlots(occupiedResponse.data);

        const statusResponse = await axiosInstance.get(`/api/v1/slots/lot/${lotId}/status`);
        setSlotStatus(statusResponse.data);
      } catch (error) {
        console.error('Error fetching slot data:', error);
      }
    };

    fetchSlotData();
  }, [lotId, popupSlot]);

  const handleSlotClick = (slotNumber) => {
    setPopupSlot(slotNumber);
  };

  const closePopup = () => {
    setPopupSlot(null);
  };

  const showLot = (lot) => {
    setVisibleLot(lot);
  };

  const handleSlotDelete = (slotNumber) => {
    setSlotStatus((prevStatus) =>
      prevStatus.map((slot) =>
        slot.slotId === slotNumber ? { ...slot, reserved: false } : slot
      )
    );
  };

  return (
    <>
      <NavigationBar />
      <div className="App">
        <h2>Reserve a Parking Slot</h2>
        <header className="App-header">
          <div className="slot-summary">
            <div className="summary-item">Total slots: {totalSlots}</div>
            <div className="summary-item">Occupied slots: {occupiedSlots}</div>
            <div className="summary-item">Available slots: {availableSlots}</div>
          </div>
          <div>
            <Weather />
          </div>
        </header>

        <div className="lot-buttons">
          <button
            className={`lot-button ${visibleLot === 'Lot1' ? 'active' : ''}`}
            onClick={() => showLot('Lot1')}
          >
            Lot 1
          </button>
          <button
            className={`lot-button ${visibleLot === 'Lot2' ? 'active' : ''}`}
            onClick={() => showLot('Lot2')}
          >
            Lot 2
          </button>
        </div>

        <div className="parking-lots">
          {visibleLot === 'Lot1' && (
            <div className="lot">
              <h2>Lot 1</h2>
              <div className='mainslot'>
                <div className="slots">
                  {Array.from({ length: 9 }, (_, index) => {
                    const slotNumber = index + 1;
                    const slot = slotStatus.find(slot => slot.slotId === slotNumber);
                    return (
                      <Slot
                        key={slotNumber}
                        number={slotNumber}
                        reserved={slot?.reserved}
                        onClick={handleSlotClick}
                        onDelete={handleSlotDelete} // Pass delete handler
                      />
                    );
                  })}
                </div>
                <div className="slotssmall">
                  {Array.from({ length: 8 }, (_, index) => {
                    const slotNumber = index + 10;
                    const slot = slotStatus.find(slot => slot.slotId === slotNumber);
                    return (
                      <Slot
                        key={slotNumber}
                        number={slotNumber}
                        reserved={slot?.reserved}
                        onClick={handleSlotClick}
                        onDelete={handleSlotDelete} // Pass delete handler
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {visibleLot === 'Lot2' && (
            <div className="lot">
              <h2>Lot 2</h2>
              <div className='mainslot'>
                <div className="slots">
                  {Array.from({ length: 9 }, (_, index) => {
                    const slotNumber = index + 21;
                    const slot = slotStatus.find(slot => slot.slotId === slotNumber);
                    return (
                      <Slot
                        key={slotNumber}
                        number={slotNumber}
                        reserved={slot?.reserved}
                        onClick={handleSlotClick}
                        onDelete={handleSlotDelete} // Pass delete handler
                      />
                    );
                  })}
                </div>
                <div className="slotssmall">
                  {Array.from({ length: 8 }, (_, index) => {
                    const slotNumber = index + 30;
                    const slot = slotStatus.find(slot => slot.slotId === slotNumber);
                    return (
                      <Slot
                        key={slotNumber}
                        number={slotNumber}
                        reserved={slot?.reserved}
                        onClick={handleSlotClick}
                        onDelete={handleSlotDelete} // Pass delete handler
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {popupSlot && (
          <Pop
            number={popupSlot}
            onClose={closePopup}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

const Slot = ({ number, reserved, onClick, onDelete }) => {
  const [slotData, setSlotData] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')); // Get the user from localStorage
  const isAdmin = user && user.role === "ROLE_ADMIN"; // Check if the user is an admin

  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/reservation/getSlotDataById/${number}`);
        setSlotData(response.data[0]);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Do nothing if the slot is reserved by another user
        } else {
          console.error('Error fetching slot data:', error);
        }
      }
    };

    fetchSlotData();
  }, [number, reserved]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/v1/reservation/deleteReservation/${slotData.reservation_id}`);
      setSlotData(null); // Clear the slot data after deletion
      onDelete(number); // Call the delete handler passed from parent
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You are not allowed to delete this reservation.');
      } else {
        console.error('Error deleting reservation:', error);
      }
    }
  };

  const handleClick = () => {
    if (!reserved || isAdmin) {
      onClick(number); // Open the popup if the slot is available or the user is an admin
    }
  };

  return (
    <button className={`slot ${reserved ? 'reserved' : ''} ${isAdmin ? 'admin' : ''}`} onClick={handleClick}>
      <div className='slot-number'>{number}</div>
      {slotData && (
        <>
          <div className='license-plate'>{slotData.license_plate}</div>
          {/* Show delete button only for non-admin users */}
          {!isAdmin && (
            <button className='delete-button' onClick={handleDelete}>Delete</button>
          )}
        </>
      )}
    </button>
  );
};




export default Slots;
