import React from 'react';
import styled from 'styled-components';

import SpinnerIcon from 'components/icons/Spinner';
import { BLUE_LIGHT, BODY_TEXT } from 'styles/color';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${BLUE_LIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerContainer = styled.div`
  max-width: 14px;
  max-height: 14px;
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ImageLoader = props => (
  <Container {...props}>
    <SpinnerContainer>
      <SpinnerIcon fill={BODY_TEXT} />
    </SpinnerContainer>
  </Container>
);

export default ImageLoader;
