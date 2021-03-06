import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';
import { LinkButton } from '~/components/Link/styles';
import { small } from '~/styles/variables';

export interface SearchContainerProps {
  showingResults: boolean;
}

export const SearchContainer = styled.div<SearchContainerProps>`
  width: 100%;
  min-height: ${(props) => props.theme.containers.page};
  padding: 32px 32px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @media (min-width: ${small}) {
    padding-top: ${(props) => (props.showingResults ? '32px' : '30vh')};
  }
`;

export const SearchContent = styled.div`
  width: 100%;
  @media (min-width: ${small}) {
    max-width: 1280px;
  }
`;

export const SearchBar = styled.div`
  margin-top: 2rem;

  position: relative;

  ${LinkButton} {
    margin-top: 1rem;
  }

  ${ButtonContainer} {
    margin-top: 1rem;
    width: 100%;
  }
`;
