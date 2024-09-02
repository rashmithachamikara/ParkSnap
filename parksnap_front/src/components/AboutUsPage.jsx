import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Footer from './Footer'; // Adjust the path if needed
import './AboutUsPage.css'; // Import your CSS file

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p>We are dedicated to making your parking experience easier and more efficient.</p>
      </header>

      {/* Team Members Section */}
      <Container className="main-content">
        <Row className="team-members">
          <Col xs={12} md={4} className="text-center mb-4">
            <Image src="path/to/member1.jpg" roundedCircle fluid alt="Team Member 1" />
            <h4>Member Name</h4>
            <p>Position</p>
          </Col>
          {/* Add more Col elements for additional team members */}
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
