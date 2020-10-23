import React from 'react';
import styled from 'styled-components';

import { BODY_TEXT, BODY_TEXT_TERTIARY } from 'styles/color';
import { LINE_HEIGHT_CONDENSED_ULTRA } from 'styles/typography';

type Props = React.HTMLAttributes<HTMLInputElement>;
export const InputText = styled.input<Props>`
  width: 100%;
  outline: none;
  line-height: ${LINE_HEIGHT_CONDENSED_ULTRA};
  color: ${BODY_TEXT};

  ::placeholder {
    color: ${BODY_TEXT_TERTIARY};
  }
`;

InputText.defaultProps = {
  type: 'text',
  onChange: event => event.stopPropagation(),
  placeholder: '',
};

export default InputText;
