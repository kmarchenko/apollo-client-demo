import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!) {
    updateUser(input: { id: $id, name: $name }) {
      id
      name
    }
  }
`;

const UserUpdate = () => {
  const { id } = useParams();

  const [updateUser, { loading }] = useMutation(UPDATE_USER);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await updateUser({
        variables: {
          id,
          name: e.target[0].value,
        },
      });
    } catch (e) {
      console.error('Error in updating user', e);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <h4>Updating user {id}</h4>
      <Form.Group>
        <Form.Control name="name" type="text" placeholder="New name" />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Update user
      </Button>
    </Form>
  );
};

export default UserUpdate;
