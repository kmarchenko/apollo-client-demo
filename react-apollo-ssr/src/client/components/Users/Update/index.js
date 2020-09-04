import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql, defaultDataIdFromObject } from '@apollo/client';
import { Form, Button, Table } from 'react-bootstrap';

const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      name
      posts {
        id
        text
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!) {
    updateUser(input: { id: $id, name: $name }) {
      id
      name
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($user: ID!, $text: String!) {
    createPost(input: { user: $user, text: $text }) {
      id
      text
    }
  }
`;

const UserUpdate = () => {
  const { id } = useParams();
  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER);
  const [createPost, { loading: createPostLoading }] = useMutation(CREATE_POST);

  const { data: { user } = {}, loading, error } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

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

  const onPostCreate = async e => {
    e.preventDefault();
    try {
      await createPost({
        variables: {
          user: id,
          text: e.target[0].value,
        },
      });
    } catch (e) {
      console.error('Error in creating post', e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Something went wrong!</p>;

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h4>Updating user {user.name} ({user.id})</h4>
        <Form.Group>
          <Form.Control name="name" type="text" placeholder="New name" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={updateLoading}>
          Update user
        </Button>
      </Form>
      <Table striped bordered hover size="sm" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {user.posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.text}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form onSubmit={onPostCreate} style={{ marginTop: 10 }}>
        <Form.Group>
          <Form.Control name="text" type="text" placeholder="Text" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={updateLoading}>
          Create post
        </Button>
      </Form>
    </div>
  );
};

export default UserUpdate;
