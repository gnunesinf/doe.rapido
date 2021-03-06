import styled from 'styled-components';

import { CheckboxContainer } from '~/components/Checkbox/styles';

export const FiltersContainer = styled.div`
  margin-top: 1.4rem;
`;

export const FiltersSection = styled.div`
  overflow: auto;
  margin-top: 0.8rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  ${CheckboxContainer} {
    label {
      white-space: nowrap;
    }
  }
`;

export const SliderSection = styled.div`
  margin-top: 8px;
`;

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  .value {
    min-width: 7.2rem;
    margin-left: 8px;
    text-align: center;
    ${(props) => props.theme.typography.body}
    color: ${(props) => props.theme.colors.primary}
  }
`;
