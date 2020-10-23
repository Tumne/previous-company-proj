import React from 'react';
import styled from 'styled-components/macro';

import Button from 'components/Button';
import Text from 'components/typography/Text';
import PrimaryText from 'components/typography/PrimaryText';
import { BLUE, WHITE } from 'styles/color';
import { SPACE_12, SPACE_16, SPACE_32 } from 'styles/spacing';
import { FONT_SIZE_0, FONT_SIZE_4, FONT_WEIGHT_BOLD } from 'styles/typography';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background: ${WHITE};
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-top: 180px;
`;

const Icon = styled.div`
  margin-bottom: ${SPACE_12};
`;

const Title = styled(PrimaryText)`
  font-size: ${FONT_SIZE_4};
  margin-bottom: 12px;
`;

const ActionButton = styled(Button)`
  color: ${WHITE};
  background: ${BLUE};
  padding: ${SPACE_16} ${SPACE_32};
  text-transform: uppercase;
  letter-spacing: 1px;

  div {
    font-weight: ${FONT_WEIGHT_BOLD};
    font-size: ${FONT_SIZE_0};
  }
`;

interface PlaceholderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonText: string;
  onClick: Function;
}

const Placeholder: React.FC<PlaceholderProps> = ({ icon, title, subtitle, buttonText, onClick }) => (
  <Container>
    <Icon>{icon}</Icon>
    <Title>{title}</Title>
    <Text
      css={`
        margin-bottom: ${SPACE_32};
      `}
    >
      {subtitle}
    </Text>
    <ActionButton onClick={onClick}>{buttonText}</ActionButton>
  </Container>
);

export default Placeholder;
