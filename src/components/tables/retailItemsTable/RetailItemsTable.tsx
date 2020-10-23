import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components/macro';
import { get, cloneDeep } from 'lodash';
import { DateTime } from 'luxon';

import RetailItem from 'interfaces/retailItem';
import TableCellData from 'interfaces/tableCellData';
import TableData from 'interfaces/tableData';
import TrueIcon from 'components/icons/TrueIcon';
import FalseIcon from 'components/icons/FalseIcon';
import Table from 'components/tables/Table';
import SecondaryText from 'components/typography/SecondaryText';
import MonetaryAmount from 'components/typography/MonetaryAmount';
import Checkbox from 'components/Checkbox';
import TableFilters from 'components/tables/TableFilters';
import Label from 'components/typography/Label';
import Image from 'components/images/Images';
import Badge from 'components/Badge';
import NoResultsPlaceholder from 'components/placeholders/NoResultsPlaceholder';
import RetailItemsOverlay from './RetailItemsOverlay';
import ChevronRightIcon from 'components/icons/ChevronRight';
import TableSettings from '../TableSettings';
import DefaultVehicleIcon from 'components/icons/DefaultVehicle';
import { ImageType, ImageSize } from 'constants/imageType';
import { BORDER_BLUE, BODY_TEXT } from 'styles/color';
import { saveTableConfiguration, getStoredTableConfiguration, getSortableOption, isAttribute } from '../TableHelpers';
import { TableType, RetailItemsColumnTypes } from 'constants/tableType';
import { convertEnumToString } from 'utils/stringUtils';
import { Clickable } from 'components/Button';
import { Z_INDEX_1 } from 'styles/z-index';
import { useSearch } from 'contexts/searchContext';

const ColorPalette = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border: ${({ color }) => (color === 'WHITE' ? `1px solid ${BORDER_BLUE}` : 'none')};
  border-radius: 3px;
  background: ${({ color }) => color && color.toLowerCase()};
  opacity: ${({ color }) => (color ? 1 : 0)};
  flex-shrink: 0;
  margin-right: 12px;
`;

const ColorContent = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  span {
    text-transform: capitalize;
  }
`;

const PhotoOverlay = styled(RetailItemsOverlay).attrs<{ top: number | string; left: number | string }>(props => ({
  style: {
    ...props,
  },
}))<{ top: number | string; left: number | string }>`
  position: fixed;
`;

const PillContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;

  ${Badge} {
    height: 25px;
    flex-shrink: 0;
    padding: 0 10px;
    &:not(:last-child) {
      margin-right: 7px;
    }
  }
`;

const SortableCell = styled(Clickable)<{ direction?: string }>`
  width: 100%;
  display: flex;
  align-items: center;

  ${Label} {
    text-align: left;
    align-items: center;
  }

  > span {
    margin: 1px 4px 0 2px;
    width: 30%; /* this combined with max width makes the margins dynamic within constraints */
    max-width: 35px;
    color: ${BODY_TEXT};
    svg {
      transform: translateX(-3px) ${({ direction }) => `rotate(${direction === 'DESCENDING' ? '90deg' : '-90deg'})`};
    }
  }
`;

const InventoryTable: React.FC<{
  isLoading: boolean;
  pageInfo: any;
  sortOptions: any;
  data: RetailItem[];
  onFiltersChange: Function;
}> = ({ data, isLoading, pageInfo, sortOptions, onFiltersChange }) => {
  const {
    updateSearchParam,
    searchParams,
    searchParams: { sort },
  } = useSearch();
  const [itemsType, setItemsType] = useState(searchParams.type);
  const sortOrders = useMemo(() => sort || [], [sort]);

  const updateSortOrder = useCallback(
    (sortId: string) => {
      const newSortOrders = cloneDeep(sortOrders);
      const sortOption = newSortOrders.find(sort => sort.id === sortId);
      // Cycles through 3 states: ASCENDING -> DESCENDING -> UNDEFINED
      if (sortOption && sortOption.direction === 'DESCENDING') {
        sortOption.direction = 'ASCENDING';
      } else if (sortOption) {
        newSortOrders.splice(newSortOrders.indexOf(sortOption), 1);
      } else {
        newSortOrders.push({ id: sortId, direction: 'DESCENDING' });
      }
      updateSearchParam('sort', newSortOrders);
    },
    [sortOrders, updateSearchParam]
  );

  const [photoOverlay, setPhotoOverlay] = useState<React.ReactNode>(null);

  const updateColumnHeaders = useCallback((rowData: TableCellData[], _, disableReRender: Boolean = false) => {
    if (!disableReRender) {
      setColumnHeaders(rowData);
    }
    // LocalStorage
    saveTableConfiguration(TableType.RETAIL_ITEMS_TABLE, rowData);
  }, []);

  // create formatted state headers
  const [columnHeaders, setColumnHeaders] = useState<TableCellData[]>(
    getStoredTableConfiguration(TableType.RETAIL_ITEMS_TABLE)
  );

  const toggleOverlay = useCallback((e, url) => {
    if (e) {
      const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
      // setting position of the overlay to target's right-center position + 5px padding
      setPhotoOverlay(<PhotoOverlay left={x + width + 5} top={y + height / 2} url={url} />);
    } else {
      setPhotoOverlay(null);
    }
  }, []);

  const parsedData = useMemo(() => {
    const headerCells = formatHeaderCells(
      columnHeaders,
      onFiltersChange,
      updateColumnHeaders,
      itemsType,
      updateSortOrder,
      sortOrders,
      sortOptions
    );
    return parseData(data, headerCells, toggleOverlay);
  }, [
    columnHeaders,
    onFiltersChange,
    updateColumnHeaders,
    itemsType,
    updateSortOrder,
    sortOrders,
    sortOptions,
    data,
    toggleOverlay,
  ]);

  useEffect(() => {
    const currentType = searchParams.type;
    if (currentType !== itemsType) {
      setItemsType(currentType);
      setColumnHeaders(getStoredTableConfiguration(TableType.RETAIL_ITEMS_TABLE));
    }
  }, [onFiltersChange, itemsType, updateColumnHeaders, searchParams.type]);

  const onRowResize = useCallback(
    (rowData: TableCellData[], cellData: TableCellData) => {
      updateColumnHeaders(rowData, cellData, true);
    },
    [updateColumnHeaders]
  );
  const onScroll = useCallback(() => setPhotoOverlay(null), []);

  if (!isLoading && !data.length) {
    return <NoResultsPlaceholder />;
  }

  return (
    <>
      <Table
        onScroll={onScroll}
        isLoading={isLoading}
        pageInfo={pageInfo}
        tableData={parsedData}
        onRowResize={onRowResize}
        onRowReorder={updateColumnHeaders}
        contentCellStyles={`
          padding: 10px;
        `}
        headerCellStyles={`
          padding: 10px;
        `}
      />
      {photoOverlay}
    </>
  );
};

function parseData(data, columnHeaders, toggleOverlay: (event?: MouseEvent, photoUrl?: string) => void): TableData {
  // create table data
  const tableData: TableCellData[][] = [];

  data.forEach((retailItem: RetailItem) => {
    const rowData: TableCellData[] = [];
    columnHeaders.forEach((header: TableCellData) => {
      rowData.push(formatCellData(retailItem, header, toggleOverlay));
    });

    tableData.push(rowData);
  });

  return {
    headerData: columnHeaders,
    data: tableData,
  };
}

function formatHeaderCells(
  headerData: TableCellData[],
  updateFilters: Function,
  updateColumnHeaders: (rowData: TableCellData[], cellData: TableCellData) => void,
  displayedItemType: string,
  updateSortOrder: (columnId: string) => void,
  sortOrders: { id: string; direction: string }[],
  sortOptions: { id: string; name: string }[]
): TableCellData[] {
  const cleanedHeaderData = headerData.filter(header => {
    // no attributes at all display if no type is specified
    if (!displayedItemType) {
      return !isAttribute(header.columnId);
    }

    // formatting for header cells
    switch (header.columnId) {
      // Motorcycles only
      case RetailItemsColumnTypes.CATEGORY:
      case RetailItemsColumnTypes.COLOR:
        return displayedItemType === 'MOTORCYCLE';
      // Vehicles Only
      case RetailItemsColumnTypes.BODY_TYPE:
      case RetailItemsColumnTypes.EXTERIOR_COLOR:
      case RetailItemsColumnTypes.INTERIOR_COLOR:
      case RetailItemsColumnTypes.NUMBER_OF_DOORS:
      case RetailItemsColumnTypes.NUMBER_OF_PASSENGERS:
      case RetailItemsColumnTypes.TRANSMISSION:
      case RetailItemsColumnTypes.DRIVE_TRAIN:
        return displayedItemType === 'VEHICLE';
    }
    return true;
  });

  return cleanedHeaderData.map(header => {
    const defaultContent = get(
      TableSettings[TableType.RETAIL_ITEMS_TABLE].find(cell => cell.columnId === header.columnId),
      'content'
    );

    switch (header.columnId) {
      case RetailItemsColumnTypes.SELECT:
        header.content = <Checkbox />;
        break;
      case RetailItemsColumnTypes.PHOTOS:
        header.content = (
          <TableFilters
            data={cleanedHeaderData}
            onFiltersChanged={(rowData, cell, isEnabling) => {
              updateColumnHeaders(rowData, cell);
              if (isEnabling) {
                updateFilters();
              }
            }}
          />
        );
        break;
      default:
        const sortOpt = getSortableOption(sortOptions, header.columnId, displayedItemType);
        if (sortOpt) {
          const sortInfo = sortOrders.find(sort => sort.id === sortOpt.id);
          header.content = (
            <SortableCell onClick={() => updateSortOrder(sortOpt.id)} direction={sortInfo && sortInfo.direction}>
              <Label>{defaultContent}</Label>
              {sortInfo && (
                <span>
                  <ChevronRightIcon />
                </span>
              )}
            </SortableCell>
          );
        } else {
          header.content = <Label>{defaultContent}</Label>;
        }
        break;
    }
    return header;
  });
}

function formatCellData(
  rowData: RetailItem,
  headerData: TableCellData,
  toggleOverlay: (event?: MouseEvent, photoUrl?: string) => void
): TableCellData {
  let formattedData: TableCellData = {
    ...headerData,
    canReorder: false,
    resizable: false,
    rowId: rowData.id,
  };
  switch (headerData.columnId) {
    case RetailItemsColumnTypes.TAGS:
      formattedData.content = (
        <PillContainer>
          {(rowData.tags || []).map(tag => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </PillContainer>
      );
      break;
    case RetailItemsColumnTypes.SELECT:
      formattedData.content = (
        <Checkbox
          css={`
            z-index: ${Z_INDEX_1};
          `}
        />
      );
      break;
    case RetailItemsColumnTypes.PHOTOS:
      let thumb = get(rowData, 'primaryPhoto.thumb');
      formattedData.content = (
        <Clickable
          disabled={!thumb}
          onMouseOver={(e: any) => toggleOverlay(e, get(rowData, 'primaryPhoto.large'))}
          onMouseOut={() => toggleOverlay()}
          css={`
            z-index: ${Z_INDEX_1};
          `}
        >
          <Image type={ImageType.PHOTO} size={ImageSize.THUMBNAIL} src={thumb} fallbackSrc={<DefaultVehicleIcon />} />
        </Clickable>
      );
      break;
    case RetailItemsColumnTypes.TRIM:
      let color = get(rowData, 'attributes.exteriorColor');

      formattedData.content = (
        <ColorContent>
          <SecondaryText>
            {color && <span>{color.toLowerCase()}, </span>}
            {rowData.trim}
          </SecondaryText>
        </ColorContent>
      );
      break;
    // monetary items
    case RetailItemsColumnTypes.LIST_PRICE:
    case RetailItemsColumnTypes.FINAL_PRICE:
    case RetailItemsColumnTypes.FREIGHT:
    case RetailItemsColumnTypes.MSRP:
    case RetailItemsColumnTypes.COST:
    case RetailItemsColumnTypes.ADDITIONAL_FEE:
      formattedData.content = (
        <MonetaryAmount>{get(rowData, `${headerData.columnId}.formattedAmountRounded`) || ''}</MonetaryAmount>
      );
      break;
    case RetailItemsColumnTypes.STOCK_NUMBER:
      formattedData.content = <SecondaryText>{rowData.stockNumber && `#${rowData.stockNumber}`}</SecondaryText>;
      break;
    case RetailItemsColumnTypes.CREATED:
      let diff = DateTime.local()
        .diff(DateTime.fromISO(rowData.created), ['months', 'days'])
        .toObject();
      let timeInStock = Math.floor(diff.months ? diff.months : diff.days);

      formattedData.content = (
        <SecondaryText>{`${timeInStock} ${diff.months ? 'month' : 'day'}${
          timeInStock === 1 ? '' : 's'
        }`}</SecondaryText>
      );
      break;
    // Regular dates
    case RetailItemsColumnTypes.UPDATED:
    case RetailItemsColumnTypes.SOLD:
      formattedData.content = rowData[headerData.columnId] && (
        <SecondaryText>{DateTime.fromISO(rowData[headerData.columnId]).toFormat('LLL dd, yyyy')}</SecondaryText>
      );
      break;
    case RetailItemsColumnTypes.MILEAGE:
      formattedData.content = <SecondaryText>{get(rowData, 'attributes.mileage.formattedAmount')}</SecondaryText>;
      break;
    // Objects with .name values
    case RetailItemsColumnTypes.ROOFTOP:
      formattedData.content = <SecondaryText>{get(rowData, `${headerData.columnId}.name`)}</SecondaryText>;
      break;
    case RetailItemsColumnTypes.CREATED_BY:
      formattedData.content = (
        <SecondaryText>
          {`${get(rowData, `${headerData.columnId}.firstName`, '')} ${get(
            rowData,
            `${headerData.columnId}.lastName`,
            ''
          )}`}
        </SecondaryText>
      );
      break;
    case RetailItemsColumnTypes.COMPLETE_PERCENT:
      formattedData.content = (
        <SecondaryText>{Math.round(get(rowData, RetailItemsColumnTypes.COMPLETE_PERCENT, 0) * 100)}%</SecondaryText>
      );
      break;
    // Regular enum values
    case RetailItemsColumnTypes.STATUS:
    case RetailItemsColumnTypes.CONDITION:
    case RetailItemsColumnTypes.TYPE:
      formattedData.content = <SecondaryText>{convertEnumToString(rowData[headerData.columnId])}</SecondaryText>;
      break;
    // Boolean values
    case RetailItemsColumnTypes.AS_IS:
    case RetailItemsColumnTypes.CERTIFIED:
    case RetailItemsColumnTypes.SHOW_WEB:
    case RetailItemsColumnTypes.ARCHIVED:
    case RetailItemsColumnTypes.COMPLETE:
    case RetailItemsColumnTypes.LOCKED:
    case RetailItemsColumnTypes.MAPPED:
    case RetailItemsColumnTypes.DEMO:
      formattedData.content = rowData[headerData.columnId] ? <TrueIcon /> : <FalseIcon />;
      break;
    // Vehicle Attributes
    case RetailItemsColumnTypes.CYLINDERS:
    case RetailItemsColumnTypes.CATEGORY:
    case RetailItemsColumnTypes.NUMBER_OF_DOORS:
    case RetailItemsColumnTypes.NUMBER_OF_PASSENGERS:
      formattedData.content = <SecondaryText>{get(rowData, `attributes.${headerData.columnId}`)}</SecondaryText>;
      break;
    // Enums in Attributes
    case RetailItemsColumnTypes.BODY_TYPE:
    case RetailItemsColumnTypes.FUEL_TYPE:
    case RetailItemsColumnTypes.TRANSMISSION:
      formattedData.content = (
        <SecondaryText>{convertEnumToString(get(rowData, `attributes.${headerData.columnId}`, ''))}</SecondaryText>
      );
      break;
    case RetailItemsColumnTypes.DRIVE_TRAIN:
      const driveTrainFormatted = { FOUR_BY_FOUR: '4x4', AWD: 'AWD', RWD: 'RWD', FWD: 'FWD' }; // TODO: Make this an accessible enum
      formattedData.content = (
        <SecondaryText>
          {driveTrainFormatted[get(rowData, `attributes.${headerData.columnId}`, '')] || ''}
        </SecondaryText>
      );
      break;
    // Color in attributes
    case RetailItemsColumnTypes.COLOR:
    case RetailItemsColumnTypes.EXTERIOR_COLOR:
    case RetailItemsColumnTypes.INTERIOR_COLOR:
      const attributeColor = get(rowData, `attributes.${headerData.columnId}`);
      formattedData.content = (
        <ColorContent>
          {headerData.columnId !== RetailItemsColumnTypes.INTERIOR_COLOR && <ColorPalette color={attributeColor} />}
          <SecondaryText>{attributeColor && <span>{attributeColor.toLowerCase()}</span>}</SecondaryText>
        </ColorContent>
      );
      break;
    // attributes misc
    case RetailItemsColumnTypes.DISPLACEMENT:
      formattedData.content = (
        <SecondaryText>{`${get(rowData, 'attributes.displacement.formattedAmount', '')}`}</SecondaryText>
      );
      break;
    case RetailItemsColumnTypes.OPTIONS:
      formattedData.content = (
        <PillContainer>
          {(get(rowData, `attributes.options`) || []).map(option => (
            <Badge key={option}>{convertEnumToString(option)}</Badge>
          ))}
        </PillContainer>
      );
      break;
    default:
      formattedData.content = (
        <SecondaryText>{`${
          rowData[headerData.columnId] !== undefined && rowData[headerData.columnId] !== null
            ? rowData[headerData.columnId]
            : ''
        }`}</SecondaryText>
      );
      break;
  }
  return formattedData;
}

export default InventoryTable;
