import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

/** Components */
import User from '../User';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const Home = ({ children }) => {
  const { data: { cartItems = [] } = {} } = useQuery(GET_CART_ITEMS);

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
          <Nav.Link as={Link} to="/cart">
            Cart {cartItems.length ? `(${cartItems.length})` : null}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div style={{ float: 'right', marginTop: -30 }}>
        <User />
      </div>
      <div style={{ marginTop: 20, padding: 15 }}>
        {children}
      </div>
    </Container>
  )
};

export default Home;
