import { useFormik } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { LoginFormValidationSchema } from '../../utils';
import { ModalForgotPassword } from '../ModalForgotPassword';
import {
  ButtonsContainer,
  LoginFormContainer,
  LoginFormStyled,
  ForgotPassword,
} from './styles';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Title } from '~/components/Title';
import { destroyCookies, useAuthContext } from '~/context/useAuth';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';
import { fadeIn } from '~/utils/animations';
import { isAxiosError } from '~/utils/http';

export function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginFormValidationSchema,
    onSubmit: async (values) => {
      try {
        destroyCookies();
        setIsLoading(true);
        const user = { email: values.email, password: values.password };
        await signIn(user);
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 404) {
          toast.error('Usuário ou senha incorretos');
        } else {
          toast.error(
            'Ocorreu algum erro no servidor, verifique as informações ou tente novamente mais tarde.'
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  function handleRedirectToOnboarding() {
    destroyCookies();
    setIsOnboardingLoading(true);
    router.push('/backoffice/onboarding/contact');
  }

  const minWidth = useMinWidth();

  function handleClickForgotPassword() {
    setIsModalOpen(true);
  }

  return (
    <LoginFormContainer as={motion.div} initial="hidden" animate="animate" variants={fadeIn}>
      <Title
        description="Insira suas informações"
        size={minWidth(Breakpoint.small) ? 'big' : 'medium'}
      />
      <LoginFormStyled onSubmit={formik.handleSubmit}>
        <Input
          label="Email:"
          name="email"
          inputSize="big"
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
          onChange={formik.handleChange}
        />
        <Input
          label="Senha:"
          name="password"
          type="password"
          inputSize="big"
          onChange={formik.handleChange}
          error={
            formik.touched.password && formik.errors.password ? formik.errors.password : ''
          }
        />
        <ForgotPassword type="button" onClick={handleClickForgotPassword}>
          Esqueci minha senha
        </ForgotPassword>
        <ButtonsContainer>
          <Button
            variant="primary"
            description="Login"
            type="submit"
            width="auto"
            isLoading={isLoading}
          />
          <Button
            variant="secondary"
            type="button"
            width="auto"
            description="Cadastre-se"
            isLoading={isOnboardingLoading}
            onClick={handleRedirectToOnboarding}
          />
        </ButtonsContainer>
      </LoginFormStyled>

      <AnimatePresence>
        {isModalOpen && (
          <ModalForgotPassword handleCloseModal={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </LoginFormContainer>
  );
}
