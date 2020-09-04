import React from 'react';
import { Button } from 'react-bootstrap';
import { useMutation, gql, defaultDataIdFromObject } from '@apollo/client';

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(input: { id: $id }) {
      id
    }
  }
`;

const UserDelete = ({ id }) => {
  const [deleteUser, { loading }] = useMutation(DELETE_USER, {
    variables: {
      id,
    },
    update(cache, { data: { deleteUser } }) {
      cache.evict(defaultDataIdFromObject(deleteUser));
    },
  });

  return (
    <Button size="sm" variant="danger" onClick={deleteUser} disabled={loading}>Delete</Button>
  );
};

export default UserDelete;
