import React from 'react';
import { Card, Button } from 'react-bootstrap';
import NavigationBar from './Navbar';
import Footer from './Footer';
import './ReservePage.css'; // Import the CSS file

function Reserve() {
  return (
    <>
      <NavigationBar />
      <div className="reserve-container">
        <div className="hero">
          <Card className="hero-card text-center">
            <Card.Body>
              <Card.Title>Effortless Parking, Anytime</Card.Title>
              <Card.Text>Secure your parking spot with just a click. Hassle-free, fast, and reliable.</Card.Text>
              <Button className="btn-primary shadow-lg" href="/reserveSlot">
                Reserve a Slot
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Reserve;