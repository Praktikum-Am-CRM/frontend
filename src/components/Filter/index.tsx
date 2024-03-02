/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  Icon,
  Popup,
  RadioGroup,
  Select,
  Text,
} from '@gravity-ui/uikit';
import { useRef, useState } from 'react';
import VerticalSlidersIcon from '../../assets/images/VerticalSlidersIcon';

import styles from './styles.module.css';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  status: string[];
  gender: string;
  program: string[];
};
export default function Filter() {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { register, control, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(data => console.log(data));

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const genderOptions = [
    { value: 'men', content: 'Мужчины' },
    { value: 'women', content: 'Женщины' },
  ];

  const amStatusOptions = [
    { value: 'active', content: 'Активный' },
    { value: 'pending', content: 'Уточняется' },
    { value: 'paused', content: 'На паузе' },
    { value: 'notamb', content: 'Не амбассадор' },
  ];

  const programOptions = [
    { value: 'program1', content: 'Программа 1' },
    { value: 'program2', content: 'Программа 2' },
    { value: 'program3', content: 'Программа 3' },
  ];

  const FilterText = ({ children }: { children: string }) => (
    <Text variant="body-1" color="secondary">
      {children}
    </Text>
  );

  return (
    <>
      <Button size="xl" ref={buttonRef} onClick={handleClick}>
        <Icon data={VerticalSlidersIcon} size={18} />
      </Button>
      <Popup
        anchorRef={buttonRef}
        open={open}
        placement="bottom"
        onOutsideClick={handleClick}
      >
        <form className={styles.filters} onSubmit={onSubmit}>
          <div className={styles.filters__container}>
            <FilterText>Статус</FilterText>
            <ul className={styles.filters__checkboxList}>
              {amStatusOptions.map(({ value, content }) => (
                <li key={value} className={styles.filters__checkboxItem}>
                  <Checkbox
                    value={value}
                    content={content}
                    {...register('status')}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.filters__container}>
            <FilterText>Пол</FilterText>
            <Controller
              name="gender"
              control={control}
              defaultValue={genderOptions[0].value}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  options={genderOptions}
                  direction="vertical"
                />
              )}
            />
          </div>
          <div className={styles.filters__container}>
            <FilterText>Программа</FilterText>

            <Select
              placeholder="Программа"
              className={styles.filters__checkboxList}
              size="m"
              filterable
              multiple
              {...register('program')}
            >
              {programOptions.map(({ value, content }) => (
                <Select.Option key={value} value={value}>
                  {content}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={styles.filters__buttons}>
            {/* <Button view="normal" type="reset">
              Сбросить
            </Button> */}
            <Button view="action" type="submit">
              Показать
            </Button>
          </div>
        </form>
      </Popup>
    </>
  );
}
