import React from 'react';
import NoResultsIcon from 'components/icons/NoResults';
import Placeholder from './Placeholder';
import { useSearch } from 'contexts/searchContext';

const NoResultsPlaceholder = () => {
  const { clearSearchParams, updateSearchParam } = useSearch();
  return (
    <Placeholder
      icon={<NoResultsIcon />}
      title="No Results"
      subtitle="There are no results for the selected filters"
      buttonText="Clear filters"
      onClick={() => {
        clearSearchParams();
        updateSearchParam('keyword', undefined);
      }}
    />
  );
};

export default NoResultsPlaceholder;
