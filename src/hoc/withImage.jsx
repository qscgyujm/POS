import React from 'react';
import styled from 'styled-components';

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
`;

const withImage = (
  BaseComponent,
) => (props) => {
  const { imageUrl } = props;

  return (
    <>
      <ProductImage
        src={imageUrl}
      />
      <BaseComponent
        {...props}
      />
    </>
  );
};

export default withImage;
