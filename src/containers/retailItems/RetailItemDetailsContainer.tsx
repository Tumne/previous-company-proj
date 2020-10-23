import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import 'styled-components/macro';

import Label from 'components/typography/Label';
import Loader from 'components/loading/Loader';
import { QUERY } from './RetailItemDetailsContainerQuery';
import { EntityContainer, Column } from 'components/layouts/EntityLayout';
import { Section } from 'components/layouts/Section';
import { formatYMMT } from 'utils/formatUtils';
import { Tab, Tabs } from 'components/navigation/Tabs';
import { DIVIDER } from 'styles/color';
import { RetailItemActivityTab } from 'components/retail/RetailItemActivityTab';
// import { RetailItemDetailsTab } from './RetailItemDetailsTab';
// import { RetailItemPhotosTab } from './RetailItemPhotosTab';

enum TABS {
  ACTIVITY,
  DETAILS,
  PHOTOS,
}

export const RetailItemDetailsContainer = ({ retailItemId, ...props }) => {
  const [tab, setTab] = useState(TABS.ACTIVITY);
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      id: retailItemId,
    },
  });

  if (loading) {
    return (
      <EntityContainer>
        <Loader css={'background: transparent;'} />
      </EntityContainer>
    );
  }

  if (error) {
    throw error;
  }

  const retailItem = data.retailItem;

  return (
    <EntityContainer>
      <Column>
        <Section>
          <Label>{formatYMMT(retailItem)}</Label>
        </Section>
        <Tabs
          css={`
            border-bottom: 1px solid ${DIVIDER};
          `}
        >
          <Tab selected={tab === TABS.ACTIVITY} onClick={() => setTab(TABS.ACTIVITY)}>
            <Label>Activity</Label>
          </Tab>
          <Tab selected={tab === TABS.DETAILS} onClick={() => setTab(TABS.DETAILS)}>
            <Label>Details</Label>
          </Tab>
          <Tab selected={tab === TABS.PHOTOS} onClick={() => setTab(TABS.PHOTOS)}>
            <Label>Photos</Label>
          </Tab>
        </Tabs>

        {tab === TABS.ACTIVITY && <RetailItemActivityTab retailItem={retailItem} />}
        {/* {tab === TABS.DETAILS && <RetailItemDetailsTab retailItem={retailItem} />}
      {tab === TABS.PHOTOS && <RetailItemPhotosTab retailItem={retailItem} />} */}
      </Column>
    </EntityContainer>
  );
};
