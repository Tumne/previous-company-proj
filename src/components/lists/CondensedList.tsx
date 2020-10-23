import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/macro';

import Loader from 'components/loading/Loader';
import NoResultsPlaceholder from 'components/placeholders/NoResultsPlaceholder';
import { DIVIDER } from 'styles/color';
import { WrapLink } from 'components/navigation/WrapLink';

const CondensedListContainer = styled.div`
  position: relative;
`;

const CondensedList: React.FC<{
  items: { id: string }[];
  getItemUrl: (id: string) => string;
  renderItem: (item) => React.ReactNode;
  selectedItemId?: string;
  isLoading: boolean;
}> = ({ items, getItemUrl, renderItem, selectedItemId = '', isLoading, ...props }) => {
  useLayoutEffect(() => {
    const element = document.getElementById(selectedItemId);
    if (element) {
      element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }, [selectedItemId]);

  if (!isLoading && !items.length) {
    return <NoResultsPlaceholder />;
  }

  return (
    <CondensedListContainer {...props}>
      {items.map(item => (
        <WrapLink
          key={item.id}
          id={item.id}
          to={getItemUrl(item.id)}
          css={`
            padding: 18px 15px;
            border-bottom: 1px solid ${DIVIDER};
          `}
        >
          {renderItem(item)}
        </WrapLink>
      ))}
      {isLoading && <Loader />}
    </CondensedListContainer>
  );
};

export default CondensedList;
