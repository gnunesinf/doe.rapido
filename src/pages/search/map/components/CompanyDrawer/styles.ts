import styled from 'styled-components';

export const CompanyDrawerContainer = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 480px;

  background: ${(props) => props.theme.colors.background};

  z-index: 2;

  position: fixed;
  top: 0;
  left: 0;
`;

export const Header = styled.header`
  height: 60px;
  width: 100%;

  background: ${(props) => props.theme.colors.primary};

  display: flex;
  align-items: center;

  padding: 0 2rem;
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);

  z-index: 1;

  position: fixed;
  top: 0;
  left: 0;
`;

export const CompanyInfoContainer = styled.div`
  padding: 3rem;

  .address {
    margin-top: 1rem;
  }

  .distance {
    margin-top: 2rem;
  }

  .needs {
    margin-top: 2rem;
  }

  ul {
    margin-top: 0.6rem;
  }

  li {
    margin-left: 2rem;
    list-style-type: disc;
    font-size: 1.8rem;

    &:not(:last-child) {
      margin-bottom: 0.4rem;
    }
  }

  strong {
    font-size: 2rem;
  }
  p {
    font-size: 1.8rem;
  }
`;