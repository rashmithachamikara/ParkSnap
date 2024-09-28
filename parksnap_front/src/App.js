import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Slots from './components/Slots';  // Updated to use Slots
import UserProfile from './components/UserProfile';
import Contactus from './components/Contactus';
import AboutUs from './components/AboutUsPage';
import SignUpForm from './components/SignUpForm';
import Reserve from './components/Reservepage';
import Resetpw from './components/Resetpw';
import Weather from './components/Weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/reserve' element={<Reserve />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reserveSlot" element={<Slots />} />  {/* Updated route */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contact" element={<Contactus/>}/>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/resetpw" element={<Resetpw />} />
        <Route path="/weather" element={<Weather />} />
        

      </Routes>
    </Router>
  );
}

export default App;
