/* eslint-disable no-console */
import styles from './styles.module.css';
import { Button, ButtonView, TextArea } from '@gravity-ui/uikit';
import { useState } from 'react';

const NewMailing = () => {
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextAreaValue(event.target.value);
  };

  const handleSendClick = () => {
    console.log('Отправка текста:', textAreaValue);
  };

  const isButtonActive = () => {
    return textAreaValue.trim() === '';
  };

  const createButton = (
    text: string,
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
      {text}
    </Button>
  );

  return (
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
        {createButton('Отправить выбранным', handleSendClick, 'action')}
        {createButton('Отправить всем', handleSendClick)}
        {createButton('Отложить рассылку', handleSendClick)}
        {createButton('В черновики', handleSendClick)}
      </div>
    </>
  );
};

export default NewMailing;