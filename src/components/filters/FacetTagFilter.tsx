import React from 'react';
import { getNewFacetFilterValue } from './FacetFilter';
import Button, { Buttons } from 'components/Button';
import { useSearch } from 'contexts/searchContext';

const FacetTagFilter = ({ filter }) => {
  const { getSearchParamAsArray, updateSearchParam } = useSearch();
  const selectedFacetIds = getSearchParamAsArray(filter.id);
  return (
    <Buttons>
      {filter.facets.map(facet => {
        const selected = selectedFacetIds.includes(facet.id!);
        return (
          <Button
            key={facet.id}
            selected={selected}
            onClick={() => {
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
          >
            {facet.name}
          </Button>
        );
      })}
    </Buttons>
  );
};
export default FacetTagFilter;
