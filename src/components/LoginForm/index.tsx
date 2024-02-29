import styles from './LoginForm.module.css';
import { Button, TextInput } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useFormLogic } from '../../hooks/useFormLogic';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { store } from '../../store/';
import { ILoginForm } from '../../types/ILoginForm';
import { TEXTS } from '../../utils/constants';

export const LoginForm = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogic();

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        navigate('/');
      });
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
      />
      <div className={styles.buttonsContainer}>
        <Button type="submit" view="action" size="xl">
          {TEXTS.LOGIN_PAGE.LOGIN_BUTTON}
        </Button>
      </div>
    </form>
  );
};
