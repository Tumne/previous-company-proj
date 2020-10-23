import 'styled-components/macro';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FacetTagFilter from './FacetTagFilter';
import RangeFilter from './RangeFilter';
import { FacetFilterSection, FilterSection, FilterSectionTitle, ScrollableContainer } from './common';
import Label, { TertiaryLabel } from 'components/typography/Label';
import { FlagRow, ToggleGroupFilters } from './ToggleGroupFilter';
import { useSearch } from 'contexts/searchContext';
import { formatNumber } from 'utils/formatUtils';
import { isFrCA } from 'utils/intlUtils';

const rangeFilterSectionLabel = ({ selectedRange, filter, lteLabel, gteLabel, format }) => {
  if (!filter.range) {
    return 'N/A';
  }
  const rangeIsEmpty = !selectedRange || selectedRange.gte === null;
  const selectedRangeMatchesFullRange =
    selectedRange.gte === filter.range.gte && selectedRange.lte === filter.range.lte;

  if (rangeIsEmpty || selectedRangeMatchesFullRange) {
    return `Any`;
  }
  if (Number(selectedRange.gte) === filter.range.gte) {
    return `${format(selectedRange.lte)} & ${lteLabel}`;
  }
  if (Number(selectedRange.lte) === filter.range.lte) {
    return `${format(selectedRange.gte)} & ${gteLabel}`;
  }
  return `${format(selectedRange.gte)} - ${format(selectedRange.lte)}`;
};

export const RangeFilterSection = ({
  filter,
  gteLabel = 'more',
  lteLabel = 'less',
  format = value => `${formatNumber(value)} ${filter.unit || ''}`,
}) => {
  const { getSearchParam, updateSearchParam } = useSearch();
  const searchParam = getSearchParam(filter.id) || { gte: null, lte: null };
  const [selectedRange, setSelectedRange] = useState(searchParam);

  useEffect(() => {
    setSelectedRange({
      gte: searchParam.gte,
      lte: searchParam.lte,
    });
  }, [searchParam.gte, searchParam.lte]);

  return (
    <FilterSection disabled={!filter.range}>
      <FilterSectionTitle>
        <Label>{filter.name}</Label>
        <Label>{rangeFilterSectionLabel({ selectedRange, filter, lteLabel, gteLabel, format })}</Label>
      </FilterSectionTitle>
      <RangeFilter
        filter={filter}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        updateSearchParam={updateSearchParam}
      />
    </FilterSection>
  );
};

const ToggleGroupFilterSection = ({ filter }) => {
  const { t } = useTranslation();
  const isFrench = isFrCA();

  return (
    <FilterSection>
      <FlagRow>
        <Label>Flags</Label>
        <TertiaryLabel
          css={`
            transform: translateX(${isFrench ? '2.4ch' : '1ch'});
          `}
        >
          {t('common.yes')}
        </TertiaryLabel>
        <TertiaryLabel
          css={`
            transform: translateX(${isFrench ? '1ch' : '0.25ch'});
          `}
        >
          {t('common.no')}
        </TertiaryLabel>
      </FlagRow>
      <ToggleGroupFilters toggles={filter.toggles} />
    </FilterSection>
  );
};

export const FacetFilterWithFewFacets = ({ filter }) => (
  <FilterSection>
    <FilterSectionTitle>{filter.name}</FilterSectionTitle>
    <FacetTagFilter filter={filter} />
  </FilterSection>
);

const FacetFilterWithManyFacets = ({ filter, setSelectedFacetFilterId }) => (
  <FacetFilterSection filter={filter} onClick={() => setSelectedFacetFilterId(filter.id)}>
    {filter.name}
  </FacetFilterSection>
);

const FilterSections = ({ filters, setSelectedFacetFilterId, overrideSection, containerRef }) => {
  return (
    <ScrollableContainer ref={containerRef}>
      {filters.map(filter => {
        const override = overrideSection(filter);
        if (override) {
          return override;
        }
        if (filter.__typename === 'FacetFilter') {
          return (
            <FacetFilterWithManyFacets
              key={filter.id}
              filter={filter}
              setSelectedFacetFilterId={setSelectedFacetFilterId}
            />
          );
        } else if (filter.__typename === 'ToggleGroupFilter') {
          return <ToggleGroupFilterSection key={filter.id} filter={filter} />;
        } else if (filter.__typename === 'RangeFilter') {
          return <RangeFilterSection key={filter.id} filter={filter} />;
        }
        return null;
      })}
    </ScrollableContainer>
  );
};

export default FilterSections;
