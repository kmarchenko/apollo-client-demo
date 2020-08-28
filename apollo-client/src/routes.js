import React from 'react';
import { Switch, Route } from "react-router-dom";

/** Components */
import Layout from './components/Layout';
import Users from './components/Users';
import UsersCreate from './components/Users/Create';
import UsersUpdate from './components/Users/Update';

const Routes = () => (
  <Switch>
    <Layout>
      <Route exact path="/users" component={Users} />
      <Route exact path="/user/:id" component={UsersUpdate} />
      <Route exect path="/users/create" component={UsersCreate} />
      <Route exact path="/">
        Home
      </Route>
    </Layout>
  </Switch>
);

export default Routes;
