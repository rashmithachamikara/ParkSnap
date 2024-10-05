import React, { useState } from "react";
import axiosInstance from '../axiosInstance'; // Import your axios instance
import { Container } from 'react-bootstrap';
import NavigationBar from './Navbar'; // Adjust the path if needed
import Footer from './Footer'; // Adjust the path if needed
import "./Contactus.css";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    try {
      const response = await axiosInstance.post('/api/v1/contactForm/saveContactForm', {
        userCode: 0,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        userMessage: formData.message,
      });
      console.log("Form submitted:", response.data);
      setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form
      setSuccessMessage("Form submitted successfully!"); // Set success message
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="contact-container">
        <Container>
          <div className="contact-left">
            <h2>Contact <span>Us</span></h2><br/>
            <p>For inquiries regarding parking management, security, or access issues, please contact our support team or reach out to the security department directly for immediate assistance. <br/><br/>We are here to ensure smooth and safe parking operations for all employees and visitors.</p><br/><br/><br/>
            <ul className="contact-info">
              <li><i className="fas fa-phone"></i> +94 11 2416000</li>
              <li><i className="fas fa-envelope"></i> security@lseg.com</li>
            </ul>
          </div>
    
      <div className="contact-right">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
        {successMessage && <p>{successMessage}</p>} {/* Display success message if it exists */}
      </div>
      </Container>
    </div>
    <Footer/>
    </>
  );
};

export default Contactus;