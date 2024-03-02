/* eslint-disable no-console */
import styles from './styles.module.css';
import { Text } from '@gravity-ui/uikit';
import CardMessage from '../CardMessage';
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
        <div className={styles.cardList}>
          {messages.bulkMessages.map(msg => (
            <CardMessage key={msg.id} message={msg} />
          ))}
        </div>
      </div>

      <div>
        <Text className={styles.type} variant="subheader-3">
          Персональные
        </Text>
        <div className={styles.cardList}>
          {messages.personalMessages.map(msg => (
            <CardMessage key={msg.id} message={msg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DelayedMessages;
