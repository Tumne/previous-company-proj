import gql from 'graphql-tag';

export const sortOptions = gql`
  fragment SortOptionsFragment on SortOption {
    id
    direction
    name
    position
  }
`;
