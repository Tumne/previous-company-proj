import gql from 'graphql-tag';

export const pageInfo = gql`
  fragment PageInfoFragment on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    totalEdges
    startCursor
  }
`;
