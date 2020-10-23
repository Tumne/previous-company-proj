import React from 'react';
import styled from 'styled-components/macro';
import SecondaryText from 'components/typography/SecondaryText';
import TextRow from 'components/typography/TextRow';
import PrimaryText from 'components/typography/PrimaryText';
import TertiaryText from 'components/typography/TertiaryText';
import UserActivity from 'components/users/UserActivity';
import { ListItemLayout, ListItemDetails } from 'components/layouts/ListItem';
import { convertEnumToString } from 'utils/stringUtils';
import { BLUE_LIGHT } from 'styles/color';
import { RetailItemActivityIcon } from './RetailItemActivityIcon';

const ActivityDivider = styled.div`
  height: 11px;
  width: 2px;
  margin: 4px 20px;
  background: ${BLUE_LIGHT};
`;

const RetailItemActivityItem = ({ type, details, created }) => (
  <ListItemLayout>
    <RetailItemActivityIcon type={type} />
    <ListItemDetails>
      <TextRow>
        <PrimaryText css="text-transform: capitalize;">{convertEnumToString(type)}</PrimaryText>
        <TertiaryText>&bull; {created}</TertiaryText>
      </TextRow>
      <SecondaryText>{details}</SecondaryText>
    </ListItemDetails>
  </ListItemLayout>
);

const RetailItemActivity = ({ retailItem }) => (
  <>
    <RetailItemActivityItem type="PHONE_CALL" details="Received call regarding this vehicle" created="Mar 4, 1:09 pm" />
    <ActivityDivider />
    <RetailItemActivityItem
      type="TEST_DRIVE"
      details={`Cory Holloway test drove this vehicle`}
      created="Mar 3, 10:25 am"
    />
    <ActivityDivider />
    <RetailItemActivityItem
      type="APPOINTMENT"
      details={`Cory Holloway requested a Test Drive`}
      created="Mar 2, 1:05 pm"
    />
    <ActivityDivider />
    <UserActivity
      user={{ firstName: 'Cory', lastName: 'Holloway' }}
      action="interested"
      details="A customer is interested in this vehicle"
      created="Mar 2, 9:30 am"
    />
    <ActivityDivider />
    <RetailItemActivityItem
      type="PHONE_CALL"
      details="Received call regarding this vehicle"
      created="Mar 1, 10:05 am"
    />
  </>
);

export default RetailItemActivity;
