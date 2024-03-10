import styles from './styles.module.css';
import { Button, TextInput } from '@gravity-ui/uikit';
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';
import { useNavigate } from 'react-router-dom';
import { useFormLogic } from '../../hooks/useFormLogic';
import { useActions } from '../../hooks/actions';
import { useLoginMutation } from '../../store/amCrm/amCrm.api';

import { TEXTS } from '../../utils/constants';
import { ILoginForm } from '../../types/types';

interface ErrorData {
  data: {
    non_field_errors: string[];
  };
}

function isErrorWithData(error: unknown): error is ErrorData {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in (error as ErrorData) &&
    Array.isArray((error as ErrorData).data.non_field_errors)
  );
}

export const LoginForm = () => {
  const { setLoggedIn } = useActions();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogic();

  const onSubmit = async (data: ILoginForm) => {
    try {
      const res = await login(data).unwrap();
      if (res.auth_token) {
        localStorage.setItem('authToken', res.auth_token);
        setLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      if (isErrorWithData(error)) {
        toaster.add({
          name: 'login-error',
          title: 'Произошла ошибка',
          content: error.data.non_field_errors[0],
          actions: [
            {
              label: 'ОК',
              removeAfterClick: true,
              onClick: () => {},
            },
          ],
        });
      } else {
        toaster.add({
          name: 'login-error',
          title: 'Произошла ошибка',
          content: 'Произошла неизвестная ошибка',
          actions: [
            {
              label: 'ОК',
              removeAfterClick: true,
              onClick: () => {},
            },
          ],
        });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {(errors.email || errors.password) && (
        <p className={styles.error}>{TEXTS.LOGIN_PAGE.ERROR_MESSAGE}</p>
      )}
      <label className={styles.label} htmlFor="email">
        {TEXTS.LOGIN_PAGE.EMAIL_LABEL}
      </label>
      <TextInput
        {...register('email')}
        className={styles.input}
        type="email"
        id="email"
        placeholder={TEXTS.LOGIN_PAGE.EMAIL_LABEL}
        errorMessage={errors.email?.message}
        size="l"
        disabled={isLoading}
        autoComplete
      />
      <label className={styles.label} htmlFor="password">
        {TEXTS.LOGIN_PAGE.PASSWORD_LABEL}
      </label>
      <TextInput
        {...register('password')}
        type="password"
        id="password"
        placeholder={TEXTS.LOGIN_PAGE.PASSWORD_LABEL}
        errorMessage={errors.password?.message}
        size="l"
        disabled={isLoading}
        autoComplete
      />
      <div className={styles.buttonsContainer}>
        <Button loading={isLoading} type="submit" view="action" size="xl">
          {TEXTS.LOGIN_PAGE.LOGIN_BUTTON}
        </Button>
      </div>
    </form>
  );
};
