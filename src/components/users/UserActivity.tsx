import React from 'react';
import SecondaryText from 'components/typography/SecondaryText';
import TextRow from 'components/typography/TextRow';
import PrimaryText from 'components/typography/PrimaryText';
import Image from 'components/images/Images';
import TertiaryText from 'components/typography/TertiaryText';
import { ListItemLayout, ListItemDetails } from 'components/layouts/ListItem';
import { formatFullName } from 'utils/formatUtils';
import { ImageType, ImageSize } from 'constants/imageType';

const UserActivity = ({ user, action, details, created }) => (
  <ListItemLayout>
    <Image type={ImageType.USER} size={ImageSize.LIST_ITEM} user={user} />
    <ListItemDetails>
      <TextRow>
        <PrimaryText>
          {formatFullName(user)} {action}
        </PrimaryText>
        <TertiaryText>&bull; {created}</TertiaryText>
      </TextRow>
      <SecondaryText>{details}</SecondaryText>
    </ListItemDetails>
  </ListItemLayout>
);

export default UserActivity;
