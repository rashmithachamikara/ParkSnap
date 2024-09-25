import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaParking, FaCloudSun, FaChartBar, FaEnvelope, FaUsers, FaUserCircle } from 'react-icons/fa';
import './Navbar.css'; // Ensure custom styles are applied

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        {/* Toggle button on the left */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="order-1" />

        {/* Collapsible menu */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/reserve">
              <FaParking /> Reserve a parking slot
            </Nav.Link>
            <Nav.Link href="/weather">
              <FaCloudSun /> Weather
            </Nav.Link>
            <Nav.Link href="/dashboard">
              <FaChartBar /> Dashboard
            </Nav.Link>
            <Nav.Link href="/contact">
              <FaEnvelope /> Contact us
            </Nav.Link>
            <Nav.Link href="/about">
              <FaUsers /> About us
            </Nav.Link>
            <Nav.Link href="/profile">
              <FaUserCircle /> User Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Logo on the right */}
        <Navbar.Brand href="/" className="order-2 ms-auto">
          <img src="/images/image.png" alt="PARKSNAP Logo" className="navbar-logo" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
