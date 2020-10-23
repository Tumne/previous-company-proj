import React from 'react';
import 'styled-components/macro';
import Badge, { Badges, NegativeBadge, PositiveBadge } from 'components/Badge';
import EmailIcon from 'components/icons/Email';
import UserIcon from 'components/icons/User';
import TestDriveIcon from 'components/icons/TestDrive';
import RetailItem from 'interfaces/retailItem';

const RetailItemBadges: React.FC<{
  retailItem: RetailItem;
}> = ({ retailItem, ...props }) => {
  let statusBadge;
  if (retailItem.status === 'SOLD') {
    statusBadge = <NegativeBadge>Sold</NegativeBadge>;
  } else if (retailItem.status === 'FOR_SALE') {
    statusBadge = <PositiveBadge>For Sale</PositiveBadge>;
  }
  return (
    <Badges {...props}>
      {statusBadge}
      <Badge>
        <EmailIcon height="8px" width="10px" css="margin-right: 1ch;" /> {retailItem.leadsCount}
      </Badge>
      <Badge>
        <UserIcon height="8px" css="margin-right: 1ch;" /> {retailItem.customersCount}
      </Badge>
      <Badge>
        <TestDriveIcon height="8px" css="margin-right: 0.5ch;" /> {retailItem.testDrivesCount}
      </Badge>
    </Badges>
  );
};

export default RetailItemBadges;
