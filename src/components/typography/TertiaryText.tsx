import styled from 'styled-components';
import Text from './Text';
import { BODY_TEXT_TERTIARY } from 'styles/color';
import { FONT_WEIGHT_NORMAL } from 'styles/typography';

const TertiaryText = styled(Text)`
  color: ${BODY_TEXT_TERTIARY};
  font-weight: ${FONT_WEIGHT_NORMAL};
`;

export default TertiaryText;
