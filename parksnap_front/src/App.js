import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ParkingSelection from './components/ParkingSlotSelection';
import UserProfile from './components/UserProfile';
import Contactus from './components/Contactus';
import AboutUs from './components/AboutUsPage';
//import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm';
import Reserve from './components/Reservepage';
import Resetpw from './components/Resetpw';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/reserve' element={<Reserve/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reserveSlot" element={<ParkingSelection />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contact" element={<Contactus/>}/>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/resetpw" element={<Resetpw/>} />
      </Routes>
      {/* <Footer />  */}
    </Router>
  );
}

export default App;
