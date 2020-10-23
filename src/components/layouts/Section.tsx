import styled from 'styled-components';
import ChevronRightIcon from '../icons/ChevronRight';
import { BODY_TEXT, DIVIDER } from 'styles/color';

export const Section = styled.section<{ as?: any; to?: any }>`
  padding: 15px;
  border-bottom: 1px solid ${DIVIDER};
  display: grid;
  grid-gap: 15px;
  position: relative;
`;

export const ClickableSectionIcon = styled(ChevronRightIcon)`
  position: absolute;
  top: 0;
  right: 0;
  color: ${BODY_TEXT};
`;
