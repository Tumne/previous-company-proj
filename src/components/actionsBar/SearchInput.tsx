import React, { useState, useRef, useEffect } from 'react';

import { useKeywordSearch } from 'hooks/useKeywordSearch';
import SearchInputComponent from 'components/SearchInput';
import { useSearch } from 'contexts/searchContext';

const SearchInput: React.FC<{
  width?: number;
  defaultValue?: string;
  onChange?: (event) => void;
  placeholder?: string;
}> = ({ width, onChange = event => {}, defaultValue, ...props }) => {
  const [searchInputText, setSearchInputText] = useState(defaultValue || '');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { searchParams } = useSearch();

  useKeywordSearch(searchInputText, onChange);

  useEffect(() => {
    // Clear search input if keyword searchParam is removed
    if (searchInputRef.current && !searchParams.keyword) {
      const shouldEmptyString = searchInputRef.current.value.trim().length;
      if (shouldEmptyString) {
        searchInputRef.current.value = '';
      }
    }
  }, [searchParams]);

  return (
    <SearchInputComponent
      width={width}
      defaultValue={defaultValue}
      onChange={query => setSearchInputText(query)}
      {...props}
    />
  );
};

export default SearchInput;
