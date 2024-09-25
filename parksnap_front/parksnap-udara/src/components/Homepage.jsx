import React from 'react';
import { Button } from 'react-bootstrap';
import NavigationBar from './Navbar'; // Import the updated NavigationBar component
import Footer from './Footer'; // Import the updated Footer component
import './Homepage.css'; // Ensure your styles are in this file

const Homepage = () => {
  const handleRegister = () => {
    window.location.href = '/signUp';
  };

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <div className="main-content container text-center d-flex flex-column justify-content-center align-items-center">
        <div className="logo">
        <img src="/images/image.png" alt="Logo" className="logo-image" />
          <span className="logo-line"></span>
        </div>
        <h1 className="title">PARKSNAP</h1>
        <p className="subtitle">Start Your Day with Easy Parking</p>
        <div className="button-container">
          <Button className="register-btn" onClick={handleRegister}>
            Register
          </Button>
          <Button className="signin-btn" onClick={handleSignIn}>
            Sign in
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
