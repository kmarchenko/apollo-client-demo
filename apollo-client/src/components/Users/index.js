import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

/** Components */
import UserDelete from './Delete';

const GET_USERS = gql`
  query {
    users {
      id
      name
      posts {
        id
      }
    }
  }
`;

const USER_CREATED_SUBSCRIPTION = gql`
  subscription OnUserCreated {
    onUserCreated {
      id
      name
      posts {
        id
      }
    }
  }
`;

function App() {
  const {
    data: { users = [] } = {},
    loading,
    error,
    subscribeToMore,
  } = useQuery(GET_USERS);

  useEffect(() => {
    subscribeToMore({
      document: USER_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newUser = subscriptionData.data.onUserCreated;
        return { users: [...prev.users, newUser] };
      },
    });
  }, [subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Something went wrong!</p>;

  return (
    <div>
      <Link to="/users/create">Create user</Link>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Posts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>{user.id}</Link>
              </td>
              <td>{user.name}</td>
              <td>{user.posts.length}</td>
              <td>
                <UserDelete id={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default App;
