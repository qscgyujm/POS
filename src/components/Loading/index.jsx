import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Container = styled.div`
  width: calc(100vw - 100px);
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loadingAnimation = keyframes`
  from {
    color: #FFF;
    background-color: #000;
  }

  to {
    color: #000;
    background-color: #FFF;
  }
`;

const emptyAnimation = keyframes`
  from {
    color: #d34545;
    background-color: #4cd6a5;
  }

  to {
    color: #4cd6a5;
    background-color: #d34545;
  }
`;

export const Wrapper = styled.div`
  border-radius: 25px;
  padding: 30px;
  font-size: 30px;
  font-weight: 700;

  ${(props) => (props.isLoading
    ? css`
      animation: ${loadingAnimation}  2s linear infinite;
    `
    : css`
      animation: ${emptyAnimation}  2s linear infinite;
    `)}
  
`;

const index = (props) => {
  const { isLoading } = props;
  return (
    <Container>
      <Wrapper
        isLoading={isLoading}
      >
        {
          isLoading
            ? 'Loading'
            : 'Empty'
        }
      </Wrapper>
    </Container>
  );
};

export default index;
