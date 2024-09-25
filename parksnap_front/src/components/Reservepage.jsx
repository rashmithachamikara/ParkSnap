// src/Reserve.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import NavigationBar from './Navbar';
import './ReservePage.css'; // Import the CSS file

function Reserve() {
  return (
    <>
      <NavigationBar />
      <div className="reserve-container pt-5">
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Start Your Day with Easy Parking</Card.Title>
            <Card.Text>Reserve your parking slot now!</Card.Text>
            <Button className="btn-primary" href="/reserveSlot">
              Reserve a Slot
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Reserve;
