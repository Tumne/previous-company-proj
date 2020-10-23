import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { set, get, pick, pickBy, cloneDeep } from 'lodash';
import { getParams, stringifyParams } from '../utils/urlUtils';
import { Location } from 'history';

const SearchContext = React.createContext<
  | {
      searchParams: any;
      setSearchParams: (value: any) => void;
      updateSearchParam: (name: string, value: any) => void;
      getSearchParam: (name: string) => any;
      getSearchParamAsArray: (name: string) => string[];
      updatePaginationParams: (params: any) => void;
      clearSearchParams: () => void;
      isPristine: () => boolean;
      location: Location<any>;
    }
  | undefined
>(undefined);

const resetPaginationParams = {
  first: undefined,
  after: undefined,
  last: undefined,
  before: undefined,
};

const nonClearableSearchParams = ['keyword'];

/**
 * Formats our search params so they don't include:
 *  - empty or undefined values
 *  - non-clearable keys
 */
const formatSearchParams = searchParams =>
  pickBy(searchParams, (value, key) => {
    return value !== undefined && value !== '' && !nonClearableSearchParams.includes(key);
  });

interface SearchProviderProps extends RouteComponentProps {
  initialParams: any;
}
interface SearchProviderInterface extends React.FC<SearchProviderProps> {}

const SearchProvider = withRouter<SearchProviderProps, SearchProviderInterface>(
  ({ children, location, history, initialParams = {} }) => {
    const [searchParams, setSearchParams] = React.useState({
      ...initialParams,
      ...formatSearchParams(getParams(location)),
    });

    React.useEffect(() => {
      history.push({ search: stringifyParams(searchParams) });
    }, [history, searchParams]);

    const updateSearchParam = (name, value) => {
      setSearchParams(searchParams => {
        const newParams = cloneDeep(searchParams);
        set(newParams, name, value);
        if (name === 'makeId') {
          set(newParams, 'modelId', undefined);
          set(newParams, 'subModelId', undefined);
        }
        if (name === 'modelId') {
          set(newParams, 'subModelId', undefined);
        }
        return {
          ...searchParams,
          ...newParams,
          ...resetPaginationParams,
        };
      });
    };

    const getSearchParam = name => get(searchParams, name);
    const getSearchParamAsArray = name => [get(searchParams, name, [])].flat();

    const updatePaginationParams = parameters => {
      setSearchParams(searchParams => ({
        ...searchParams,
        ...resetPaginationParams,
        ...parameters,
      }));
    };

    const clearSearchParams = () => {
      setSearchParams(searchParams => pick(searchParams, nonClearableSearchParams));
    };

    const isPristine = () => {
      const formattedSearchParams = formatSearchParams(searchParams);
      return Object.keys(formattedSearchParams).length === 0;
    };

    return (
      <SearchContext.Provider
        value={{
          location,
          searchParams,
          setSearchParams,
          updateSearchParam,
          getSearchParam,
          getSearchParamAsArray,
          updatePaginationParams,
          clearSearchParams,
          isPristine,
        }}
      >
        {children}
      </SearchContext.Provider>
    );
  }
);

export function withSearch(Component, searchProviderProps) {
  return props => (
    <SearchProvider {...searchProviderProps}>
      <Component {...props} />
    </SearchProvider>
  );
}

export function useSearch() {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
