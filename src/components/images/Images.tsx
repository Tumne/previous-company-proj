import React, { useEffect, useState } from 'react';
import styled, { StyledComponentBase } from 'styled-components/macro';

import ImageLoader from 'components/loading/ImageLoader';
import PrimaryText from 'components/typography/PrimaryText';
import { ImageType, ImageSize } from 'constants/imageType';
import { GRAY_LIGHT, GRAY_DARK, BLUE_LIGHT, BODY_TEXT, GREEN, ORANGE, BLUE, WHITE } from 'styles/color';
import { formatInitials } from 'utils/formatUtils';

export const ThumbnailImage = styled.div`
  width: 35px;
  height: 35px;
`;

export const ListItemImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
`;

export const DefaultImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
`;

export const AvatarImage = styled(DefaultImage)`
  padding: 15px;

  img {
    border-radius: 50%;
  }
`;

export const ImageElement = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

export const FallbackIcon = styled.div`
  width: 100%;
  height: 100%;
  background: ${BLUE_LIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${BODY_TEXT};
`;

export const FallbackImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: ${GRAY_LIGHT};
  display: flex;
  justify-content: center;
  color: ${GRAY_DARK};
  svg {
    width: 50%;
  }
`;

const getUserAvatarColor = user => {
  switch (parseInt(user.id, 16) % 4) {
    case 1:
      return GREEN;
    case 2:
      return ORANGE;
    case 3:
      return BLUE;
    default:
      return ORANGE;
  }
};

const Image: React.FC<{
  type?: ImageType;
  size?: ImageSize;
  src?: string;
  fallbackSrc?: any;
  user?: any;
}> = ({ type, size, src, fallbackSrc, user, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  let ImageClass: StyledComponentBase<'div', any, {}, never>;
  let ImageContent: React.ReactElement | StyledComponentBase<'img', any, {}, never>;

  useEffect(() => {
    if (src) {
      const onLoadComplete = () => setIsLoading(false);
      const onError = () => setIsLoading(false);

      const image = document.createElement('img');
      image.addEventListener('load', onLoadComplete);
      image.addEventListener('error', onError);
      image.src = src;
      setIsLoading(!image.complete);

      return () => {
        setIsLoading(false);
        image.removeEventListener('load', onLoadComplete);
        image.removeEventListener('error', onError);
      };
    }
  }, [src]);

  switch (size) {
    case ImageSize.THUMBNAIL:
      ImageClass = ThumbnailImage;
      break;
    case ImageSize.LIST_ITEM:
      ImageClass = ListItemImage;
      break;
    case ImageSize.AVATAR:
      ImageClass = AvatarImage;
      break;
    default:
      ImageClass = DefaultImage;
      break;
  }

  if (src) {
    ImageContent = <ImageElement src={src} />;
  } else {
    switch (type) {
      case ImageType.USER:
        ImageContent = (
          <FallbackIcon
            style={{
              background: getUserAvatarColor(user),
            }}
          >
            <PrimaryText
              css={`
                color: ${WHITE};
              `}
            >
              {formatInitials(user)}
            </PrimaryText>
          </FallbackIcon>
        );
        break;
      case ImageType.ICON:
        ImageContent = <FallbackIcon>{fallbackSrc}</FallbackIcon>;
        break;
      case ImageType.PHOTO:
      default:
        ImageContent = <FallbackImage>{fallbackSrc}</FallbackImage>;
        break;
    }
  }

  return <ImageClass {...props}>{isLoading ? <ImageLoader /> : ImageContent}</ImageClass>;
};

export default Image;
