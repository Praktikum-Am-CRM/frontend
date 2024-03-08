import styles from './styles.module.css';
import { Logo } from '../../assets/icons';
import { Link, Text } from '@gravity-ui/uikit';
import { LoginForm } from '../../components/LoginForm';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { TEXTS, URLS } from '../../utils/constants';

export default function LoginPage() {
  useAuthRedirect();

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <Logo className={styles.logo} />
        <div className={styles.loginContainer}>
          <Text className={styles.title} variant="header-1">
            {TEXTS.LOGIN_PAGE.WELCOME}
          </Text>
          <LoginForm />
        </div>

        <ul className={styles.footer}>
          <li className={styles.items}>
            <Link className={styles.link} href={URLS.CONFIDENTIALITY_POLICY}>
              {TEXTS.LOGIN_PAGE.FOOTER_CONFIDENTIALITY_POLICY}
            </Link>
            <Text className={styles.link}>
              {TEXTS.LOGIN_PAGE.FOOTER_COPYRIGHT}
            </Text>
          </li>
        </ul>
      </div>
    </div>
  );
}
