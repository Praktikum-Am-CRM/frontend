import styles from './styles.module.css';

const data = {
  urlPhoto: 'http://www.coffeeambassador.ru/photo/photo63.jpeg',
  username: 'UserName',
  usermail: 'user_mail@ya.ru',
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
        <p className={styles.profile__userName}>{data.username}</p>
        <p className={styles.profile__userMail}>{data.usermail}</p>
      </div>
    </div>
  );
}
