import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';
import { pick, every } from 'lodash';

import { SectionWrapper } from '../style/layout';
import { Button } from '../../../styles/unit';

import EditPanel from './EditPanel';

const SettingWrapper = styled.div`
  min-height: 200px;
  padding: 10px;
`;

const ProductInfoTitle = styled.p`
  margin-bottom: 5px;
  font-size: 20px;
`;

const ProductInfo = styled.p`
  font-size: 16px;

  :not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const EditButton = styled(Button)`
`;

const ProductPanel = (props) => {
  const { localState, clickEditButtonHandler, inEdit } = props;
  const { name, description, price } = localState;

  return (
    <SettingWrapper>
      <SectionWrapper>
        <ProductInfoTitle>產品:</ProductInfoTitle>
        <ProductInfo>{name}</ProductInfo>
      </SectionWrapper>
      <SectionWrapper>
        <ProductInfoTitle>敘述:</ProductInfoTitle>
        <ProductInfo>{description}</ProductInfo>
      </SectionWrapper>
      <SectionWrapper>
        <ProductInfoTitle>價格:</ProductInfoTitle>
        <ProductInfo>{price}</ProductInfo>
      </SectionWrapper>
      {
        !inEdit
        && (
        <SectionWrapper
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <EditButton
            onClick={clickEditButtonHandler}
          >
            編輯
          </EditButton>
        </SectionWrapper>
        )
      }
    </SettingWrapper>
  );
};

export default compose(
  (BaseComponent) => (props) => {
    const { localState, setLocalState, uploadImg } = props;

    const [isEdit, setIsEdit] = React.useState(false);

    const clickCancelButtonHandler = () => {
      setIsEdit(false);
    };

    const clickEditButtonHandler = () => {
      setIsEdit(true);
    };

    const clickUpdatedButtonHandler = () => {
      const { updateProduct } = props;

      const updatedProduct = pick(localState, ['name', 'price']);

      if (
        every(updatedProduct)
        && updatedProduct.price < 1
      ) {
        return;
      }

      const updatedId = localState.p_id;
      const updatedBody = pick(localState, ['name', 'description', 'price', 'imageUrl']);

      const resolve = () => {
        setIsEdit(false);
      };

      updateProduct(updatedId, updatedBody, resolve);
    };

    if (isEdit) {
      return (
        <>
          <EditPanel
            localState={localState}
            setLocalState={setLocalState}
            uploadImg={uploadImg}
          />
          <ButtonWrapper>
            <EditButton onClick={clickCancelButtonHandler}>取消</EditButton>
            <EditButton onClick={clickUpdatedButtonHandler}>更新</EditButton>
          </ButtonWrapper>
        </>
      );
    }

    return (
      <BaseComponent
        {...props}
        localState={localState}
        clickEditButtonHandler={clickEditButtonHandler}
      />
    );
  },
)(ProductPanel);
