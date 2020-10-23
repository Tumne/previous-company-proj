import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { BLUE, BLUE_LIGHT, BODY_TEXT_SECONDARY, WHITE, BORDER_DEFAULT, BODY_TEXT } from 'styles/color';
import CloseIcon from './icons/Close';
import Text from './typography/Text';
import { FONT_SIZE_1 } from 'styles/typography';

const ButtonContainer = styled.button<{ selected?: boolean }>`
  color: ${props => (props.selected ? WHITE : BODY_TEXT_SECONDARY)};
  background: ${props => (props.selected ? BLUE : BLUE_LIGHT)};
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 6px 12px;
  font-size: ${FONT_SIZE_1};
  line-height: 20px;
  display: flex;
  align-items: center;
  max-width: 100%;
`;

const ButtonText = styled(Text)`
  color: inherit;
`;

/**
 * Use this for a button-looking button
 */
const Button = ({ children, ...props }) => {
  if (typeof children === 'string') {
    return (
      <ButtonContainer {...props}>
        <ButtonText>{children}</ButtonText>
      </ButtonContainer>
    );
  }
  return <ButtonContainer {...props}>{children}</ButtonContainer>;
};

/**
 * Use this to render multiple buttons separated by some space
 */
export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  overflow-x: hidden;
  margin-bottom: -10px;

  :empty {
    display: none;
  }

  > * {
    margin-bottom: 10px;
  }

  > :not(:last-child) {
    margin-right: 10px;
  }
`;

/**
 * Use this when you need an un-styled button
 */
export const Clickable = styled.button<{ disabled?: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  display: block;
  background: none;
  color: inherit;
  ${({ disabled }) => disabled && 'pointer-events:none'};
`;

/**
 * Use this component for nested clickable areas
 * to avoid React warning about nested buttons
 */
export const FillWithClickable = styled(Clickable)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const RemovableButtonText = styled(Text)`
  color: inherit;
  margin-right: 14px;
`;

/**
 * Use this when you need a button-looking component
 * that can be removed when you click on X
 */
export const RemovableButton = ({ onRemove, children, ...props }) => {
  const [isRemoved, setIsRemoved] = useState(false);

  if (isRemoved) {
    return null;
  }

  return (
    <ButtonContainer
      selected
      title={children}
      onClick={event => {
        if (onRemove) {
          onRemove(event);
        }
        setIsRemoved(true);
      }}
      {...props}
    >
      <RemovableButtonText>{children}</RemovableButtonText>
      <CloseIcon width="9px" height="9px" />
    </ButtonContainer>
  );
};

export const WhiteButton = styled(Clickable)`
  height: 34px;
  min-width: 34px;
  border: 1px solid ${BORDER_DEFAULT};
  border-radius: 5px;
  background-color: ${WHITE};
  color: ${BODY_TEXT};
`;

export default Button;
