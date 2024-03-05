/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css';
import { Button, Checkbox, List, Text, TextInput } from '@gravity-ui/uikit';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  country: string;
};

const merchArray: string[] = [
  'Толстовка',
  'Кофе',
  'Стикеры',
  'Плюс',
  'Арзамас',
  'Шоппер',
  'Рюкзак',
  'Сумка кросс',
  'Носки',
  'Скидка 50%',
];

const curatorsArrray: string[] = [
  'Кутузова Алиса',
  'Бойко Рината',
  'Зазуба Кристина',
];

export default function AmbassadorData({
  user,
  isMerchDelivery,
}: {
  user: any;
  // user: {
  //   id: string;
  //   ambassador: string;
  //   status: string;
  //   promo: string;
  //   telegram: string;
  //   program: string;
  //   date_receipt: string;
  //   gender: string;
  //   address: string;
  //   activity: string;
  //   e_mail: string;
  // };
  isMerchDelivery: boolean;
}) {
  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const variableInput = (
    nameInput: any,
    value: string,
    placeholder: string,
  ) => {
    return isFormActive ? (
      <TextInput
        defaultValue={value}
        {...register(nameInput)}
        view="normal"
        size="l"
        placeholder={placeholder}
      ></TextInput>
    ) : (
      <Text>{value}</Text>
    );
  };

  function displayData(value: string) {
    if (value) {
      return value;
    } else return '';
  }

  return (
    <section className={styles.ambassodorDataSection}>
      {!isMerchDelivery && (
        <div className={styles.ambassodorDataSection__promoInfo}>
          <Text
            className={styles.ambassodorDataSection__promo}
            color="secondary"
          >
            Промокод
          </Text>
          <Text>{user.promo}</Text>
        </div>
      )}
      <form
        className={styles.ambassodorDataSection__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {isMerchDelivery && (
          <div className={styles.ambassadorCard__merchSettings}>
            <div
              className={styles.ambassadorCard__merchSettingContainer}
              onClick={() => setIsFormActive(true)}
            >
              <List
                itemsClassName={styles.ambassadorCard__merchSetting}
                filterPlaceholder="Вид мерча"
                items={merchArray}
                itemsHeight={isFormActive ? 260 : 0}
                renderItem={item => <Checkbox content={item} />}
              ></List>
            </div>
            <div
              className={styles.ambassadorCard__merchSettingContainer}
              onClick={() => setIsFormActive(true)}
            >
              <List
                itemsClassName={styles.ambassadorCard__merchSetting}
                filterPlaceholder="Куратор"
                items={curatorsArrray}
                itemsHeight={isFormActive ? 78 : 0}
                renderItem={item => <Checkbox content={item} />}
              ></List>
            </div>
          </div>
        )}
        <ul className={styles.ambassodorDataSection__list}>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Страна
            </Text>
            {variableInput('country', displayData(user.promo), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Город
            </Text>
            {variableInput('region', displayData(user.promo), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Индекс
            </Text>
            {variableInput('index', displayData(user.promo), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Адрес
            </Text>
            {variableInput('street', displayData(user.promo), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Email
            </Text>
            {variableInput('e-mail', displayData(user.e_mail), '')}
          </li>
        </ul>
        {!isMerchDelivery && (
          <ul className={styles.ambassodorDataSection__list}>
            <li className={styles.ambassodorDataSection__item}>
              <Text
                color="secondary"
                className={styles.ambassodorDataSection__attribute}
              >
                Образование
              </Text>
              {variableInput(
                'educational_institution',
                displayData(user.e_mail),
                '',
              )}
            </li>
            <li className={styles.ambassodorDataSection__item}>
              <Text
                color="secondary"
                className={styles.ambassodorDataSection__attribute}
              >
                Место работы
              </Text>
              {variableInput('place_work', displayData(user.e_mail), '')}
            </li>
            <li className={styles.ambassodorDataSection__item}>
              <Text
                color="secondary"
                className={styles.ambassodorDataSection__attribute}
              >
                Цель учёбы в Практикум
              </Text>
              {variableInput('goal', displayData(user.e_mail), '')}
            </li>
            <li className={styles.ambassodorDataSection__item}>
              <Text
                color="secondary"
                className={styles.ambassodorDataSection__attribute}
              >
                Желаемая деятельность
              </Text>
              {variableInput('activity', displayData(user.activity), '')}
            </li>
          </ul>
        )}
        <ul className={styles.ambassodorDataSection__list}>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Ссылка на блог
            </Text>
            {variableInput('blog_link', displayData(user.activity), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Размер одежды
            </Text>
            {variableInput('clothing_size', displayData(user.activity), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Размер ноги
            </Text>
            {variableInput('shoe_size', displayData(user.activity), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            <Text
              color="secondary"
              className={styles.ambassodorDataSection__attribute}
            >
              Доп. информация о себе
            </Text>
            {variableInput('note', displayData(user.activity), '')}
          </li>
        </ul>
        <ul
          className={`${styles.ambassodorDataSection__list} ${styles.ambassodorDataSection__listAnother}`}
        >
          {!isMerchDelivery && (
            <li
              className={`${styles.ambassodorDataSection__item} ${styles.ambassodorDataSection__itemAnother}`}
            >
              <Text color="secondary">Комментарий</Text>
              {variableInput(
                'note',
                displayData(user.e_mail),
                'Вы можете оставить здесь любые заметки, связанные с амбассадором',
              )}
            </li>
          )}
          {!isMerchDelivery && (
            <li className={styles.ambassodorDataSection__item}>
              <Button
                size="l"
                onClick={() => {
                  setIsFormActive(!isFormActive);
                }}
                type={!isFormActive ? 'submit' : 'button'}
              >
                {isFormActive ? 'Сохранить изменения' : 'Изменить данные'}
              </Button>
            </li>
          )}
          {isMerchDelivery && (
            <li className={styles.ambassodorDataSection__item}>
              <Button size="l" type="submit" view="action">
                Сформировать мерч
              </Button>
            </li>
          )}
        </ul>
      </form>
      {!isMerchDelivery && (
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
      )}
      {!isMerchDelivery && (
        <Button
          size="l"
          view="outlined"
          className={styles.ambassodorDataSection__deleteButton}
        ></Button>
      )}
    </section>
  );
}
