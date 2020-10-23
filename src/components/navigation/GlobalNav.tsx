import React from 'react';
import styled from 'styled-components';

import AppointmentsIcon from 'components/icons/Appointments';
import ConversationsIcon from 'components/icons/Conversations';
import CustomersIcon from 'components/icons/Customers';
import HomeIcon from 'components/icons/Home';
import InventoryIcon from 'components/icons/Inventory';
import LeadsIcon from 'components/icons/Leads';
import TasksIcon from 'components/icons/Tasks';
import TiledViewIcon from 'components/icons/TiledView';
import { Clickable } from 'components/Button';
import { WrapLink } from './WrapLink';
import { BODY_TEXT, GLOBAL_NAV_BACKGROUND, GLOBAL_NAV_ITEM_BACKGROUND_ACTIVE, WHITE, BLUE } from 'styles/color';

const GlobalNavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${GLOBAL_NAV_BACKGROUND};
`;

const NavContainer = styled.div``;

const NavLinkItem = styled(WrapLink)`
  height: 40px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${BODY_TEXT};

  &.active {
    background: ${GLOBAL_NAV_ITEM_BACKGROUND_ACTIVE};
    border-radius: 4px;
    color: ${WHITE};
  }
`;

const TopNavLinkItem = styled(WrapLink)`
  background: ${BLUE};
  color: ${WHITE};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TiledViewContainer = styled(Clickable)`
  padding: 22px;
  color: ${WHITE};
`;

const GlobalNav = props => (
  <GlobalNavContainer {...props}>
    <NavContainer>
      <TopNavLinkItem to="/" title="Home">
        <HomeIcon />
      </TopNavLinkItem>
      <NavLinkItem to="/appointments" title="Appointments">
        <AppointmentsIcon />
      </NavLinkItem>
      <NavLinkItem to="/conversations" title="Conversations">
        <ConversationsIcon />
      </NavLinkItem>
      <NavLinkItem to="/leads" title="Leads">
        <LeadsIcon />
      </NavLinkItem>
      <NavLinkItem to="/tasks" title="Tasks">
        <TasksIcon />
      </NavLinkItem>
      <NavLinkItem to="/retail" title="Inventory">
        <InventoryIcon />
      </NavLinkItem>
      <NavLinkItem to="/customers" title="Customers">
        <CustomersIcon />
      </NavLinkItem>
    </NavContainer>
    <TiledViewContainer>
      <TiledViewIcon />
    </TiledViewContainer>
  </GlobalNavContainer>
);

export default GlobalNav;
