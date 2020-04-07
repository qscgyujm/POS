/* eslint import/prefer-default-export: "off" */

import { css } from 'styled-components';

export const media = {
  tablet: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)}
    }
  `,
};
