import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import PrimaryText from 'components/typography/PrimaryText';
import ChevronRightIcon from 'components/icons/ChevronRight';
import FunnelIcon from 'components/icons/Funnel';
import { BLUE, BLUE_LIGHT, BODY_TEXT, BORDER_DEFAULT, WHITE } from 'styles/color';

const ToggleButton = styled(Button)`
  height: 34px;
  padding: 0;
  border-radius: 5px;
  background: ${props => (props.hasFiltersActive ? BLUE : WHITE)};
  border: 1px solid ${props => (props.hasFiltersActive ? BLUE : BORDER_DEFAULT)};
`;

const Content = styled.div<{ hasActiveFilters: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  width: 37px;
  margin-top: -1px;
  color: ${BODY_TEXT};
  border-right: 1px solid ${props => (props.hasActiveFilters ? BLUE_LIGHT : BORDER_DEFAULT)};
`;

const ActiveCountText = styled(PrimaryText)`
  letter-spacing: 1px;
  color: ${WHITE};
`;

const ChevronContainer = styled.div<{ hasActiveFilters: boolean }>`
  width: 8px;
  margin: 0 3px;
  color: ${props => (props.hasActiveFilters ? WHITE : BODY_TEXT)};
`;

const ChevronIcon = styled(ChevronRightIcon)`
  height: 8px;
  ${props => props.selected && 'transform: rotate(180deg)'};
`;

export const ToggleFilters: React.FC<{
  activeFiltersCount?: number;
  isOpen: boolean;
  setIsOpen: Function;
}> = ({ activeFiltersCount = 0, isOpen, setIsOpen }) => {
  const hasActiveFilters = !!activeFiltersCount;

  return (
    <ToggleButton onClick={() => setIsOpen(!isOpen)} hasFiltersActive={hasActiveFilters}>
      <Content hasActiveFilters={hasActiveFilters}>
        {hasActiveFilters ? <ActiveCountText>{activeFiltersCount}</ActiveCountText> : <FunnelIcon />}
      </Content>
      <ChevronContainer hasActiveFilters={hasActiveFilters}>
        <ChevronIcon selected={isOpen} />
      </ChevronContainer>
    </ToggleButton>
  );
};

export default ToggleFilters;
