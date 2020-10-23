import styled from 'styled-components';

import { BLUE_LIGHT, DIVIDER } from 'styles/color';

const ActionsBar = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 15px;
  grid-area: ActionsBar;
  padding: 13px 15px;
  background: ${BLUE_LIGHT};
  border-top: 1px solid ${DIVIDER};
`;

export default ActionsBar;
