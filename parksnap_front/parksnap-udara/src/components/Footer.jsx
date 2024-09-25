import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Ensure react-router-dom is used for linking
import './Footer.css'; // Add custom CSS if needed

function Footer() {
  return (
    <footer className="footer bg-dark text-white mt-5 p-4 text-center">
      <Container>
        <p>&copy; 2024 ParkSnap. Designed by TechTuners.</p>
        <p>
          <Link to="/terms" className="text-white">Terms of Use</Link> | 
          <Link to="/privacy" className="text-white"> Privacy Policy</Link> | 
          <Link to="/" className="text-white"> Home</Link> {/* Link to Home Page */}
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
