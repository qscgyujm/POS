import styled, { keyframes } from 'styled-components';

import { media } from '../../../helper/media';

const ModalNormalSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalWrapper = styled.section`
  animation: ${ModalNormalSlide} 0.3s ease 0s both;
  border-radius: 5px;
  max-width: ${(props) => `${props.maxWidth}px`};
  width: 100%;
  line-height: 1.5;

  z-index: 80;
`;

export const ModalContentWrapper = styled.section`
  background: #FFF;
  border-radius: 5px;
  padding: 35px;

  ${media.tablet`
    padding: 20px;
  `}
`;
