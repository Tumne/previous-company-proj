import React, { useState } from 'react';
import styled from 'styled-components';
import { get } from 'lodash';

import TableCellData from 'interfaces/tableCellData';

import FiltersIcon from 'components/icons/FiltersIcon';
import Checkbox from 'components/Checkbox';
import Text from 'components/typography/Text';
import HamburgerIcon from 'components/icons/Hamburger';
import OutsideClick from 'components/directives/outsideClick/OutsideClick';
import TableSettings from './TableSettings';
import { Clickable } from 'components/Button';
import { DIVIDER, BLACK, WHITE } from 'styles/color';
import { TableType } from 'constants/tableType';
import { Z_INDEX_1, Z_INDEX_4 } from 'styles/z-index';

const FiltersContainer = styled.div<{ isOpen: boolean }>`
  width: 100%;
  position: relative;
  height: 100%;
  ${({ isOpen }) => isOpen && `z-index:${Z_INDEX_4}`};
`;

const FiltersListOverlay = styled.div`
  filter: drop-shadow(0 2px 4px ${BLACK}40);
  position: absolute;
  top: -5px;
  left: 0;
`;

const FiltersList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  left: 0;
  min-width: 220px;
  background: white;
  max-height: 495px;
  border-radius: 0px 5px 5px 5px;
`;

const FiltersListItem = styled.div`
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  height: 54px;
  padding: 18px 18px;
  border-bottom: ${DIVIDER} 1px solid;
`;

const FitlersToggle = styled(Clickable)`
  height: 100%;
  width: 35px;
  position: relative;
  z-index: ${Z_INDEX_1};
`;

const FitlersToggleBackground = styled.div`
  height: 40px;
  width: 35px;
  border-radius: 5px 5px 0 0;
  background: ${WHITE};
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  padding-left: 18px;
  justify-content: space-between;
  width: 100%;

  button {
    margin-left: 20px;
  }
`;

const TableFilters: React.FC<{
  data: TableCellData[];
  onFiltersChanged?: (filters: TableCellData[], cell: TableCellData, isEnabling: boolean) => void;
}> = ({ data, onFiltersChanged }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dataState, setDataState] = useState<TableCellData[]>(data);

  if (dataState !== data) {
    setDataState(data);
  }

  let dragFilter: TableCellData;

  const onDrop = (_, cellData) => {
    if (cellData.columnId !== dragFilter.columnId && cellData.canReorder) {
      data.splice(data.indexOf(cellData), 0, data.splice(data.indexOf(dragFilter), 1)[0]);
      requestAnimationFrame(() => {
        if (onFiltersChanged) {
          onFiltersChanged(data, cellData, false);
        }
      });
    }
  };

  return (
    <FiltersContainer isOpen={isOpen}>
      <FitlersToggle onClick={() => setIsOpen(!isOpen)}>
        <FiltersIcon />
      </FitlersToggle>
      {isOpen && (
        <FiltersListOverlay>
          <FitlersToggleBackground />
          <OutsideClick onClick={() => setIsOpen(false)}>
            <FiltersList>
              {dataState.map(
                filterOption =>
                  filterOption.resizable && (
                    <FiltersListItem
                      key={filterOption.columnId}
                      onDrop={e => onDrop(e, filterOption)}
                      onDragOver={e => e.preventDefault()}
                      draggable
                      onDrag={e => (dragFilter = filterOption)}
                    >
                      <Checkbox
                        checked={filterOption.enabled}
                        onChange={() => {
                          filterOption.enabled = !filterOption.enabled;
                          if (onFiltersChanged) {
                            onFiltersChanged(data, filterOption, filterOption.enabled);
                          }
                          setDataState([...data]);
                        }}
                      />
                      <LabelContainer>
                        <Text>
                          {get(
                            TableSettings[TableType.RETAIL_ITEMS_TABLE].find(
                              col => col.columnId === filterOption.columnId
                            ),
                            'content'
                          ) || filterOption.columnId}
                        </Text>
                        <Clickable>
                          <HamburgerIcon />
                        </Clickable>
                      </LabelContainer>
                    </FiltersListItem>
                  )
              )}
            </FiltersList>
          </OutsideClick>
        </FiltersListOverlay>
      )}
    </FiltersContainer>
  );
};

export default TableFilters;
