import styles from './styles.module.css';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Button, TextArea } from '@gravity-ui/uikit';

const PersonalMessage = () => {
  const pickedRowUserId = useAppSelector(state => state.table.pickedRowUserId);
  const [textInput, setTextInput] = useState('');

  const handleSendButtonClick = () => {
    console.log(`Send to: ${pickedRowUserId} with text: ${textInput}`);
    setTextInput('');
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextInput(event.target.value);
  };

  return (
    <div className={styles.root}>
      <TextArea
        placeholder="Введите сообщение"
        size="l"
        value={textInput}
        onChange={handleTextAreaChange}
      />
      <Button
        className={styles.sendButton}
        view={textInput === '' ? 'normal' : 'action'}
        disabled={!textInput}
        size="l"
        onClick={handleSendButtonClick}
      >
        Отправить
      </Button>
    </div>
  );
};

export default PersonalMessage;
