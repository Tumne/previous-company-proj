import React, { useState } from 'react';
import styled from 'styled-components/macro';

import InputText from 'components/InputText';
import SearchIcon from 'components/icons/Search';
import SecondaryText from 'components/typography/SecondaryText';
import { BODY_TEXT, BORDER_DEFAULT, WHITE } from 'styles/color';
import CloseIcon from './icons/Close';
import { Clickable } from './Button';

const SearchContainer = styled(SecondaryText)<{ width?: number }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 12px;
  align-items: center;
  ${props => props.width && `width: ${props.width}px`};
  height: 34px;
  padding: 5px 15px;
  margin-top: -1px;
  border-radius: 17px;
  background: ${WHITE};
  color: ${BODY_TEXT};
  border: 1px solid ${BORDER_DEFAULT};
`;

const SearchInputText = styled(InputText)`
  border: none;
  transform: translateY(1px);
`;

const SearchInput: React.FC<{
  width?: number;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (event) => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
}> = ({ width, searchInputRef, onChange = event => {}, defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue || '');
  return (
    <SearchContainer width={width}>
      <SearchIcon />
      <SearchInputText
        ref={searchInputRef}
        value={value}
        onChange={event => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        {...props}
      />
      {value ? (
        <Clickable
          onClick={() => {
            setValue('');
            onChange('');
          }}
        >
          <CloseIcon css="transform: translateY(2px)" />
        </Clickable>
      ) : null}
    </SearchContainer>
  );
};

export default SearchInput;
