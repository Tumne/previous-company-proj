import TableCellData from 'interfaces/tableCellData';
import { TableType, RetailItemsColumnTypes } from 'constants/tableType';

const defaultHeaderSettings = (columnId): TableCellData => ({
  rowId: 'header',
  enabled: true,
  columnId: columnId,
  content: null,
  width: 90,
  minWidth: 60,
  resizable: true,
  canReorder: true,
});

const TableSettings = {
  [TableType.RETAIL_ITEMS_TABLE]: Object.freeze([
    // Defaults
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.SELECT),
      styles: 'justify-content: center;',
      resizable: false,
      canReorder: false,
      width: 55,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.PHOTOS),
      styles: 'justify-content: center; padding: 10px 20px 10px 0;',
      resizable: false,
      canReorder: false,
      width: 55,
    },

    // ...Rest
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.ROOFTOP),
      content: 'rooftop',
      width: 220,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.VIN),
      content: 'vin',
      width: 120,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.STOCK_NUMBER),
      content: 'Stock #',
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.STATUS),
      content: 'status',
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.TYPE),
      content: 'type',
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.CONDITION),
      content: 'condition',
      width: 120,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.YEAR),
      content: 'year',
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.MAKE),
      content: 'make',
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.MODEL),
      content: 'model',
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.SUB_MODEL),
      content: 'sub model',
      width: 120,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.TRIM),
      content: 'Trim',
      width: 290,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.TAGS),
      content: 'tags',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.DESCRIPTION),
      content: 'description',
      width: 220,
      enabled: false,
    },

    // ## attributes if of both VEHICLE and MOTORCYCLE
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.MILEAGE),
      content: 'Mileage',
      width: 100,
    },

    // ## attributes if MOTORCYCLE
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.CATEGORY),
      content: 'category',
      width: 120,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.COLOR),
      content: 'color',
    },

    // ## attributes if VEHICLE
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.BODY_TYPE),
      content: 'body type',
      width: 120,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.EXTERIOR_COLOR),
      content: 'exterior color',
      width: 120,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.INTERIOR_COLOR),
      content: 'interior color',
      width: 120,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.NUMBER_OF_DOORS),
      content: 'number of doors',
      width: 120,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.NUMBER_OF_PASSENGERS),
      content: 'number of passengers',
      width: 120,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.TRANSMISSION),
      content: 'transmission',
      width: 120,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.DRIVE_TRAIN),
      content: 'drive train',
      width: 90,
      enabled: false,
    },

    // ## attributes if of both VEHICLE and MOTORCYCLE
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.DISPLACEMENT),
      content: 'displacement',
      width: 120,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.CYLINDERS),
      content: 'cylinders',
      width: 120,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.FUEL_TYPE),
      content: 'fuel type',
      width: 120,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.OPTIONS),
      content: 'options',
      width: 120,
      enabled: false,
    },

    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.LIST_PRICE),
      content: 'List Price',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.COST),
      content: 'cost',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.ADDITIONAL_FEE),
      content: 'additional fee',
      width: 150,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.MSRP),
      content: 'msrp',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.FREIGHT),
      content: 'freight',
      width: 120,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.FINAL_PRICE),
      content: 'final price',
      width: 120,
    },

    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.AS_IS),
      content: 'as is',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.DEMO),
      content: 'demo',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.CERTIFIED),
      content: 'certified',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.SHOW_WEB),
      content: 'show web',
      enabled: false,
    },

    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.ARCHIVED),
      content: 'archived',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.COMPLETE),
      content: 'complete',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.COMPLETE_PERCENT),
      content: 'complete percent',
      width: 90,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.LOCKED),
      content: 'locked',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.MAPPED),
      content: 'mapped',
      enabled: false,
    },

    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.APPOINTMENTS_COUNT),
      content: 'appointments',
      width: 120,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.CONVERSATIONS_COUNT),
      content: 'conversations',
      width: 120,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.CUSTOMERS_COUNT),
      content: 'customers',
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.LEADS_COUNT),
      content: 'leads',
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.TASKS_COUNT),
      content: 'tasks',
    },

    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.CREATED_BY),
      content: 'created by',
      width: 120,
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.CREATED),
      content: 'Days In Stock',
      width: 160,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.UPDATED),
      content: 'updated',
      enabled: false,
    },
    {
      ...defaultHeaderSettings(RetailItemsColumnTypes.SOLD),
      content: 'sold',
      enabled: false,
    },
  ]) as TableCellData[],
};

export default TableSettings;
