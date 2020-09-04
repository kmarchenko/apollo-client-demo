import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

/** Components */
import UserDelete from './Delete';

const GET_USERS = gql`
  query GetUsers($first: Int, $after: String, $last: Int, $before: String) {
    users(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id
          name
          posts {
            id
          }
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

function App() {
  const LIMIT = 10;

  const {
    data: {
      users: {
        edges = [],
        pageInfo: {
          startCursor = null,
          endCursor = null,
          hasPreviousPage = false,
          hasNextPage = false,
        } = {},
      } = {},
    } = {},
    fetchMore,
    loading,
    error,
  } = useQuery(GET_USERS, {
    first: LIMIT,
    last: LIMIT,
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
          {edges.map(({ node: user }) => (
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
                before: startCursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return fetchMoreResult;
              },
            });
          }}
          disabled={!hasPreviousPage}
        >
          Prev
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          onClick={() => {
            fetchMore({
              variables: {
                after: endCursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return fetchMoreResult;
              },
            });
          }}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default App;
