/* eslint no-shadow: "off" */

import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectRoute = ({
  component: BaseComponent,
  ...rest
}) => {
  const history = useHistory();
  const { isAuth } = rest;

  if (!isAuth) {
    history.push('/');
  }

  return (
    <Route
      render={(rest) => (
        <>
          <BaseComponent
            {...rest}
          />
        </>
      )}
    />
  );
};

// function ProtectRoute({
//   BaseComponent,
//   ...rest
// }) {
//   const history = useHistory();
//   const { isAuth } = rest;

//   if(!isAuth) {
//     history.push('/login');
//   }

//   return(
//     <Route
//       render={rest => (
//         <BaseComponent
//           {...rest}
//         />
//       )}
//     />
//   )
// }


const mapStateToProps = (state) => state.auth;

export default connect(mapStateToProps)(ProtectRoute);
