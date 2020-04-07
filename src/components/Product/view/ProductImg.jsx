import React from 'react';
import styled from 'styled-components';

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 5px;
`;

const ProductImg = (props) => {
  const { imageUrl } = props;
  return (
    <ProductImage
      src={imageUrl}
    />
  );
};

export default ProductImg;
