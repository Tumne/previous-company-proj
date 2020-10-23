import { Pagination } from '../constants/Pagination';

export const parseConnectionParams = (params, listLength = Pagination.LIST_LENGTH) => {
  return { ...params, [!params.before ? 'first' : 'last']: listLength };
};
