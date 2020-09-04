import React from 'react';
import express from 'express';
import fetch from 'node-fetch';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import Routes from '../client/routes';
import { getHtmlDocument } from './htmlDocument';

const app = express();
const port = 3000;

app.use('/assets', express.static('./dist/assets'));

app.get('*', async (req, res) => {
  const context = {};
  const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: 'http://localhost:3001/graphql',
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    </ApolloProvider>
  );

  await getDataFromTree(App);
  const apolloState = client.extract();

  const html = ReactDOMServer.renderToString(App);
  const htmlDocument = getHtmlDocument({
    html,
    apolloState,
  });

  return res.send(htmlDocument);
});

app.listen(port, () => console.log(`Listen on port ${port}!`));
