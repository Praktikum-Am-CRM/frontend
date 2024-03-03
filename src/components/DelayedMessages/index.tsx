/* eslint-disable no-console */
import styles from './styles.module.css';
import { Text } from '@gravity-ui/uikit';
import MessagesList from '../MessagesList';
import { MessagesState } from '../../types/types';

const DelayedMessages: React.FC<{ messages: MessagesState }> = ({
  messages,
}) => {
  return (
    <div className={styles.root}>
      <div>
        <Text className={styles.type} variant="subheader-3">
          Массовые
        </Text>
        <MessagesList messages={messages.bulkMessages} cardType="delayed" />
      </div>

      <div>
        <Text className={styles.type} variant="subheader-3">
          Персональные
        </Text>
        <MessagesList messages={messages.personalMessages} cardType="delayed" />
      </div>
    </div>
  );
};

export default DelayedMessages;
