import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';

import ImgUpload from '../../Upload';

const EditContainer = styled.div`
  padding: 15px;
`;

const EditWrapper = styled.div`
  margin-bottom: 10px;
`;

const EditTile = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const EditTextArea = styled.textarea`
  width: 100%;
`;

const EditInput = styled.input`
  width: 100%;
`;


const EditPanel = (props) => {
  const {
    localState,
    setLocalState,
    changeNameHandler,
    changeDescriptionHandler,
    changePriceHandler,
    uploadImg,
  } = props;

  return (
    <EditContainer>
      <EditWrapper>
        <EditTile>Name</EditTile>
        <EditInput
          value={localState.name}
          onChange={changeNameHandler}
        />
      </EditWrapper>
      <EditWrapper>
        <EditTile>Describe</EditTile>
        <EditTextArea
          value={localState.description}
          onChange={changeDescriptionHandler}
        />
      </EditWrapper>
      <EditWrapper>
        <EditTile>Price</EditTile>
        <EditInput
          type="number"
          value={localState.price}
          onChange={changePriceHandler}
        />
      </EditWrapper>
      <EditWrapper>
        <EditTile>imageUrl</EditTile>
        <ImgUpload
          localState={localState}
          setLocalState={setLocalState}
          uploadImg={uploadImg}
        />
      </EditWrapper>
    </EditContainer>
  );
};

export default compose(
  (BaseComponent) => (props) => {
    const {
      localState,
      setLocalState,
    } = props;

    const changeNameHandler = (e) => {
      setLocalState({
        ...localState,
        name: e.target.value,
      });
    };

    const changeDescriptionHandler = (e) => {
      setLocalState({
        ...localState,
        description: e.target.value,
      });
    };

    const changePriceHandler = (e) => {
      setLocalState({
        ...localState,
        price: e.target.value,
      });
    };

    return (
      <BaseComponent
        {...props}
        localState={localState}
        setLocalState={setLocalState}
        changeNameHandler={changeNameHandler}
        changeDescriptionHandler={changeDescriptionHandler}
        changePriceHandler={changePriceHandler}
      />
    );
  },
)(EditPanel);
