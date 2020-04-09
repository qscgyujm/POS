import React from 'react';
import styled from 'styled-components';

const DeleteWrapper = styled.div`
  position: relative;
`;

const DeleteButton = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: #FFF;
  color: #F00;
  cursor: pointer;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  padding-top: 3px;
  transition: 1s;

  :hover {
    background-color: #F00;
    color: #FFF;
    transition: 0.5s;
  }
`;

const withDeleteProduct = (
  BaseComponent,
) => (props) => {
  const { deleteProduct, product } = props;

  const clickDeleteButtonHandler = () => {
    /* eslint-disable */
    const { p_id } = product;

    deleteProduct(p_id);
  };

  return (
    <DeleteWrapper>
      <DeleteButton
        onClick={clickDeleteButtonHandler}
      >
        X
      </DeleteButton>
      <BaseComponent
        {...props}
      />
    </DeleteWrapper>
  );
};

export default withDeleteProduct;
