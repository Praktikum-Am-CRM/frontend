import styles from './styles.module.css';
import CardMessage from '../CardMessage';
import { Message } from '../../types/types';

interface MessagesListProps {
  messages: Message[];
  onClick: (message?: string, id?: string) => void;
}

const MessagesList = ({ messages, onClick }: MessagesListProps) => {
  return (
    <div className={styles.cardList}>
      {messages.map(msg => (
        <CardMessage key={msg.id} message={msg} onClick={onClick} />
      ))}
    </div>
  );
};

export default MessagesList;
