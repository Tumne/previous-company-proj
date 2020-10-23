import { LINE_HEIGHT_DEFAULT } from 'styles/typography';
import styled from 'styled-components';
import Text from './Text';

const MultiLineText = styled(Text)`
  line-height: ${LINE_HEIGHT_DEFAULT};
  white-space: pre-line;
  overflow: visible;
`;

export default MultiLineText;
