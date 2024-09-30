import React, { useState } from 'react';
import { Form, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './VehicleDetails.css';

const VehicleDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData } = location.state;

    const [vehicleData, setVehicleData] = useState({
        vehicle1: '',
        vehicle2: '',
        vehicleType1: 'Car',
        vehicleType2: 'Car',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({
            ...vehicleData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const combinedData = { ...formData, ...vehicleData };
        console.log('Full form data submitted:', combinedData);
        navigate('/');
    };

    return (
        <div className="vehicle-details-container">
            <div className="vehicle-details-card">
                <h3 className="text-center-vehicle">Vehicle Details</h3>
                <div className="section-underline-vehicle"></div>


                {/* Progress Bar */}
                <div className="progress-wrapper">
                    <ProgressBar now={100} label="Step 2 of 2" />
                </div>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formVehicleNumber1">
                                <Form.Label>Vehicle Number 1</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter vehicle plate number" 
                                    name="vehicle1" 
                                    value={vehicleData.vehicle1} 
                                    onChange={handleChange} 
                                    required
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
                                    value={vehicleData.vehicle2} 
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
                                        name="vehicleType1" 
                                        value={vehicleData.vehicleType1} 
                                        onChange={handleChange}
                                        className="custom-select"
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
                                        name="vehicleType2" 
                                        value={vehicleData.vehicleType2} 
                                        onChange={handleChange}
                                        className="custom-select"
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

                    <Button variant="light" type="submit" className="submit-button">
                        Submit Vehicle Details
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default VehicleDetails;