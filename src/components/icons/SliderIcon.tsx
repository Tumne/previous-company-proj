import React from 'react';

const SliderIcon: React.FC<{}> = props => (
  <svg width={13} height={28} {...props}>
    <g fill="none">
      <path fill="#E3ECF2" d="M6 0h1v28H6z" />
      <rect stroke="#E3ECF2" fill="#FFF" x={0.5} y={8.5} width={12} height={11} rx={2} />
      <path
        d="M10.266 13.988a.333.333 0 00-.092-.22l-1.6-1.666a.334.334 0 10-.48.463L9.47 14l-1.377 1.435a.334.334 0 10.481.463l1.6-1.667a.333.333 0 00.092-.243zM3 13.988a.333.333 0 01.092-.22l1.6-1.666a.334.334 0 11.48.463L3.797 14l1.377 1.435a.334.334 0 11-.481.463l-1.6-1.667A.333.333 0 013 13.988z"
        fill="#E3ECF2"
      />
    </g>
  </svg>
);

export default SliderIcon;
