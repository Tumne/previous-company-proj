import React from 'react';
import styled, { css } from 'styled-components/macro';

import PrimaryText from '../typography/PrimaryText';
import SecondaryText from '../typography/SecondaryText';
import ChevronRightIcon from '../icons/ChevronRight';
import { WrapLink } from './WrapLink';
import { BLUE_LIGHT, BODY_TEXT, BLUE, WHITE } from 'styles/color';
import { FONT_SIZE_4, FONT_WEIGHT_BOLDER } from 'styles/typography';

const PanelBody = styled(WrapLink)`
  background: ${BLUE_LIGHT};
  color: ${BODY_TEXT};
  border-radius: 5px;
  padding: 15px;
  display: grid;
  grid-gap: 10px;
  position: relative;
  &.active {
    background: ${BLUE};
    &,
    ${PrimaryText}, ${SecondaryText} {
      color: ${WHITE};
    }
    svg {
      transform: rotate(180deg);
    }
  }
`;

const Icon = styled(ChevronRightIcon)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Panel = ({ counter, label, to, ...props }) => (
  <PanelBody to={to} {...props}>
    <PrimaryText
      css={css`
        font-size: ${FONT_SIZE_4};
        font-weight: ${FONT_WEIGHT_BOLDER};
      `}
    >
      {counter}
    </PrimaryText>
    {counter !== 0 ? <Icon /> : ''}
    <SecondaryText>{label}</SecondaryText>
  </PanelBody>
);

export const Panels = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 15px;
`;

export default Panel;
