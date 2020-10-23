import React from 'react';
import styled from 'styled-components';

import Breadcrumbs from 'components/menus/Breadcrumbs';
import UserMenu from 'components/menus/UserMenu';
import { BODY_TEXT } from 'styles/color';

const UtilityNavContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  height: 60px;
  list-style: none;
  padding: 0;
  margin: 0;
  color: ${BODY_TEXT};
`;

const UtilityNav = props => (
  <UtilityNavContainer {...props}>
    <Breadcrumbs />
    <UserMenu
      name="Herbert Sanders"
      url="https://d1eghm2is7vk2h.cloudfront.net/w_100,h_100,c_f,v1/eblock/H7QOWNVFUZBS5HSYTZRG4ONGXI.jpg"
    />
  </UtilityNavContainer>
);
export default UtilityNav;
