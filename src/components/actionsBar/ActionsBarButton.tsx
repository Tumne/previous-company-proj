import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import SemiBoldText from 'components/typography/SemiBoldText';
import { BODY_TEXT, BORDER_DEFAULT, WHITE } from 'styles/color';

const ActionButton = styled(Button)`
  padding: 0 10px;
  color: ${BODY_TEXT};
  background: ${WHITE};
  border-radius: 5px;
  border: 1px solid ${BORDER_DEFAULT};

  & > div {
    margin: 0 6px 0 10px;
  }
`;

export const ActionsBarButton: React.FC<{
  icon: React.ReactNode;
  text?: string;
  onClick?: Function;
}> = ({ icon, text = '', onClick = e => {} }) => {
  return (
    <ActionButton onClick={onClick}>
      {icon}
      <SemiBoldText>{text}</SemiBoldText>
    </ActionButton>
  );
};

export default ActionsBarButton;
