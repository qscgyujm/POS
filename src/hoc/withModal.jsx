import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Backdrop = styled.div`
  animation: ${FadeIn} 0.3s ease-in-out;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 60;
  background-color: ${rgba(0, 0, 0, 0.5)};
  /* background-color: #fcc; */
`;

const ModalWrapper = styled.div`
  bottom: 0;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 70;
`;

const ModalContainer = styled.div`
  align-items: center;
  display: flex;
  margin: 1.75rem auto;
  min-height: calc(100% - (1.75rem * 2));
  padding: 0 16px;
  width: 100%;
`;


const withModal = (
  InnerComponent,
) => (
  OuterComponent,
) => (
  class WithModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isViewModal: false,
      };

      this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
      this.renderNode = document.getElementById('modal');
      this.bodyNode = document.getElementsByTagName('body');
      this.rootNode = document.getElementById('root');
    }

    componentDidUpdate() {
      this.bodyNode[0].style = 'overflow: initial';
      this.rootNode.style.filter = 'none';
    }

    toggleModal(bool) {
      const { isViewModal } = this.state;
      const updateVisibility = bool || isViewModal;

      this.setState({
        isViewModal: bool,
        // ...additionalProps,
      });


      if (updateVisibility) {
        this.bodyNode[0].style = 'overflow: hidden';
        this.rootNode.style.filter = 'blur(5px)';
      } else {
        this.rootNode.style.filter = 'none';
        this.bodyNode[0].style = 'overflow: initial';
      }
    }

    render() {
      console.log('withModal', this.state, this.props);

      const { isViewModal } = this.state;

      const content = (
        <InnerComponent
          {...this.state}
          {...this.props}
          toggleModal={this.toggleModal}
        />
      );

      return (
        <>
          {
            isViewModal && (
              ReactDOM.createPortal(
                <>
                  <Backdrop />
                  <ModalWrapper>
                    <ModalContainer>
                      {content}
                    </ModalContainer>
                  </ModalWrapper>
                </>, this.renderNode,
              )
            )
          }
          <OuterComponent
            {...this.props}
            {...this.state}
            toggleModal={this.toggleModal}
          />
        </>
      );
    }
  });

export default withModal;
