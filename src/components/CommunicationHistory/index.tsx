import styles from './styles.module.css';
import { Link, Text } from '@gravity-ui/uikit';
import { formatDate } from '../../utils/formatDate';

interface Props {
  messages: MessageHistoryItemType[];
}

const groupByDate = (messages: MessageHistoryItemType[]) => {
  const groups: { [key: string]: MessageHistoryItemType[] } = {};
  messages.forEach(message => {
    const date = new Date(message.message.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });
  return groups;
};

const formatMessageTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const isAmbassadorsMessage = (message: MessageHistoryItemType) => {
  return Boolean(message.message.message_type);
};
const CommunicationHistory: React.FC<Props> = ({ messages }) => {
  const groupedMessages = groupByDate(messages);

  return (
    <div className={styles.root}>
      {Object.entries(groupedMessages)
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([date, groupedMessagesForDate]) => (
          <div key={date} className={styles.messsgesThisDay}>
            <Text className={styles.date} variant="body-1">
              {formatDate(date, '2-digit')}
            </Text>
            <div className={styles.messagesList}>
              {groupedMessagesForDate.map(messageData => (
                <div
                  key={messageData.id}
                  className={`${styles.messageItem} ${
                    isAmbassadorsMessage(messageData)
                      ? styles.userMessageAlign
                      : styles.botMessageAlign
                  }`}
                >
                  <div
                    className={`${styles.message} ${
                      isAmbassadorsMessage(messageData)
                        ? styles.userMessage
                        : styles.botMessage
                    }`}
                  >
                    {isAmbassadorsMessage(messageData) && (
                      <Text variant="caption-2" color="complementary">
                        Имя Пользователя
                      </Text>
                    )}
                    <div className={styles.texts}>
                      {' '}
                      <Text variant="body-1">
                        {messageData.message.message_text}
                      </Text>
                      <Text variant="body-1" color="link"></Text>
                      <Link href={messageData.message.media_link}>
                        {messageData.message.media_link}
                      </Link>
                    </div>
                  </div>
                  <Text
                    key={messageData.id}
                    className={
                      isAmbassadorsMessage(messageData)
                        ? styles.userMessageAlign
                        : styles.botMessageAlign
                    }
                    variant="caption-2"
                    color="secondary"
                  >
                    {formatMessageTime(messageData.message.date)}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommunicationHistory;
