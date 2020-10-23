import { ApolloClient, HttpLink, InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import { ServerError } from 'apollo-link-http-common';

import history from 'store/history';
import schema from './schema.json';
import { authStorage, clearCacheAuth } from 'utils/authUtils';
import { localeStorage } from 'utils/intlUtils';

/**
 * Centralized error capturing.
 * - Logout when unauthorized
 * - Display error dialog with message upon 5xx
 */
const apolloErrorLink = onError(({ networkError }) => {
  if (!networkError) {
    return;
  }

  const error = networkError as ServerError;
  const { statusCode } = error;

  if (statusCode === 401) {
    clearCacheAuth();
    history.replace('/login');
  } else if (statusCode === 500 || statusCode === 502) {
    // TODO: Trigger dialog with error message
  }
});

const apolloLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPH_BASE + '/graphql',
  headers: {
    'Channel-Type': 'WEB',
    'Accept-Language': localeStorage.get(),
    Authorization: `Bearer ${authStorage.get()}`,
  },
});

export const client = new ApolloClient({
  link: apolloErrorLink.concat(apolloLink),
  cache: new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData: schema,
    }),
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});
