import styled from 'styled-components';
import Text from './Text';
import { FONT_WEIGHT_SEMI_BOLD } from 'styles/typography';
import { BODY_TEXT } from 'styles/color';

const SemiBoldText = styled(Text)`
  color: ${BODY_TEXT};
  font-weight: ${FONT_WEIGHT_SEMI_BOLD};
`;

export default SemiBoldText;
