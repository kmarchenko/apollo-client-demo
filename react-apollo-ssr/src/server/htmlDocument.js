export const getHtmlDocument = ({ html, apolloState }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/assets/bundle.css">
  </head>
  <body>
    <div id="root">${html}</div>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <script type="text/javascript">window.__APOLLO_STATE__=${JSON.stringify(apolloState)}</script>
    <script type="text/javascript" src="/assets/bundle.js"></script>
  </body>
</html>
`;
