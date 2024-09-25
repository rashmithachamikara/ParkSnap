import React, { useState } from 'react';
import './Slots.css';
import Weather from './Weather';
import Pop from './Pop'; // Import the updated Popup component

const Slots = () => {
  const [availableSlots, setAvailableSlots] = useState(17);
  const [occupiedSlots, setOccupiedSlots] = useState(9);
  const [visibleLot, setVisibleLot] = useState('Lot1');
  const [popupSlot, setPopupSlot] = useState(null); // State to manage the popup
  const remainingSlots = availableSlots - occupiedSlots;

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
    <div className="App">
      <h2>Reserve a Parking Slot</h2>
      <header className="App-header">
        <div className="slot-summary">
          <div className="summary-item">Available slots: {availableSlots}</div>
          <div className="summary-item">Occupied slots: {occupiedSlots}</div>
          <div className="summary-item">Remaining slots: {remainingSlots}</div>
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
      </div>

      {popupSlot && (
        <Pop
          number={popupSlot} 
          onClose={closePopup} 
        />
      )}
    </div>
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
