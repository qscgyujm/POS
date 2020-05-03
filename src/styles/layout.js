import styled from 'styled-components';

import { media } from '../helper/media';

const Wrapper = styled.section`
  margin: 0 50px;
  min-height: calc(100vh - 50px);
  background-color: #d8d8d8;
`;

export const LogoutContainer = styled(Wrapper)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const LoginContainer = styled.div`
  margin: 0 50px;
  background-color: #cfe1e6;
  min-height: calc(100vh - 50px);

  ${media.laptop`
    margin: 0;
  `}
`;
