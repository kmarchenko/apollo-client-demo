import React from 'react';
import { Button } from 'react-bootstrap';
import { useApolloClient } from '@apollo/client';

function Home() {
  const client = useApolloClient();

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          client.resetStore();
        }}
      >
        Reset store
      </Button>
    </div>
  )
}

export default Home;
