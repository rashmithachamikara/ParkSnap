import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './SignUpForm.css';

const SignUpForm = () => {
    return (
        <div className="signup-container mt-5">
            <div className="signup-card">
                <h2 className="text-center">Create new Account</h2>
                <p className="text-center">
                 Already Registered? <a href="login" className="login-link">Log in here.</a>
                </p>
                <Form>
                    <h4 className="section-title">User Details</h4>
                    <Row>
                        <Col>
                            <Form.Group controlId="formName" className="f-titles">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formEmail " className="f-titles">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formPhone1" className="f-titles">
                                <Form.Label>Phone Number 1</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone number 1" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPassword" className="f-titles">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formPhone2" className="f-titles">
                                <Form.Label>Phone Number 2</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone number 2" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formProfilePicture" className="f-titles"> 
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <h4 className="section-title mt-4">Vehicle Details</h4>
                    <Row>
                        <Col>
                            <Form.Group controlId="formVehicleNumber1" className="f-titles">
                                <Form.Label>Vehicle Number 1</Form.Label>
                                <Form.Control type="text" placeholder="Enter vehicle plate number" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formVehicleNumber2" className="f-titles">
                                <Form.Label>Vehicle Number 2</Form.Label>
                                <Form.Control type="text" placeholder="Enter vehicle plate number" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formVehicleType1" className="f-titles">
                                <Form.Label>Vehicle Type</Form.Label>
                            <div className="custom-select-wrapper">
                                <Form.Control as="select" className="custom-select">
                                    <option>Car</option>
                                    <option>Motor Bike</option>
                                    <option>Bicycle</option>
                                    <option>Van</option>
                                </Form.Control>
                            </div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formVehicleType2" className="f-titles">
                                <Form.Label>Vehicle Type</Form.Label>
                            <div className="custom-select-wrapper">
                                <Form.Control as="select" className="custom-select">
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
