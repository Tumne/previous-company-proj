import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import NotificationsIcon from 'components/icons/Notifications';
import SettingsIcon from 'components/icons/Settings';
import SecondaryText from 'components/typography/SecondaryText';
import Image from 'components/images/Images';
import { ImageSize } from 'constants/imageType';
import { BODY_TEXT, WHITE } from 'styles/color';

const UserContainer = styled.li`
  display: grid;
  grid-template-columns: 55px 55px auto auto;
`;

const NavLinkItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: ${WHITE};
  color: ${BODY_TEXT};
`;

const MenuItem = styled.div`
  display: grid;
  align-items: center;
  height: 100%;
`;

const NameText = styled(SecondaryText)`
  padding: 13px;
`;

const UserMenu: React.FC<{
  name: string;
  url: string;
}> = ({ name, url }) => {
  return (
    <UserContainer>
      <MenuItem>
        <NavLinkItem to="/notifications" title="Notifications">
          <NotificationsIcon />
        </NavLinkItem>
      </MenuItem>
      <MenuItem>
        <NavLinkItem to="/settings" title="Conversations">
          <SettingsIcon />
        </NavLinkItem>
      </MenuItem>
      <MenuItem>
        <NameText>{name}</NameText>
      </MenuItem>
      <MenuItem>
        <Image size={ImageSize.AVATAR} src={url} />
      </MenuItem>
    </UserContainer>
  );
};

export default UserMenu;
