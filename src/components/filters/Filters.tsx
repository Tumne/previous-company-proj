import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import FilterGroup from 'interfaces/filterGroup';
import { WHITE } from 'styles/color';
import { FiltersContainer, FilterSectionHeader, FilterSectionTitle } from './common';
import { SelectedFacetFilter } from './FacetFilter';
import FilterSections from './FilterSections';
import Label, { PrimaryLabel } from 'components/typography/Label';
import { Clickable } from 'components/Button';
import { useSearch } from 'contexts/searchContext';
import { Z_INDEX_2 } from 'styles/z-index';
import { formatNumber } from 'utils/formatUtils';

const SelectedFacetFilterContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX_2};
  background: ${WHITE};
`;

const FilterSectionsContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 100%;
  max-height: 100%;
`;

const Filters: React.FC<{
  filters: Array<FilterGroup>;
  totalEdges: number;
  isPristine: boolean;
  overrideSection: Function;
}> = ({ filters, totalEdges, isPristine, overrideSection }) => {
  const [selectedFacetFilterId, setSelectedFacetFilterId] = useState();
  const { clearSearchParams } = useSearch();
  const filterSectionsRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  return (
    <FiltersContainer>
      <FilterSectionsContainer>
        <FilterSectionHeader>
          <FilterSectionTitle>
            <Label>
              {formatNumber(totalEdges)} {t('common.resultWithCount', { count: totalEdges })}
            </Label>
            {!isPristine && (
              <Clickable
                onClick={() => {
                  clearSearchParams();
                  if (filterSectionsRef.current) {
                    filterSectionsRef.current.scrollTop = 0;
                  }
                }}
              >
                <PrimaryLabel>{t('common.clearAll')}</PrimaryLabel>
              </Clickable>
            )}
          </FilterSectionTitle>
        </FilterSectionHeader>
        <FilterSections
          filters={filters}
          setSelectedFacetFilterId={setSelectedFacetFilterId}
          overrideSection={overrideSection}
          containerRef={filterSectionsRef}
        />
      </FilterSectionsContainer>

      {selectedFacetFilterId && (
        <SelectedFacetFilterContainer>
          <SelectedFacetFilter
            filter={filters.find(filter => filter.id === selectedFacetFilterId)}
            onClose={() => setSelectedFacetFilterId(undefined)}
          />
        </SelectedFacetFilterContainer>
      )}
    </FiltersContainer>
  );
};

export default Filters;
