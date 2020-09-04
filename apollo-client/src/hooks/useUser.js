import { useQuery, gql } from '@apollo/client';
import Chance from 'chance';

const USER_QUERY = gql`
  query UserQuery {
    user @client {
      name
      money
    }
  }
`;

function useUser() {
  const { data: { user = null } = {}, client } = useQuery(USER_QUERY);

  const login = () => {
    const chance = new Chance()
    client.writeQuery({
      query: USER_QUERY,
      data: {
        user: {
          name: chance.name(),
          money: chance.dollar(),
        },
      },
    });
  };

  const logout = () => {
    client.writeQuery({
      query: USER_QUERY,
      data: {
        user: null,
      },
    });
  };

  return [user, login, logout];
}

export default useUser;
