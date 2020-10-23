import styled from 'styled-components';
import PrimaryText from 'components/typography/PrimaryText';
import { ORANGE_LIGHTEST, BLUE_LIGHT } from 'styles/color';

export const ListItemLayout = styled.div<{ isHighlighted?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 15px;
  position: relative;
  background: ${props => props.isHighlighted && ORANGE_LIGHTEST};
`;

export const ListItemIcon = styled(PrimaryText)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${BLUE_LIGHT};
`;

export const ListItemDetails = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-auto-rows: min-content;
`;
