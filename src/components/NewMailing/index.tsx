/* eslint-disable no-console */
import styles from './styles.module.css';
import { Button, ButtonView, Modal, TextArea } from '@gravity-ui/uikit';
import { dateTime, dateTimeParse } from '@gravity-ui/date-utils';
import type { DateTime } from '@gravity-ui/date-utils';
import { DatePicker } from '@gravity-ui/date-components';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';
import { useState } from 'react';

const FORMAT = 'DD MMMM YYYY';
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

  const isButtonActive = () => {
    return textAreaValue.trim() === '';
  };

  const handlePickDate = (value: DateTime | null) => {
    if (value) {
      setDatePickedManually(true);
      setPickedDate(value);
    } else {
      setPickedDate(TOMORROW);
    }
  };

  const handleSendButtonClicked = (value: DateTime | string) => {
    console.log(
      `Send text: ${value} on: ${textAreaValue} выбранным ID пользователям: ${selectedUsersIds}`,
    );
    setTextAreaValue('');
    handleModalClosed();
  };

  function handleModalClosed() {
    setDatePickerOpened(false);
    setDatePickedManually(false);
  }

  const createButton = (
    content: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>,
    view: ButtonView = 'normal',
  ) => (
    <Button
      size="l"
      view={view}
      className={styles.actionButton}
      onClick={onClick}
      disabled={isButtonActive()}
    >
      {content}
    </Button>
  );

  return (
    <>
      <Modal open={datePickerOpened} onClose={handleModalClosed}>
        <div className={styles.modal}>
          <DatePicker
            placeholder="Выберите дату отправки"
            size="xl"
            style={{ width: '300px' }}
            onUpdate={handlePickDate}
            defaultValue={TOMORROW}
          />
          <Button
            size="xl"
            view={datePickedManually ? 'action' : 'normal'}
            onClick={() => handleSendButtonClicked(pickedDate)}
          >
            {`Отправить ${dateTimeParse(pickedDate)?.format(FORMAT)}`}
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
            'action',
          )}
          {createButton('Отправить всем', handleSendClick)}
          {createButton('Отложить рассылку', handlePostponedClick)}
          {createButton('В черновики', handleDraftClick)}
        </div>
      </>
    </>
  );
};

export default NewMailing;
