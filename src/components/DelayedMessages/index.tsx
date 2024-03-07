/* eslint-disable no-console */
import styles from './styles.module.css';
import { Text } from '@gravity-ui/uikit';
import MessagesList from '../MessagesList';
import EmptyMessageTab from '../EmptyMessageTab';
import { Message, MessagesState } from '../../types/types';
import { useActions } from '../../hooks/actions';

interface MessageGroupProps {
  title: string;
  messageList: Message[];
}

const DelayedMessages: React.FC<{ messages: MessagesState }> = ({
  messages,
}) => {
  const { setTextAreaValue, setActiveTab } = useActions();

  const handleEditClick = (message?: string, id?: string) => {
    // TBD: сначала дернуть ручку "Удалить отложенное сообщение по id"
    console.log(`message id: ${id}`);
    setTextAreaValue(message);
    setActiveTab('newMailing');
  };

  const MessageGroup: React.FC<MessageGroupProps> = ({
    title,
    messageList,
  }) => (
    <div>
      <Text className={styles.type} variant="subheader-3">
        {title}
      </Text>
      <MessagesList messages={messageList} onClick={handleEditClick} />
    </div>
  );

  return messages ? (
    <div className={styles.root}>
      <MessageGroup title="Массовые" messageList={messages.bulkMessages} />
      <MessageGroup
        title="Персональные"
        messageList={messages.personalMessages}
      />
    </div>
  ) : (
    <EmptyMessageTab type="delayed" />
  );
};

export default DelayedMessages;
