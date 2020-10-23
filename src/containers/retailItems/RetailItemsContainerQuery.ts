import gql from 'graphql-tag';
import { QueryResult } from '@apollo/react-common';
import { useQuery } from '@apollo/react-hooks';

import TableCellData from 'interfaces/tableCellData';
import { pageInfo } from 'store/api/graph/fragments/pageInfo';
import { filters } from 'store/api/graph/fragments/filters';
import { parseConnectionParams } from 'utils/apiUtils';
import { getStoredTableConfiguration, isAttribute } from 'components/tables/TableHelpers';
import { RetailItemsColumnTypes, TableType } from 'constants/tableType';

export const retailItemsContainerQuery = type => gql`
  query RETAIL_ITEM_CONNECTION(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $keyword: String
    $sort: [SortInput!]
    $whiteLabelId: ID
    $groupId: ID
    $rooftopId: ID
    $archived: Boolean
    $asIs: Boolean
    $certified: Boolean
    $city: String
    $complete: Boolean
    $condition: InventoryItemCondition
    $customerId: ID
    $daysInStock: IntRangeInput
    $demo: Boolean
    $distance: Int
    $finalPrice: IntRangeInput
    $hasLeads: Boolean
    $hasMileage: Boolean
    $hasPhotos: Boolean
    $hasPrice: Boolean
    $latitude: Float
    $listPrice: IntRangeInput
    $location: String
    $longitude: Float
    $makeId: [ID!]
    $mapped: Boolean
    $modelId: [ID!]
    $motorcycleAttributes: MotorcycleAttributesFilterInput
    $vehicleAttributes: VehicleAttributesFilterInput
    $region: String
    $showWeb: Boolean
    $sold: DateTimeRangeInput
    $status: [RetailItemStatus!]
    $subModelId: [ID!]
    $tagId: [ID!]
    $type: InventoryItemType
    $year: IntRangeInput
    $created: DateTimeRangeInput
    $updated: DateTimeRangeInput
    ${getItemVariables()}
    $d_typeOn: Boolean!
  ) {
    metadata {
      inventoryItem {
        vehicleAttributes {
          exteriorColor {
            id
            info
            name
          }
        }
      }
    }
    retailItemConnection(
      first: $first
      after: $after
      last: $last
      before: $before
      keyword: $keyword
      sort: $sort
      whiteLabelId: $whiteLabelId
      groupId: $groupId
      rooftopId: $rooftopId
      archived: $archived
      asIs: $asIs
      certified: $certified
      city: $city
      complete: $complete
      condition: $condition
      customerId: $customerId
      daysInStock: $daysInStock
      demo: $demo
      distance: $distance
      finalPrice: $finalPrice
      hasLeads: $hasLeads
      hasMileage: $hasMileage
      hasPhotos: $hasPhotos
      hasPrice: $hasPrice
      latitude: $latitude
      listPrice: $listPrice
      location: $location
      longitude: $longitude
      makeId: $makeId
      mapped: $mapped
      modelId: $modelId
      motorcycleAttributes: $motorcycleAttributes
      vehicleAttributes: $vehicleAttributes
      region: $region
      showWeb: $showWeb
      sold: $sold
      status: $status
      subModelId: $subModelId
      tagId: $tagId
      type: $type
      year: $year
      created: $created
      updated: $updated
    ) {
      sortOptions {
        id
        name
      }
      filters {
        ...FiltersFragment
      }
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          id
          primaryPhoto {
            id
            thumb:url(width: 70, height: 70)
            listPhoto: url(width: 120, height: 120)
            large:url(width: 300, height: 215)
          }
          year
          make
          model
          trim
          listPrice {
            formattedAmountRounded
          }
          status
          vin
          stockNumber
          completePercent
          leadsCount
          customersCount
          testDrivesCount: leadsCount(type: TEST_DRIVE)
          ${getFilteredRetailItemsQuery(type)}
        }
      }
    }
  }
  ${filters}
  ${pageInfo}
`;

const staticColumns = [
  RetailItemsColumnTypes.SELECT,
  RetailItemsColumnTypes.PHOTOS,
  RetailItemsColumnTypes.YEAR,
  RetailItemsColumnTypes.MAKE,
  RetailItemsColumnTypes.MODEL,
  RetailItemsColumnTypes.LIST_PRICE,
  RetailItemsColumnTypes.TRIM,
  RetailItemsColumnTypes.STATUS,
  RetailItemsColumnTypes.VIN,
  RetailItemsColumnTypes.STOCK_NUMBER,
  RetailItemsColumnTypes.COMPLETE_PERCENT,
  RetailItemsColumnTypes.LEADS_COUNT,
  RetailItemsColumnTypes.CUSTOMERS_COUNT,
  RetailItemsColumnTypes.EXTERIOR_COLOR,
  RetailItemsColumnTypes.TRANSMISSION,
  RetailItemsColumnTypes.MILEAGE,
  RetailItemsColumnTypes.DISPLACEMENT,
  RetailItemsColumnTypes.CYLINDERS,
  RetailItemsColumnTypes.FUEL_TYPE,
] as string[];

export function getItemVariables() {
  const tableConfiguration: TableCellData[] = getStoredTableConfiguration(TableType.RETAIL_ITEMS_TABLE);
  return tableConfiguration
    .filter(col => !staticColumns.includes(col.columnId as RetailItemsColumnTypes))
    .map(col => `$d_${col.columnId}On: Boolean!`)
    .join('\n');
}

export function getFilteredRetailItemsQuery(type: string) {
  const tableConfiguration: TableCellData[] = getStoredTableConfiguration(TableType.RETAIL_ITEMS_TABLE);

  // regular config
  const topLevelQueries = tableConfiguration
    .filter(column => !isAttribute(column.columnId))
    .map(column => {
      if (staticColumns.includes(column.columnId)) return null;

      switch (column.columnId) {
        case RetailItemsColumnTypes.ROOFTOP:
          return `rooftop @include(if: $d_${column.columnId}On){
                  id
                  name
                }`;
        case RetailItemsColumnTypes.CREATED_BY:
          return `createdBy @include(if: $d_${column.columnId}On) {
            id
            firstName
            lastName
          }`;
        case RetailItemsColumnTypes.TAGS:
          return `tags @include(if: $d_${column.columnId}On) {
              id
              name
              type
            }`;
        // currency
        case RetailItemsColumnTypes.FINAL_PRICE:
        case RetailItemsColumnTypes.FREIGHT:
        case RetailItemsColumnTypes.MSRP:
        case RetailItemsColumnTypes.COST:
        case RetailItemsColumnTypes.ADDITIONAL_FEE:
          return `${column.columnId} @include(if: $d_${column.columnId}On) {
                formattedAmountRounded
              }`;
        default:
          return `${column.columnId} @include(if: $d_${column.columnId}On)`;
      }
    })
    .filter(item => item)
    .join('\n');

  return `
    ${topLevelQueries}
    attributes @include(if: $d_typeOn) {
      ... on MotorcycleAttributes {
        mileage {
          formattedAmount
        }
        displacement {
          formattedAmount
        }
        cylinders
        fuelType
        ${getItemAttributes('MOTORCYCLE', tableConfiguration)}
      }
      ... on VehicleAttributes {
        exteriorColor
        transmission
        mileage {
          formattedAmount
        }
        displacement {
          formattedAmount
        }
        cylinders
        fuelType
        ${getItemAttributes('VEHICLE', tableConfiguration)}
      }
    }
  `;
}

function getItemAttributes(type: string, attributes: TableCellData[]): string {
  return attributes
    .filter(column => {
      // formatting for header cells
      switch (column.columnId) {
        // Motorcycles only
        case RetailItemsColumnTypes.CATEGORY:
        case RetailItemsColumnTypes.COLOR:
          return type === 'MOTORCYCLE';
        // Vehicles Only
        case RetailItemsColumnTypes.BODY_TYPE:
        case RetailItemsColumnTypes.EXTERIOR_COLOR:
        case RetailItemsColumnTypes.INTERIOR_COLOR:
        case RetailItemsColumnTypes.NUMBER_OF_DOORS:
        case RetailItemsColumnTypes.NUMBER_OF_PASSENGERS:
        case RetailItemsColumnTypes.DRIVE_TRAIN:
        case RetailItemsColumnTypes.TRANSMISSION:
        case RetailItemsColumnTypes.OPTIONS: // TODO: This needs to appear on motorcycle
          return type === 'VEHICLE';
        default:
          return isAttribute(column.columnId);
      }
    })
    .map(column => {
      if (staticColumns.includes(column.columnId)) return null;
      else return `${column.columnId} @include(if: $d_${column.columnId}On)`;
    })
    .join('\n');
}

export const useRetailItemConnectionQuery = (variables = {}, options = {}, isCondensed = false): QueryResult => {
  const formattedVariables = parseConnectionParams(variables);
  const tableConfiguration: TableCellData[] = getStoredTableConfiguration(TableType.RETAIL_ITEMS_TABLE);

  tableConfiguration.forEach(item => {
    if (!staticColumns.includes(item.columnId)) {
      formattedVariables[`d_${item.columnId}On`] = item.enabled;
    }
  });
  formattedVariables.d_typeOn = !!formattedVariables.type || isCondensed;

  return useQuery(retailItemsContainerQuery(variables['type']), {
    variables: formattedVariables,
    ...options,
  });
};
