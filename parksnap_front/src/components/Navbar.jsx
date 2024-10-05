import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaParking, FaCloudSun, FaChartBar, FaEnvelope, FaUsers, FaUserCircle, FaHome, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/'); // Redirect to home page
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
                <Container fluid>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Brand className="ms-2" href="/">ParkSnap</Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {!token && (
                                <Nav.Link href="/">
                                    <FaHome /> Home
                                </Nav.Link>
                            )}
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
                            {token && (
                                <Nav.Link onClick={logout}>
                                    <FaSignOutAlt /> Logout
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;