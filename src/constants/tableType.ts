export enum TableType {
  RETAIL_ITEMS_TABLE = 'retailItemsTable',
}

export enum RetailItemsColumnTypes {
  SELECT = 'select',
  PHOTOS = 'photos',
  YEAR = 'year',
  MAKE = 'make',
  MODEL = 'model',
  TRIM = 'trim',
  STOCK_NUMBER = 'stockNumber',
  LIST_PRICE = 'listPrice',
  CREATED = 'created',

  ROOFTOP = 'rooftop',
  VIN = 'vin',
  STATUS = 'status',
  TYPE = 'type',
  CONDITION = 'condition',
  SUB_MODEL = 'subModel',
  TAGS = 'tags',
  DESCRIPTION = 'description',
  // ## attributes if of both VEHICLE and MOTORCYCLE
  MILEAGE = 'mileage',
  DISPLACEMENT = 'displacement',
  CYLINDERS = 'cylinders',
  FUEL_TYPE = 'fuelType',
  OPTIONS = 'options',

  // ## attributes if VEHICLE
  EXTERIOR_COLOR = 'exteriorColor',
  INTERIOR_COLOR = 'interiorColor',
  BODY_TYPE = 'bodyType',
  NUMBER_OF_DOORS = 'numberOfDoors',
  NUMBER_OF_PASSENGERS = 'numberOfPassengers',
  TRANSMISSION = 'transmission',
  DRIVE_TRAIN = 'driveTrain',

  // ## attributes if MOTORCYCLE
  CATEGORY = 'category',
  COLOR = 'color',

  COST = 'cost',
  ADDITIONAL_FEE = 'additionalFee',
  MSRP = 'msrp',
  FREIGHT = 'freight',
  FINAL_PRICE = 'finalPrice',

  AS_IS = 'asIs',
  DEMO = 'demo',
  CERTIFIED = 'certified',
  SHOW_WEB = 'showWeb',

  ARCHIVED = 'archived',
  COMPLETE = 'complete',
  COMPLETE_PERCENT = 'completePercent',
  LOCKED = 'locked',
  MAPPED = 'mapped',

  APPOINTMENTS_COUNT = 'appointmentsCount',
  CONVERSATIONS_COUNT = 'conversationsCount',
  CUSTOMERS_COUNT = 'customersCount',
  LEADS_COUNT = 'leadsCount',
  TASKS_COUNT = 'tasksCount',

  CREATED_BY = 'createdBy',
  UPDATED = 'updated',
  SOLD = 'sold',
}
