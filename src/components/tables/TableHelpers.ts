import { TableType, RetailItemsColumnTypes } from 'constants/tableType';
import TableCellData from 'interfaces/tableCellData';
import TableSettings from './TableSettings';

/**
 * Gets a table's column configuration
 * @param tableType The type of table being saved based on `TableType`
 */
export function getStoredTableConfiguration(tableType: TableType): TableCellData[] {
  const defaultData: TableCellData[] = TableSettings[tableType];
  const storedConfig: TableCellData[] = JSON.parse(localStorage.getItem(`${tableType}Configuration`) || '[]');

  return defaultData
    .map(defaultCell => {
      const storedCell = storedConfig.find(cellData => cellData.columnId === defaultCell.columnId);
      return storedCell
        ? {
            ...defaultCell,
            ...storedCell,
          }
        : { ...defaultCell };
    })
    .sort((a, b) => {
      const index1 = storedConfig.findIndex(item => item.columnId === a.columnId);
      const index2 = storedConfig.findIndex(item => item.columnId === b.columnId);
      return index1 === -1 || index2 === -1 ? 0 : index1 - index2;
    });
}

/**
 * Sets a table's column configuration
 * @param tableType The type of table being saved based on `TableType`
 * @param headerData The new header array full of column data
 */
export function saveTableConfiguration(tableType: TableType, headerData: TableCellData[]) {
  localStorage.setItem(
    `${tableType}Configuration`,
    JSON.stringify(
      headerData.map(({ columnId, width, enabled, rowId }) => ({
        columnId,
        rowId,
        width,
        enabled,
      }))
    )
  );
}

/**
 * Gets the sortId from the api's `sortOptions` based on the column being rendered
 * @param sortOptions the sort options returned by the API during query
 * @param columnId the id of the column being rendered
 * @param type the type of items being displayed (vehicle|motorcycle)
 */
export function getSortableOption(
  sortOptions: { id: string; name: string }[],
  columnId: string,
  type: string
): { id: string; name: string } | undefined {
  let sortId;

  switch (columnId) {
    // attributes
    case RetailItemsColumnTypes.MILEAGE:
    case RetailItemsColumnTypes.DISPLACEMENT:
    case RetailItemsColumnTypes.CYLINDERS:
    case RetailItemsColumnTypes.FUEL_TYPE:
    case RetailItemsColumnTypes.OPTIONS:
    case RetailItemsColumnTypes.EXTERIOR_COLOR:
    case RetailItemsColumnTypes.INTERIOR_COLOR:
    case RetailItemsColumnTypes.BODY_TYPE:
    case RetailItemsColumnTypes.NUMBER_OF_DOORS:
    case RetailItemsColumnTypes.NUMBER_OF_PASSENGERS:
    case RetailItemsColumnTypes.TRANSMISSION:
    case RetailItemsColumnTypes.DRIVE_TRAIN:
    case RetailItemsColumnTypes.CATEGORY:
    case RetailItemsColumnTypes.COLOR:
      sortId = type && `${type.toLowerCase()}Attributes.${columnId}`;
      break;
    default:
      sortId = columnId;
      break;
  }
  return sortOptions.find(opt => opt.id === sortId);
}

export function isAttribute(columnType: string): boolean {
  switch (columnType) {
    case RetailItemsColumnTypes.MILEAGE:
    case RetailItemsColumnTypes.BODY_TYPE:
    case RetailItemsColumnTypes.EXTERIOR_COLOR:
    case RetailItemsColumnTypes.INTERIOR_COLOR:
    case RetailItemsColumnTypes.NUMBER_OF_DOORS:
    case RetailItemsColumnTypes.NUMBER_OF_PASSENGERS:
    case RetailItemsColumnTypes.TRANSMISSION:
    case RetailItemsColumnTypes.DRIVE_TRAIN:
    case RetailItemsColumnTypes.DISPLACEMENT:
    case RetailItemsColumnTypes.CYLINDERS:
    case RetailItemsColumnTypes.FUEL_TYPE:
    case RetailItemsColumnTypes.COLOR:
    case RetailItemsColumnTypes.CATEGORY:
    case RetailItemsColumnTypes.OPTIONS:
      return true;
    default:
      return false;
  }
}
