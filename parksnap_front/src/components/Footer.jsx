import React from 'react';
import { Container } from 'react-bootstrap'
import './Footer.css';


function Footer() {
  return (
    <footer className="bg-dark text-white p-4 text-center">
      <Container>
        <p>&copy; 2024 Faculty of IT - University of Moratuwa. All Rights Reserved.</p>
        <p>
          <a href="/contact" className="text-white">Contact Us</a> | 
          <a href="/about" className="text-white"> About Us</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
