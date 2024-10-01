import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCar, FaHashtag } from 'react-icons/fa';
import './UserProfile.css'; 
import NavigationBar from './Navbar';
import Footer from './Footer';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Asitha Udara",
    email: "udara@example.com",
    contactNumber: "012 345 6789",
    department: "Research",
    vehicleType: "Car",
    numberPlate: "ABC 800",
  });
  const [vehicleImage, setVehicleImage] = useState(null); // Store uploaded image

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setVehicleImage(reader.result); // Store image data as base64
      };
      reader.readAsDataURL(file);
    }
  };

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
                      <Form.Group controlId="formEmail">
                        <Form.Label><FaEnvelope className="icon" /> Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formContactNumber">
                        <Form.Label><FaPhone className="icon" /> Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="contactNumber"
                          value={userData.contactNumber}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formDepartment">
                        <Form.Label><FaBuilding className="icon" /> Department</Form.Label>
                        <Form.Control
                          type="text"
                          name="department"
                          value={userData.department}
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
                        <FaEnvelope className="icon" /> <strong>Email:</strong> {userData.email}
                      </Card.Text>
                      <Card.Text className="profile-info">
                        <FaPhone className="icon" /> <strong>Contact Number:</strong> {userData.contactNumber}
                      </Card.Text>
                      <Card.Text className="profile-info">
                        <FaBuilding className="icon" /> <strong>Department:</strong> {userData.department}
                      </Card.Text>
                    </>
                  )}
                </Col>

                {/* Vehicle Information Section */}
                <Col md={6} className="profile-section">
                  <h5 className="section-title">Vehicle Information</h5>
                  {isEditing ? (
                    <>
                      <Form.Group controlId="formVehicleType">
                        <Form.Label><FaCar className="icon" /> Vehicle Type</Form.Label>
                        <Form.Control
                          type="text"
                          name="vehicleType"
                          value={userData.vehicleType}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formNumberPlate">
                        <Form.Label><FaHashtag className="icon" /> Number Plate</Form.Label>
                        <Form.Control
                          type="text"
                          name="numberPlate"
                          value={userData.numberPlate}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      
                    </>
                  ) : (
                    <>
                      <Card.Text className="profile-info">
                        <FaCar className="icon" /> <strong>Vehicle Type:</strong> {userData.vehicleType}
                      </Card.Text>
                      <Card.Text className="profile-info">
                        <FaHashtag className="icon" /> <strong>Number Plate:</strong> {userData.numberPlate}
                      </Card.Text>
                      {vehicleImage && (
                        <img src={vehicleImage} alt="Vehicle" className="vehicle-image-preview" />
                      )}
                    </>
                  )}
                </Col>
              </Row>
              <Button className="edit-profile-btn mt-4" onClick={handleEditClick}>
                {isEditing ? "Save Profile" : "Edit Profile"}
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
