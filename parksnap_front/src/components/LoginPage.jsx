import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Username: ", username);
    console.log("Password: ", password);
    navigate('/reserve'); // Navigate to homepage on login
  };

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <div className="login-container">
      <Row>
        <Col>
          <div className="welcome-text">
            <h1>Welcome <span>Back!</span></h1>
          </div>
          <Form onSubmit={handleLogin} className="login-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCheckbox" className="checkbox">
              <Form.Check type="checkbox" label="Remember for 30 days" />
            </Form.Group>

            <Button variant="primary" type="submit">
              LOGIN
            </Button>

            <div className="forgot-password">
              <a href="/resetpw">Forgot Password?</a>
            </div>
          </Form>

          <div className="sign-up-text">
            Don't have an account? <span onClick={handleSignUp}>Sign up</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
