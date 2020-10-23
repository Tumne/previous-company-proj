import React from 'react';

import InventoryTypeFilter from 'components/filters/InventoryTypeFilter';
import { FilterSection, FilterSectionTitle } from 'components/filters/common';
import { FacetFilterWithFewFacets, RangeFilterSection } from 'components/filters/FilterSections';
import { formatCurrency, formatNumber } from 'utils/formatUtils';

export const overrideRetailItemsFilterSection = filter => {
  if (filter.id === 'type') {
    return (
      <FilterSection key={filter.id}>
        <FilterSectionTitle>{filter.name}</FilterSectionTitle>
        <InventoryTypeFilter filter={filter} />
      </FilterSection>
    );
  }
  if (filter.id === 'status' || filter.id === 'condition') {
    return <FacetFilterWithFewFacets key={filter.id} filter={filter} />;
  }
  if (filter.id === 'year') {
    return (
      <RangeFilterSection key={filter.id} filter={filter} gteLabel="newer" lteLabel="older" format={value => value} />
    );
  }
  if (filter.id === 'vehicleAttributes.mileage') {
    return (
      <RangeFilterSection
        key={filter.id}
        filter={filter}
        gteLabel="above"
        lteLabel="below"
        format={value => `${formatNumber(value)} ${filter.unit === 'KILOMETERS' ? 'KM' : 'ML'}`}
      />
    );
  }
  if (filter.id === 'listPrice') {
    return (
      <RangeFilterSection
        key={filter.id}
        filter={filter}
        gteLabel="above"
        lteLabel="below"
        format={value => `${formatCurrency(value, filter.unit)} ${filter.unit}`}
      />
    );
  }
};
