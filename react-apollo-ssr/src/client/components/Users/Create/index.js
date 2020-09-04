import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';

const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(input: { name: $name }) {
      id
      name
    }
  }
`;

const UserCreate = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    update(cache, { data: { createUser } }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            return [...existingUsers, createUser];
          },
        },
      });
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          name: e.target[0].value,
        },
      });
    } catch (e) {
      console.error('Error in creating user', e);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Control name="name" type="text" placeholder="Enter name" />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Create user
      </Button>
    </Form>
  );
};

export default UserCreate;
