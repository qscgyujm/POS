import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action } from '../redux/index';

import compose from '../helper/compose';

import Test from '../components/Test';

const App = (props) => {
  console.log(props);
  const { fetch } = props;

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      APP
      <Test />
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  const {
    fetch,
  } = action;

  return {
    ...bindActionCreators({
      fetch,
    }, dispatch),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(App);
