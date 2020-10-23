import React from 'react';
import styled from 'styled-components';
import { BLUE, WHITE, BORDER_DEFAULT } from 'styles/color';

type Props = React.HTMLAttributes<HTMLInputElement>;
export const CheckboxInput = styled.input<Props>`
  display: none;
`;
CheckboxInput.defaultProps = {
  type: 'checkbox',
  onClick: event => event.stopPropagation(),
};

const Icon = styled.div`
  svg {
    width: 100%;
    height: 100%;
  }
`;

const CheckboxContainer = styled.label<{ checked: boolean; round: boolean; icon: boolean }>`
  display: block;
  cursor: pointer;
  height: 16px;
  width: 16px;
  border-radius: ${props => (props.round ? '50%' : '3px')};
  border: 1px solid ${props => (props.checked ? (props.icon ? 'none' : BLUE) : BORDER_DEFAULT)};
  background-color: ${props => (props.checked && !props.icon ? BLUE : WHITE)};
  flex-shrink: 0;
  position: relative;
`;

const Checkbox: React.FC<{
  checked?: boolean;
  round?: boolean;
  icon?: React.ReactNode;
  onChange?: Function;
}> = ({ checked = false, round = false, icon, onChange = checked => {}, ...props }) => {
  return (
    <CheckboxContainer checked={checked} round={round} icon={!!icon} {...props}>
      <CheckboxInput checked={checked} onChange={() => onChange(!checked)} />
      {checked && icon && <Icon>{icon}</Icon>}
    </CheckboxContainer>
  );
};

export default Checkbox;
