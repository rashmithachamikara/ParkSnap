import React from 'react';
import { Container } from 'react-bootstrap'
import './Footer.css';


function Footer() {
  return (
    <footer className="bg-dark text-white p-4 text-center">
      <Container>
        <p>&copy; 2024 Faculty of IT - University of Moratuwa. All Rights Reserved.</p>
        <p>
          <a href="/terms" className="text-white">Terms of Use</a> | 
          <a href="/privacy" className="text-white"> Privacy Policy</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
