import styles from './styles.module.css';
import { Button, Text, TextInput } from '@gravity-ui/uikit';

export default function AmbassadorData({ user }) {
  return (
    <section className={styles.ambassodorDataSection}>
      <div className={styles.ambassodorDataSection__promoInfo}>
        <Text className={styles.ambassodorDataSection__promo} color="secondary">
          Промокод
        </Text>
        <Text>{user.promo}</Text>
      </div>
      <ul className={styles.ambassodorDataSection__list}>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Страна
          </Text>
          <Text>Россия</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Город
          </Text>
          <Text>Москва</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Индекс
          </Text>
          <Text>105037</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Адрес
          </Text>
          <Text>Главная аллея, 11</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Email
          </Text>
          <Text>{user.e_mail ? user.e_mail : ''}</Text>
        </li>
      </ul>
      <ul className={styles.ambassodorDataSection__list}>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Образование
          </Text>
          <Text>Системный администратор</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Место работы
          </Text>
          <Text>Небольшая компания</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Цель учёбы в Практикум
          </Text>
          <Text>Получение новой профессии, чтобы сменить работу</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Желаемая деятельность
          </Text>
          <Text>{user.activity ? user.activity : ''}</Text>
        </li>
      </ul>
      <ul className={styles.ambassodorDataSection__list}>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Ссылка на блог
          </Text>
          <Text>https://habr.com/ru/articles/</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Размер одежды
          </Text>
          <Text>XL</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Размер ноги
          </Text>
          <Text>43</Text>
        </li>
        <li className={styles.ambassodorDataSection__item}>
          <Text
            color="secondary"
            className={styles.ambassodorDataSection__attribute}
          >
            Доп. информация о себе
          </Text>
          <Text>
            Был системным администратором, инженером технической поддержки и
            руководителем ИТ-отдела.{' '}
          </Text>
        </li>
      </ul>
      <div className={styles.ambassodorDataSection__another}>
        <ul
          className={`${styles.ambassodorDataSection__list} ${styles.ambassodorDataSection__listAnother}`}
        >
          <li
            className={`${styles.ambassodorDataSection__item} ${styles.ambassodorDataSection__itemAnother}`}
          >
            <Text color="secondary">Комментарий</Text>
            <TextInput
              size="l"
              placeholder="Вы можете оставить здесь любые заметки, связанные с амбассадором"
            ></TextInput>
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Счётчик напоминалок
            </Text>
            <Text>2</Text>
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Дата добавления
            </Text>
            <Text>{user.date_receipt}</Text>
          </li>
        </ul>
      </div>
      <Button
        size="l"
        view="outlined"
        className={styles.ambassodorDataSection__deleteButton}
      ></Button>
    </section>
  );
}
