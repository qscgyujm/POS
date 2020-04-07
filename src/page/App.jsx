import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action } from '../redux/index';

import compose from '../helper/compose';

import Product from './Product';

const App = (props) => (
  <div>
    APP
    <Product />
  </div>
);

export default App;
