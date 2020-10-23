import React from 'react';
import styled from 'styled-components';

import Image from 'components/images/Images';
import DefaultVehicleIcon from 'components/icons/DefaultVehicle';
import { BLACK } from 'styles/color';
import { ImageType, ImageSize } from 'constants/imageType';
import { Z_INDEX_1 } from 'styles/z-index';

const clipMaskId = 'imageClipMask';

const ImageOverlay = styled.div`
  z-index: ${Z_INDEX_1};
  top: ${-215 / 2}px; /* centering in container */
  height: 215px;
  position: relative;
  filter: drop-shadow(0 2px 4px ${BLACK}80);
`;

const ImageContainer = styled(Image)`
  width: 100%;
  height: 100%;
  clip-path: url(#${clipMaskId});
  background: white;
  img {
    animation-name: fadeIn;
    animation-duration: 200ms;
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const RetailItemsOverlay: React.FC<{
  url: string;
}> = ({ url, ...props }) => {
  return (
    <div {...props}>
      <ImageOverlay>
        <ImageContainer
          type={ImageType.PHOTO}
          size={ImageSize.DEFAULT}
          src={url}
          fallbackSrc={<DefaultVehicleIcon />}
        />
      </ImageOverlay>
      <svg width={300} height={214}>
        <defs>
          <clipPath id={clipMaskId}>
            <path d="M295 0a5 5 0 015 5v204a5 5 0 01-5 5H21a5 5 0 01-5-5v-86.202L.857 107.657a2 2 0 010-2.829l15.141-15.142L16 5a5 5 0 015-5h274z" />
          </clipPath>
        </defs>
        <use fill="#FFF" fillRule="evenodd" />
      </svg>
    </div>
  );
};

export default RetailItemsOverlay;
