import styled from 'styled-components';
import Text from './Text';
import { FONT_WEIGHT_NORMAL } from 'styles/typography';
import { BODY_TEXT_SECONDARY } from 'styles/color';

const SecondaryText = styled(Text)`
  color: ${BODY_TEXT_SECONDARY};
  font-weight: ${FONT_WEIGHT_NORMAL};
`;

export default SecondaryText;
