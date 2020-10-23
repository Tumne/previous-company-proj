import React from 'react';
import SMSIcon from 'components/icons/SMS';
import PhoneIcon from 'components/icons/Phone';
import EmailIcon from 'components/icons/Email';
import WalkInIcon from 'components/icons/WalkIn';
import TestDriveIcon from 'components/icons/TestDrive';
import AppointmentIcon from 'components/icons/Appointment';
import Image from 'components/images/Images';
import { ImageSize, ImageType } from 'constants/imageType';

enum RetailItemActivityType {
  SMS = 'SMS',
  PHONE_CALL = 'PHONE_CALL',
  EMAIL = 'EMAIL',
  WALK_IN = 'WALK_IN',
  FACEBOOK_MESSENGER = 'FACEBOOK_MESSENGER',
  TEST_DRIVE = 'TEST_DRIVE',
  APPOINTMENT = 'APPOINTMENT',
}

export const RetailItemActivityIcon = ({ type }) => {
  let fallbackSrc;
  switch (type) {
    case RetailItemActivityType.SMS:
      fallbackSrc = <SMSIcon />;
      break;
    case RetailItemActivityType.PHONE_CALL:
      fallbackSrc = <PhoneIcon />;
      break;
    case RetailItemActivityType.EMAIL:
      fallbackSrc = <EmailIcon />;
      break;
    case RetailItemActivityType.WALK_IN:
      fallbackSrc = <WalkInIcon />;
      break;
    case RetailItemActivityType.FACEBOOK_MESSENGER:
      fallbackSrc = <SMSIcon />;
      break;
    case RetailItemActivityType.TEST_DRIVE:
      fallbackSrc = <TestDriveIcon />;
      break;
    case RetailItemActivityType.APPOINTMENT:
      fallbackSrc = <AppointmentIcon />;
      break;
  }
  return <Image type={ImageType.ICON} size={ImageSize.LIST_ITEM} fallbackSrc={fallbackSrc} />;
};
