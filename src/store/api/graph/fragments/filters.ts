import gql from 'graphql-tag';

export const filters = gql`
  fragment FiltersFragment on Filter {
    __typename
    id
    name
    ... on FacetFilter {
      hasParent
      facets {
        id
        count
        name
        parent
      }
      multiSelect
    }
    ... on RangeFilter {
      increment
      range {
        gte
        lte
      }
      unit
    }
    ... on ToggleGroupFilter {
      toggles {
        id
        name
      }
    }
  }
`;
