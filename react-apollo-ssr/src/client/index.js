import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

/** Styles */
import 'bootstrap/dist/css/bootstrap.min.css';

/** Routes */
import Routes from './routes';

/** Apollo Client */
import client from './apollo';

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
