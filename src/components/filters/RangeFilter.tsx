import React from 'react';
import styled from 'styled-components';
import Range from 'components/Range';
import IntRange from 'interfaces/range';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
`;

const mockedRange = { gte: 0, lte: 1 };

const RangeFilter: React.FC<{
  filter: any;
  selectedRange: IntRange;
  setSelectedRange: (range: IntRange) => void;
  updateSearchParam: (name: string, value: any) => void;
}> = ({ filter: { id, range: actualRange, increment }, selectedRange, setSelectedRange, updateSearchParam }) => {
  const range = actualRange ? actualRange : mockedRange;
  return (
    <Container>
      <Range
        value={[
          selectedRange.gte !== null && selectedRange.gte !== undefined ? selectedRange.gte : range.gte,
          selectedRange.lte !== null && selectedRange.lte !== undefined ? selectedRange.lte : range.lte,
        ]}
        min={range.gte}
        max={range.lte}
        step={increment}
        onChange={([gte, lte]) => {
          setSelectedRange({ gte, lte });
        }}
        onAfterChange={([gte, lte]) => {
          const hasResetRange = range.gte === parseInt(gte) && range.lte === parseInt(lte);
          updateSearchParam(id, hasResetRange ? undefined : { gte, lte });
        }}
      />
    </Container>
  );
};
export default RangeFilter;
