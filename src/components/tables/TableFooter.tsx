import React from 'react';
import styled from 'styled-components/macro';
import { BLUE_LIGHT, DIVIDER } from 'styles/color';
import SecondaryText from 'components/typography/SecondaryText';
import ChevronRightIcon from 'components/icons/ChevronRight';
import { WhiteButton } from 'components/Button';
import { useSearch } from 'contexts/searchContext';
import { Pagination } from 'constants/Pagination';
import { formatNumber } from 'utils/formatUtils';

const Container = styled.div<{ hasPreviousPage?: boolean; hasNextPage?: boolean }>`
  display: grid;
  grid-template: ${({ hasPreviousPage, hasNextPage }) => {
    if (hasPreviousPage && hasNextPage) {
      return `'count . page previous next' auto / auto 1fr auto auto auto;`;
    }
    if (hasPreviousPage) {
      return `'count . page previous' auto / auto 1fr auto auto;`;
    }
    if (hasNextPage) {
      return `'count . page next' auto / auto 1fr auto auto;`;
    }
    return `'count .' auto / auto 1fr;`;
  }};
  background: ${BLUE_LIGHT};
  align-items: center;
  padding: 0 15px;
  grid-gap: 10px;
  border-top: 1px solid ${DIVIDER};
`;

const IconNext = styled(ChevronRightIcon)``;

const IconPrevious = styled(ChevronRightIcon)`
  transform: rotate(180deg);
`;

const TableFooter = ({ pageInfo, onPageChange }) => {
  const { updatePaginationParams } = useSearch();

  if (!pageInfo) {
    return <Container />;
  }

  const { startCursor, endCursor, totalEdges, hasNextPage, hasPreviousPage } = pageInfo;
  const pageSize = Pagination.LIST_LENGTH;

  return (
    <Container hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage}>
      <SecondaryText css="grid-area: count">
        Showing {endCursor === null && startCursor === null ? 0 : endCursor - startCursor + 1} results of{' '}
        {formatNumber(totalEdges)}
      </SecondaryText>
      {(hasPreviousPage || hasNextPage) && (
        <SecondaryText css="grid-area: page; padding: 0 10px;">
          Page {Math.ceil(startCursor / pageSize)} of {formatNumber(Math.ceil(totalEdges / pageSize))}
        </SecondaryText>
      )}
      {hasPreviousPage && (
        <WhiteButton
          css="grid-area: previous"
          onClick={() => {
            updatePaginationParams({ last: pageSize, before: startCursor });
            onPageChange();
          }}
          title="Previous"
        >
          <IconPrevious />
        </WhiteButton>
      )}
      {hasNextPage && (
        <WhiteButton
          css="grid-area: next"
          onClick={() => {
            updatePaginationParams({ first: pageSize, after: endCursor });
            onPageChange();
          }}
          title="Next"
        >
          <IconNext />
        </WhiteButton>
      )}
    </Container>
  );
};
export default TableFooter;
