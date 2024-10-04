import React, { useState } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; // Import the custom axios instance
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To store error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const loginData = { username, password };

    try {
      // Step 1: Make login request
      const response = await axiosInstance.post('/api/auth/login', loginData);

      if (response.status === 200) {
        const token = response.data;

        // Step 2: Store the token in localStorage
        localStorage.setItem('token', token);

        // Step 3: Fetch user details using the /me endpoint
        const userResponse = await axiosInstance.get('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Step 4: Store user details in localStorage
        if (userResponse.status === 200) {
          const userData = userResponse.data;
          localStorage.setItem('user', JSON.stringify(userData));

          // Step 5: Navigate to the next page
          navigate('/reserve');
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password'); // Set error for 401 Unauthorized
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
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
          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}
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
