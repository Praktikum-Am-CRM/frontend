import { TrashBin } from '@gravity-ui/icons';
import styles from './styles.module.css';
import {
  Button,
  Checkbox,
  Icon,
  List,
  Text,
  TextInput,
} from '@gravity-ui/uikit';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AmbassadorDataType } from '../../types/types';
import { formatDate } from '../../utils/formatDate';
import { usePatchDataAmbassadorMutation } from '../../store/amCrm/amCrm.api';

type Inputs = {
  country: string;
  settlement: string;
  index: string;
  street: string;
  house: string;
  building: string;
  appartment: string;
  email: string;
  educational_institution: string;
  place_work: string;
  specialty_work: string;
  blog_link: string;
  clothing_size: string;
  shoe_size: string;
  note: string;
  comment: string;
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

const curatorsArrray: string[] = ['Борисова Анастасия'];

export default function AmbassadorData({
  user,
  isMerchDelivery,
}: {
  user: AmbassadorDataType;
  isMerchDelivery: boolean;
}) {
  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();
  const [patchDataAmbassador] = usePatchDataAmbassadorMutation();
  const onSubmit: SubmitHandler<Inputs> = (data: {
    country: string;
    settlement: string;
    index: string;
    street: string;
    house: string;
    building: string;
    appartment: string;
    email: string;
    educational_institution: string;
    place_work: string;
    specialty_work: string;
    blog_link: string;
    clothing_size: string;
    note: string;
    comment: string;
  }) =>
    patchDataAmbassador({
      id: user.id,
      country: data.country,
      settlement: data.settlement,
      index: data.index,
      street: data.street,
      house: data.house,
      building: data.building,
      appartment: data.appartment,
      email: data.email,
      educational_institution: data.educational_institution,
      place_work: data.place_work,
      specialty_work: data.specialty_work,
      blog_link: data.blog_link,
      clothing_size: data.clothing_size,
      note: data.note,
      comment: data.comment,
    });

  const variableInput = (
    nameInput: keyof Inputs,
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

  const standartTextInput = (text: string) => {
    return (
      <Text color="secondary" className={styles.ambassodorCard__attribute}>
        {text}
      </Text>
    );
  };

  console.log(user);

  function renderActivities() {
    return user.activity.map(
      (singleActivity: {
        activity_name: string;
        available: boolean;
        id: string;
      }) => {
        return (
          <li
            className={styles.ambassodorCard__itemActivity}
            key={`li ${singleActivity.id}`}
          >
            {singleActivity.activity_name}
          </li>
        );
      },
    );
  }

  return (
    <section className={styles.ambassodorCard}>
      {!isMerchDelivery && (
        <div className={styles.ambassodorCard__promoInfo}>
          <Text className={styles.ambassodorCard__promo} color="secondary">
            Промокод
          </Text>
          <Text>{user.promocode}</Text>
        </div>
      )}
      <form
        className={styles.ambassodorCard__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {isMerchDelivery && (
          <div className={styles.ambassadorCard__merchSettings}>
            <form
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
              <div className={styles.ambassadorCard__merchButtons}>
                <Button size="l" className={styles.ambassadorCard__merchButton}>
                  Сбросить
                </Button>
                <Button
                  size="l"
                  view="action"
                  className={styles.ambassadorCard__merchButton}
                >
                  Выбрать
                </Button>
              </div>
            </form>
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
              <div className={styles.ambassadorCard__merchButtons}>
                <Button size="l" className={styles.ambassadorCard__merchButton}>
                  Сбросить
                </Button>
                <Button
                  size="l"
                  view="action"
                  className={styles.ambassadorCard__merchButton}
                >
                  Выбрать
                </Button>
              </div>
            </div>
          </div>
        )}
        <ul className={styles.ambassodorCard__list}>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Страна')}
            {variableInput('country', displayData(user.address_country), '')}
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Город')}
            {variableInput(
              'settlement',
              displayData(user.address_settlement),
              '',
            )}
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Индекс')}
            {variableInput('index', displayData(user.address_index), '')}
          </li>
          <li
            className={`${styles.ambassodorCard__item} ${styles.ambassodorCard__itemAddress}`}
          >
            {standartTextInput('Адрес')}
            {variableInput('street', displayData(`${user.address_street}`), '')}
            <Text>дом</Text>
            {variableInput('house', displayData(`${user.address_house}`), '')}
            {user.address_building && <Text>строение</Text>}
            {user.address_building &&
              variableInput(
                'building',
                displayData(`${user.address_building}`),
                '',
              )}
            {user.address_apartment && <Text>квартира</Text>}
            {user.address_apartment &&
              variableInput(
                'appartment',
                displayData(`${user.address_apartment}`),
                '',
              )}
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Email')}
            {variableInput('email', displayData(user.email), '')}
          </li>
        </ul>
        {!isMerchDelivery && (
          <ul className={styles.ambassodorCard__list}>
            <li className={styles.ambassodorCard__item}>
              {standartTextInput('Образование')}
              {variableInput(
                'educational_institution',
                displayData(user.educational_institution),
                '',
              )}
            </li>
            <li className={styles.ambassodorCard__item}>
              {standartTextInput('Место работы')}
              {variableInput('place_work', displayData(user.place_work), '')}
            </li>
            <li className={styles.ambassodorCard__item}>
              {standartTextInput('Кем работаешь')}
              {variableInput(
                'specialty_work',
                displayData(user.specialty_work),
                '',
              )}
            </li>
            <li className={styles.ambassodorCard__item}>
              {standartTextInput('Желаемая деятельность')}
              <ul
                className={`${styles.ambassodorCard__list} ${styles.ambassodorCard__listAnother}`}
              >
                {renderActivities()}
              </ul>
            </li>
          </ul>
        )}
        <ul className={styles.ambassodorCard__list}>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Ссылка на блог')}
            {variableInput('blog_link', displayData(user.blog_link), '')}
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Размер одежды')}
            {variableInput(
              'clothing_size',
              displayData(user.size_clothing),
              '',
            )}
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Размер обуви')}
            {variableInput('shoe_size', displayData(user.size_shoe), '')}
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Дополнительная информация о себе')}
            {variableInput('note', displayData(user.note), '')}
          </li>
        </ul>
        <ul
          className={`${styles.ambassodorCard__list} ${styles.ambassodorCard__listAnother}`}
        >
          {!isMerchDelivery && (
            <li
              className={`${styles.ambassodorCard__item} ${styles.ambassodorCard__itemAnother}`}
            >
              <Text color="secondary">Комментарий</Text>
              {variableInput(
                'comment',
                displayData(user.note),
                'Вы можете оставить здесь любые заметки, связанные с амбассадором',
              )}
            </li>
          )}
          {!isMerchDelivery && (
            <li className={styles.ambassodorCard__item}>
              <Button
                size="l"
                view={isFormActive ? 'action' : 'normal'}
                onClick={() => {
                  setIsFormActive(!isFormActive);
                }}
                type={isFormActive ? 'button' : 'submit'}
              >
                {isFormActive ? 'Сохранить изменения' : 'Изменить данные'}
              </Button>
              {isFormActive && (
                <Button
                  className={styles.ambassodorCard__resetButton}
                  size="l"
                  onClick={() => {
                    setIsFormActive(false);
                  }}
                  type="button"
                >
                  Не сохранять
                </Button>
              )}
            </li>
          )}
          {isMerchDelivery && (
            <li className={styles.ambassodorCard__item}>
              <Button size="l" type="submit" view="action">
                Сформировать мерч
              </Button>
            </li>
          )}
        </ul>
      </form>
      {!isMerchDelivery && (
        <ul
          className={`${styles.ambassodorCard__list} ${styles.ambassodorCard__listAnother}`}
        >
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Количество напоминаний')}
            <Text>{user.reminder_counter}</Text>
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Дата регистрации в боте')}
            <Text>
              {formatDate(user.telegram_bot.registration_date, 'long')}
            </Text>
          </li>
          {user.receipt_date && (
            <li className={styles.ambassodorDataSection__item}>
              {standartTextInput('Дата принятия в амбассадоры')}
              <Text>{formatDate(user.receipt_date, 'long')}</Text>
            </li>
          )}
        </ul>
      )}
      {!isMerchDelivery && (
        <Button
          size="l"
          view="outlined"
          className={styles.ambassodorCard__deleteButton}
        >
          <Icon data={TrashBin} size={18} />
        </Button>
      )}
    </section>
  );
}
