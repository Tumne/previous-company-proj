import gql from 'graphql-tag';

export const QUERY = gql`
  query RetailItemDetailsContainerQuery($id: ID!) {
    retailItem(id: $id) {
      customersCount
      phoneCallsCount: leadsCount(type: PHONE_CALL)
      conversationsCount
      testDrivesCount: leadsCount(type: TEST_DRIVE)
      customers {
        id
        firstName
        lastName
        status
        lastActive
      }
    }
  }
`;
