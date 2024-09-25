import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container className="mt-5">
      <h2>Dashboard</h2>
      <Row>
        <Col md={6}>
          <h5>Reservation Statistics</h5>
          {/* Insert chart or statistics components here */}
        </Col>
        <Col md={6}>
          <h5>Popular Times</h5>
          
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
