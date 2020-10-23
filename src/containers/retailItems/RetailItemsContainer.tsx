import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { NetworkStatus } from 'apollo-client';

import ActionsBar from 'components/actionsBar/ActionsBar';
import ActionsBarButton from 'components/actionsBar/ActionsBarButton';
import ToggleFilters from 'components/actionsBar/ToggleFilters';
import SearchInput from 'components/actionsBar/SearchInput';
import Filters from 'components/filters/Filters';
import ImportArrowIcon from 'components/icons/ImportArrow';
import RetailItemsTable from 'components/tables/retailItemsTable/RetailItemsTable';
import Placeholder from 'components/placeholders/Placeholder';
import NoResultsIcon from 'components/icons/NoResults';
import CondensedList from 'components/lists/CondensedList';
import { Buttons } from 'components/Button';
import { DIVIDER, WHITE } from 'styles/color';
import { PageLoader } from 'components/loading/Loader';
import { overrideRetailItemsFilterSection } from 'components/filters/filterOverrides';
import { useSearch, withSearch } from 'contexts/searchContext';
import { useBreadCrumbs } from 'contexts/breadcrumbsContext';
import { useActiveFiltersCount } from 'hooks/useActiveFiltersCount';
import { useRetailItemConnectionQuery } from 'containers/retailItems/RetailItemsContainerQuery';
import { RetailListItem } from 'components/lists/RetailListItem';
import { useCallbackWhenValueIsSet } from 'hooks/useCallbackWhenValueIsSet';
import { RetailItemDetailsContainer } from 'containers/retailItems/RetailItemDetailsContainer';
import { formatYMMT } from 'utils/formatUtils';

const TableContainer = styled.div<{ hasFiltersOpen?: boolean }>`
  position: relative;
  background: ${DIVIDER};
  display: grid;
  max-height: 100%;
  overflow-y: auto;
  grid-template: ${props =>
    props.hasFiltersOpen
      ? `
      'ActionsBar ActionsBar' auto
      'Filters InventoryTable' 1fr / 315px 1fr;
    `
      : `
      'ActionsBar' auto
      'RetailItemsTable' 1fr;
    `};
  grid-gap: 1px 5px;
`;

const ListContainer = styled.div<{ hasFiltersOpen?: boolean }>`
  background: ${DIVIDER};
  display: grid;
  max-height: 100%;
  overflow-y: auto;
  grid-template: ${props =>
    props.hasFiltersOpen
      ? `
      'ActionsBar ActionsBar ActionsBar' auto
      'Filters CondensedList InventoryTable' 1fr / 315px 315px 1fr;
    `
      : `
      'ActionsBar ActionsBar' auto
      'CondensedList Item' 1fr / 315px 1fr;
    `};
  grid-gap: 1px 5px;
`;

const ExportArrowIcon = styled(ImportArrowIcon)`
  transform: rotate(180deg);
`;

const RetailItemsContainer = ({ match }) => {
  const [hasFiltersOpen, setHasFiltersOpen] = useState(!match.params.retailItemId);
  const { searchParams, isPristine, updateSearchParam, setSearchParams } = useSearch();
  const { setBreadcrumbs } = useBreadCrumbs();
  const { loading, data = {}, networkStatus, refetch } = useRetailItemConnectionQuery(
    searchParams,
    undefined,
    !!match.params.retailItemId
  );

  const { retailItemConnection = { edges: [], filters: [], pageInfo: {}, sortOptions: [] }, metadata } = data;
  const { edges, filters, pageInfo, sortOptions } = retailItemConnection;
  const retailItems = edges.map(({ node }) => node);
  const activeFiltersCount = useActiveFiltersCount();
  const retailItem = retailItems.find(({ id }) => id === match.params.retailItemId);

  useEffect(() => {
    setBreadcrumbs([
      { name: 'Retail Inventory', url: '/retail' },
      ...(retailItem ? [{ name: formatYMMT(retailItem) }] : []),
    ]);
  }, [setBreadcrumbs, retailItem]);

  useCallbackWhenValueIsSet(match.params.retailItemId, () => setHasFiltersOpen(false));

  // TODO: This should only be displayed on initial load
  if (!loading && !retailItems.length && !activeFiltersCount && !searchParams.keyword) {
    return (
      <Placeholder
        icon={<NoResultsIcon />}
        title="No Results"
        subtitle="Try refreshing the page in a few minutes."
        buttonText="Refresh"
        onClick={() => refetch()}
      />
    );
  }

  const actionsBarComponent = (
    <ActionsBar>
      <ToggleFilters isOpen={hasFiltersOpen} setIsOpen={setHasFiltersOpen} activeFiltersCount={activeFiltersCount} />
      <SearchInput
        placeholder="Search vehicles"
        defaultValue={searchParams.keyword}
        onChange={keyword => updateSearchParam('keyword', keyword)}
      />
      <Buttons>
        <ActionsBarButton text="Import" icon={<ImportArrowIcon />} />
        <ActionsBarButton text="Export" icon={<ExportArrowIcon />} />
      </Buttons>
    </ActionsBar>
  );

  const filtersComponent = hasFiltersOpen && (
    <Filters
      filters={filters}
      totalEdges={pageInfo.totalEdges}
      isPristine={isPristine()}
      overrideSection={overrideRetailItemsFilterSection}
    />
  );

  if (match.params.retailItemId) {
    return (
      <ListContainer hasFiltersOpen={hasFiltersOpen}>
        {actionsBarComponent}
        {filtersComponent}
        <CondensedList
          selectedItemId={match.params.retailItemId}
          getItemUrl={id => `/retail/${id}`}
          renderItem={item => <RetailListItem item={item} metadata={metadata} />}
          items={retailItems}
          isLoading={loading}
          css={`
            background-color: ${WHITE};
            max-width: 100%;
            overflow-y: auto;
          `}
        />
        <RetailItemDetailsContainer retailItemId={match.params.retailItemId} />
      </ListContainer>
    );
  }

  return (
    <TableContainer hasFiltersOpen={hasFiltersOpen}>
      {actionsBarComponent}
      {filtersComponent}
      <RetailItemsTable
        data={retailItems}
        sortOptions={sortOptions}
        isLoading={loading}
        pageInfo={pageInfo}
        onFiltersChange={() => {
          setSearchParams(searchParams => ({ ...searchParams }));
        }}
      />
      {networkStatus === NetworkStatus.loading && <PageLoader />}
    </TableContainer>
  );
};

export default withSearch(RetailItemsContainer, {
  initialParams: { type: 'VEHICLE', status: 'FOR_SALE' },
});
