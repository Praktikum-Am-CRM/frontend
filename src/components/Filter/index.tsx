/* eslint-disable camelcase */
import { Button, Checkbox, Icon, Popup, Text } from '@gravity-ui/uikit';
import { useRef, useState } from 'react';
import { SlidersVertical } from '@gravity-ui/icons';

import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { useGetStatusesQuery } from '../../store/amCrm/amCrm.api';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { STATUSES } from '../../utils/constants';

type FormData = {
  status: string[];
};
export default function Filter() {
  const { setStatus } = useActions();
  const selectedStatuses = useAppSelector(state => state.amFilters.status);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { data: statuses } = useGetStatusesQuery();

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(data => {
    setStatus(data);
    setOpen(false);
  });

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const prepareStatuses = (data: StatusType[]) =>
    data.filter(
      (item: StatusType) =>
        item.id !== STATUSES.CANDIDATE && item.id !== STATUSES.ARCHIVE,
    );

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
                      defaultChecked={selectedStatuses.includes(id)}
                      content={status_name}
                      {...register('status')}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.filters__buttons}>
            <Button view="action" type="submit">
              Показать
            </Button>
          </div>
        </form>
      </Popup>
    </>
  );
}
