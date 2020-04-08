import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

// import { action as authAction } from '../../redux/auth';

import iconSrc from 'public/logo192.png';

import compose from '../../helper/compose';
import withWrapper from '../../hoc/withWrapper';

import { media } from '../../helper/media';

import LoggedInNav from './view/LoggedInNav';

const NavContainer = styled.div`

  ${media.tablet`
    display: none;
  `}
`;

const NavWrapper = styled.div`
  height: 50px;
  background-color: #000C;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  position: relative;
`;

const Icon = styled.img`
  height: 30px;
  width: 30px;
`;

const SignupWrapper = styled.div`
  position: absolute;
  right: 50px;
`;

const RegisterTag = styled.div`
  color: #FFF;
  font-size: 16px;
  cursor: pointer;
`;

const loggedInLink = [{
  path: '/product',
  name: 'Product',
}, {
  path: '/order',
  name: 'Order',
}, {
  path: '/edit_product',
  name: 'Edit Product',
}, {
  path: '/edit_Profile',
  name: 'Edit Profile',
}];

const Nav = () => (
  <NavWrapper>
    <LinkWrapper>
      <Link to="/">
        <Icon
          src={iconSrc}
        />
      </Link>
      {/* <SignupWrapper>
        <Link to="/register">
          <RegisterTag>
            Sign up
          </RegisterTag>
        </Link>
      </SignupWrapper> */}
    </LinkWrapper>
  </NavWrapper>
);

// const mapStateToProps = (state) => state.auth;

// const mapDispatchToProps = (dispatch) => {
//   // const {
//   //   logoutAuth,
//   //   checkAuth,
//   // } = authAction;

//   return {
//     ...bindActionCreators({
//       logoutAuth,
//       checkAuth,
//     }, dispatch),
//   };
// };

export default compose(
  withWrapper(NavContainer),
  // (BaseComponent) => (props) => {
  //   const {
  //     // isAuth,
  //     // logoutAuth
  //   } = props;

  //   // React.useEffect(
  //   //   () => {
  //   //     console.log('Nav')
  //   //     checkAuth();
  //   //   },
  //   //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   //   [],
  //   // )

  //   // if (isAuth) {
  //   //   return (
  //   //     <LoggedInNav
  //   //       {...props}
  //   //       linkList={loggedInLink}
  //   //       // logoutAuth={logoutAuth}
  //   //     />
  //   //   );
  //   // }

  //   return (
  //     <BaseComponent
  //       {...props}
  //     />
  //   );
  // },
)(Nav);
