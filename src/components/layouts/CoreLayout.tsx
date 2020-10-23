import React from 'react';
import styled from 'styled-components/macro';
import GlobalNav from 'components/navigation/GlobalNav';
import UtilityNav from 'components/navigation/UtilityNav';
import { withBreadcrumbs } from 'contexts/breadcrumbsContext';

export const CoreLayoutContainer = styled.div`
  display: grid;
  grid-template:
    'GlobalNav UtilityNav ' 60px
    'GlobalNav Component' 1fr
    / 60px 1fr;
  height: 100vh;
`;

const CoreLayout: React.FC<{
  component: any;
}> = ({ component: Component, ...props }) => {
  return (
    <CoreLayoutContainer>
      <GlobalNav css="grid-area: GlobalNav" />
      <UtilityNav css="grid-area: UtilityNav" />
      <Component {...props} />
    </CoreLayoutContainer>
  );
};

export default withBreadcrumbs(CoreLayout);
