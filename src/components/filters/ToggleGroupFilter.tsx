import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import Text from 'components/typography/Text';
import Checkbox from 'components/Checkbox';
import ChevronRightIcon from 'components/icons/ChevronRight';
import FalseIcon from 'components/icons/FalseIcon';
import TrueIcon from 'components/icons/TrueIcon';
import { Clickable } from 'components/Button';
import { PrimaryLabel } from 'components/typography/Label';
import { DIVIDER, BLUE } from 'styles/color';
import { useSearch } from 'contexts/searchContext';

export const FlagRow = styled.div`
  display: grid;
  grid-template: 'label yes no' auto / 1fr auto auto;
  grid-gap: 31px;
`;

const Flag = ({ label, value, onChange, ...props }) => {
  return (
    <FlagRow {...props}>
      <Text>{label}</Text>
      <Checkbox
        round
        icon={<TrueIcon />}
        checked={String(value) === 'true'}
        onChange={() => {
          onChange(String(value) === 'true' ? undefined : true);
        }}
      />
      <Checkbox
        round
        icon={<FalseIcon />}
        checked={String(value) === 'false'}
        onChange={() => {
          onChange(String(value) === 'false' ? undefined : false);
        }}
      />
    </FlagRow>
  );
};

const ShowMore = styled(Clickable)`
  color: ${BLUE};
  border-top: 1px solid ${DIVIDER};
  padding: 0;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleGroupFilters = ({ toggles }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getSearchParam, updateSearchParam } = useSearch();
  const { t } = useTranslation();

  return (
    <>
      {toggles.slice(0, 4).map(toggle => (
        <Flag
          key={toggle.id}
          label={toggle.name}
          value={getSearchParam(toggle.id)}
          onChange={value => updateSearchParam(toggle.id, value)}
        />
      ))}
      {isExpanded && (
        <>
          {toggles.slice(4).map(toggle => (
            <Flag
              key={toggle.id}
              label={toggle.name}
              value={getSearchParam(toggle.id)}
              onChange={value => updateSearchParam(toggle.id, value)}
            />
          ))}
        </>
      )}
      <ShowMore onClick={() => setIsExpanded(!isExpanded)}>
        <PrimaryLabel>{t(isExpanded ? 'common.showLess' : 'common.showMore')}</PrimaryLabel>
        <ChevronRightIcon
          css={
            isExpanded ? 'transform: translateX(-3px) rotate(-90deg);' : 'transform: translateX(-3px) rotate(90deg);'
          }
        />
      </ShowMore>
    </>
  );
};
