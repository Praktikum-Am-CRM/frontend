/* eslint-disable no-console */
import styles from './styles.module.css';
import { Button, ButtonView, Modal, Text, TextArea } from '@gravity-ui/uikit';
import { dateTime } from '@gravity-ui/date-utils';
import type { DateTime } from '@gravity-ui/date-utils';
import { DatePicker } from '@gravity-ui/date-components';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';
import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import TimeInput from '../TimeInput';

export type Time = {
  hours: string;
  minutes: string;
};

const TOMORROW = dateTime().add(1, 'day');

const NewMailing = () => {
  const textAreaValue = useAppSelector(state => state.mailing.textAreaValue);
  const { setTextAreaValue } = useActions();
  const selectedUsersIds = useAppSelector(
    state => state.table.selectedUsersIds,
  );

  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const [datePickedManually, setDatePickedManually] = useState(false);
  const [pickedDate, setPickedDate] = useState(TOMORROW);
  const [time, setTime] = useState<Time>({ hours: '12', minutes: '00' });

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextAreaValue(event.target.value);
  };

  const handleSendToSelected = () => {
    console.log(
      `Выбранным ID пользователям: ${selectedUsersIds} Отправка текста:  ${textAreaValue} `,
    );
    setTextAreaValue('');
  };

  const handleSendClick = () => {
    console.log(`Отправка текста : ${textAreaValue} `);
    setTextAreaValue('');
  };

  const handlePostponedClick = () => {
    setDatePickerOpened(true);
  };

  const handleDraftClick = () => {
    console.log(`Отправка в черновик текста : ${textAreaValue} `);
    setTextAreaValue('');
  };

  const handlePickDate = (value: DateTime | null) => {
    if (value) {
      setDatePickedManually(true);
      setPickedDate(value);
    } else {
      setPickedDate(TOMORROW);
    }
  };

  const handleDelayedSendButtonClicked = () => {
    console.log(
      `Send text: ${textAreaValue} on: ${pickedDate} at ${time.hours} : ${time.minutes} выбранным ID пользователям: ${selectedUsersIds}`,
    );
    setTextAreaValue('');
    handleModalClosed();
  };

  function handleModalClosed() {
    setDatePickerOpened(false);
    setTime({ hours: '00', minutes: '00' });
    setDatePickedManually(false);
  }

  const createButton = (
    content: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>,
    disabled?: boolean,
    view: ButtonView = 'normal',
  ) => (
    <Button
      size="l"
      view={view}
      className={styles.actionButton}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Button>
  );

  const isTextValueEmpty = () => {
    return textAreaValue.trim() === '';
  };

  const isAnyUserSelected = selectedUsersIds.length > 0;
  const isSendDisabled = isTextValueEmpty() || !isAnyUserSelected;

  return (
    <>
      <Modal open={datePickerOpened} onClose={handleModalClosed}>
        <div className={styles.modal}>
          <div className={styles.date}>
            <Text variant="subheader-3">Выберите дату</Text>
            <DatePicker
              placeholder="Выберите дату"
              size="xl"
              style={{ width: '300px' }}
              onUpdate={handlePickDate}
              defaultValue={TOMORROW}
            />
          </div>
          <div className={styles.time}>
            <Text variant="subheader-3">Выберите время</Text>
            <TimeInput time={time} setTime={setTime} />
          </div>
          <Button
            size="xl"
            view={datePickedManually ? 'action' : 'normal'}
            onClick={() => handleDelayedSendButtonClicked()}
          >
            {`Отправить ${formatDate(pickedDate.toISOString(), 'long')} в ${time.hours}:${time.minutes}`}
          </Button>
        </div>
      </Modal>
      <>
        <Button className={styles.templatesButton} size="l">
          Шаблоны
        </Button>
        <TextArea
          placeholder="Начните новую рассылку"
          size="l"
          className={styles.textArea}
          value={textAreaValue}
          onChange={handleTextAreaChange}
        />

        <div className={styles.actions}>
          {createButton(
            `Отправить выбранным (${selectedUsersIds.length})`,
            handleSendToSelected,
            isSendDisabled,
            'action',
          )}
          {createButton('Отправить всем', handleSendClick, isTextValueEmpty())}
          {createButton(
            'Отложить рассылку',
            handlePostponedClick,
            isSendDisabled,
          )}
          {createButton('В черновики', handleDraftClick, isTextValueEmpty())}
        </div>
      </>
    </>
  );
};

export default NewMailing;
