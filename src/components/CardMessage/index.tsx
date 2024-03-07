import styles from './styles.module.css';
import { Card, Text } from '@gravity-ui/uikit';
import DropdownMenuButton from '../DropdownMenuButton';
import { formatDate } from '../../utils/formatDate';
import { Message } from '../../types/types';

interface CardMessageProps {
  message: Message;
  onClick: (message?: string, id?: string) => void;
}

const CardMessage: React.FC<CardMessageProps> = ({ message, onClick }) => {
  const handleEditClick = () => {
    onClick(message.message, message.id);
  };

  return (
    <Card
      view="outlined"
      type="action"
      size="l"
      key={message.id}
      className={styles.card}
      // eslint-disable-next-line no-console
      onClick={() => handleEditClick()}
    >
      <div className={styles.cardLine}>
        <div>
          <Text variant="body-1" color="secondary">
            {'Кому: '}
          </Text>
          <Text>
            {'recipients' in message ? message.recipients : message.recipient}
          </Text>
        </div>
        <Text variant="body-1" color="secondary">
          {formatDate(message.date, '2-digit')}
        </Text>
      </div>
      <div className={styles.cardLine}>
        <Text variant="body-1" color="secondary">
          {message.message}
        </Text>
        <DropdownMenuButton onClick={handleEditClick} />
      </div>
    </Card>
  );
};

export default CardMessage;
