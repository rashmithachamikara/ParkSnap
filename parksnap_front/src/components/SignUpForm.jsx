import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Import your axios instance
import { Form, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = () => {
    const navigate = useNavigate();

    // State to hold form input values
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        phone: '',
        password: '',
        profilePicture: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axiosInstance.post('/api/auth/register', {
            name: formData.name,
            phoneNo: formData.phone,
            username: formData.username,
            password: formData.password,
            userType: {
              typeId: 0
            }
          });
          console.log("User registered:", response.data);
          setFormData({ name: "", username: "", phone: "", password: "" }); // Clear form
      
          // Call the login function after successful registration
          await handleLogin(formData.username, formData.password);
        } catch (error) {
          console.error("Error registering user:", error);
        }
      };

    const handleLogin = async (username, password) => {
        try {
          const response = await axiosInstance.post('/api/auth/login', { username, password });
      
          if (response.status === 200) {
            const token = response.data;
            localStorage.setItem('token', token);
      
            const userResponse = await axiosInstance.get('/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
      
            if (userResponse.status === 200) {
              const userData = userResponse.data;
              localStorage.setItem('user', JSON.stringify(userData));
              navigate('/vehicle-details', { state: { formData } }); // Navigate to vehicle details
            }
          }
        } catch (err) {
          console.error("Error logging in:", err);
        }
      };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="text-center">Create new Account</h2>
                <p className="text-center">
                    <a href="login" className="login-link">Already Registered? <span>Log in</span> here.</a>
                </p>
                
                <Form onSubmit={handleSubmit}>
                    <h4 className="section-title">User Details</h4>

                    {/* Progress Bar */}
                    <div className="progress-wrapper">
                        <ProgressBar now={50} label="Step 1 of 2" />
                    </div>
                    
                    <Row>
                        <Col>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Your name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="(Can be your email)" 
                                    name="username" 
                                    value={formData.username} 
                                    onChange={handleChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formPhone1">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Contact number" 
                                    name="phone1" 
                                    value={formData.phone1} 
                                    onChange={handleChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Button variant="light" type="submit" className="signup-button">
                        Continue to Vehicle Details
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUpForm;