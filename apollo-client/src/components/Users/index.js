import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import Pagination from 'react-bootstrap-4-pagination';
import { useQuery, gql } from '@apollo/client';

/** Components */
import UserDelete from './Delete';

const GET_USERS = gql`
  query GetUsers($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      items {
        id
        name
        posts {
          id
        }
      }
      offset
      limit
      totalCount
    }
  }
`;

function App() {
  const LIMIT = 10;

  const {
    data: {
      users: {
        items = [],
        offset = 0,
        totalCount = 0,
      } = {},
    } = {},
    fetchMore,
    loading,
    error,
  } = useQuery(GET_USERS, {
    variables: {
      offset: 0,
      limit: LIMIT,
    },
    // fetchPolicy: 'cache-and-network',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Something went wrong!</p>;

  const paginationConfig = {
    totalPages: (totalCount / LIMIT),
    currentPage: (offset / LIMIT) + 1,
    showMax: (totalCount / LIMIT),
    size: 'sm',
    threeDots: false,
    prevNext: true,
    circle: false,
    onClick: page => {
      console.log(page * LIMIT);
      fetchMore({
        variables: {
          offset: (page - 1) * LIMIT,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });
    },
  };

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
      <Pagination {...paginationConfig} />
    </div>
  )
}

export default App;
