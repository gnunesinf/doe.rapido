import { FaExclamationCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { resolve } from 'path';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { login } from '~/features/user';
import { useAppDispatch } from '~/hooks/redux';

import { ButtonsContainer, FormStyled } from '../../styles';
import { LoginFormValidationSchema } from '../../utils';

export function LoginForm() {
  const routes = useRouter();

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginFormValidationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('/login', {
          email: values.email,
          password: values.password,
        });

        dispatch(
          login({
            name: 'nome teste',
            email: values.email,
          })
        );

        routes.push('backoffice');
      } catch (error) {
        console.error(error);
        toast.error(
          'Algum erro ocorreu, verifiique as informações e tente novamente'
        );
      }
    },
  });

  return (
    <FormStyled onSubmit={formik.handleSubmit}>
      <Input
        label="Email:"
        name="email"
        size="big"
        error={
          formik.touched.email && formik.errors.email ? formik.errors.email : ''
        }
        onChange={formik.handleChange}
      />
      <Input
        label="Senha:"
        name="password"
        size="big"
        onChange={formik.handleChange}
        error={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ''
        }
      />
      <ButtonsContainer>
        <Button variant="primary" description="Login" type="submit" />
        <Button variant="secondary" type="submit">
          <Link href="/onboarding">Não possui login? cadastre-se</Link>
        </Button>
      </ButtonsContainer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </FormStyled>
  );
}