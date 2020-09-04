import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
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
    client,
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
      <Link component={Button} to="/users/create">Create user</Link>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Button
          variant="primary"
          onClick={() => {
            const userId = prompt('Enter user id');
            const userName = prompt('Enter new user name');

            const query = gql`
              query ReadUsers {
                users {
                  id
                  name
                }
              }
            `;

            const { users } = client.readQuery({ query });

            client.writeQuery({
              query,
              data: {
                users: users.map(user => {
                  if (user.id === userId) {
                    return {
                      ...user,
                      name: userName,
                    };
                  }
                  return user;
                }),
              },
            });
          }}
        >
          Write users to cache
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          variant="primary"
          onClick={() => {
            const data = client.readQuery({
              query: gql`
                query ReadUsers {
                  users {
                    id
                    name
                  }
                }
              `,
            });
            console.log(data);
          }}
        >
          Read users from cache
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          variant="primary"
          onClick={() => {
            client.clearStore();
          }}
        >
          Clear store
        </Button>
      </div>
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
