import React from 'react';
import styled, { css } from 'styled-components';

import { Button } from '../../../styles/unit';

const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  *:not(:last-child){
    margin-right: 15px;
  }
`;

const ProductCount = styled.span`
  font-size: 36px;
  color: #e1334d;
  font-weight: 700;
`;

const ControlButton = styled(Button)`
  font-size: 30px;

  ${(props) => props.isZero && css`
    cursor: not-allowed;
  `}
`;

const ControlPanel = (props) => {
  const {
    orderCount,
    clickAddButtonHandler,
    clickMinusButtonHandler,
  } = props;

  const isZero = React.useMemo(() => orderCount === 0, [orderCount]);

  return (
    <ControlWrapper>
      <ControlButton
        disabled={isZero}
        isZero={isZero}
        onClick={clickMinusButtonHandler}
      >
        -
      </ControlButton>
      <ProductCount>
        {orderCount}
      </ProductCount>
      <ControlButton
        onClick={clickAddButtonHandler}
      >
        +
      </ControlButton>
    </ControlWrapper>
  );
};

export default ControlPanel;
