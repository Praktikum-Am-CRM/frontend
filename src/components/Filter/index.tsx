/* eslint-disable camelcase */
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
import { SlidersVertical } from '@gravity-ui/icons';

import styles from './styles.module.css';
import { Controller, useForm } from 'react-hook-form';
import {
  useGetProgramsQuery,
  useGetStatusesQuery,
} from '../../store/amCrm/amCrm.api';
import { ProgramType, StatusType } from '../../types/types';

type FormData = {
  status: string[];
  gender: string;
  program: string[];
};
export default function Filter() {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { data: programs } = useGetProgramsQuery();
  const { data: statuses } = useGetStatusesQuery();

  const { register, control, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(data => console.log(data));

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const genderOptions = [
    { value: 'men', content: 'Мужчины' },
    { value: 'women', content: 'Женщины' },
  ];

  const preparePrograms = (data: ProgramType[]) =>
    data.map((item: any) => ({
      value: item.id,
      content: item.program_name,
    }));

  const prepareStatuses = (data: StatusType[]) =>
    data.filter((item: any) => item.status_name !== 'Кандидат');

  const FilterText = ({ children }: { children: string }) => (
    <Text variant="body-1" color="secondary">
      {children}
    </Text>
  );

  return (
    <>
      <Button size="xl" ref={buttonRef} onClick={handleClick} title="Фильтры">
        <Icon data={SlidersVertical} size={18} />
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
              {statuses &&
                prepareStatuses(statuses).map(({ id, status_name }) => (
                  <li key={id} className={styles.filters__checkboxItem}>
                    <Checkbox
                      value={id}
                      content={status_name}
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
            {programs && (
              <Controller
                name="program"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Программа"
                    className={styles.filters__checkboxList}
                    size="m"
                    filterable
                    multiple
                    options={preparePrograms(programs)}
                    onUpdate={e => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            )}
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
