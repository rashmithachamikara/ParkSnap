import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Import your axios instance
import './Slots.css';
import Weather from './Weather';
import Pop from './Pop'; // Import the updated Popup component
import NavigationBar from './Navbar';
import Footer from './Footer';

const Slots = () => {
  const [availableSlots, setAvailableSlots] = useState(0);
  const [occupiedSlots, setOccupiedSlots] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
  const [visibleLot, setVisibleLot] = useState('Lot1');
  const [popupSlot, setPopupSlot] = useState(null); // State to manage the popup

  const lotId = visibleLot === 'Lot1' ? 1 : 2; // Map visibleLot to lotId
  //const remainingSlots = totalSlots - occupiedSlots;

  // Fetch data for the selected lot
  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        // Fetch total slot count
        const totalResponse = await axiosInstance.get(`/api/v1/slots/lot/${lotId}/totalCount`);
        console.log(totalResponse);
        setTotalSlots(totalResponse.data);

        // Fetch remaining slots
        const remainingResponse = await axiosInstance.get(`/api/v1/slots/lot/${lotId}/remaining`);
        setAvailableSlots(remainingResponse.data);

        // Fetch occupied slot count
        const occupiedResponse = await axiosInstance.get(`/api/v1/slots/lot/${lotId}/occupiedCount`);
        setOccupiedSlots(occupiedResponse.data);
      } catch (error) {
        console.error('Error fetching slot data:', error);
      }
    };

    fetchSlotData();
  }, [lotId,popupSlot]); // Re-fetch data when visibleLot changes

  const handleSlotClick = (slotNumber) => {
    setPopupSlot(slotNumber); // Set the slot number to show in the popup
  };

  const closePopup = () => {
    setPopupSlot(null); // Hide the popup
  };

  const showLot = (lot) => {
    setVisibleLot(lot);
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
                  {Array.from({ length: 9 }, (_, index) => (
                    <Slot
                      key={index + 1}
                      number={index + 1}
                      onClick={handleSlotClick}
                    />
                  ))}
                </div>
                <div className="slotssmall">
                  {Array.from({ length: 8 }, (_, index) => (
                    <Slot
                      key={index + 10}
                      number={index + 10}
                      onClick={handleSlotClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {visibleLot === 'Lot2' && (
            <div className="lot">
              <h2>Lot 2</h2>
              <div className='mainslot'>
                <div className="slots">
                  {Array.from({ length: 9 }, (_, index) => (
                    //Slots in lot 2 starts from 21
                    <Slot
                      key={index + 21}
                      number={index + 21}
                      onClick={handleSlotClick}
                    />
                  ))}
                </div>
                <div className="slotssmall">
                  {Array.from({ length: 8 }, (_, index) => (
                    <Slot
                      key={index + 30}
                      number={index + 30}
                      onClick={handleSlotClick}
                    />
                  ))}
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

// Slot Component
const Slot = ({ number, onClick }) => {
  return (
    <button className="slot" onClick={() => onClick(number)}>
      {number}
    </button>
  );
};

export default Slots;
