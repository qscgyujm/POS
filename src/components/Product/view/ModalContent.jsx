import React from 'react';

const ModalContent = (props) => {
  console.log('ModalContent', props);

  const { toggleModal } = props;

  const clickModalHandler = () => {
    toggleModal(false);
  };

  return (
    <div>
      Modal Content
      <button
        type="button"
        onClick={clickModalHandler}
      >
        Click
      </button>
    </div>
  );
};

export default ModalContent;
