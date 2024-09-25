// AboutUsPage.jsx
import React from 'react';
import { Container, Row, Col, Image} from 'react-bootstrap';
import Footer from './Footer'; // Adjust the path if needed
import './AboutUsPage.css'; // Import your CSS file
import NavigationBar from './Navbar';

const AboutUsPage = () => {
  return (
    <>
    <NavigationBar/>
    <div className="about-us-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p>We are dedicated to making your parking experience easier and more efficient.</p>
      </header>

      {/* Team Members Section */}
      <Container className="main-content">
        <Row className="team-members">
          <Col xs={12} md={4} className="text-center mb-4">
            <Image 
              src="images/Group-photo.jpg" 
              roundedCircle 
              fluid 
              alt="Group Photo" 
              style={{ maxWidth: '2000px', width: '100%', height: 'auto' }} // Adjust size here
            />
          </Col>
          {/* Add more Col elements for additional team members */}
        </Row>
      </Container>

      <Footer />
    </div>
    </>
  );
};

export default AboutUsPage;
