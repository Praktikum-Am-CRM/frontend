import styles from './styles.module.css';
import { useState } from 'react';
import { Button, TextArea } from '@gravity-ui/uikit';
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';

const PersonalMessage = () => {
  const [textInput, setTextInput] = useState('');

  const handleSendButtonClick = () => {
    toaster.add({
      name: 'send-to-all',
      title: 'Отправлено',
      content: 'Персональное сообщение отправлено',
      actions: [
        {
          label: 'ОК',
          removeAfterClick: true,
          onClick: () => {},
        },
      ],
    });
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
