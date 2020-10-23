import styled from 'styled-components';
import Text from './Text';
import { FONT_WEIGHT_BOLD, LINE_HEIGHT_CONDENSED_ULTRA, FONT_SIZE_0 } from 'styles/typography';
import { BODY_TEXT, BLUE, BODY_TEXT_TERTIARY } from 'styles/color';

const Label = styled(Text)`
  color: ${BODY_TEXT};
  font-size: ${FONT_SIZE_0};
  line-height: ${LINE_HEIGHT_CONDENSED_ULTRA};
  letter-spacing: 1px;
  font-weight: ${FONT_WEIGHT_BOLD};
  text-transform: uppercase;
`;

export const PrimaryLabel = styled(Label)`
  color: ${BLUE};
`;

export const TertiaryLabel = styled(Label)`
  color: ${BODY_TEXT_TERTIARY};
`;

export default Label;
