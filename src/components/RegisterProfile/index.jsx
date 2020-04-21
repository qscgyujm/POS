import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';
import { useHistory } from 'react-router-dom';
import { every, pick } from 'lodash';

import withWrapper from '../../hoc/withWrapper';

import { LogoutContainer } from '../../styles/layout';
import { Button } from '../../styles/unit';
import Profile from '../Profile';
import VerifyCode from './view/VerifyCode';

const RegisterWrapper = styled.div`
  background-color: #e9e9e9;
  width: 500px;
  min-height: 300px;
  padding: 15px;
`;

const RegisterTitle = styled.p`
  text-align: center;
  font-size: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const initialState = () => ({
  email: '',
  name: '',
  password: '',
  location: '',
  code: '',
});

const index = (props) => {
  const {
    localProfile,
    setLocalProfile,
    clickCancelButtonHandler,
    clickSendCodeButtonHandler,
    clickRegisterButtonHandler,
    isSend,
  } = props;

  return (
    <>
      <RegisterTitle>
        Register
      </RegisterTitle>
      <Profile
        localProfile={localProfile}
        setLocalProfile={setLocalProfile}
        isEdit
        isRegister
      />
      {
        isSend
        && (
          <VerifyCode
            localProfile={localProfile}
            setLocalProfile={setLocalProfile}
          />
        )
      }
      <ButtonWrapper>
        <Button onClick={clickCancelButtonHandler}>Cancel</Button>
        {
          !isSend
            ? (
              <Button onClick={clickSendCodeButtonHandler}>Send Email</Button>
            )
            : (
              <Button onClick={clickRegisterButtonHandler}>register</Button>
            )
        }
      </ButtonWrapper>
    </>
  );
};

export default compose(
  withWrapper(LogoutContainer),
  withWrapper(RegisterWrapper),
  (BaseComponent) => (props) => {
    const { checkCode, sendCode } = props;
    const history = useHistory();

    const [localProfile, setLocalProfile] = React.useState(initialState());
    const [isSend, setIsSend] = React.useState(false);

    const clickCancelButtonHandler = () => {
      setLocalProfile(initialState());
    };

    const clickSendCodeButtonHandler = () => {
      const { email } = localProfile;

      if (!every(pick(localProfile, ['email', 'name', 'password', 'location']))) {
        return;
      }

      const resolve = () => setIsSend(true);

      sendCode(email, resolve);
    };

    const clickRegisterButtonHandler = () => {
      const resolve = () => {
        history.push('/');
      };

      const reject = () => {
        setLocalProfile(initialState());
      };

      checkCode(localProfile, resolve, reject);
    };

    return (
      <BaseComponent
        isSend={isSend}
        localProfile={localProfile}
        setLocalProfile={setLocalProfile}
        clickCancelButtonHandler={clickCancelButtonHandler}
        clickSendCodeButtonHandler={clickSendCodeButtonHandler}
        clickRegisterButtonHandler={clickRegisterButtonHandler}
      />
    );
  },
)(index);
