import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './SignUpForm.css';

const SignUpForm = () => {
    const navigate = useNavigate(); // Hook for navigation

    // State to hold form input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone1: '',
        phone2: '',
        password: '',
        profilePicture: null,
        vehicle1: '',
        vehicle2: '',
        vehicleType1: 'Car',
        vehicleType2: 'Car',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
       
        // Simulate form submission (you can replace this with actual API logic)
        console.log('Form submitted with data:', formData);

        // Navigate to the home page after submission
        navigate('/');
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="text-center">Create new Account</h2>
                <p className="text-center">
                    <a href="login" className="login-link">Already Registered? Log in here.</a>
                </p>
                <Form onSubmit={handleSubmit}> {/* Form uses onSubmit to handle submission */}
                    <h4 className="section-title">User Details</h4>
                    <Row>
                        <Col>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formPhone1">
                                <Form.Label>Phone Number 1</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter phone number 1" 
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

                    <Row>
                        <Col>
                            <Form.Group controlId="formPhone2">
                                <Form.Label>Phone Number 2</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter phone number 2" 
                                    name="phone2" 
                                    value={formData.phone2} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formProfilePicture">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    name="profilePicture" 
                                    onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <h4 className="section-title mt-4">Vehicle Details</h4>
                    <Row>
                        <Col>
                            <Form.Group controlId="formVehicleNumber1">
                                <Form.Label>Vehicle Number 1</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter vehicle plate number" 
                                    name="vehicle1" 
                                    value={formData.vehicle1} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formVehicleNumber2">
                                <Form.Label>Vehicle Number 2</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter vehicle plate number" 
                                    name="vehicle2" 
                                    value={formData.vehicle2} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formVehicleType1">
                                <Form.Label>Vehicle Type</Form.Label>
                                <div className="custom-select-wrapper">
                                    <Form.Control 
                                        as="select" 
                                        className="custom-select" 
                                        name="vehicleType1" 
                                        value={formData.vehicleType1} 
                                        onChange={handleChange}
                                    >
                                        <option>Car</option>
                                        <option>Motor Bike</option>
                                        <option>Bicycle</option>
                                        <option>Van</option>
                                    </Form.Control>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formVehicleType2">
                                <Form.Label>Vehicle Type</Form.Label>
                                <div className="custom-select-wrapper">
                                    <Form.Control 
                                        as="select" 
                                        className="custom-select" 
                                        name="vehicleType2" 
                                        value={formData.vehicleType2} 
                                        onChange={handleChange}
                                    >
                                        <option>Car</option>
                                        <option>Motor Bike</option>
                                        <option>Bicycle</option>
                                        <option>Van</option>
                                    </Form.Control>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="light" type="submit" className="signup-button">
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUpForm;