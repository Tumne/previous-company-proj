import React from 'react';
import { ColorPreview } from 'components/Badge';
import { get } from 'lodash';

export const RetailItemColorPreview: React.FC<{
  color: string;
  metadata: any;
}> = ({ color, metadata }) => {
  const colorMetadata = get(metadata, 'inventoryItem.vehicleAttributes.exteriorColor', []).find(
    ({ id }) => id === color
  );
  return <ColorPreview color={get(colorMetadata, 'info', 'transparent')} />;
};
