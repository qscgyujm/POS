import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';
import { pick, every } from 'lodash';

import AddIconSrc from '../../../img/add.png';

import withWrapper from '../../../hoc/withWrapper';

import { Button } from '../../../styles/unit';

import ProductImage from '../../Product/view/ProductImg';
import EditPanel from '../../EditProduct/view/EditPanel';

const ProductContainer = styled.div`
  width: 25%;
  padding: 10px;
  box-sizing: border-box;
`;

const ProductWrapper = styled.div`
  background-color: #8a8a8a;
  border: solid 1px #8a8a8a;
  border-radius: 5px;
`;

const CreateProductContainer = styled.div`
  background-color: #8a8a8a;
  border: solid 1px #8a8a8a;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  min-height: 520px;
`;

const CreateProductWrapper = styled.div`
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const AddIcon = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CreatePanel = (props) => {
  const { localState, setLocalState, uploadImg } = props;

  return (
    <>
      <ProductImage
        imageUrl={localState.imageUrl}
      />
      <EditPanel
        localState={localState}
        setLocalState={setLocalState}
        uploadImg={uploadImg}
      />
    </>
  );
};

const initialState = () => ({
  name: '',
  description: '',
  price: 1,
  imageUrl: '',
});

export default compose(
  withWrapper(ProductContainer),
  (BaseComponent) => (props) => {
    const [localState, setLocalState] = React.useState(initialState());
    const [isCreate, setIsCreate] = React.useState(false);

    const clickCreateButtonHandler = () => {
      setIsCreate(true);

      setLocalState(initialState());
    };

    const clickCancelButtonHandler = () => {
      setIsCreate(false);
    };

    const clickSaveButtonHandler = () => {
      const { createProduct } = props;

      const newProduct = pick(localState, ['name', 'price']);

      if (every(newProduct)) {
        setLocalState(initialState());
      }

      const resolve = () => setIsCreate(false);

      createProduct(localState, resolve);
    };

    if (!isCreate) {
      return (
        <CreateProductContainer>
          <CreateProductWrapper>
            <IconWrapper>
              <AddIcon
                src={AddIconSrc}
                onClick={clickCreateButtonHandler}
                alt="add"
              />
            </IconWrapper>
          </CreateProductWrapper>
        </CreateProductContainer>
      );
    }

    return (
      <ProductWrapper>
        <BaseComponent
          {...props}
          localState={localState}
          setLocalState={setLocalState}
          clickSaveButtonHandler={clickSaveButtonHandler}
        />
        <ButtonWrapper>
          <Button onClick={clickCancelButtonHandler}>取消</Button>
          <Button onClick={clickSaveButtonHandler}>儲存</Button>
        </ButtonWrapper>
      </ProductWrapper>
    );
  },
)(CreatePanel);
