/* eslint-disable no-console */
import styles from './styles.module.css';
import { Button, ButtonView, TextArea } from '@gravity-ui/uikit';
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
    console.log(
      `Выбранным ID пользователям: ${selectedUsersIds} Отправка текста:  ${textAreaValue} `,
    );
    setTextAreaValue('');
  };

  const handleSendClick = () => {
    console.log(`Отправка текста : ${textAreaValue} `);
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
