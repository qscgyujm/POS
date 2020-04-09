import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'helper/compose';
import { bindActionCreators } from 'redux';
import { isNil } from 'lodash';

import { action as authAction } from '../redux/auth';

import ProtectLoginRoute from '../components/Protect/LoggedInRoute';
import ProtectLogoutRoute from '../components/Protect/LoggedOutRoute';

import Login from './Login';
import Product from './Product';
import Order from './Order';
import RegisterProfile from './Register';
import EditProduct from './EditProduct';
import EditProfile from './EditProfile';
import SettingProduct from './SettingProduct';

import GlobalStyle from '../styles/global';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <ProtectLogoutRoute path="/" exact component={Login} />
        <ProtectLogoutRoute path="/register" exact component={RegisterProfile} />
        <ProtectLoginRoute path="/product" exact component={Product} />
        <ProtectLoginRoute path="/order" exact component={Order} />
        <ProtectLoginRoute path="/edit_product" exact component={EditProduct} />
        <ProtectLoginRoute path="/edit_Profile" exact component={EditProfile} />
        <ProtectLoginRoute path="/setting_Product" exact component={SettingProduct} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => state.auth;

const mapDispatchToProps = (dispatch) => {
  const {
    checkAuth,
  } = authAction;

  return {
    ...bindActionCreators({
      checkAuth,
    }, dispatch),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  (BaseComponent) => (props) => {
    const { isAuth, isFetch, checkAuth } = props;

    React.useEffect(() => {
      if (isNil(isAuth)) {
        console.log('App');
        checkAuth();
      }
    },
    // eslint-disable-next-line
    []);

    if (isFetch) {
      return (
        <>
        </>
      );
    }

    return (
      <BaseComponent
        {...props}
      />
    );
  },
)(App);
