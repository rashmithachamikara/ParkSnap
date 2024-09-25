import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import './UserProfile.css'; // Import the custom CSS file
import NavigationBar from './Navbar';
import Footer from './Footer';

function UserProfile() {
  const userData = {
    name: "Asitha Udara",
    email: "udara@example.com",
    contactNumber: "0123456789",
    department: "R&D",
    vehicleType: "Car",
    numberPlate: "ABC 800"
  };

  return (
    <>
    <NavigationBar />
    <div  className="back">
      <Card className="profile-card">
        <Card.Body>
          <Card.Title className="form-title">User Profile</Card.Title>
          <Form>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                defaultValue={userData.name}
                readOnly
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                defaultValue={userData.email}
                readOnly
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Contact Number</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                defaultValue={userData.contactNumber}
                readOnly
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Department</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                defaultValue={userData.department}
                readOnly
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Vehicle Type</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                defaultValue={userData.vehicleType}
                readOnly
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Number Plate</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                defaultValue={userData.numberPlate}
                readOnly
              />
            </Form.Group>

            <Button className="submit-button" type="button">
              Edit Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    
  </>
  );
}

export default UserProfile;
