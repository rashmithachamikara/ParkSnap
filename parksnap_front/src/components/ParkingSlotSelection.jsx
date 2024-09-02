import React, { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

function ParkingSelection() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <Container className="mt-5">
      <h2>Select a Parking Slot</h2>
      <Row>
        {slots.map((slot) => (
          <Col key={slot} xs={4} className="mb-3">
            <Button
              variant={selectedSlot === slot ? 'success' : 'secondary'}
              onClick={() => handleSlotSelection(slot)}
              block
            >
              Slot {slot}
            </Button>
          </Col>
        ))}
      </Row>
      <Button
        variant="primary"
        disabled={!selectedSlot}
        href={`/confirm/${selectedSlot}`}
      >
        Confirm Reservation
      </Button>
    </Container>
  );
}

export default ParkingSelection;
