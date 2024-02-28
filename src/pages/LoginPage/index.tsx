import styles from './LoginPage.module.css';
import { Button, Text, TextInput } from '@gravity-ui/uikit';
import Logo from '../../components/Logo';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validationSchema';
import { useAppDispatch } from '../../hooks/hooks';
import { login } from '../../features/auth/authSlice';

interface ILoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    dispatch(login(data));
  };

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <div className={styles.loginContainer}>
        <Text className={styles.title} variant="display-2">
          Добро пожаловать!
        </Text>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {(errors.email || errors.password) && (
            <p className={styles.error}>Введены неверная почта и/или пароль</p>
          )}
          <label className={styles.label} htmlFor="email">
            Электронная почта
          </label>
          <TextInput
            {...register('email')}
            type="email"
            id="email"
            placeholder="Введите почту"
            errorMessage={errors.email?.message}
            size="l"
            style={{ marginBottom: '24px' }}
          />

          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <TextInput
            {...register('password')}
            type="password"
            id="password"
            placeholder="Введите пароль"
            errorMessage={errors.password?.message}
            size="l"
          />

          <div className={styles.buttonsContainer}>
            <Button type="submit" view="action" size="xl">
              Войти
            </Button>
          </div>
        </form>
      </div>
      <ul className={styles.footer}>
        <li className={styles.items}>
          <a className={styles.link} href="test.ru">
            Политика конфиденциальности
          </a>
          <p className={styles.link}>© Все права защищены</p>
        </li>
      </ul>
    </div>
  );
}
