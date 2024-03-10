/* eslint-disable no-console */
import styles from './styles.module.css';
import { Button, ButtonView, TextArea } from '@gravity-ui/uikit';
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

const NewMailing = () => {
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

  const handleSendToSelected = () => {
    toaster.add({
      name: 'send-to-picked',
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
          onClick: () => {
            setTextAreaValue('');
          },
        },
      ],
    });
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
