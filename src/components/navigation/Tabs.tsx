import styled from 'styled-components';
import Label from 'components/typography/Label';
import { BODY_TEXT, BODY_TEXT_TERTIARY, WHITE, BLUE_LIGHT, BLUE } from 'styles/color';
import { Z_INDEX_1 } from 'styles/z-index';

export const Tabs = styled.div`
  height: 44px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const Tab = styled.button<{ selected?: boolean }>`
  border: none;
  background: ${props => (props.selected ? WHITE : BLUE_LIGHT)};
  cursor: pointer;

  ${Label} {
    color: ${props => (props.selected ? BODY_TEXT : BODY_TEXT_TERTIARY)};
  }

  :focus {
    outline: none;
    z-index: ${Z_INDEX_1};
    /* box-shadow: 0 0 0 0.2rem ${BLUE}88; */ /* bring back for better keyboard navigation */
  }
`;
