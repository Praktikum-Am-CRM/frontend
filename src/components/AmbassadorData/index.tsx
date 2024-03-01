import styles from './styles.module.css';
import { Button, Text, TextInput } from '@gravity-ui/uikit';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function AmbassadorData({ user }) {
  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const { handleSubmit } = useForm();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const variableInput = (value, placeholder) => {
    return isFormActive ? (
      <TextInput
        view="normal"
        size="l"
        placeholder={placeholder}
        value={value}
      ></TextInput>
    ) : (
      <Text>{value}</Text>
    );
  };

  function displayData(value) {
    if (value) {
      return value;
    } else return '';
  }

  console.log(isFormActive);

  return (
    <section className={styles.ambassodorDataSection}>
      <div className={styles.ambassodorDataSection__promoInfo}>
        <Text className={styles.ambassodorDataSection__promo} color="secondary">
          Промокод
        </Text>
        <Text>{user.promo}</Text>
      </div>
      <form
        className={styles.ambassodorDataSection__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ul className={styles.ambassodorDataSection__list}>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Страна
            </Text>
            {variableInput(displayData(user.promo), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Город
            </Text>
            {variableInput(displayData(user.promo), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Индекс
            </Text>
            {variableInput(displayData(user.promo), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Адрес
            </Text>
            {variableInput(displayData(user.promo), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Email
            </Text>
            {variableInput(displayData(user.e_mail), '')}
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
            {variableInput(displayData(user.e_mail), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Место работы
            </Text>
            {variableInput(displayData(user.e_mail), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Цель учёбы в Практикум
            </Text>
            {variableInput(displayData(user.e_mail), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Желаемая деятельность
            </Text>
            {variableInput(displayData(user.activity), '')}
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
            {variableInput(displayData(user.activity), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Размер одежды
            </Text>
            {variableInput(displayData(user.activity), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Размер ноги
            </Text>
            {variableInput(displayData(user.activity), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Доп. информация о себе
            </Text>
            {variableInput(displayData(user.activity), '')}
          </li>
        </ul>
        <ul
          className={`${styles.ambassodorDataSection__list} ${styles.ambassodorDataSection__listAnother}`}
        >
          <li
            className={`${styles.ambassodorDataSection__item} ${styles.ambassodorDataSection__itemAnother}`}
          >
            <Text color="secondary">Комментарий</Text>
            {variableInput(
              displayData(user.e_mail),
              'Вы можете оставить здесь любые заметки, связанные с амбассадором',
            )}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Button
              size="l"
              onClick={() => {
                setIsFormActive(!isFormActive);
              }}
            >
              {isFormActive ? 'Сохранить изменения' : 'Изменить данные'}
            </Button>
          </li>
        </ul>
      </form>
      <ul
        className={`${styles.ambassodorDataSection__list} ${styles.ambassodorDataSection__listAnother}`}
      >
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
      <Button
        size="l"
        view="outlined"
        className={styles.ambassodorDataSection__deleteButton}
      ></Button>
    </section>
  );
}
