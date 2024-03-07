/* eslint-disable no-console */
import styles from './styles.module.css';
import { Text } from '@gravity-ui/uikit';
import MessagesList from '../MessagesList';
import { MessagesState } from '../../types/types';
import { useActions } from '../../hooks/actions';

const DelayedMessages: React.FC<{ messages: MessagesState }> = ({
  messages,
}) => {
  const { setTextAreaValue, setActiveTab } = useActions();

  const handleEditClick = (message?: string, id?: string) => {
    //TBD сначала дернуть ручку "Удалить отложенное сообщение по id"
    console.log(`message id: ${id}`);
    setTextAreaValue(message);
    setActiveTab('newMailing');
  };

  return (
    <div className={styles.root}>
      <div>
        <Text className={styles.type} variant="subheader-3">
          Массовые
        </Text>
        <MessagesList
          messages={messages.bulkMessages}
          onClick={handleEditClick}
        />
      </div>

      <div>
        <Text className={styles.type} variant="subheader-3">
          Персональные
        </Text>
        <MessagesList
          messages={messages.personalMessages}
          onClick={handleEditClick}
        />
      </div>
    </div>
  );
};

export default DelayedMessages;
