// src/components/Login.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can perform validation here if needed
    onLogin({ username, password });
  };

  return (
    <Container className="mt-5">

      <Row className="justify-content-md-center">
      <Col xs={12} md={6} className="bg-dark p-4 rounded text-light">
      <h1 >Ticketing System Application</h1>

          <h4 className="text-center mb-4">Login</h4>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
          <br></br>

          <Row>
            <Col className="text-center">
              <></>
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
