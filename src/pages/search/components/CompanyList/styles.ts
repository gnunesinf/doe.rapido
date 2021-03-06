import styled from 'styled-components';

import { small } from '~/styles/variables';

export const CompanyListContainer = styled.div`
  margin-top: 3rem;

  li {
    margin-top: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    > div {
      max-width: 80%;
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.colors.primary};
    }

    strong {
      display: block;
      font-size: 1.8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      font-size: 1.6rem;
      margin-top: 0.4rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    span {
      display: block;
      font-weight: bold;
      font-size: 1.6rem;
      margin-top: 1rem;
      margin-bottom: 1.4rem;
    }
  }
`;

export const ItemInfo = styled.div`
  max-width: 100%;
  @media (min-width: ${small}) {
    max-width: calc(100% - 216px);
  }
`;

export const SkeletonContainer = styled.div`
  margin-top: 3rem;

  .header {
    margin-bottom: 1.6rem;
  }
  .results {
    .react-loading-skeleton {
      margin-bottom: 1rem;
    }
  }
`;

export const ButtonMap = styled.button`
  background: ${(props) => props.theme.colors.primary};
  height: 100%;
  padding: 1rem;
`;
