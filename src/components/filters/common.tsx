import React from 'react';
import styled from 'styled-components/macro';
import { Clickable, FillWithClickable } from 'components/Button';
import Label from 'components/typography/Label';
import { BODY_TEXT, DIVIDER, WHITE } from 'styles/color';
import ChevronRightIcon from '../icons/ChevronRight';
import { SelectedFacets } from './FacetFilter';
import { Z_INDEX_1 } from 'styles/z-index';
import { useSearch } from 'contexts/searchContext';

export const FiltersContainer = styled.div`
  position: relative;
  background: ${WHITE};
  overflow: auto;
  max-height: 100%;
`;

export const ScrollableContainer = styled.div`
  max-height: 100%;
  overflow: auto;
`;

export const FilterSection = styled.section<{ disabled?: boolean }>`
  padding: 15px 17px;
  display: grid;
  grid-gap: 10px;
  border-bottom: 1px solid ${DIVIDER};
  width: 100%;
  position: relative;
  > * {
    opacity: ${props => (props.disabled ? 0.5 : 1)};
  }
  && * {
    ${props => (props.disabled ? 'pointer-events: none;' : '')}
  }
`;

export const FilterSectionHeader = styled(FilterSection)`
  color: ${BODY_TEXT};
  background: white;
`;

export const FilterSectionTitle = styled(Label)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClickableWorkaroundWrapper = styled.div`
  z-index: ${Z_INDEX_1};
  max-width: 100%;
  overflow: hidden;
  pointer-events: none;
  button {
    pointer-events: all;
  }
`;

const FacetFilterSectionTitle = styled(FilterSectionTitle)`
  pointer-events: none;
`;

export const FacetFilterSection = ({ children, filter, onClick, ...props }) => {
  const { getSearchParam } = useSearch();
  const filterHasFacets = filter.facets && filter.facets.length > 0;
  const hasSelectedFacets = Boolean(getSearchParam(filter.id)) && filterHasFacets;
  return (
    <FilterSection disabled={!filterHasFacets} {...props}>
      <FillWithClickable onClick={onClick} />
      <FacetFilterSectionTitle>
        {children}
        <ChevronRightIcon />
      </FacetFilterSectionTitle>
      {hasSelectedFacets && (
        <ClickableWorkaroundWrapper>
          <SelectedFacets filter={filter} />
        </ClickableWorkaroundWrapper>
      )}
    </FilterSection>
  );
};

export const SelectedFilterSectionHeader = styled(FilterSectionHeader)`
  ${Clickable} {
    position: absolute;
    z-index: ${Z_INDEX_1};
    top: 50%;
    transform: translateY(-50%);
    left: 17px;
  }
  ${Label} {
    text-align: center;
  }
`;
