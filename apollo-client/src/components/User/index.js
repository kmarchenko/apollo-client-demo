import React from 'react';
import { Button } from 'react-bootstrap';

/** Hooks */
import useUser from '../../hooks/useUser';

function User() {
  const [user, login, logout] = useUser();

  if (!user) {
    return (
      <Button onClick={login}>Login</Button>
    );
  }

  return (
    <p>
      {user.name} ({user.money}) <Button onClick={logout}>Logout</Button>
    </p>
  );
}

export default User;
