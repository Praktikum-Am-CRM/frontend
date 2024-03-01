import styles from './LoginForm.module.css';
import { Button, TextInput } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import { useFormLogic } from '../../hooks/useFormLogic';
import { useActions } from '../../hooks/actions';
import { useLoginMutation } from '../../store/amCrm/amCrm.api';
import { ILoginForm } from '../../types/ILoginForm';
import { TEXTS } from '../../utils/constants';

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
      if (res.token) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      throw new Error('Не удалось авторизоваться');
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
      />
      <div className={styles.buttonsContainer}>
        <Button loading={isLoading} type="submit" view="action" size="xl">
          {TEXTS.LOGIN_PAGE.LOGIN_BUTTON}
        </Button>
      </div>
    </form>
  );
};
