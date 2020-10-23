import React from 'react';
import styled from 'styled-components';

import ArrowLeftIcon from 'components/icons/ArrowLeft';
import ChevronRightIcon from 'components/icons/ChevronRight';

import PrimaryText from 'components/typography/PrimaryText';
import history from 'store/history';
import { WrapLink } from 'components/navigation/WrapLink';
import { Clickable } from 'components/Button';
import { useBreadCrumbs } from 'contexts/breadcrumbsContext';

import { BLUE, BODY_TEXT_TERTIARY, DIVIDER } from 'styles/color';

const Container = styled.li`
  display: grid;
  grid-template-columns: 61px auto;
`;

const BackButton = styled(Clickable)`
  position: relative;
  display: flex;
  justify-content: center;

  :after {
    content: '';
    position: absolute;
    top: 15px;
    right: 0;
    width: 1px;
    bottom: 15px;
    background: ${DIVIDER};
  }

  :disabled {
    cursor: default;
    color: ${BODY_TEXT_TERTIARY};
  }
`;

const BreadcrumbsContainer = styled.div`
  display: flex;
  padding: 0 24px;

  > :not(:last-child) {
    margin-right: 24px;
  }
`;

const NavLinkItem = styled(WrapLink)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;

  :after {
    content: '';
    position: absolute;
    top: 38px;
    left: 0;
    right: 0;
    height: 1px;
    background: ${BLUE};
  }
`;

const LinkPath = styled(PrimaryText)`
  color: ${BLUE};
`;

const CurrentPath = styled(PrimaryText)`
  display: flex;
  align-items: center;
`;

const ChevronIcon = styled(ChevronRightIcon)`
  height: 60px;
  width: 5px;
`;

const Breadcrumbs = () => {
  const { breadcrumbs, removeLastBreadcrumb } = useBreadCrumbs();

  return (
    <Container>
      <BackButton
        onClick={() => {
          removeLastBreadcrumb();
          const pathname = breadcrumbs.length ? breadcrumbs[breadcrumbs.length - 1].url : '/';
          history.replace(pathname);
        }}
      >
        <ArrowLeftIcon />
      </BackButton>
      <BreadcrumbsContainer>
        {breadcrumbs.map(({ name, url }, index: number) =>
          index < breadcrumbs.length - 1 ? (
            <React.Fragment key={name}>
              <NavLinkItem to={url} onClick={() => removeLastBreadcrumb()}>
                <LinkPath>{name}</LinkPath>
              </NavLinkItem>
              <ChevronIcon />
            </React.Fragment>
          ) : (
            <CurrentPath key={name}>{name}</CurrentPath>
          )
        )}
      </BreadcrumbsContainer>
    </Container>
  );
};

export default Breadcrumbs;
