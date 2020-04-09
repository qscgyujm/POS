import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';

import { Button } from '../../../styles/unit';
import { Header } from '../style/unit';

const PasswordContainer = styled.form`
`;

const PasswordWrapper = styled.div`
`;

const ContentWrapper = styled.div`
  margin-bottom: 15px;
`;

const ContentTitle = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
`;

const ContentInput = styled.input`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const Password = (props) => {
  const {
    localPassword,
    clickCancelPasswordHandler,
    clickSubmitPasswordHandler,
    changePasswordHandler,
    changeConfirmPasswordHandler,
    changeNewPasswordHandler,
  } = props;


  return (
    <PasswordContainer onSubmit={clickSubmitPasswordHandler}>
      <Header>
        Edit Password
      </Header>
      <PasswordWrapper>
        <ContentWrapper>
          <ContentTitle>Password</ContentTitle>
          <ContentInput
            type="password"
            value={localPassword.password}
            onChange={changePasswordHandler}
          />
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>New Password</ContentTitle>
          <ContentInput
            type="password"
            value={localPassword.newPassword}
            onChange={changeNewPasswordHandler}
          />
        </ContentWrapper>
        <ContentWrapper>
          <ContentTitle>Confirm Password</ContentTitle>
          <ContentInput
            type="password"
            value={localPassword.confirmPassword}
            onChange={changeConfirmPasswordHandler}
          />
        </ContentWrapper>
      </PasswordWrapper>
      <ButtonWrapper>
        <Button onClick={clickCancelPasswordHandler}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </ButtonWrapper>
    </PasswordContainer>
  );
};

export default compose(
  (BaseComponent) => (props) => {
    const { setIsPassword, updatePassword } = props;

    const [localPassword, setLocalPassword] = React.useState({
      password: '',
      confirmPassword: '',
      newPassword: '',
    });

    const clickCancelPasswordHandler = () => {
      setIsPassword(false);
    };

    const clickSubmitPasswordHandler = (e) => {
      e.preventDefault();

      const { password, confirmPassword, newPassword } = localPassword;

      if (newPassword !== confirmPassword) {
        setLocalPassword({
          password: '',
          confirmPassword: '',
          newPassword: '',
        });
        return;
      }

      if (
        newPassword === confirmPassword
        && password !== newPassword
        && password !== confirmPassword
      ) {
        const resolve = () => setIsPassword(false);

        updatePassword(localPassword, resolve);
      }
    };

    const changePasswordHandler = (e) => {
      setLocalPassword({
        ...localPassword,
        password: e.target.value,
      });
    };

    const changeConfirmPasswordHandler = (e) => {
      setLocalPassword({
        ...localPassword,
        confirmPassword: e.target.value,
      });
    };

    const changeNewPasswordHandler = (e) => {
      setLocalPassword({
        ...localPassword,
        newPassword: e.target.value,
      });
    };

    return (
      <BaseComponent
        {...props}
        localPassword={localPassword}
        clickCancelPasswordHandler={clickCancelPasswordHandler}
        clickSubmitPasswordHandler={clickSubmitPasswordHandler}
        changePasswordHandler={changePasswordHandler}
        changeConfirmPasswordHandler={changeConfirmPasswordHandler}
        changeNewPasswordHandler={changeNewPasswordHandler}
      />
    );
  },
)(Password);
