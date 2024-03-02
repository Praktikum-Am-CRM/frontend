import styles from './styles.module.css';
import { Card, Text } from '@gravity-ui/uikit';
import DropdownMenuButton from '../DropdownMenuButton';
import { formatDate } from '../../utils/formatDate';
import { BulkMessage, PersonalMessage } from '../../types/types';

interface CardMessageProps {
  message: BulkMessage | PersonalMessage;
}

const CardMessage: React.FC<CardMessageProps> = ({ message }) => (
  <Card
    view="outlined"
    type="action"
    size="l"
    key={message.id}
    className={styles.card}
    // eslint-disable-next-line no-console
    onClick={() => console.log('Card clicked')}
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
        {formatDate(message.date)}
      </Text>
    </div>
    <div className={styles.cardLine}>
      <Text variant="body-1" color="secondary">
        {message.message}
      </Text>
      <Text>
        <DropdownMenuButton />
      </Text>
    </div>
  </Card>
);

export default CardMessage;
