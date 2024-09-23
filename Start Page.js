import React from 'react';
import './App.css';
import logo from './parksnap.png'; // Make sure to place parksnap.png in the src folder

function App() {
  return (
    <div className="app">
      <div className="container">
        <img src={logo} alt="ParkSnap logo" className="logo" />
        <h1>Start Your Day With Easy Parking</h1>
        <div className="button-container">
          <button className="login-button">Login</button>
          <button className="register-button">Register</button>
        </div>
        <footer>© 2024 ParkSnap. Designed By TechTuners.</footer>
      </div>
    </div>
  );
}

export default App;
