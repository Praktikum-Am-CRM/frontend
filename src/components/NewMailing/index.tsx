/* eslint-disable no-console */
import styles from './styles.module.css';
import { Button, ButtonView, Modal, TextArea } from '@gravity-ui/uikit';
import type { DateTime } from '@gravity-ui/date-utils';
import { DatePicker } from '@gravity-ui/date-components';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';
import { useState } from 'react';

const NewMailing = () => {
  const textAreaValue = useAppSelector(state => state.mailing.textAreaValue);
  const { setTextAreaValue } = useActions();
  const selectedUsersIds = useAppSelector(
    state => state.table.selectedUsersIds,
  );

  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date().toISOString());

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextAreaValue(event.target.value);
  };

  const handleSendToSelected = () => {
    console.log(
      `Выбранным ID пользователям: ${selectedUsersIds} Отправка текста:  ${textAreaValue} `,
    );
  };

  const handleSendClick = () => {
    console.log(`Отправка текста : ${textAreaValue} `);
  };

  const handlePostponedClick = () => {
    setDatePickerOpened(true);
  };

  const isButtonActive = () => {
    return textAreaValue.trim() === '';
  };

  const handlePickDate = (value: DateTime | null) => {
    if (value) {
      setPickedDate(value.toISOString());
    } else {
      setPickedDate('');
    }
  };

  const handleSendButtonClicked = (value: string) => {
    console.log(value);
    setDatePickerOpened(false);
  };

  function formatDate(dateISO: string) {
    const dateObj = new Date(dateISO);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
      day: '2-digit',
    };
    const formattedDate = dateObj.toLocaleDateString('ru-RU', options);
    return formattedDate;
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
      <Modal open={datePickerOpened} onClose={() => setDatePickerOpened(false)}>
        <div className={styles.modal}>
          <DatePicker
            placeholder="Выберите дату отправки"
            size="xl"
            style={{ width: '300px' }}
            onUpdate={handlePickDate}
          />
          <Button
            disabled={Object.keys(pickedDate).length === 0}
            size="xl"
            onClick={() => handleSendButtonClicked(pickedDate)}
          >
            {`Отправить ${
              Object.keys(pickedDate).length > 0 ? formatDate(pickedDate) : ''
            }`}
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
            `Отправить выбранным (${selectedUsersIds.length > 0 ? selectedUsersIds.length : 0})`,
            handleSendToSelected,
            'action',
          )}
          {createButton('Отправить всем', handleSendClick)}

          {createButton('Отложить рассылку', handlePostponedClick)}
          {createButton('В черновики', handleSendClick)}
        </div>
      </>
    </>
  );
};

export default NewMailing;
