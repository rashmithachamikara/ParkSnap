import React from 'react';
import './Homepage.css';
import logo from '../assets/parksnap_logo.png'; // Make sure to place parksnap.png in the src folder
import NavigationBar from './Navbar';
import Footer from './Footer';

const Homepage = () => {
  const handleRegister = () => {
    window.location.href = '/signUp';
  };

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  return (

    <div className="nav">
    <NavigationBar/>
    <div className="homepage">
      <div className="container">
        <img src={logo} alt="ParkSnap logo" className="logo" />
        <h1>Start Your Day With Easy Parking</h1>
        <div className="button-container">
          <button className="login-button" onClick={handleSignIn}>Login</button>
          <button className="register-button" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Homepage;


