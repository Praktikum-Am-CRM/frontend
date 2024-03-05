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
  };

  const handleSendClick = () => {
    console.log(`Отправка текста : ${textAreaValue} `);
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
        {createButton(
          `Отправить выбранным (${selectedUsersIds.length > 0 ? selectedUsersIds.length : 0})`,
          handleSendToSelected,
          'action',
        )}
        {createButton('Отправить всем', handleSendClick)}
        {createButton('Отложить рассылку', handleSendClick)}
        {createButton('В черновики', handleSendClick)}
      </div>
    </>
  );
};

export default NewMailing;
