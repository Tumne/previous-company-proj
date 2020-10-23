import React from 'react';
import 'styled-components/macro';
import get from 'lodash.get';

// import Appointment from 'components/appointment/Appointment';
// import Customer from 'components/customer/Customer';
// import CustomerBadges from 'components/customer/CustomerBadges';
import Panel, { Panels } from 'components/navigation/Panel';
import { Section } from 'components/layouts/Section';
import RetailItemActivity from './RetailItemActivity';
import RetailItemSyndicatedTo from './RetailItemSyndicatedTo';
import { WrapLink } from 'components/navigation/WrapLink';
import { TertiaryLabel } from 'components/typography/Label';

const RetailItemActivityPanels = ({ retailItem }) => (
  <Section>
    <Panels>
      <Panel to="#" counter={retailItem.customersCount} label="Customers" />
      <Panel to="#" counter={retailItem.phoneCallsCount} label="Phone Calls" />
      <Panel to="#" counter={retailItem.conversationsCount} label="Conversations" />
      <Panel to="#" counter={retailItem.testDrivesCount} label="Test Drives" />
    </Panels>
  </Section>
);

const RetailItemAppointments = ({ retailItem }) => (
  <Section>
    <TertiaryLabel>Upcoming Appointment</TertiaryLabel>
    {/* <ComplicatedGridList items={retailItem.appointments} Component={Appointment} /> */}
  </Section>
);

export const RetailItemActivityTab = ({ retailItem }) => {
  return (
    <div>
      <RetailItemActivityPanels retailItem={retailItem} />
      <RetailItemAppointments retailItem={retailItem} />
      <Section>
        <TertiaryLabel>Interested customers</TertiaryLabel>
        {get(retailItem, 'customers', []).map(customer => (
          <WrapLink key={customer.id} to={`/retail/${retailItem.id}/customers/${customer.id}`}>
            {/* <Customer withStatus customer={customer}>
              <CustomerBadges customer={customer} />
              <ClickableSectionIcon />
            </Customer> */}
            {customer.id}
          </WrapLink>
        ))}
      </Section>
      <Section>
        <TertiaryLabel>Syndicated to</TertiaryLabel>
        <RetailItemSyndicatedTo />
      </Section>
      <Section>
        <TertiaryLabel>Activity</TertiaryLabel>
        <div>
          <RetailItemActivity retailItem={retailItem} />
        </div>
      </Section>
    </div>
  );
};
