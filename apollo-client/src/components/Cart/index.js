import React from 'react';
import Chance from 'chance';
import { Table, Button } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

/** Cache */
import { cartItemsVar } from '../../apollo';

/** Hooks */
import useUser from '../../hooks/useUser';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

function Cart() {
  const [user] = useUser();

  const { data: { cartItems } = {}, loading, error } = useQuery(GET_CART_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {user && (
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Button
            variant="primary"
            onClick={() => {
              const chance = new Chance();
              const newItem = {
                name: chance.name(),
                price: chance.dollar(),
              };
              const cartItems = cartItemsVar();
              cartItemsVar([...cartItems, newItem]);
            }}
          >
            Add item to cart
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            variant="primary"
            onClick={() => {
              cartItemsVar([]);
            }}
          >
            Clear cart
          </Button>
        </div>
      )}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Cart;
