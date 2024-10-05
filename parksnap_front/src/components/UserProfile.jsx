import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaCar, FaHashtag } from 'react-icons/fa';
import './UserProfile.css';
import NavigationBar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; // Import your axios instance

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [vehicleData, setVehicleData] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/user/getUserById?userId=${user.userId}`);
        if (response.data.code === '00') {
          setUserData(response.data.content);
          console.log('User data:', response.data.content);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.userId]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/vehicle/getVehiclesByUserId?userId=${user.userId}`);
        if (response.data.code === '00') {
          setVehicleData(response.data.content);
          console.log('Vehicle data:', response.data.content);
        } else {
          console.error('Failed to fetch vehicle data');
        }
      } catch (error) {
        console.error('An error occurred while fetching vehicle data:', error);
      }
    };

    fetchVehicleData();
  }, [user.userId]);

  const handleEditClick = async () => {
    if (isEditing) {
      // Update user details (same as before)
      try {
        const response = await axiosInstance.put('/api/v1/user/updateUser', {
          userId: user.userId,
          name: userData.name,
          phoneNo: userData.phoneNo
        });
  
        if (response.data.code !== '00') {
          console.error('Failed to update user details');
        }
      } catch (error) {
        console.error('An error occurred while updating user details:', error);
      }
  
      // Update or save vehicle details
      for (let i = 0; i < vehicleData.length; i++) {
        const vehicle = vehicleData[i];
  
        console.log('Vehicle:', vehicle);
  
        if (!vehicle.vehicleId && vehicle.licensePlate) {
          // If the vehicleId doesn't exist but the user filled the license plate, save a new vehicle via POST
          try {
            const response = await axiosInstance.post('/api/v1/vehicle/saveVehicle', {
              typeId: parseInt(vehicle.typeId),
              userId: user.userId,
              licensePlate: vehicle.licensePlate
            });
  
            if (response.data.code !== '00') {
              console.error(`Failed to save vehicle ${i + 1} details`);
            }
          } catch (error) {
            console.error(`An error occurred while saving vehicle ${i + 1} details:`, error);
          }
        } else if (vehicle.vehicleId) {
          // If vehicleId exists, update the vehicle via PUT
          try {
            const response = await axiosInstance.put('/api/v1/vehicle/updateVehicle', {
              vehicleId: vehicle.vehicleId,
              typeId: parseInt(vehicle.typeId),
              userId: user.userId,
              licensePlate: vehicle.licensePlate
            });
  
            if (response.data.code !== '00') {
              console.error(`Failed to update vehicle ${i + 1} details`);
            }
          } catch (error) {
            console.error(`An error occurred while updating vehicle ${i + 1} details:`, error);
          }
        }
      }
  
      window.location.reload(); // Reload the page to see the updated data
    }
  
    setIsEditing(!isEditing);
  };
  

  const handleCancelClick = () => {
    window.location.reload(); // Reload the page to cancel editing
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleVehicleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedVehicleData = [...vehicleData];
    updatedVehicleData[index] = { ...updatedVehicleData[index], [name]: value };
    setVehicleData(updatedVehicleData);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); // Redirect to home page
  };

  // Ensure at least two vehicle slots are displayed
  const vehiclesToDisplay = [...vehicleData];
  while (vehiclesToDisplay.length < 2) {
    vehiclesToDisplay.push({ typeId: '', licensePlate: '' }); // Add empty vehicle slot
  }

  return (
    <>
      <NavigationBar />
      <div className="profile-page">
        <Container className="profile-container mt-5">
          <Card className="profile-card shadow-sm">
            <Card.Header className="profile-header">
              <h4>User Profile</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                {/* Personal Information Section */}
                <Col md={6} className="profile-section">
                  <h5 className="section-title">Personal Information</h5>
                  {isEditing ? (
                    <>
                      <Form.Group controlId="formName">
                        <Form.Label><FaUser className="icon" /> Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formUsername">
                        <Form.Label><FaEnvelope className="icon" /> Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          disabled
                          value={userData.username}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formContactNumber">
                        <Form.Label><FaPhone className="icon" /> Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phoneNo"
                          value={userData.phoneNo}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </>
                  ) : (
                    <>
                      <Card.Text className="profile-info">
                        <FaUser className="icon" /> <strong>Name:</strong> {userData.name}
                      </Card.Text>
                      <Card.Text className="profile-info">
                        <FaEnvelope className="icon" /> <strong>Username:</strong> {userData.username}
                      </Card.Text>
                      <Card.Text className="profile-info">
                        <FaPhone className="icon" /> <strong>Contact Number:</strong> {userData.phoneNo}
                      </Card.Text>
                    </>
                  )}
                </Col>

                {/* Vehicle Information Section */}
                <Col md={6} className="profile-section">
                  <h5 className="section-title">Vehicle Information</h5>
                  {isEditing ? (
                    vehiclesToDisplay.map((vehicle, index) => (
                      <div key={index}>
                        <Form.Group controlId={`formVehicleType${index}`}>
                          <Form.Label>Vehicle {index + 1} Type</Form.Label>
                          <div className="custom-select-wrapper">
                            <Form.Control
                              as="select"
                              name="typeId"
                              value={vehicle.typeId}
                              onChange={(e) => handleVehicleChange(index, e)}
                              className="custom-select"
                            >
                              <option value="0">Car</option>
                              <option value="1">Motor Bike</option>
                              <option value="2">Bicycle</option>
                              <option value="3">Bus</option>
                            </Form.Control>
                          </div>
                        </Form.Group>
                        <Form.Group controlId={`formNumberPlate${index}`}>
                          <Form.Label>Number Plate</Form.Label>
                          <Form.Control
                            type="text"
                            name="licensePlate"
                            value={vehicle.licensePlate}
                            onChange={(e) => handleVehicleChange(index, e)}
                          />
                        </Form.Group>
                        <hr />
                      </div>
                    ))
                  ) : (
                    vehiclesToDisplay.map((vehicle, index) => (
                      <div key={index}>
                        <Card.Text className="profile-info">
                          <FaCar className="icon" /> <strong>Vehicle {index + 1} Type:</strong> {vehicle.type || 'N/A'}
                        </Card.Text>
                        <Card.Text className="profile-info">
                          <FaHashtag className="icon" /> <strong>Number Plate:</strong> {vehicle.licensePlate || 'N/A'}
                        </Card.Text>
                        <hr />
                      </div>
                    ))
                  )}
                </Col>
              </Row>
              <Button className="edit-profile-btn mt-4" onClick={handleEditClick}>
                {isEditing ? "Save Profile" : "Edit Profile"}
              </Button>
              {!isEditing ? 
                <Button className="btn-danger edit-profile-btn mt-4" onClick={logout}>
                  Logout
                </Button> 
                : 
                <Button className="btn-secondary edit-profile-btn mt-4" onClick={handleCancelClick}>
                  Cancel
                </Button>
              }
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
