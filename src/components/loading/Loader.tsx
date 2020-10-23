import React from 'react';
import styled from 'styled-components';
import 'styled-components/macro';

import SpinnerIcon from 'components/icons/Spinner';
import { WHITE, BLACK } from 'styles/color';
import { Z_INDEX_3 } from 'styles/z-index';

const LoaderContainer = styled.div`
  position: absolute;
  z-index: ${Z_INDEX_3};
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: 1;
  background: ${WHITE}cc;
`;

const SpinnerContainer = styled.div`
  display: flex;
  width: 80px;
  height: 80px;
  padding: 25px;
  background: ${WHITE};
  border-radius: 50%;
  box-shadow: 0 0 12px 0 ${BLACK}21;
`;

const Spinner = styled(SpinnerIcon)`
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = props => (
  <LoaderContainer {...props}>
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  </LoaderContainer>
);

export const PageLoader = () => (
  <Loader
    css={`
      background: ${WHITE};
    `}
  />
);

export default Loader;
