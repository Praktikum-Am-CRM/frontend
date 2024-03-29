import ava from '../../assets/images/avatar.webp';
import styles from './styles.module.css';
import { Text } from '@gravity-ui/uikit';

const data = {
  urlPhoto: ava,
  username: 'Анастасия Борисова',
  usermail: 'anastasia@yandex.ru',
};

export default function Profile() {
  return (
    <div className={styles.profile}>
      <img
        src={data.urlPhoto}
        alt="фото профиля"
        className={styles.profile__photo}
      />
      <div className={styles.profile__userData}>
        <Text variant="body-short">{data.username}</Text>
        <Text
          className={styles.profile__userMail}
          variant="body-short"
          color="secondary"
        >
          {data.usermail}
        </Text>
      </div>
    </div>
  );
}
