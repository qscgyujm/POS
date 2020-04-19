import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';

import AddIconSrc from '../../../img/add.png';

import withWrapper from '../../../hoc/withWrapper';

import { Button } from '../../../styles/unit';

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
  margin-bottom: 10px;
`;

const AddProductContainer = styled.ul`
  padding: 10px;
`;

const AddProductWrapper = styled.li`
  background-color: #f9f9f9;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :not(:last-of-type) {
    margin-bottom: 5px;
  }
`;

const InfoWrapper = styled.div`
  :not(:last-of-type) {
    margin-right: 10px;
  }
`;

const CreatePanel = (props) => {
  const { deletedProducts, localState, clickAddButtonHandler } = props;

  return (
    <>
      {
      deletedProducts.map((product, i) => (
        <AddProductContainer
          key={i.toString()}
        >
          <AddProductWrapper>
            <div
              style={{
                display: 'flex',
              }}
            >
              <InfoWrapper>
                {product.name}
              </InfoWrapper>
              <InfoWrapper>
                {product.price}
              </InfoWrapper>
            </div>
            <InfoWrapper>
              <Button
                onClick={() => clickAddButtonHandler(i)}
              >
                {
                    localState[i].isAdd
                      ? (
                        '刪除'
                      )
                      : (
                        '新增'
                      )
                  }
              </Button>
            </InfoWrapper>
          </AddProductWrapper>
        </AddProductContainer>
      ))
    }
    </>
  );
};

const getInitialState = (products) => products.map((product) => ({
  id: product.p_id,
  isAdd: false,
}));

export default compose(
  withWrapper(ProductContainer),
  (BaseComponent) => (props) => {
    const { deletedProducts } = props;

    const [localState, setLocalState] = React.useState(getInitialState(deletedProducts));
    const [isCreate, setIsCreate] = React.useState(false);

    React.useEffect(() => {
      setLocalState(getInitialState(deletedProducts));
    }, [deletedProducts]);

    const clickCreateButtonHandler = () => {
      setIsCreate(true);
    };

    const clickCancelButtonHandler = () => {
      setIsCreate(false);
    };

    const clickAddButtonHandler = (idx) => {
      const newLocalState = [...localState];
      newLocalState[idx] = {
        ...localState[idx],
        isAdd: !localState[idx].isAdd,
      };

      setLocalState(newLocalState);
    };

    const clickSaveButtonHandler = () => {
      const { createAddProduct } = props;
      const states = localState
        .filter((state) => state.isAdd === true)
        .map((state) => state.id);

      const resolve = (newState) => {
        setIsCreate(false);
        setLocalState(newState);
      };

      createAddProduct(states, resolve);
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
          clickAddButtonHandler={clickAddButtonHandler}
        />
        <ButtonWrapper>
          <Button onClick={clickCancelButtonHandler}>取消</Button>
          <Button onClick={clickSaveButtonHandler}>儲存</Button>
        </ButtonWrapper>
      </ProductWrapper>
    );
  },
)(CreatePanel);
