import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Z_INDEX_1 } from 'styles/z-index';

export const WrapLink = styled(NavLink)`
  text-decoration: none;
  display: block;
  cursor: pointer;

  :focus {
    z-index: ${Z_INDEX_1};
    transform: translateZ(1px);
    outline: none;
    /* box-shadow: 0 0 0 0.2rem {BLUE}88; */ /* bring back for better keyboard navigation */
  }
`;
