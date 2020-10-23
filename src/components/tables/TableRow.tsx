import React, { useState } from 'react';
import styled from 'styled-components';

import TableCellData from 'interfaces/tableCellData';
import SliderIcon from 'components/icons/SliderIcon';
import { debounce } from 'lodash';
import { clamp } from 'lodash';
import { DIVIDER, WHITE } from 'styles/color';

const ResizeHandle = styled.div<{ displayType?: string }>`
  position: absolute;
  width: 13px;
  height: 100%;
  right: 0;
  display: ${({ displayType }) => displayType};
  align-items: center;
  cursor: col-resize;
`;

export const TableCell = styled.div<{ cellId: string; cellStyles?: string | string[] }>`
  color: black;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  position: relative;
  ${({ cellStyles }) => (cellStyles && Array.isArray(cellStyles) ? cellStyles.join(' ') : cellStyles || '')}
  background: ${WHITE};
  border-bottom: 1px solid ${DIVIDER};
  height: 54px;
  &:hover ${ResizeHandle} {
    display: flex;
  }
`;

const TableRow: React.FC<
  {
    rowData: TableCellData[];
    cellStyles?: string | string[];
    onRowResize?: (rowData: TableCellData[], cellData: TableCellData) => void;
    onRowReorder?: (rowData: TableCellData[], cellData: TableCellData) => void;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ rowData, cellStyles, onRowResize, onRowReorder, ...props }) => {
  const cellRefs: { div: HTMLDivElement; cellData: TableCellData }[] = [];

  const [resizingId, setResizingId] = useState();

  let dragCell: TableCellData;
  let mouseMove: EventListenerOrEventListenerObject;
  let mousePosX: number;
  let originalWidth: number;

  const onResizeStartEnd = (e, cellData?: TableCellData) => {
    const method = e.type === 'mousedown' ? 'addEventListener' : 'removeEventListener';
    if (e.type === 'mousedown') {
      mousePosX = e.clientX;
      originalWidth = cellData!.width;
      mouseMove = e => onMouseMove(e, cellData!);
    }
    window[method]('mousemove', mouseMove);
    window[method]('mouseup', onResizeStartEnd);

    setResizingId(e.type === 'mousedown' && cellData!.columnId);
  };

  const onMouseMove = debounce((e, updatingCell: TableCellData) => {
    const cellData: TableCellData | undefined = rowData.find(cell => cell.columnId === updatingCell.columnId);

    if (cellData) {
      const offset: number = mousePosX - e.clientX;
      let newWidth = originalWidth - offset;
      cellData.width = clamp(newWidth, cellData.minWidth || newWidth, cellData.maxWidth || newWidth);
      if (onRowResize) {
        onRowResize(rowData, cellData);
      }
    }
  }, 1);

  const onDrop = (e, cellData) => {
    if (cellData.columnId !== dragCell.columnId && cellData.canReorder) {
      rowData.splice(rowData.indexOf(cellData), 0, rowData.splice(rowData.indexOf(dragCell), 1)[0]);
      requestAnimationFrame(() => {
        if (onRowReorder) {
          onRowReorder(rowData, cellData);
        }
      });
    }
  };

  const filteredRowData = rowData.filter(item => item.enabled);
  return (
    <>
      {filteredRowData.map((cellData: TableCellData) => {
        return (
          <TableCell
            key={cellData.columnId}
            cellId={cellData.columnId}
            cellStyles={[cellStyles, cellData.styles].flat()}
            ref={(div: HTMLDivElement) => cellRefs.push({ div, cellData })}
            onDrop={e => cellData.canReorder && onDrop(e, cellData)}
            onDragOver={e => e.preventDefault()}
            onDrag={e => (dragCell = cellData)}
            draggable={cellData.canReorder && !resizingId}
          >
            {cellData.content}
            {cellData.resizable && (
              <ResizeHandle
                displayType={resizingId === cellData.columnId ? 'flex' : 'none'}
                onMouseDown={e => onResizeStartEnd(e, cellData)}
              >
                <SliderIcon />
              </ResizeHandle>
            )}
          </TableCell>
        );
      })}
    </>
  );
};

export default React.memo(TableRow);
