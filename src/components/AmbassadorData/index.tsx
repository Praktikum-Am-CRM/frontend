/* eslint-disable complexity */
/* eslint-disable no-console */
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
import { formatDate } from '../../utils/formatDate';
import { usePatchDataAmbassadorMutation } from '../../store/amCrm/amCrm.api';
import { STATUSES } from '../../utils/constants';

type Inputs = {
  address_country: string;
  address_settlement: string;
  address_index: string;
  address_street: string;
  address_house: number;
  address_building: string;
  address_apartment: string;
  email: string;
  educational_institution: string;
  place_work: string;
  specialty_work: string;
  blog_link: string;
  size_clothing: string;
  size_choe: number;
  own_version: string;
  note: string;
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
  const onSubmit: SubmitHandler<Inputs> = (
    data: Partial<AmbassadorDataPartialWithStringStatus>,
  ) => patchDataAmbassador({ ...data, id: user.id });

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
      />
    ) : (
      <Text>{value}</Text>
    );
  };

  console.log(user);

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
            key={singleActivity.id}
          >
            {singleActivity.activity_name}
          </li>
        );
      },
    );
  }

  function renderGoals() {
    if (user.goals[0].own_version) {
      return (
        <ul
          className={`${styles.ambassodorCard__list} ${styles.ambassodorCard__listAnother}`}
        >
          <li className={styles.ambassodorCard__itemActivity}>
            {user.goals[0].goal_name}
          </li>
          <li className={styles.ambassodorCard__itemActivity}>
            {user.goals[0].own_version}
          </li>
        </ul>
      );
    } else {
      return (
        <li className={styles.ambassodorCard__itemActivity}>
          {user.goals[0].goal_name}
        </li>
      );
    }
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
            {variableInput(
              'address_country',
              displayData(user.address_country),
              '',
            )}
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Город')}
            {variableInput(
              'address_settlement',
              displayData(user.address_settlement),
              '',
            )}
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Индекс')}
            {variableInput(
              'address_index',
              displayData(user.address_index),
              '',
            )}
          </li>
          <li
            className={`${styles.ambassodorCard__item} ${styles.ambassodorCard__itemAddress}`}
          >
            {standartTextInput('Адрес')}
            {variableInput(
              'address_street',
              displayData(`${user.address_street}`),
              '',
            )}
            <Text>дом</Text>
            {variableInput(
              'address_house',
              displayData(`${user.address_house}`),
              '',
            )}
            {user.address_building && <Text>строение</Text>}
            {user.address_building &&
              variableInput(
                'address_building',
                displayData(`${user.address_building}`),
                '',
              )}
            {user.address_apartment && <Text>квартира</Text>}
            {user.address_apartment &&
              variableInput(
                'address_apartment',
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
            <li className={styles.ambassodorCard__item}>
              {standartTextInput('Цель учёбы в Практикум')}
              {renderGoals()}
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
              'size_clothing',
              displayData(user.size_clothing),
              '',
            )}
          </li>
          <li className={styles.ambassodorCard__item}>
            {standartTextInput('Размер обуви')}
            {variableInput(
              'size_choe',
              displayData(user.size_choe.toString()),
              '',
            )}
          </li>
          {/* <li className={styles.ambassodorCard__item}>
            {standartTextInput('Дополнительная информация о себе')}
            {variableInput('note', displayData(user.note), '')}
          </li> */}
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
                'note',
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
      {user.status.id === STATUSES.CANDIDATE && (
        <Button
          size="l"
          view="outlined"
          className={styles.ambassodorCard__deleteButton}
          onClick={() => {
            patchDataAmbassador({
              id: user.id,
              status: STATUSES.ARCHIVE,
            });
          }}
        >
          <Icon data={TrashBin} size={18} />
        </Button>
      )}
    </section>
  );
}
