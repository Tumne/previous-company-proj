import styled from 'styled-components';

import { BODY_TEXT } from 'styles/color';
import { FONT_SIZE_1, FONT_WEIGHT_NORMAL, LINE_HEIGHT_CONDENSED_ULTRA } from 'styles/typography';

const Text = styled.div`
  color: ${BODY_TEXT};
  font-size: ${FONT_SIZE_1};
  line-height: ${LINE_HEIGHT_CONDENSED_ULTRA};
  vertical-align: 75%;
  font-weight: ${FONT_WEIGHT_NORMAL};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  top: 0.1em;
  position: relative;

  &:empty {
    display: none;
  }
`;

export default Text;
