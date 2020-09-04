import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  makeVar,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import fetch from 'cross-fetch';

const isBrowser = typeof window !== 'undefined';

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  fetch,
});

const wsLink = isBrowser ? new WebSocketLink({
  uri: `ws://localhost:3001/graphql`,
  options: {
    reconnect: true,
  },
}) : null;

const splitLink = isBrowser ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
) : httpLink;

export const cartItemsVar = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
      },
    },
  },
});

if (isBrowser) {
  cache.restore(window.__APOLLO_STATE__);
}

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
