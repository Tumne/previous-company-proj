import React from 'react';
export const AutoTraderLogo = props => (
  <svg width={18} height={18} {...props}>
    <image
      x={11}
      y={14}
      width={18}
      height={18}
      xlinkHref="data:image/png;base64,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"
      transform="translate(-11 -14)"
      fill="none"
      fillRule="evenodd"
    />
  </svg>
);
