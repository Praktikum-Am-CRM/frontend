/* eslint-disable camelcase */
import styles from './styles.module.css';
import { useState } from 'react';
import { Button, TextArea } from '@gravity-ui/uikit';
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';
import { useAppSelector } from '../../hooks/redux';
import { usePostNewMessageMutation } from '../../store/amCrm/amCrm.api';
import { TEXTS } from '../../utils/constants';

const PersonalMessage = () => {
  const [textInput, setTextInput] = useState('');
  const pickedRowUserId = useAppSelector(state => state.table.pickedRowUserId);
  const [postNewMessageMutation] = usePostNewMessageMutation();

  const handleSendButtonClick = async () => {
    const messageData = {
      message_text: textInput,
      ambassadors: [pickedRowUserId],
    };

    try {
      await postNewMessageMutation(messageData);
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
    } catch (err) {
      toaster.add({
        name: 'send-to-picked-err',
        title: TEXTS.MAILING.ERROR_OCCURRED,
        content: TEXTS.MAILING.MESSAGE_NOT_SENT,
        actions: [
          {
            label: 'ОК',
            removeAfterClick: true,
            onClick: () => {},
          },
        ],
      });
    }
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
