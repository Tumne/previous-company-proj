import qs from 'qs';

export const getParams = location => qs.parse(location.search, { ignoreQueryPrefix: true, comma: true });

export const stringifyParams = params => qs.stringify(params, { encode: true });
