import React from 'react';
import styled from 'styled-components/macro';
import { get } from 'lodash';

import PrimaryText from 'components/typography/PrimaryText';
import SecondaryText from 'components/typography/SecondaryText';
import MonetaryAmount from 'components/typography/MonetaryAmount';
import TextRow from 'components/typography/TextRow';
import RetailItemBadges from 'components/retail/RetailItemBadges';
import Image from 'components/images/Images';
import RetailItem from 'interfaces/retailItem';
import DefaultVehicleIcon from 'components/icons/DefaultVehicle';
import { ImageType } from 'constants/imageType';
import { ORANGE_LIGHTEST } from 'styles/color';
import { CompletionPercentage } from 'components/Badge';
import { joinStrings, convertEnumToString } from 'utils/stringUtils';
import { RetailItemColorPreview } from 'components/retail/RetailItemColorPreview';

const ListItemLayout = styled.div<{ isHighlighted?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 15px;
  position: relative;
  background: ${props => props.isHighlighted && ORANGE_LIGHTEST};
`;

const ListItemDetails = styled.div`
  display: grid;
  grid-gap: 7px;
  grid-auto-rows: min-content;
`;

const formatYMMT = retailItem =>
  retailItem ? joinStrings([retailItem.year, retailItem.make, retailItem.model, retailItem.trim], ' ') : '';

const formatAmount = amount => get(amount, 'formattedAmountRounded', '');
const formatCylinders = cylinders => (cylinders ? `${cylinders}-cyl` : '');
const formatDisplacement = displacement => (displacement ? displacement.formattedAmount : '');
const lowercase = text => (text ? text.toLowerCase() : '');
const formatStockNumber = stockNumber => (stockNumber ? `#${stockNumber}` : '');

export const RetailListItem: React.FC<{
  item: RetailItem;
  metadata: any;
}> = ({ item: retailItem, metadata, ...props }) => {
  const exteriorColor = get(retailItem, 'attributes.exteriorColor');
  const mileage = get(retailItem, 'attributes.mileage.formattedAmount');
  const ymmt = formatYMMT(retailItem);
  const details = joinStrings([
    lowercase(exteriorColor),
    lowercase(retailItem.attributes.transmission),
    formatDisplacement(retailItem.attributes.displacement),
    formatCylinders(retailItem.attributes.cylinders),
    convertEnumToString(retailItem.attributes.fuelType),
  ]);
  const vinAndStockNumber = joinStrings([retailItem.vin, formatStockNumber(retailItem.stockNumber)], ' ');
  return (
    <ListItemLayout {...props}>
      <section>
        <Image
          src={get(retailItem, 'primaryPhoto.listPhoto')}
          type={ImageType.PHOTO}
          fallbackSrc={<DefaultVehicleIcon />}
        />
        <CompletionPercentage value={retailItem.completePercent} />
      </section>
      <ListItemDetails>
        <PrimaryText title={ymmt}>{ymmt}</PrimaryText>
        {(retailItem.listPrice || mileage) && (
          <TextRow>
            <MonetaryAmount as="span">{formatAmount(retailItem.listPrice)}</MonetaryAmount>
            {retailItem.listPrice && mileage && <SecondaryText>&bull;</SecondaryText>}
            <SecondaryText>{mileage}</SecondaryText>
          </TextRow>
        )}
        {details && (
          <TextRow>
            {exteriorColor && (
              <RetailItemColorPreview color={exteriorColor} metadata={metadata} css="transform: translateY(-1px)" />
            )}
            <SecondaryText css="text-transform: capitalize;" title={details}>
              {details}
            </SecondaryText>
          </TextRow>
        )}
        <SecondaryText title={vinAndStockNumber}>{vinAndStockNumber}</SecondaryText>
        <RetailItemBadges retailItem={retailItem} css="margin-top: 6px;" />
      </ListItemDetails>
    </ListItemLayout>
  );
};
