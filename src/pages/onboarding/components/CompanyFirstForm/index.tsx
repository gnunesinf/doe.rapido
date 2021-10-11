import { useFormik } from 'formik';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';
import { Title } from '~/components/Title';
import { getAddressByCep } from '~/services/cep';

import { STATE_LISTS } from '../../constants';
import { useOnboardingSteps } from '../../hooks/useOnboardingSteps';
import { CompanyFirstFormValidationSchema } from '../../utils';
import {
  ButtonsContainer,
  CompanyFirstFormContainer,
  CompanyFirstFormStyled,
  InputRow,
} from './styles';

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  [key: string]: string;
}

export function CompanyFirstForm() {
  const { goToNextStep } = useOnboardingSteps();

  const formik = useFormik({
    initialValues: {
      tradingName: '',
      name: '',
      cnpj: '',
      cep: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
    },
    onSubmit: () => {
      goToNextStep()
    },
    validationSchema: CompanyFirstFormValidationSchema,
  });

  async function handleBlurCep() {
    if (formik.values.cep.length < 8) {
      return;
    }

    try {
      const cepData = await getAddressByCep(formik.values.cep);

      if (cepData) {
        const address: Address = cepData.data;

        if (address) {
          formik.setFieldValue('street', address?.logradouro);
          formik.setFieldValue('district', address?.bairro);
          formik.setFieldValue('city', address?.localidade);
          formik.setFieldValue('state', address?.uf);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CompanyFirstFormContainer>
      <Title description="Cadastro de instituição" size="big" />
      <CompanyFirstFormStyled onSubmit={formik.handleSubmit}>
        <Input
          name="tradingName"
          inputSize="big"
          onChange={formik.handleChange}
          label="Nome da empresa:"
          value={formik.values.tradingName}
          error={
            formik.touched.tradingName && formik.errors.tradingName
              ? formik.errors.tradingName
              : ''
          }
        />
        <InputRow>
          <Input
            name="name"
            inputSize="big"
            onChange={formik.handleChange}
            label="Razão social:"
            value={formik.values.name}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ''
            }
          />
          <Input
            name="cnpj"
            inputSize="big"
            onChange={formik.handleChange}
            label="Cnpj:"
            value={formik.values.cnpj}
            mask="99.999.999/9999-99"
            error={
              formik.touched.cnpj && formik.errors.cnpj
                ? formik.errors.cnpj
                : ''
            }
          />
        </InputRow>
        <InputRow>
          <Input
            name="cep"
            inputSize="big"
            onChange={formik.handleChange}
            onBlur={handleBlurCep}
            label="CEP:"
            mask="99999-999"
            value={formik.values.cep}
            error={
              formik.touched.cep && formik.errors.cep ? formik.errors.cep : ''
            }
          />
          <Input
            name="street"
            inputSize="big"
            onChange={formik.handleChange}
            label="Rua:"
            value={formik.values.street}
            error={
              formik.touched.street && formik.errors.street
                ? formik.errors.street
                : ''
            }
          />
        </InputRow>
        <InputRow>
          <Input
            name="number"
            inputSize="big"
            onChange={formik.handleChange}
            label="Número:"
            value={formik.values.number}
            error={
              formik.touched.number && formik.errors.number
                ? formik.errors.number
                : ''
            }
          />
          <Input
            name="district"
            inputSize="big"
            onChange={formik.handleChange}
            label="Bairro:"
            value={formik.values.district}
            error={
              formik.touched.district && formik.errors.district
                ? formik.errors.district
                : ''
            }
          />
        </InputRow>
        <InputRow>
          <Input
            name="city"
            inputSize="big"
            onChange={formik.handleChange}
            label="Cidade:"
            value={formik.values.city}
            error={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : ''
            }
          />
          <Select
            name="state"
            label="Estado:"
            size="big"
            options={STATE_LISTS}
            value={formik.values.state}
            setValue={formik.setFieldValue}
            hasError={
              formik.touched.state && formik.errors.state
                ? formik.errors.state
                : ''
            }
          />
        </InputRow>
        <ButtonsContainer>
          <Button
            variant="primary"
            description="Salvar informações"
            type="submit"
          ></Button>
        </ButtonsContainer>
      </CompanyFirstFormStyled>
    </CompanyFirstFormContainer>
  );
}
