import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

import TableData from 'interfaces/tableData';
import TableCellData from 'interfaces/tableCellData';
import TableRow, { TableCell } from './TableRow';
import TableFooter from './TableFooter';
import Loader from 'components/loading/Loader';
import { WHITE } from 'styles/color';
import { useSearch } from 'contexts/searchContext';
import { WrapLink } from 'components/navigation/WrapLink';

const HorizontallyScrollableArea = styled.div`
  max-height: 100%;
  overflow-x: auto;
  grid-area: ScrollableArea;
  display: grid;
  grid-template:
    'TableHeader' auto
    'TableContent' 1fr / 1fr;
`;

const TableContainer = styled.div`
  position: relative;
  max-height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template:
    'ScrollableArea' 1fr
    'TableFooter' 75px;
  background: ${WHITE};
`;

type RowContainerType = { gridTemplateColumns: string; gridTemplateArea: string };
const TableHeader = styled.div.attrs<RowContainerType>(props => ({
  style: { ...props },
}))<RowContainerType>`
  grid-area: TableHeader;
  background: ${WHITE};
  display: grid;

  ${TableCell} {
    height: 45px;
  }
`;

const TableContent = styled.div.attrs<RowContainerType>(props => ({
  style: { ...props },
}))<RowContainerType>`
  overflow-y: auto;
  overflow-x: hidden;
  grid-area: TableContent;
  grid-auto-rows: 54px;
  background: ${WHITE};
  display: grid;
  position: relative;
`;

const TableContentOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${WrapLink} {
    height: 54px;
  }
`;

/**
 * A minimally styled table component
 *
 * @prop {TableData} tableData - Table data object used to populate header and content cells
 * @prop {Function} onRowResize - callback method for when a cell in a row gets resized, passes back the row and cell in question
 * @prop {string | string[]} contentCellStyles - shared styles that are applied to all content cells
 * @prop {string | string[]} headerCellStyles - shared styles that are applied to all header cells
 */
const Table: React.FC<{
  isLoading: boolean;
  tableData: TableData;
  pageInfo: any;
  onRowResize?: (rowData: TableCellData[], cellData: TableCellData) => void;
  onRowReorder?: (rowData: TableCellData[], cellData: TableCellData) => void;
  onScroll?: Function;
  contentCellStyles?: string | string[];
  headerCellStyles?: string | string[];
}> = ({
  isLoading,
  tableData,
  pageInfo,
  onRowReorder,
  onRowResize,
  onScroll = () => {},
  contentCellStyles,
  headerCellStyles,
}) => {
  const tableContentRef = useRef<HTMLDivElement>(null);
  const tableHeaderRef = useRef<HTMLDivElement>(null);
  const { searchParams } = useSearch();
  const scrollTableContentToTop = useCallback(() => {
    if (tableContentRef.current) {
      tableContentRef.current.scrollTop = 0;
    }
  }, [tableContentRef]);
  useEffect(scrollTableContentToTop, [searchParams]);
  const filteredHeaders = tableData.headerData.filter(item => item.enabled);
  const gridTemplateArea = `'${filteredHeaders.map(data => data.columnId).join(' ')}'`;
  const gridTemplateColumns = filteredHeaders.map(data => `[${data.columnId}] ${data.width}px`).join(' ');

  const onRowResizeCallback = debounce((rowData: TableCellData[], cellData: TableCellData) => {
    if (onRowResize) {
      onRowResize(rowData, cellData);
    }
    tableContentRef.current!.style.userSelect = tableHeaderRef.current!.style.userSelect = null;
  }, 200);

  // column resize to bypass immediate re-render calculations and resulting lag spikes from large data sets
  const onHeaderResize = useCallback(
    (rowData: TableCellData[], cellData: TableCellData) => {
      tableContentRef.current!.style.gridTemplateColumns = tableHeaderRef.current!.style.gridTemplateColumns = rowData
        .map(data => `[${data.columnId}] ${data.width}px`)
        .join(' ');
      tableContentRef.current!.style.userSelect = tableHeaderRef.current!.style.userSelect = 'none';
      onRowResizeCallback(rowData, cellData);
    },
    [onRowResizeCallback]
  );

  return (
    <TableContainer>
      <HorizontallyScrollableArea>
        <TableHeader ref={tableHeaderRef} gridTemplateArea={gridTemplateArea} gridTemplateColumns={gridTemplateColumns}>
          <TableRow
            onRowResize={onHeaderResize}
            onRowReorder={onRowReorder}
            rowData={filteredHeaders}
            cellStyles={headerCellStyles}
          />
        </TableHeader>
        <TableContent
          onScroll={e => onScroll(e)}
          gridTemplateArea={gridTemplateArea}
          gridTemplateColumns={gridTemplateColumns}
          ref={tableContentRef}
        >
          {tableData.data.map((rowData: TableCellData[]) => (
            <TableRow
              onRowResize={onRowResize}
              key={rowData[0].rowId}
              rowData={[...rowData]}
              cellStyles={contentCellStyles}
            />
          ))}
          <TableContentOverlay>
            {tableData.data.map((rowData: TableCellData[]) => (
              <WrapLink to={`/retail/${rowData[0].rowId}`} key={rowData[0].rowId} />
            ))}
          </TableContentOverlay>
        </TableContent>
      </HorizontallyScrollableArea>
      <TableFooter pageInfo={pageInfo} onPageChange={scrollTableContentToTop} />
      {isLoading && <Loader />}
    </TableContainer>
  );
};

export default React.memo(Table);
