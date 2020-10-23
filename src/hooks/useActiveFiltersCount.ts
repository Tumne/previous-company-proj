import { omit } from 'lodash';
import { useSearch } from 'contexts/searchContext';

export const useActiveFiltersCount = () => {
  const { searchParams } = useSearch();
  const { vehicleAttributes, motorcycleAttributes, ...otherParams } = searchParams;
  const filteredParams = omit(otherParams, ['after', 'before', 'last', 'first', 'keyword']);
  const getParamsLength = obj => (obj ? Object.values(obj).filter(Boolean).length : 0);

  return getParamsLength(filteredParams) + getParamsLength(vehicleAttributes) + getParamsLength(motorcycleAttributes);
};
