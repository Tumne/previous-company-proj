import React from 'react';

const FiltersIcon: React.FC<{}> = props => (
  <svg width={15} height={16} {...props}>
    <path
      d="M6.167 3.333c.643 0 1.166.524 1.166 1.167v10.333c0 .644-.523 1.167-1.166 1.167h-2.5l-.011-.001-2.49.001A1.168 1.168 0 010 14.833V4.5c0-.643.523-1.167 1.167-1.167H6.166zm7.333 0c.643 0 1.167.524 1.167 1.167v10.333c0 .644-.524 1.167-1.167 1.167h-1.667a1.168 1.168 0 01-1.166-1.167V4.5c0-.643.523-1.167 1.166-1.167H13.5zm.166 6.833h-2v4.667c0 .092.075.167.167.167H13.5a.167.167 0 00.167-.167l-.001-4.667zm-10.5 0H1v4.667c0 .092.075.167.167.167l1.999-.001v-4.833zm3.167 0H4.166v4.833l2 .001a.167.167 0 00.167-.167v-4.667zM3.166 4.333h-2A.167.167 0 001 4.5v4.666h2.166V4.333zm10.334 0h-1.667a.167.167 0 00-.166.167l-.001 4.666h2V4.5a.167.167 0 00-.166-.167zm-7.333 0H4.166v4.833h2.167V4.5a.167.167 0 00-.166-.167zM11.5 0a.5.5 0 01.341.865L9.341 3.2a.497.497 0 01-.682 0L6.159.865A.5.5 0 016.5 0h5zm-1.269 1H7.77L9 2.15 10.231 1z"
      fill="#48A0DC"
    />
  </svg>
);

export default FiltersIcon;
