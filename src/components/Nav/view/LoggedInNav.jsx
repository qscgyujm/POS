import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoggedInContainer = styled.div`
  height: 50px;
  background-color: #05a5cb;
`;

const LoggedInWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  position: relative;
`;

const PathWrapper = styled.div`
  margin-right: 50px;
`;

const LinkTag = styled.span`
`;

const LogoutWrapper = styled.div`
  position: absolute;
  right: 50px;
`;

const LogoutTag = styled.div`
  color: #FFF;
  font-size: 16px;
  cursor: pointer;
`;

const loggedIn = (props) => {
  const { isAdmin, linkList, logoutAuth } = props;

  const clickLogoutHandler = () => {
    logoutAuth();
  };

  return (
    <LoggedInContainer>
      <LoggedInWrapper>
        {
          linkList.map((link, i) => (
            <PathWrapper
              key={i.toString()}
            >
              <Link to={link.path}>
                <LinkTag>
                  {link.name}
                </LinkTag>
              </Link>
            </PathWrapper>
          ))
        }
        {
          isAdmin
          && (
            <Link to="setting_product">
              <LinkTag>
                Setting Product
              </LinkTag>
            </Link>
          )
        }
        <LogoutWrapper>
          <LogoutTag
            onClick={clickLogoutHandler}
          >
            Log Out
          </LogoutTag>
        </LogoutWrapper>
      </LoggedInWrapper>
    </LoggedInContainer>
  );
};

export default loggedIn;
