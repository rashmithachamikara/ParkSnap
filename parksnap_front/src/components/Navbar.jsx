import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
//import { useState } from 'react';
import { FaParking, FaCloudSun, FaChartBar, FaEnvelope, FaUsers, FaUserCircle, FaHome } from 'react-icons/fa'; // Importing icons
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function NavigationBar() {

  return (
        <>
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container fluid>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
            <Navbar.Brand className="ms-2" href="/">ParkSnap</Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">


                <Nav className="me-auto">
                    <Nav.Link href="/">
                    <FaHome/> Home
                    </Nav.Link>
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
        </Container>
    </Navbar>
        
       
      
    </>
  );
}

export default NavigationBar;
