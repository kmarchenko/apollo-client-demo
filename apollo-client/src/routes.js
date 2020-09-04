import React from 'react';
import { Switch, Route } from "react-router-dom";

/** Components */
import Layout from './components/Layout';
import Home from './components/Home';
import Users from './components/Users';
import Cart from './components/Cart';
import UsersCreate from './components/Users/Create';
import UsersUpdate from './components/Users/Update';

const Routes = () => (
  <Switch>
    <Layout>
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/user/:id" component={UsersUpdate} />
      <Route exect path="/users/create" component={UsersCreate} />
      <Route exact path="/" component={Home} />
    </Layout>
  </Switch>
);

export default Routes;
