import React from 'react';


const WithWrapper = (
  Wrapper,
) => (
  BaseComponent,
) => (props) => (
  <Wrapper>
    <BaseComponent
      {...props}
    />
  </Wrapper>
);

export default WithWrapper;
