import styled from 'styled-components';
import Text from './typography/Text';
import {
  WHITE,
  BLUE_LIGHT,
  BODY_TEXT,
  BLUE,
  BORDER_BLUE,
  GREEN,
  ORANGE,
  RED,
  GREEN_LIGHT,
  ORANGE_LIGHT,
  RED_LIGHT,
} from 'styles/color';
import { FONT_SIZE_0 } from 'styles/typography';

const Badge = styled(Text)<{ large?: boolean }>`
  border-radius: 3px;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  color: ${BODY_TEXT};
  background: ${BLUE_LIGHT};
  font-size: ${props => (props.large ? FONT_SIZE_0 : '9px')};
  height: ${props => (props.large ? '25px' : '16px')};
  padding: 0 6px;
  min-width: 25px;
  top: 0;
`;

export const PrimaryBadge = styled(Badge)`
  color: ${WHITE};
  background: ${BLUE};
`;

export const PositiveBadge = styled(Badge)`
  color: ${GREEN};
  background: ${GREEN_LIGHT};
`;

export const NegativeBadge = styled(Badge)`
  color: ${RED};
  background: ${RED_LIGHT};
`;

export const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -5px;

  & > * {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

export const ColorPreview = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border: ${({ color }) => (color === 'WHITE' ? `1px solid ${BORDER_BLUE}` : 'none')};
  border-radius: 3px;
  background: ${({ color }) => color && color.toLowerCase()};
  opacity: ${({ color }) => (color ? 1 : 0)};
  flex-shrink: 0;
`;

const getCompletionPercentageColor = props => {
  if (props.value > 0.7) {
    return { foreground: GREEN, background: GREEN_LIGHT };
  } else if (props.value > 0.4) {
    return { foreground: ORANGE, background: ORANGE_LIGHT };
  }
  return { foreground: RED, background: RED_LIGHT };
};

export const CompletionPercentage = styled.div<{ value: number }>`
  height: 8px;
  width: 60px;
  border-radius: 3px;
  background-color: ${props => getCompletionPercentageColor(props).background};
  position: relative;
  margin-top: 5px;
  margin-bottom: 15px;
  display: ${props => (props.value === undefined ? 'none' : 'block')};

  :before {
    content: '';
    height: 8px;
    width: ${props => `${props.value * 100}%`};
    position: absolute;
    border-radius: 3px;
    background-color: ${props => getCompletionPercentageColor(props).foreground};
  }

  :after {
    content: '${props => (props.value ? `${Math.round(props.value * 100)}% done` : '')}';
    width: 100%;
    color: ${BODY_TEXT};
    font-size: 8px;
    letter-spacing: 0.7px;
    line-height: 12px;
    text-align: center;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
  }
`;

export default Badge;
