import React, { useState } from 'react';
import { Form, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = () => {
    const navigate = useNavigate();

    // State to hold form input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone1: '',
        phone2: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User details submitted with data:', formData);
        navigate('/vehicle-details', { state: { formData } });
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


                    <Button variant="light" type="submit" className="signup-button">
                        Continue to Vehicle Details
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUpForm;