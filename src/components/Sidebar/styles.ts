import styled from 'styled-components';

import { LinkButton } from '../Link/styles';

export interface SidebarContainerProps {
  isCollapsed: boolean;
}

export const SidebarVolume = styled.div`
  width: 280px;
  max-width: 280px;
  min-width: 280px;
`;

export const SidebarContainer = styled.nav<SidebarContainerProps>`
  max-width: 280px;
  min-width: 280px;
  width: 280px;

  position: fixed;
  top: 62px;
  bottom: 0;
  left: 0;
  z-index: 2;

  padding: 24px;

  background: ${(props) => props.theme.colors.primary};

  transition: transform 250ms;
  transform: translateX(
    ${(props) => {
      if (props.isCollapsed) {
        return '-100%';
      } else {
        return '0';
      }
    }}
  );
`;

export const LinksSection = styled.div`
  &:not(:first-child) {
    margin-top: 4rem;
  }

  h3 {
    color: #fff;
    font-size: 1.8rem;
  }

  ul {
    margin-top: 1.4rem;
  }

  li,
  ${LinkButton} {
    font-size: 1.6rem;
    color: #fff;

    &:not(:first-child) {
      margin-top: 0.8rem;
    }
  }
`;

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 60%);
  position: fixed;
  z-index: 1;
  top: 62px;
  bottom: 0;
  left: 0;
  right: 0;
`;
