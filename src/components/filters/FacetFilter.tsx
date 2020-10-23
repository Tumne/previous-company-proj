import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import Badge, { PrimaryBadge } from 'components/Badge';
import Checkbox from 'components/Checkbox';
import ArrowLeftIcon from 'components/icons/ArrowLeft';
import Label from 'components/typography/Label';
import Text from 'components/typography/Text';
import SearchInput from 'components/SearchInput';
import Facet from 'interfaces/facet';
import FilterGroup from 'interfaces/filterGroup';
import { Buttons, Clickable, RemovableButton } from 'components/Button';
import { DIVIDER, BLUE_LIGHTEST } from 'styles/color';
import { SelectedFilterSectionHeader, ScrollableContainer } from './common';
import { useSearch } from 'contexts/searchContext';

export const getNewFacetFilterValue = ({ multiSelect, selectedFacetIds, facetId, selected }) => {
  if (multiSelect) {
    const ids = selectedFacetIds.filter(id => id !== facetId);
    if (selected) {
      ids.push(facetId);
    }
    return ids.length === 0 ? undefined : ids;
  }
  return selected ? facetId : undefined;
};

const FacetContainer = styled.label`
  display: grid;
  grid-template: 'checkbox name count' auto / auto 1fr auto;
  grid-gap: 17px;
  padding: 14px 17px;
  align-items: center;
  border-bottom: 1px solid ${DIVIDER};
  cursor: pointer;
`;

const FacetListItem: React.FC<{
  facet: any;
  filter: any;
}> = ({ facet, filter }) => {
  const { getSearchParamAsArray, updateSearchParam } = useSearch();
  const selectedFacetIds = getSearchParamAsArray(filter.id);
  const selected = selectedFacetIds.includes(facet.id);
  return (
    <FacetContainer>
      <Checkbox
        checked={selected}
        round={!filter.multiSelect}
        onChange={() => {
          updateSearchParam(
            filter.id,
            getNewFacetFilterValue({
              selectedFacetIds,
              multiSelect: filter.multiSelect,
              facetId: facet.id,
              selected: !selected,
            })
          );
        }}
      />
      <Text>{facet.name}</Text>
      {selected ? <PrimaryBadge large>{facet.count}</PrimaryBadge> : <Badge large>{facet.count}</Badge>}
    </FacetContainer>
  );
};

const FacetParent = styled.div`
  height: 54px;
  background-color: ${BLUE_LIGHTEST};
  display: flex;
  align-items: center;
  padding-left: 18px;
  border-bottom: 1px solid ${DIVIDER};
`;

const FacetFilter: React.FC<{
  filter: FilterGroup;
  facetSearchQuery: string;
}> = ({ filter, facetSearchQuery }) => {
  const facetsByParent: { [key: string]: Facet[] } = filter.facets
    .filter(facet => facet.name.toLowerCase().match(facetSearchQuery.toLowerCase()))
    .reduce((groups, facet) => {
      groups[facet.parent!] = (groups[facet.parent!] || []).concat(facet);
      return groups;
    }, {});
  return (
    <>
      {Object.entries(facetsByParent).map(([parent, facets]) => {
        return (
          <div key={parent}>
            {filter.hasParent && (
              <FacetParent>
                <Label>{parent}</Label>
              </FacetParent>
            )}
            {facets.map(facet => (
              <FacetListItem key={facet.id} facet={facet} filter={filter} />
            ))}
          </div>
        );
      })}
    </>
  );
};

export default FacetFilter;

export const SelectedFacets = ({ filter, ...props }) => {
  const { getSearchParamAsArray, updateSearchParam } = useSearch();
  const selectedFacetIds = getSearchParamAsArray(filter.id);
  const children = filter.facets
    .filter(facet => selectedFacetIds.includes(facet.id))
    .map(facet => (
      <RemovableButton
        key={facet.id}
        onRemove={event => {
          event.stopPropagation();
          updateSearchParam(
            filter.id,
            getNewFacetFilterValue({
              selectedFacetIds,
              multiSelect: filter.multiSelect,
              facetId: facet.id,
              selected: false,
            })
          );
        }}
      >
        {facet.name}
      </RemovableButton>
    ));
  if (children.length === 0) {
    return null;
  }
  return <Buttons {...props}>{children}</Buttons>;
};
const SelectedFacetFilterContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 100%;
  max-height: 100%;
`;

const SearchSection = styled.div`
  padding: 10px 14px;
  border-bottom: 1px solid ${DIVIDER};
`;

export const SelectedFacetFilter = ({ filter, onClose }) => {
  const [facetSearchQuery, setFacetSearchQuery] = useState('');

  useEffect(() => {
    const handler = event => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keyup', handler);
    return () => {
      window.removeEventListener('keyup', handler);
    };
  }, [onClose]);

  return (
    <SelectedFacetFilterContainer>
      <SelectedFilterSectionHeader>
        <Clickable onClick={onClose}>
          <ArrowLeftIcon />
        </Clickable>
        <Label>{filter.name}s</Label>
      </SelectedFilterSectionHeader>
      <SearchSection>
        <SearchInput placeholder={`Search ${filter.name}s`} onChange={query => setFacetSearchQuery(query)} />
      </SearchSection>
      <ScrollableContainer>
        <FacetFilter filter={filter} facetSearchQuery={facetSearchQuery} />
      </ScrollableContainer>
    </SelectedFacetFilterContainer>
  );
};
