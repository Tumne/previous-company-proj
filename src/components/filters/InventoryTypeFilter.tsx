import React from 'react';
import styled from 'styled-components/macro';

import AllVehicleTypesIcon from 'components/icons/AllVehicleTypes';
import MotorcycleIcon from 'components/icons/Motorcycle';
import VehicleIcon from 'components/icons/Vehicle';
import Button from 'components/Button';
import Label from 'components/typography/Label';
import { BODY_TEXT_TERTIARY, WHITE } from 'styles/color';
import { useSearch } from 'contexts/searchContext';
import { useTranslation } from 'react-i18next';

const VehicleTypeButton = styled(Button)`
  color: ${props => (props.selected ? WHITE : BODY_TEXT_TERTIARY)};
  padding: 0;
`;

const VehicleTypeLayout = styled.div`
  display: grid;
  grid-template:
    '.' 1fr
    'icon' auto
    '.' 1fr
    'label' auto
    '.' 12px / 1fr;
  height: 78px;
  width: 100%;
`;

const VehicleTypeIcon = styled.div`
  grid-area: icon;
  display: flex;
  margin: auto;
`;

const VehicleTypeLabel = styled(Label)`
  grid-area: label;
  color: inherit;
`;

const VehicleTypes = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const ALL = undefined;
const VEHICLE = 'VEHICLE';

const InventoryTypeFilter = filter => {
  const { getSearchParam, setSearchParams } = useSearch();
  const selected = getSearchParam('type');
  const { t } = useTranslation();

  const setInventoryType = type =>
    setSearchParams({
      keyword: getSearchParam('keyword'),
      type,
    });

  return (
    <VehicleTypes>
      <VehicleTypeButton selected={selected === ALL} onClick={() => setInventoryType(ALL)}>
        <VehicleTypeLayout>
          <VehicleTypeIcon>
            <AllVehicleTypesIcon />
          </VehicleTypeIcon>
          <VehicleTypeLabel>{t('common.all')}</VehicleTypeLabel>
        </VehicleTypeLayout>
      </VehicleTypeButton>
      {filter.filter.facets.map(({ id, name }) => (
        <VehicleTypeButton key={id} selected={selected === id} onClick={() => setInventoryType(id)}>
          <VehicleTypeLayout>
            <VehicleTypeIcon>{id === VEHICLE ? <VehicleIcon /> : <MotorcycleIcon />}</VehicleTypeIcon>
            <VehicleTypeLabel>{name}</VehicleTypeLabel>
          </VehicleTypeLayout>
        </VehicleTypeButton>
      ))}
    </VehicleTypes>
  );
};

export default InventoryTypeFilter;
