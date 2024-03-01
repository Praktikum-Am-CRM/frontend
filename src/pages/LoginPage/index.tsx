import styles from './LoginPage.module.css';
import Logo from '../../components/Logo';
import { Text } from '@gravity-ui/uikit';
import { LoginForm } from '../../components/LoginForm';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { TEXTS, URLS } from '../../utils/constants';

export default function LoginPage() {
  useAuthRedirect();

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <div className={styles.loginContainer}>
        <Text className={styles.title} variant="display-2">
          {TEXTS.LOGIN_PAGE.WELCOME}
        </Text>
        <LoginForm />
      </div>
      <ul className={styles.footer}>
        <li className={styles.items}>
          <a className={styles.link} href={URLS.CONFIDENTIALITY_POLICY}>
            {TEXTS.LOGIN_PAGE.FOOTER_CONFIDENTIALITY_POLICY}
          </a>
          <p className={styles.link}>{TEXTS.LOGIN_PAGE.FOOTER_COPYRIGHT}</p>
        </li>
      </ul>
    </div>
  );
}
