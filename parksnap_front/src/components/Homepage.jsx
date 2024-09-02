// src/HomePage.js
import React from 'react';
import { Button } from 'react-bootstrap';
import './Homepage.css';

const Homepage = () => {
  const handleRegister = () => {
    window.location.href = '/signUp';
  };

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  return (
    <div className="homepage">
      <div className="container text-center d-flex flex-column justify-content-center align-items-center">
        <div className="logo">
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
    </div>
  );
};

export default Homepage;
