/* eslint-disable camelcase */
/* eslint-disable no-console */
import styles from './styles.module.css';
import { Button, ButtonView, TextArea } from '@gravity-ui/uikit';
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';
import { usePostNewMessageMutation } from '../../store/amCrm/amCrm.api';

const NewMailing = () => {
  const [postNewMessageMutation] = usePostNewMessageMutation();
  const textAreaValue = useAppSelector(state => state.mailing.textAreaValue);
  const { setTextAreaValue } = useActions();
  const selectedUsersIds = useAppSelector(
    state => state.table.selectedUsersIds,
  );

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextAreaValue(event.target.value);
  };

  const handleSendToSelected = async () => {
    const messageData = {
      message_text: textAreaValue,
      ambassadors: selectedUsersIds,
    };

    try {
      await postNewMessageMutation(messageData).then(() => {
        setTextAreaValue('');
      });
      toaster.add({
        name: 'send-to-picked-ok',
        title: 'Рассылка отправлена',
        content: 'Сообщение отправлено выбранным пользователям',
        actions: [
          {
            label: 'ОК',
            removeAfterClick: true,
            onClick: () => {
              setTextAreaValue('');
            },
          },
        ],
      });
    } catch (err) {
      toaster.add({
        name: 'send-to-picked-err',
        title: 'Произошла ошибка',
        content: 'Сообщение не было отправлено',
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

  const handleSendClick = () => {
    toaster.add({
      name: 'send-to-all',
      title: 'Рассылка отправлена',
      content: 'Сообщение отправлено всем пользователям',
      actions: [
        {
          label: 'ОК',
          removeAfterClick: true,
          onClick: () => {},
        },
      ],
    });
    setTextAreaValue('');
  };

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
      <TextArea
        placeholder="Начните новую рассылку"
        size="xl"
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
      </div>
    </>
  );
};

export default NewMailing;
