/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const standartTextInput = (text: string) => {
    return (
      <Text
        color="secondary"
        className={styles.ambassodorDataSection__attribute}
      >
        {text}
      </Text>
    );
  };

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
          <Text>{user.promocode}</Text>
        </div>
      )}
      <form
        className={styles.ambassodorDataSection__form}
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
        <ul className={styles.ambassodorDataSection__list}>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Страна')}
            {variableInput('country', displayData(user.address_country), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Город')}
            {variableInput('region', displayData(user.address_settlement), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Индекс')}
            {variableInput('index', displayData(user.address_index), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Адрес')}
            {variableInput(
              'street',
              displayData(
                `${user.address_street} дом ${user.address_house} ${user.address_building ? `строение ${user.address_building}` : ''} квартира ${user.address_apartment}`,
              ),
              '',
            )}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Email')}
            {variableInput('e-mail', displayData(user.email), '')}
          </li>
        </ul>
        {!isMerchDelivery && (
          <ul className={styles.ambassodorDataSection__list}>
            <li className={styles.ambassodorDataSection__item}>
              {standartTextInput('Образование')}
              {variableInput(
                'educational_institution',
                displayData(user.educational_institution),
                '',
              )}
            </li>
            <li className={styles.ambassodorDataSection__item}>
              {standartTextInput('Место работы')}
              {variableInput('place_work', displayData(user.place_work), '')}
            </li>
            <li className={styles.ambassodorDataSection__item}>
              {standartTextInput('Цель учебы в Практикуме')}
              {variableInput('goal', displayData(user.goals[0].goal_name), '')}
            </li>
            <li className={styles.ambassodorDataSection__item}>
              {standartTextInput('Желаемая деятельность')}
              {variableInput(
                'activity',
                displayData(user.activity.map(a => a.activity_name).join('. ')),
                '',
              )}
            </li>
          </ul>
        )}
        <ul className={styles.ambassodorDataSection__list}>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Ссылка на блог')}
            {variableInput('blog_link', displayData(user.blog_link), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Размер одежды')}
            {variableInput(
              'clothing_size',
              displayData(user.size_clothing),
              '',
            )}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Размер обуви')}
            {variableInput('shoe_size', displayData(user.size_shoe), '')}
          </li>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Дополнительная информация о себе')}
            {variableInput('note', displayData(user.note), '')}
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
                displayData(user.note),
                'Вы можете оставить здесь любые заметки, связанные с амбассадором',
              )}
            </li>
          )}
          {!isMerchDelivery && (
            <li className={styles.ambassodorDataSection__item}>
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
                  className={styles.ambassodorDataSection__resetButton}
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
            {standartTextInput('Количество напоминаний')}
            <Text>{user.reminder_counter}</Text>
          </li>
          <li className={styles.ambassodorDataSection__item}>
            {standartTextInput('Дата регистрации в боте')}
            <Text>
              {formatDate(user.telegram_bot.registration_date, 'long')}
            </Text>
          </li>
        </ul>
      )}
      {!isMerchDelivery && (
        <Button
          size="l"
          view="outlined"
          className={styles.ambassodorDataSection__deleteButton}
        >
          <Icon data={TrashBin} size={18} />
        </Button>
      )}
    </section>
  );
}
