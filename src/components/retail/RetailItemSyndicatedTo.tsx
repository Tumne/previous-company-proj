import React from 'react';
import { ListItemLayout, ListItemIcon, ListItemDetails } from 'components/layouts/ListItem';
import PrimaryText from 'components/typography/PrimaryText';
import SecondaryText from 'components/typography/SecondaryText';
import { ClickableSectionIcon } from 'components/layouts/Section';
import { AutoTraderLogo } from 'components/icons/logos/AutoTrader';
import { KijijiLogo } from 'components/icons/logos/Kijiji';

const SyndicatedTo = ({ icon, name, lastSent }) => (
  <ListItemLayout>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemDetails>
      <PrimaryText>{name}</PrimaryText>
      <SecondaryText>Last sent {lastSent}</SecondaryText>
      <ClickableSectionIcon />
    </ListItemDetails>
  </ListItemLayout>
);

const VehicleSyndicatedTo = () => (
  <>
    <SyndicatedTo icon="W" name="Wheels.ca" lastSent="March 2, 2019" />
    <SyndicatedTo icon={<AutoTraderLogo />} name="AutoTrader.ca" lastSent="March 5, 2019" />
    <SyndicatedTo icon={<KijijiLogo />} name="Kijiji" lastSent="Feb 26, 2019" />
  </>
);

export default VehicleSyndicatedTo;
