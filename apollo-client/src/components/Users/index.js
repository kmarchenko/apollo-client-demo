import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

/** Components */
import UserDelete from './Delete';

const GET_USERS = gql`
  query GetUsers($before: String, $after: String, $limit: Int) {
    users(before: $before, after: $after, limit: $limit) {
      items {
        id
        name
        posts {
          id
        }
      }
      cursor {
        before
        after
        hasPrev
        hasNext
      }
    }
  }
`;

function App() {
  const LIMIT = 10;

  const {
    data: {
      users: {
        items = [],
        cursor: {
          before = null,
          after = null,
          hasPrev = false,
          hasNext = false,
        } = {},
      } = {},
    } = {},
    fetchMore,
    loading,
    error,
  } = useQuery(GET_USERS, {
    variables: {
      limit: LIMIT,
    },
    // fetchPolicy: 'cache-and-network',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Something went wrong!</p>;

  return (
    <div>
      <Link
        style={{ marginBottom: 10 }}
        component={Button}
        to="/users/create"
      >
        Create user
      </Link>
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
          {items.map(user => (
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
      <div>
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                before,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return fetchMoreResult;
              },
            });
          }}
          disabled={!hasPrev}
        >
          Prev
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          onClick={() => {
            fetchMore({
              variables: {
                after,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return fetchMoreResult;
              },
            });
          }}
          disabled={!hasNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default App;
