import React from 'react';
import { Container, Card } from 'react-bootstrap';

function UserProfile() {
  const userData = {
    name: "Murad Naser",
    email: "murad@example.com",
    contactNumber: "0123456789",
    department: "Research",
    vehicleType: "Car",
    numberPlate: "ABC 800"
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text>Name: {userData.name}</Card.Text>
          <Card.Text>Email: {userData.email}</Card.Text>
          <Card.Text>Contact Number: {userData.contactNumber}</Card.Text>
          <Card.Text>Department: {userData.department}</Card.Text>
          <Card.Text>Vehicle Type: {userData.vehicleType}</Card.Text>
          <Card.Text>Number Plate: {userData.numberPlate}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserProfile;
