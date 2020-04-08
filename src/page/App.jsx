import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import ProtectLoginRoute from 'hoc/LoggedInRoute';
import ProtectLogoutRoute from 'hoc/LoggedOutRoute';

import GlobalStyle from '../styles/global';

import Nav from '../components/Nav';
import Product from './Product';
import Login from './Login';

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Nav />
      <Switch>
        <ProtectLogoutRoute path="/" exact component={Login} />
        <ProtectLoginRoute path="/product" exact component={Product} />
        <Product />
      </Switch>
    </Router>
  </>
);

export default App;
