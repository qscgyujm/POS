import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';

const CodeWrapper = styled.div`
  margin-bottom: 15px;
`;

const Title = styled.p`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
`;

const VerifyCode = (props) => {
  const { localProfile, changeCodeHandler } = props;

  return (
    <CodeWrapper>
      <Title>驗證碼</Title>
      <Input
        value={localProfile.code}
        onChange={changeCodeHandler}
      />
    </CodeWrapper>
  );
};

export default compose(
  (BaseComponent) => (props) => {
    const { localProfile, setLocalProfile } = props;

    const changeCodeHandler = (e) => {
      setLocalProfile({
        ...localProfile,
        code: e.target.value,
      });
    };

    return (
      <BaseComponent
        {...props}
        changeCodeHandler={changeCodeHandler}
      />
    );
  },
)(VerifyCode);
