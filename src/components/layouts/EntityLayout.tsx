import styled from 'styled-components';
import { DIVIDER, WHITE } from 'styles/color';

export const EntityContainer = styled.div<{ isSplit?: boolean }>`
  background: ${DIVIDER};
  padding: 10px 10px 0;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: ${props => (props.isSplit ? '1fr 375px' : 'initial')};
  overflow: auto;
  position: relative;
`;

export const Column = styled.div`
  background: ${WHITE};
  border-radius: 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 100%;
  :empty {
    display: none;
  }
  :first-child {
    border-top-left-radius: 4px;
  }
  :last-child {
    border-top-right-radius: 4px;
  }
`;
