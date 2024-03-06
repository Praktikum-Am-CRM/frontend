import styles from './styles.module.css';
import CardMessage from '../CardMessage';
import { CardType, Message } from '../../types/types';

interface MessagesListProps {
  messages: Message[];
  cardType: CardType;
  onClick: (message?: string, id?: string) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  cardType,
  onClick,
}) => {
  const sortedMessages =
    cardType === 'chats'
      ? [...messages].sort((a, b) => {
          if (a.pinned && !b.pinned) {
            return -1;
          }
          if (!a.pinned && b.pinned) {
            return 1;
          }
          return 0;
        })
      : messages;

  return (
    <div className={styles.cardList}>
      {sortedMessages.map(msg => (
        <CardMessage
          key={msg.id}
          message={msg}
          cardType={cardType}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default MessagesList;
