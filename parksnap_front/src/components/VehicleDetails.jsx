import React, { useState } from 'react';
import { Form, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import axiosInstance from '../axiosInstance'; // Import your axios instance
import { useLocation, useNavigate } from 'react-router-dom';
import './VehicleDetails.css';

const VehicleDetails = () => {
    const navigate = useNavigate();

    const [vehicleData, setVehicleData] = useState({
        vehicle1: '',
        vehicle2: '',
        vehicleType1: '0',
        vehicleType2: '0',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({
            ...vehicleData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Get the current logged in user
        const user = JSON.parse(localStorage.getItem('user'));
      
        // Save each vehicle
        const vehicles = [
          { vehicleId: 0, typeId: vehicleData.vehicleType1, userId: user.userId, licensePlate: vehicleData.vehicle1 },
          { vehicleId: 0, typeId: vehicleData.vehicleType2, userId: user.userId, licensePlate: vehicleData.vehicle2 },
        ];
      
        console.log("Vehicles:", vehicles);

        for (const vehicle of vehicles) {
          if (vehicle.licensePlate) { // Only save if license plate is not empty
            try {
              const response = await axiosInstance.post('/api/v1/vehicle/saveVehicle', vehicle);
              console.log("Vehicle saved:", response.data);
            } catch (error) {
              console.error("Error saving vehicle:", error);
            }
          }
        }
      
        navigate('/reserve');
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
                                    placeholder="Leave empty for no secondary vehicle" 
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
                                <Form.Label>Vehicle 1 Type</Form.Label>
                                <div className="custom-select-wrapper">
                                    <Form.Control 
                                        as="select" 
                                        name="vehicleType1" 
                                        value={vehicleData.vehicleType1} 
                                        onChange={handleChange}
                                        className="custom-select"
                                    >
                                        <option value="0">Car</option>
                                        <option value="1">Motor Bike</option>
                                        <option value="2">Bicycle</option>
                                        <option value="3">Bus</option>
                                    </Form.Control>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formVehicleType2">
                                <Form.Label>Vehicle 2 Type</Form.Label>
                                <div className="custom-select-wrapper">
                                    <Form.Control 
                                        as="select" 
                                        name="vehicleType2" 
                                        value={vehicleData.vehicleType2} 
                                        onChange={handleChange}
                                        className="custom-select"
                                    >
                                        <option value="0">Car</option>
                                        <option value="1">Motor Bike</option>
                                        <option value="2">Bicycle</option>
                                        <option value="3">Bus</option>
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