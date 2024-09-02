import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
//import { useState } from 'react';
import { FaParking, FaCloudSun, FaChartBar, FaEnvelope, FaUsers, FaUserCircle } from 'react-icons/fa'; // Importing icons

function NavigationBar() {

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

  return (
        <>
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
            <Navbar.Brand className="ms-2" href="/">Parking Reservation</Navbar.Brand>
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
        </Container>
    </Navbar>
        
       
      
    </>
  );
}

export default NavigationBar;
