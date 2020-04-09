import React from 'react';
import styled from 'styled-components';

import { uploadImage as uploadImageHelper } from '../../helper/uploadImage';

const Input = styled.input`
`;

const index = (props) => {
  const {
    localState,
    setLocalState,
    uploadImg,
  } = props;

  const changeInputHandler = (e) => {
    e.preventDefault();

    const resolve = (url) => {
      setLocalState({
        ...localState,
        imageUrl: url,
      });
    };

    uploadImageHelper(e, uploadImg, resolve);
  };

  return (
    <Input
      type="file"
      onChange={changeInputHandler}
    />
  );
};

export default index;
