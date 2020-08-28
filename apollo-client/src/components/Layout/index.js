import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

const Home = ({ children }) => {
  return (
    <Container style={{ marginTop: 20 }}>
      <Nav defaultActiveKey="/" as="ul">
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
        </Nav.Item>
      </Nav>
      <div style={{ marginTop: 20, padding: 15 }}>
        {children}
      </div>
    </Container>
  )
};

export default Home;
